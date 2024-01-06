<template>
  <div class ="loader-parent">
  <span class="loader"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loader-parent {
  text-align: center;
}

.loader {
    width: 70px;
    height: 70px;
    display: inline-block;
    position: absolute;
    top: 45%;
  }
  .loader::after,
  .loader::before {
    content: '';  
    box-sizing: border-box;
    width: 70px;
    height: 70px;
    border: 3px solid #FFFBF2;
    position: absolute;
    left: 0;
    top: 0;
    animation: rotation 2s ease-in-out infinite alternate;
  }
  .loader::after {
    border-color: #C10206;
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



