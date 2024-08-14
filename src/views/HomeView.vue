<template>
  <div class="bg-black-light">
    <div
      class="relative mx-3 flex h-60 flex-col justify-center text-clip sm:mx-5 sm:h-72 sm:justify-end"
    >
      <h2
        class="w-full text-center text-4xl uppercase tracking-wide text-red-light sm:text-left sm:text-7xl"
      >
        Generate Game Recommendations
      </h2>
      <p
        class="hidden w-full text-center text-3xl text-red-light sm:block sm:text-left"
      >
        based on your favourite game from over 20,000 different steam games.
      </p>
      <div
        class="mt-3 flex w-full justify-center sm:mt-10 sm:h-11 sm:justify-normal"
      >
        <div class="relative mr-3 w-1/2 sm:w-1/3">
          <input
            @keypress.enter="onGenerate"
            @input=""
            type="text"
            class="h-full w-full rounded-lg outline-none"
            :class="
              showSearchbarError
                ? 'animate-bounce-new bg-red-light text-center font-sairaHeader text-xl text-white-light sm:text-2xl'
                : 'bg-white-dark indent-1 font-sairaBody text-lg focus:bg-white-light sm:indent-2 sm:text-xl'
            "
            v-model="gameName"
            placeholder="Enter Game Name Here"
            :value="showSearchbarError ? 'Enter a Valid Game' : gameName"
            :readonly="showSearchbarError"
            autocomplete="off"
          />

          <div
            v-if="isShowSearchResults"
            class="absolute left-0 top-11 z-50 flex w-full flex-col rounded-lg bg-white-dark text-3xl text-red-500"
          >
            <div
              v-if="isSearchResultLoading && gameName !== ''"
              class="h-9 text-start indent-1 font-sairaBody text-lg text-black-dark sm:text-xl"
            >
              Loading...
            </div>
            <div
              v-else-if="
                !isSearchResultLoading &&
                searchResults.length === 0 &&
                gameName !== ''
              "
              class="h-9 text-start indent-1 font-sairaBody text-lg text-black-dark sm:text-xl"
            >
              No Results
            </div>
            <button
              v-else-if="!isSearchResultLoading && searchResults.length !== 0"
              v-for="item in searchResults"
              class="z-50 h-9 truncate rounded-lg border-b border-red-light text-start indent-1 font-sairaBody text-lg text-black-dark sm:text-xl sm:hover:bg-red-light sm:hover:text-white-light"
              @click="handleSearchResultClick(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>
        <button
          @click="onGenerate"
          class="rounded-lg bg-white-dark p-1.5 text-lg text-black-light sm:px-4 sm:py-1 sm:text-2xl"
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
      <svg
        class="right-split absolute right-5 top-10 h-full w-52"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1300 120"
        preserveAspectRatio="none"
        transform="scale(1 -1)rotate(90)"
      >
        <path fill="#C10206" d="M1200 120 0 16.48V0h1200z" class="shape-fill" />
      </svg>
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
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import loadingScreen from "../components/Loader.vue";
import debounce from "lodash.debounce";
import axios from "axios";

const Trending = defineAsyncComponent(
  () => import("../components/TrendingGames.vue"),
);

const router = useRouter();
const gameName = ref("");
const showSearchbarError = ref(false);
const isSearchResultLoading = ref(false);
const isShowSearchResults = ref(false);
const searchResults = ref([]);

const onGenerate = () => {
  if (gameName.value.trim() === "") {
    showSearchbarError.value = true;
    setTimeout(() => (showSearchbarError.value = false), 1500);
    gameName.value = "";
  } else {
    router.push({ path: `/results`, query: { game: gameName.value } });
  }
};

const handleSearchResultClick = (item) => {
  gameName.value = item;
  isShowSearchResults.value = false;
};

const updateSearchResults = debounce(async (searchQuery) => {
  isShowSearchResults.value = true;
  isSearchResultLoading.value = true;

  if (searchQuery.value === "") {
    isShowSearchResults.value = false;
    isSearchResultLoading.value = false;
    return;
  }

  try {
    const path = `${import.meta.env.VITE_PATH_URI_PROD}/search-result`;
    const response = await axios
      .post(path, { query: searchQuery.value })
      .catch((err) => {
        throw new Error(err);
      });
    searchResults.value = response.data.payload;
  } catch (err) {
    console.log("Error! Could not reach the API. " + err);
    throw new Error(err);
  } finally {
    isSearchResultLoading.value = false;
  }
}, 1000);

watch(gameName, (newVal, oldVal) => {
  updateSearchResults(gameName);
});
</script>
