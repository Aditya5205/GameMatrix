<template>
  <div class="mx-6 mt-14 flex flex-col sm:flex-row">
    <img
      class="rounded-xl object-fill sm:aspect-[5/2] sm:h-[160px] sm:w-[330px]"
      :src="`${props.image}`"
      alt="game_image"
    />
    <div
      class="mt-2 text-wrap text-sm text-red-light sm:ml-5 sm:mt-0 sm:text-base"
    >
      <div class="flex">
        <div class="w-4/5">
          <p class="font-semibold">{{ props.name }}</p>
          Price: <span class="text-white-light">{{ props.price }}</span>
        </div>
        <a
          class="ml-auto mr-5 flex items-center rounded-full sm:mr-20"
          :href="`${props.steam}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="w-9 rounded-full bg-white-light hover:opacity-70 sm:w-9"
            src="../assets/img/8679449_steam_fill_icon.png"
            alt="steam_image"
          />
        </a>
      </div>
      Description:<br />
      <p class="text-pretty text-xs text-white-light sm:text-base">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["image", "name", "price", "steam", "description"]);
</script>
