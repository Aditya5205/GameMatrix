<template>
  <body class="min-h-screen bg-black-light">
    <loadingScreen v-if="isLoading" />

    <div v-else v-cloak>
      <h1 class="w-full text-center text-3xl text-white-dark">
        Recommendations for <span class="text-red-light">{{ gameName }}</span>
      </h1>

      <div class="mt-10" v-if="show_chosen_game">
        <HorizontalCard
          :image="chosen_game[0].Image"
          :name="gameName"
          :price="chosen_game[0].Price"
          :steam="chosen_game[0].Steam"
          :description="chosen_game[0].Description"
        />
      </div>

      <div v-if="show_similar">
        <div class="mt-12 text-center text-2xl text-red-light">
          Similar Games
        </div>
        <div v-for="(gameData, index) in similar_recommendations" :key="index">
          <HorizontalCard
            :image="gameData.Image"
            :name="gameData.Name"
            :price="gameData.Price"
            :steam="gameData.Steam"
            :description="gameData.Description"
          />
        </div>
      </div>

      <div v-else class="mt-20 text-center text-3xl text-white-light">
        <h3>No similar games to show</h3>
      </div>

      <div v-if="show_also_played">
        <div class="mt-12 text-center text-2xl text-red-light">
          Other users also played
        </div>
        <div
          v-for="(gameData, index) in also_played_recommmendations"
          :key="index"
        >
          <HorizontalCard
            :image="gameData.Image"
            :name="gameData.Name"
            :price="gameData.Price"
            :steam="gameData.Steam"
            :description="gameData.Description"
          />
        </div>
      </div>

      <div v-else class="mt-20 text-center text-3xl text-white-light">
        <h3>No similar games played by other users</h3>
      </div>

      <div class="h-10"></div>
    </div>
  </body>
</template>

<script setup>
import axios from "axios";
import loadingScreen from "../components/Loader.vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import HorizontalCard from "@/components/HorizontalCard.vue";

const route = useRoute();
const router = useRouter();

const similar_recommendations = ref([]);
const also_played_recommmendations = ref([]);
const chosen_game = ref([]);

const show_similar = ref(true);
const show_also_played = ref(true);
const show_chosen_game = ref(true);
const isLoading = ref(true);

const gameName = ref("");

const sendGameName = (gameName) => {
  const path = "http://127.0.0.1:5000/results";
  axios
    .post(path, { gameName: gameName })
    .then((res) => {
      let similar_games_data = res.data.similar_games;
      let also_played_games_data = res.data.also_played_games;
      let chosen_game_data = res.data.chosen_one;

      // checking if the gameName sent gave any results or not
      // if not results are provided, then re-route to error page
      if (
        chosen_game_data === "e" &&
        similar_games_data === "e" &&
        also_played_games_data === "e"
      ) {
        router.push("/error");
      } else if (similar_games_data === "e") {
        show_similar.value = false;
        show_chosen_game.value = false;
        also_played_recommmendations.value = also_played_games_data;
      } else if (also_played_games_data === "e") {
        show_also_played.value = false;
        similar_recommendations.value = similar_games_data;
        chosen_game.value = chosen_game_data;
      } else {
        similar_recommendations.value = similar_games_data;
        also_played_recommmendations.value = also_played_games_data;
        chosen_game.value = chosen_game_data;
      }

      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err);
    });
};

const setGameName = (gameName) => {
  gameName.value = route.query.game;
};

onBeforeMount(() => {
  setGameName(gameName);
  sendGameName(gameName.value);
});
</script>
