<template>
  <div
    class="mx-5 mb-6 text-center text-xl text-red-light sm:text-left sm:text-2xl"
  >
    Trending Games
  </div>

  <div class="mx-5 grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-4">
    <div v-for="(game_data, index) in trending_games_data" :key="index">
      <img
        class="rounded-xl"
        :src="`${game_data.Image}`"
        alt="steam_game_image"
      />
      <div class="mt-1 flex">
        <div class="w-3/4 text-white-dark">
          <div
            class="cursor-pointer text-wrap text-sm text-red-light hover:text-white-dark sm:text-base"
            @click="goEmit(game_data.Name)"
          >
            {{ game_data.Name }}
          </div>
          <div class="text-xs sm:text-sm">{{ game_data.Price }}</div>
        </div>

        <a
          :href="`${game_data.Steam}`"
          class="ml-auto flex items-center rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="w-7 rounded-full bg-white-dark hover:opacity-70 sm:w-9"
            src="../assets/img/8679449_steam_fill_icon.png"
            alt="steam_logo"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  </div>
  <div class="h-10"></div>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";

const trending_games_data = ref([]);

const receivePayload = async () => {
  const path = "https://game-recommendation-flask.onrender.com/trend";

  return axios.get(path).then((res) => {
    trending_games_data.value = res.data.payload;
  });
};

const emit = defineEmits(["trend_game"]);

const goEmit = (game_name) => {
  emit("trend_game", game_name);
};

onBeforeMount(() => {
  receivePayload();
});
</script>
