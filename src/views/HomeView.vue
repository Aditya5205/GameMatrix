<template>
  <main>
    
    <div class="recom-div">
        <h2 class="seachbar-heading"> Generate Game Recommendations </h2>
        <input @keypress.enter="onGenerate"  type="text" class="game-name-searchbar" v-model="gameName">
        <button @click="onGenerate"  class="game-generate but"> Generate </button>
    </div> 

    <trending @trend_game="(game_name) => {
      gameName = game_name;
      onGenerate();
    }"/>
    
  </main>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import trending from '../components/TrendingGames.vue'

const router = useRouter();
let gameName = ref('');

// checkGameName(){
//   if(this.gameName == '')
// }
    
const onGenerate = () => {
  if(gameName != ''){
    router.push({path: `/results`, query: {'game': gameName.value}});
  }
}
  
  
</script>