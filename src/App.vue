<template lang="pug">
  div#app
    v-app#inspire
      v-bottom-navigation(v-model='bottomNav' color="purple lighten-3")
        v-btn(value='recent')
          span Recent
          v-icon mdi-history
        v-btn(value='home' to="/")
          span Home
          v-icon mdi-home
        v-btn(value='about' to="/about")
          span About
          v-icon mdi-lightbulb
        v-btn(value='mainLook' to="/MainLook")
          span MainLook
          v-icon mdi-lightbulb
      router-view
</template>

<script>
///import HelloWorld from './components/HelloWorld';
// import "vue-code-highlight/themes/prism.css";

 /*  duotone-sea.css  prism-dark.css     prism-solarizedlight.css  window.css
     prism-coy.css    prism-funky.css    prism-tomorrow.css
     prism.css        prism-okaidia.css  prism-twilight.css*/

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
    padding 1px
    background-color  #fff6e6
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
   
       
</style>