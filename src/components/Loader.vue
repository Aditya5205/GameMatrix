<template>
  <div class="relative">
    <div class="flex justify-center">
      <span class="loader"></span>
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 70px;
  height: 70px;
  display: inline-block;
  position: relative;
  top: 25%;
}

@media (min-width: 640px) {
  .loader {
    width: 70px;
    height: 70px;
    display: inline-block;
    position: absolute;
    top: 60%;
  }
}

.loader::after,
.loader::before {
  content: "";
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  border: 3px solid #fffbf2;
  position: absolute;
  left: 0;
  top: 0;
  animation: rotation 2s ease-in-out infinite alternate;
}
.loader::after {
  border-color: #c10206;
  animation-direction: alternate-reverse;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
