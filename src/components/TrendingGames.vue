<template>
  <div v-if="isApiDone">
    <div
      class="mx-5 mb-6 text-center text-3xl text-red-light sm:mt-20 sm:text-left sm:text-4xl"
    >
      Trending Games
    </div>
    <div
      class="mx-5 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-5 gap-y-7"
    >
      <div v-for="(game_data, index) in trending_games_data" :key="index">
        <img
          class="rounded-xl"
          :src="`${game_data.Image}`"
          alt="steam_game_image"
        />
        <div class="mt-1 flex">
          <div class="w-3/4 text-white-dark">
            <div
              class="w-fit cursor-pointer text-wrap font-sairaBody text-xl text-red-light hover:text-white-dark sm:text-[22px]"
              @click="goEmit(game_data.Name)"
            >
              {{ game_data.Name }}
            </div>
            <div class="sm:text-md font-sairaBody text-lg">
              {{ game_data.Price }}
            </div>
          </div>
          <a
            :href="`${game_data.Steam}`"
            class="ml-auto flex items-center rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="w-8 rounded-full bg-white-dark hover:opacity-70 sm:w-9"
              src="../assets/img/8679449_steam_fill_icon.png"
              alt="steam_logo"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="h-10"></div>
  </div>
  <div class="mt-14 flex flex-col text-center" v-else>
    <loadingScreen />
    <p class="mt-8 text-xl text-red-light sm:mt-24 sm:text-2xl">
      Please wait. Server is starting.
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import loadingScreen from "../components/Loader.vue";

const trending_games_data = ref([]);
const isApiDone = ref(false);

const receivePayload = async () => {
  try {
    const path = `${import.meta.env.VITE_PATH_URI_PROD}/trend`;

    return axios
      .get(path)
      .then((res) => {
        trending_games_data.value = res.data.payload;
        isApiDone.value = true;
      })
      .catch((err) => {
        console.log("fetching your data");
        console.log(`error message is ${err}`);
      });
  } catch (err) {
    console.log("Error! Could not reach the API. " + err);
    throw new Error(err);
  }
};

const emit = defineEmits(["trend_game"]);

const goEmit = (game_name) => {
  emit("trend_game", game_name);
};

onBeforeMount(() => {
  receivePayload();
});
</script>
