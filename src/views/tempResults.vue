<div v-if="show_also_played" class="collab tbl">
    <table class="tbl">
      <caption class="tbl-cap">Other users also played</caption>
      <colgroup>
        <col span="1" style="width: 18%;">
        <col span="1" style="width: 7%;">
        <col span="1" style="width: 75%;">
      </colgroup>
      <thead>
        <tr>
          <th class="tbl-headings">Name</th>
          <th class="tbl-headings">Price</th>
          <th class="tbl-headings">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gameData, index) in also_played_recommmendations" :key="index">
          <td class="tbl-data name-col"><a :href='`${gameData.Steam}`'>{{ gameData.Name}}</a></td>
          <td class="tbl-data"> ${{ gameData.Price}} </td>
          <td class="tbl-data"> {{ gameData.Description}} </td>
        </tr>
      </tbody>
      
    </table>
</div>

<div v-if="show_similar" class="content tbl">
    <table class="tbl">
      <caption class="tbl-cap">Similar Games</caption>
      <colgroup>
        <col span="1" style="width: 18%;">
        <col span="1" style="width: 7%;">
        <col span="1" style="width: 75%;">
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
          <td class="tbl-data name-col"><a :href='`${gameData.Steam}`'>{{ gameData.Name}}</a></td>
          <td class="tbl-data"> {{ gameData.Price}} </td>
          <td class="tbl-data"> {{ gameData.Description}} </td>
        </tr>
      </tbody>
    </table>
</div>

<style>
.tbl-headings {
    color: #C10206;
    text-align: left;
}

.tbl-data {
    color:#DFE2DB;
    height: 80px;
}

.tbl-headings,.tbl-data {
    border-bottom: 1px solid #C10206;
}

th{
    height: 40px;
    font-size: large;
}

tr:hover :not(th) {
    background-color: #A50113;
    color:#FFFBF2;
}

.tbl {
    width: 100%;
    border-collapse: collapse;
    table-layout:fixed;
    margin-top: 50px;
    margin-bottom: 50px;
}

.result-title {
    color:#DFE2DB;
    width: 100%;
}

td,th {
    padding: 0 7px;
}


</style>