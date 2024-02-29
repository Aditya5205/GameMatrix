<template>
  <header class="h-16 bg-black-dark p-3 text-red-light shadow-lg">
    <nav>
      <ul class="flex items-center gap-x-5">
        <!-- This is where logo goes -->
        <li class="mr-3 text-center hover:text-white-light">
          <RouterLink class="p-1" to="/">GAME <br />MATRIX</RouterLink>
        </li>
        <li class="hover:text-white-light">
          <RouterLink class="p-1" to="/your-games"> Your Games </RouterLink>
        </li>
        <li class="hover:text-white-light">
          <RouterLink class="p-1" to="/top-games">Top Games</RouterLink>
        </li>
        <li class="hover:text-white-light">
          <RouterLink class="p-1" to="/about">About</RouterLink>
        </li>

        <!-- <div class="ml-auto px-4">
          <button class="login but">Log In</button>
          <button class="signup but">Sign Up</button>
        </div> -->
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<script setup></script>
