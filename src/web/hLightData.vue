<script setup>
import { ref,computed,onMounted} from 'vue'  
import hljs from 'highlight.js';
import 'highlight.js/styles/an-old-hope.min.css';
import hljsVuePlugin from "@highlightjs/vue-plugin";
onMounted( async () => {

  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
})
</script>

<template>
<main>
  <article> 
    <h4>:points</h4>
    <p>Property value define data source for charting. This data source should be a nested array of the JSON object rows. Field  <code> <big> price:</big>   </code> should be a number otherwise error will rise. Field  <code> <big> tm:</big>   </code> has no strict types but for a timeseries chart should be fine if has ISO 8601 (YYYY-MM-DD) format.    </p>

 <pre><code class="language-js">
  const data=[                                        
    { name:"Chart1" , data:[             
        {tm: '2020-08-14', price: 48.61}, 
        {tm: '2020-08-15', price: 60.61}, 
        {tm: '2020-08-16', price: 60.91}
      ]},                                    
     { name:"Chart2" , data:[             
        {tm: '2020-08-14', price: 18.61}, 
        {tm: '2020-08-15', price: 20.61}, 
        {tm: '2020-08-16', price: 19.91}
      ]},                                      
  ]                                         
</code></pre>
<pre><code class="language-js"> < WeDoChart :points="data"/> </code></pre>
</article>  
</main>
</template>

<style scoped>
 code {
  white-space: pre;

}

</style>