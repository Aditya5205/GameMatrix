<template>
  <header
    class="h-16 bg-black-dark p-2 text-red-light shadow-lg sm:h-20 sm:p-0"
  >
    <nav
      class="mx-2 flex h-full items-center justify-around sm:mx-5 sm:justify-normal"
    >
      <ul
        class="flex w-full items-center justify-around gap-x-12 text-xl sm:justify-normal sm:text-2xl"
      >
        <!-- This is where logo goes -->
        <li class="text-center hover:text-white-light sm:mr-3">
          <RouterLink class="sm:p-1" to="/">GAME <br />MATRIX</RouterLink>
        </li>
        <li class="text-wrap text-center hover:text-white-light">
          <RouterLink class="sm:p-1" to="/your-games"> Your Games </RouterLink>
        </li>
        <li class="text-wrap text-center hover:text-white-light">
          <RouterLink class="sm:p-1" to="/top-games">Top Games</RouterLink>
        </li>
        <li class="text-center hover:text-white-light">
          <RouterLink class="sm:p-1" to="/about">About</RouterLink>
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
