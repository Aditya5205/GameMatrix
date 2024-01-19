<template>
    <div class="trending-container">
    
      <div class="trending-heading">Trending Games</div>
        
        <div class="all-card-container">

            <div v-for="(game_data, index) in trending_games_data" :key="index" class="card">
                <img class="game-img" :src='`${game_data.Image}`' alt="image">
                <div class="card-content">
                    <div class="card-text">
                        <div class="card-name" @click="goEmit(game_data.Name)">
                            <b>{{ game_data.Name }}</b>
                        </div>
                        <p>{{ game_data.Price }}</p>
                    </div>
                    <a :href='`${game_data.Steam}`' class="steam-link" 
                    target="_blank" rel="noopener noreferrer">
                        <img class='steam-img' src="../assets/img/8679449_steam_fill_icon.png" alt="steam">
                    </a>
                </div>
            </div>
            
        </div>
        
    </div>

</template>

<script setup>
import '../assets/styles/TrendingGames.css'
import axios from 'axios';
import { onBeforeMount,ref } from 'vue';

const trending_games_data = ref([]);

const receivePayload = async () => {
    const path = 'http://127.0.0.1:5000/trend';

    return axios.get(path)
    .then((res) => {
        trending_games_data.value = res.data.payload;
    })

}

const emit = defineEmits(['trend_game'])

const goEmit = (game_name) => {
    emit('trend_game',game_name);
}

onBeforeMount(() => {
    receivePayload();
})

</script>

