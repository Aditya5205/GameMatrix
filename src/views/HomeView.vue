<template>
  <body class="min-h-screen bg-black-light">
    <div class="flex h-60 flex-col items-center justify-center">
      <h2 class="w-full text-center text-2xl text-red-light sm:text-3xl">
        Generate Game Recommendations
      </h2>
      <div class="mt-3 flex w-full justify-center sm:mt-4">
        <input
          @keypress.enter="onGenerate"
          type="text"
          class="mr-3 w-1/2 rounded-lg p-1 text-sm outline-none sm:w-1/3 sm:text-lg"
          :class="
            showSearchbarError
              ? 'bg-red-light text-center font-cool text-[10px]  text-white-light sm:text-base '
              : 'bg-white-dark indent-1 font-search focus:bg-white-light sm:indent-2'
          "
          v-model="gameName"
          placeholder="Enter Game Name Here"
          :value="showSearchbarError ? 'Enter a Valid Game Name' : gameName"
          :readonly="showSearchbarError"
        />
        <button
          @click="onGenerate"
          class="rounded-lg bg-white-dark p-1.5 text-[10px] text-black-light sm:px-3 sm:py-2 sm:text-sm"
          :disabled="showSearchbarError"
          :class="
            showSearchbarError
              ? 'none'
              : 'sm:hover:bg-red-light sm:hover:text-white-light'
          "
        >
          Generate
        </button>
      </div>
    </div>

    <Trending
      @trend_game="
        (game_name) => {
          gameName = game_name;
          onGenerate();
        }
      "
    />
  </body>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Trending from "../components/TrendingGames.vue";
// import "../assets/styles/demo.css";

const router = useRouter();
const gameName = ref("");
const showSearchbarError = ref(false);

const onGenerate = () => {
  if (gameName.value.trim() === "") {
    showSearchbarError.value = true;
    setTimeout(() => (showSearchbarError.value = false), 2000);
    gameName.value = "";
  } else {
    router.push({ path: `/results`, query: { game: gameName.value } });
  }
};
</script>
