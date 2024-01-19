<template>
  
  <div class="recom-div">
    <h2 class="seachbar-heading"> Generate Game Recommendations </h2>
    <input @keypress.enter="onGenerate"  type="text"
    class="game-name-searchbar" v-model="gameName" placeholder="Enter Game Name Here" required
    >
    <button @click="onGenerate"  class="but"> Generate </button>
    
    <Transition name="bounce">
      <div class="searchbarErr" v-if="showSearchbarError">Enter a valid game name</div>
    </Transition>
  </div> 

  <trending @trend_game="(game_name) => {
    gameName = game_name;
    onGenerate();
  }"/>
     
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import trending from '../components/TrendingGames.vue'
import '../assets/styles/demo.css'

const router = useRouter();
const gameName = ref('');
const showSearchbarError = ref(false);


const onGenerate = () => {
  if(gameName.value.trim() === ''){
    showSearchbarError.value = true;
    setTimeout(() => showSearchbarError.value = false, 3000)
    gameName.value = '';
  }
  else {
    router.push({path: `/results`, query: {'game': gameName.value}});
  }
}
  
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>