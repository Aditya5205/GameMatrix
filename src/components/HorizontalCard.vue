<template>
  <div class="mx-6 mt-14 flex">
    <img
      class="aspect-[5/2] h-[160px] w-[330px] rounded-xl object-fill"
      :src="`${props.image}`"
      alt="game_image"
    />
    <div class="ml-5 text-red-light">
      <div class="flex">
        <div>
          <b>{{ props.name }}</b>
          <br />
          Price: <span class="text-white-light">{{ props.price }}</span>
        </div>
        <a
          class="ml-auto mr-20 flex items-center rounded-full"
          :href="`${props.steam}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="rounded-full bg-white-light hover:opacity-70 sm:w-9"
            src="../assets/img/8679449_steam_fill_icon.png"
            alt="steam_image"
          />
        </a>
      </div>
      Description:<br />
      <p class="text-white-light">{{ props.description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["image", "name", "price", "steam", "description"]);
</script>
