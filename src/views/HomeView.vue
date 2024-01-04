<template>
  <main>
    
    <div class="recom-div">
        <h2 class="seachbar-heading"> Generate Game Recommendations </h2>
        <input @keypress.enter="onGenerate"  type="text" class="game-name-searchbar" v-model="gameName">
        <button @click="onGenerate"  class="game-generate but"> Generate </button>
        
    </div>
    
    <div class="trending-games">
      <h2 class="trending-heading">Trending Games</h2>

      <div class="game-card">

        <!-- <div class="game-img">
          <img src="src\assets\img\colorful_wavy_lines_macbook_pro_hd_macbook-1600x900.jpg" alt="image">
        </div> -->




      </div>


    </div> 
    
  </main>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
let gameName = ref('');

// checkGameName(){
//   if(this.gameName == '')
// }
    
const onGenerate = () => {
  if(gameName != ''){
    router.push({path: `/results`, query: {game: gameName.value}});
  }
}
  
  
</script>