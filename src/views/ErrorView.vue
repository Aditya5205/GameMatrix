<template>
    <div class="error">
        <div class="err-heading">
            <h1><span>Hey!</span></h1>
            <h3>Seems like you have hit an error</h3><br>
        </div>
        <div class="err-body">
        <h4>Either you entered the wrong game name <br>or the game you have entered is not in our database.</h4><br>
        <h4>Try entering an appropriate game name for recommendations</h4>
        </div>
        <button @click="toHomeView()" class="err but">&lt; Return To Home Page</button>
    </div>

</template>

<script>
export default {
    methods: {
        toHomeView(){
            this.$router.push('/')
        }
    }
}
</script>
