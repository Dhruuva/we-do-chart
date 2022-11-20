<template lang="pug">
  div#app
    v-app
      v-bottom-navigation(v-model='bottomNav'  lihgt color="primary" background-color='grey lighten-4')
        v-chip.float-right.primary( class="ma-2" x-small) v1.0.6
        v-spacer
        v-layout  
          v-btn.mt-2(value='home' to="/")
            span Home
            v-icon mdi-home
          v-btn.mt-2(value='mainLook' to="/MainLook")
            span MainLook
            v-icon mdi-lightbulb
      router-view
</template>

<script>

/* eslint-disable */  
export default {
  name: 'App',
  components: {
    
  },

  data: () => (
    { value: 'recent' ,
      bottomNav: 'home',
  }),
};
</script>
<style lang='stylus'>

  body
    padding 0px
    background-color  #fff6e6
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
   
       
</style>
