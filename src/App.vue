<template>
  <header>
    <nav class="navbar">
      <ul class="nav-list">
        <!-- This is where logo goes -->
        <div class='logo'><RouterLink to="/">GAME MATRIX</RouterLink></div>
        <li><RouterLink to="/ur-game-lib">Your Games</RouterLink></li>
        <li><RouterLink to="/top-games">Top Games</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>

        <div class="login-signup">
            <button class="login but">Log In</button>
            <button class="signup but">Sign Up</button>
        </div>
      </ul>
    </nav>
    </header>

  <RouterView />
</template>

<script setup>


</script>

<style>
@font-face { font-family: ethno; src: url('/src/assets/ethnocentric\ rg.otf'); } 
* {
    margin: 0;
    padding: 0;
    font-family: ethno;
}
</style>
