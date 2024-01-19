<template>

<loadingScreen v-if="isLoading"/>

<div v-else v-cloak>
  <h1 class="result-title">Recommendations for <span>{{gameName}}</span></h1>

  <div class="horizontal-card" v-if="show_chosen_game">
    <img class="horizontal-img" :src="`${chosen_game[0].Image}`" alt="image"/>
    <div class="horizontal-text">
      <div class="horizontal-name-price-img">
        <div>
          <span>{{ gameName }}</span>
          <p><span>Price: </span>{{ chosen_game[0].Price }}</p>
        </div>
        <a class='a-steam-img' :href='`${chosen_game[0].Steam}`' target="_blank" rel="noopener noreferrer">
          <img class='results-steam-img' src="../assets/img/8679449_steam_fill_icon.png" alt="steam">
        </a>
      
      </div>
      <p><span>Description: </span><br>{{ chosen_game[0].Description }}</p>
    </div>
  </div>

  <div v-if="show_similar">
    <div class="cap">Similar Games</div>
    <div class="horizontal-card content-based" 
  v-for="(gameData, index) in similar_recommendations" :key="index">

      <img class="horizontal-img" :src="`${gameData.Image}`" alt="image"/>
      <div class="horizontal-text">
        <div class="horizontal-name-price-img">
          <div>
            <span>{{ gameData.Name }}</span>
            <p><span>Price: </span>{{ gameData.Price }}</p>
          </div>
          <a class='a-steam-img' :href='`${gameData.Steam}`' target="_blank" rel="noopener noreferrer">
            <img class='results-steam-img' src="../assets/img/8679449_steam_fill_icon.png" alt="steam">
          </a>
        </div>
        <p><span>Description: </span><br>{{ gameData.Description }}</p>
      </div>
    </div>
  </div>
  
  <div v-else class="no-recom"><h3>No similar games to show</h3></div>

  <div v-if="show_also_played">
    <div class="cap">Other users also played</div>
    <div class="horizontal-card collaborative" 
    v-for="(gameData, index) in also_played_recommmendations" :key="index">
      <img class="horizontal-img" :src="`${gameData.Image}`" alt="image"/>
      <div class="horizontal-text">
        <div class="horizontal-name-price-img">
          <div>
            <span>{{ gameData.Name }}</span>
            <p><span>Price: </span>{{ gameData.Price }}</p>
          </div>
          <a class='a-steam-img' :href='`${gameData.Steam}`' target="_blank" rel="noopener noreferrer">
            <img class='results-steam-img' src="../assets/img/8679449_steam_fill_icon.png" alt="steam">
          </a>
        </div>
        <p><span>Description: </span><br>{{ gameData.Description }}</p>
      </div>
    </div>

  </div>
  
  <div v-else class="no-recom"><h3>No similar games played by other users</h3></div>
</div>
</template>

<script setup>
import axios from 'axios';
import loadingScreen from '../components/Loader.vue'
import { onBeforeMount,ref } from 'vue';
import { useRoute,useRouter } from 'vue-router'
import '../assets/styles/results.css'

const route = useRoute();
const router = useRouter();

const similar_recommendations = ref([]);
const also_played_recommmendations = ref([]);
const chosen_game = ref([]);

const show_similar = ref(true);
const show_also_played = ref(true);
const show_chosen_game = ref(true);
const isLoading = ref(true);

const gameName = ref('');
    
const sendGameName = (gameName) => {
  const path = 'http://127.0.0.1:5000/results';
  axios.post(path, {'gameName': gameName})
  .then((res) => {
    let similar_games_data = res.data.similar_games;
    let also_played_games_data = res.data.also_played_games;
    let chosen_game_data = res.data.chosen_one;

    // checking if the gameName sent gave any results or not
    // if not results are provided, then re-route to error page
    if(chosen_game_data === 'e' && similar_games_data === 'e' && also_played_games_data === 'e'){
      router.push('/error');
    } 

    else if(similar_games_data === 'e'){
      show_similar.value = false;
      show_chosen_game.value = false;
      also_played_recommmendations.value = also_played_games_data;
    } 

    else if(also_played_games_data === 'e'){
      show_also_played.value = false;
      similar_recommendations.value = similar_games_data;
      chosen_game.value = chosen_game_data;
    } 

    else {
      similar_recommendations.value = similar_games_data;
      also_played_recommmendations.value = also_played_games_data;
      chosen_game.value = chosen_game_data;
    }

    isLoading.value = false;
  
  }).catch((err) => {
    console.log(err);
  })
}

const setGameName = (gameName) => {
  gameName.value = route.query.game;
}
 
onBeforeMount(() => {
  setGameName(gameName);
  sendGameName(gameName.value);
})

</script>

