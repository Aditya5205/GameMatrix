<template>
  <main>
    
    <div class="recom-div">
        <h2 class="seachbar-heading"> Generate Game Recommendations </h2>
        <input @keypress.enter="onGenerate()"  type="text" class="game-name-searchbar" v-model="gameName">
        <button @click="onGenerate()"  class="game-generate but"> Generate </button>
        
    </div>
    
    <div class="trending-games">
      <h2 class="trending-heading">Trending Games</h2>
    </div> 
    
  </main>
</template>

<script>
export default {  

  data() {
    return {
      gameName: '',
    }
  },

  methods: {
    // checkGameName(){
    //   if(this.gameName == '')
    // }
    

    onGenerate(){
      if(this.gameName != ''){
        this.$router.push({path: `/results`, query: {game: this.gameName}});
      } 
    }
  }
  
}
</script>