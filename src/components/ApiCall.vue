<template>
  <h1 class="result-title">
    Recommendations for <span>{{ gameName }}</span>
  </h1>

  <div v-if="show_similar" class="content tbl">
    <table class="tbl">
      <caption class="tbl-cap">
        Similar Games:
      </caption>
      <colgroup>
        <col span="1" style="width: 18%" />
        <col span="1" style="width: 7%" />
        <col span="1" style="width: 75%" />
      </colgroup>
      <thead>
        <tr>
          <th class="tbl-headings">Name</th>
          <th class="tbl-headings">Price</th>
          <th class="tbl-headings">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gameData, index) in similar_recommendations" :key="index">
          <td class="tbl-data">{{ gameData.Name }}</td>
          <td class="tbl-data">{{ gameData.Price }}</td>
          <td class="tbl-data">{{ gameData.Description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="no-recom"><h3>No similar games to show</h3></div>

  <div v-if="show_also_played" class="collab tbl">
    <table class="tbl">
      <caption class="tbl-cap">
        Other users also played:
      </caption>
      <colgroup>
        <col span="1" style="width: 18%" />
        <col span="1" style="width: 7%" />
        <col span="1" style="width: 75%" />
      </colgroup>
      <thead>
        <tr>
          <th class="tbl-headings">Name</th>
          <th class="tbl-headings">Price</th>
          <th class="tbl-headings">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(gameData, index) in also_played_recommmendations"
          :key="index"
        >
          <td class="tbl-data">{{ gameData.Name }}</td>
          <td class="tbl-data">${{ gameData.Price }}</td>
          <td class="tbl-data">{{ gameData.Description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="no-recom">
    <h3>No similar games played by other users</h3>
  </div>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const similar_recommendations = ref([]);
const also_played_recommmendations = ref([]);
const show_similar = ref(true);
const show_also_played = ref(true);
const gameName = ref("");

const sendGameName = async (gameName) => {
  const path = "http://127.0.0.1:5000/results";
  const res = await axios.post(path, { gameName: gameName });

  let similar_games_data = res.data.similar_games;
  let also_played_games_data = res.data.also_played_games;

  // checking if the gameName sent gave any results or not
  // if not results are provided, then re-route to error page
  if (similar_games_data === "e" && also_played_games_data === "e")
    router.push("/error");
  else if (similar_games_data === "e") {
    show_similar.value = false;
    also_played_recommmendations.value = also_played_games_data;
  } else if (also_played_games_data === "e") {
    show_also_played.value = false;
    similar_recommendations.value = similar_games_data;
  } else {
    similar_recommendations.value = similar_games_data;
    also_played_recommmendations.value = also_played_games_data;
  }
};

const setGameName = (gameName) => {
  gameName.value = route.query.game;
};

onBeforeMount(() => {
  setGameName(gameName);
  sendGameName(gameName.value);
});
</script>
