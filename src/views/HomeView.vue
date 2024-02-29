<template>
  <body class="min-h-screen bg-black-light">
    <div class="flex h-60 flex-col items-center justify-center">
      <h2 class="w-full text-center text-3xl text-red-light">
        Generate Game Recommendations
      </h2>
      <div class="mt-4 flex w-full justify-center">
        <input
          @keypress.enter="onGenerate"
          type="text"
          class="mr-3 w-1/3 rounded-lg p-1 indent-2 text-lg outline-none"
          :class="
            showSearchbarError
              ? 'bg-red-light text-center font-cool text-white-light '
              : 'bg-white-dark font-search focus:bg-white-light'
          "
          v-model="gameName"
          placeholder="Enter Game Name Here"
          :value="showSearchbarError ? 'Enter a Valid Game Name' : gameName"
          :readonly="showSearchbarError"
        />
        <button
          @click="onGenerate"
          class="rounded-lg bg-white-dark px-3 py-2 text-sm text-black-light"
          :disabled="showSearchbarError"
          :class="
            showSearchbarError
              ? 'none'
              : 'hover:bg-red-light hover:text-white-light'
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
