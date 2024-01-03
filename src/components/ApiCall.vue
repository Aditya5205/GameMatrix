<template>
  <h1 class="result-title">
    Recommendations for <span>{{ gameName }}</span>
  </h1>
  <loader v-if="isLoading"></loader>

  <div v-if="show_similar" class="content tbl">
    <table class="tbl">
      <caption class="tbl-cap">
        Similar Games:
      </caption>
      <colgroup>
        <col span="1" style="width: 18%" />
        <col span="1" style="width: 7%" />
        <col span="1" style="width: 75%" />
      </colgroup>
      <thead>
        <tr>
          <th class="tbl-headings">Name</th>
          <th class="tbl-headings">Price</th>
          <th class="tbl-headings">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gameData, index) in similar_recommendations" :key="index">
          <td class="tbl-data">{{ gameData.Name }}</td>
          <td class="tbl-data">${{ gameData.Price }}</td>
          <td class="tbl-data">{{ gameData.Description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="no-recom"><h3>No similar games to show</h3></div>

  <div v-if="show_also_played" class="collab tbl">
    <table class="tbl">
      <caption class="tbl-cap">
        Other users also played:
      </caption>
      <colgroup>
        <col span="1" style="width: 18%" />
        <col span="1" style="width: 7%" />
        <col span="1" style="width: 75%" />
      </colgroup>
      <thead>
        <tr>
          <th class="tbl-headings">Name</th>
          <th class="tbl-headings">Price</th>
          <th class="tbl-headings">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(gameData, index) in also_played_recommmendations"
          :key="index"
        >
          <td class="tbl-data">{{ gameData.Name }}</td>
          <td class="tbl-data">${{ gameData.Price }}</td>
          <td class="tbl-data">{{ gameData.Description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="no-recom">
    <h3>No similar games played by other users</h3>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from 'vue';

async function sendGameName(gameName) {
  const path = "http://127.0.0.1:5000/results";
  return axios.post(path, { gameName: gameName })
  .then((res) => {
    let similar_games_data = res.data.similar_games;
    let also_played_games_data = res.data.also_played_games;

    // checking if the gameName sent gave any results or not
    // if not results are provided, then re-route to error page
    if (similar_games_data === "e" && also_played_games_data === "e")
      this.$router.push("/error");
    else if (similar_games_data === "e") {
      this.show_similar = false;
      this.also_played_recommmendations = also_played_games_data;
    } else if (also_played_games_data === "e") {
      this.show_also_played = false;
      this.similar_recommendations = similar_games_data;
    } else {
      this.similar_recommendations = similar_games_data;
      this.also_played_recommmendations = also_played_games_data;
    }

    this.isLoading = false;
  })
}

export default{

async setup() {
  let similar_recommendations = ref([]);
  let also_played_recommmendations = ref([]);
  let show_similar = ref(true);
  let show_also_played = ref([]);
  let isLoading = ref([]);
  let gameName = ref([]);
    
  async function sendGameName(gameName) {
    const path = "http://127.0.0.1:5000/results";
    return axios.post(path, { gameName: gameName })
    .then((res) => {
      let similar_games_data = res.data.similar_games;
      let also_played_games_data = res.data.also_played_games;

      // checking if the gameName sent gave any results or not
      // if not results are provided, then re-route to error page
      if (similar_games_data === "e" && also_played_games_data === "e")
        this.$router.push("/error");
      else if (similar_games_data === "e") {
        this.show_similar = false;
        this.also_played_recommmendations = also_played_games_data;
      } else if (also_played_games_data === "e") {
        this.show_also_played = false;
        this.similar_recommendations = similar_games_data;
      } else {
        this.similar_recommendations = similar_games_data;
        this.also_played_recommmendations = also_played_games_data;
      }

      this.isLoading = false;
    })
  }

  await sendGameName(gameName)

  return {
    similar_recommendations,
    also_played_recommmendations,
    show_similar,
    show_also_played,
    isLoading,
    gameName,
  }
},

methods: {
  setGameName(gameName) {
    this.gameName = this.$route.query.game;
  } 
},

created(){
  this.setGameName(this.gameName);
  this.sendGameName(this.gameName);
}
}

</script>
