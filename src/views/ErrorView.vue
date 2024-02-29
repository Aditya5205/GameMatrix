<template>
  <div class="min-h-screen bg-black-light text-center text-xl">
    <div class="py-8 text-white-dark">
      <h1 class="text-3xl text-red-light">Hey!</h1>
      <h3>Seems like you have hit an error</h3>
      <br />
      <h4>
        Either you entered the wrong game name <br />or the game you have
        entered is not in our database.
      </h4>
      <br />
      <h4>Try entering an appropriate game name for recommendations</h4>
    </div>
    <button
      @click="toHomeView"
      class="rounded-lg bg-white-dark px-3 py-2 text-sm text-black-light hover:bg-red-light hover:text-white-light"
    >
      &lt; Return To Home Page
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const toHomeView = () => {
  router.push("/");
};
</script>
