<template>
  <body class="min-h-screen bg-black-light">
    <div class="flex h-60 flex-col items-center justify-center">
      <h2
        class="w-full text-center text-4xl uppercase tracking-wide text-red-light sm:text-5xl"
      >
        Generate Game Recommendations
      </h2>
      <div class="mt-3 flex w-full justify-center sm:mt-4">
        <input
          @keypress.enter="onGenerate"
          type="text"
          class="mr-3 w-1/2 rounded-lg outline-none sm:w-1/3"
          :class="
            showSearchbarError
              ? 'bg-red-light text-center font-sairaHeader text-xl text-white-light sm:text-2xl'
              : 'bg-white-dark indent-1 font-sairaBody text-lg focus:bg-white-light sm:indent-2 sm:text-xl'
          "
          v-model="gameName"
          placeholder="Enter Game Name Here"
          :value="showSearchbarError ? 'Enter a Valid Game' : gameName"
          :readonly="showSearchbarError"
        />
        <button
          @click="onGenerate"
          class="rounded-lg bg-white-dark p-1.5 text-lg text-black-light sm:px-4 sm:py-2 sm:text-[22px]"
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

    <Suspense>
      <Trending
        @trend_game="
          (game_name) => {
            gameName = game_name;
            onGenerate();
          }
        "
      />
      <template #fallback>
        <loadingScreen class="pt-20" />
      </template>
    </Suspense>
  </body>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useRouter } from "vue-router";
import loadingScreen from "../components/Loader.vue";

const Trending = defineAsyncComponent(
  () => import("../components/TrendingGames.vue"),
);

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
