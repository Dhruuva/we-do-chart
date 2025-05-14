<script setup>
import { ref,computed,onMounted,watch} from 'vue'  
import hljs from 'highlight.js';
import 'highlight.js/styles/an-old-hope.min.css';
import hljsVuePlugin from "@highlightjs/vue-plugin";


const p = defineProps({
   limit:{ type:[Number],  default: () =>(10)  }
  ,scl:{type:[Number,String], default: () =>(0.45)  }   // For slider
  ,tky:{   type:[Number,String], default: () =>(7) }// Axis y ticks numbers
  ,decimals:{      type:[String],     default: () =>('0.01')  } //For price scale
  ,tsz: { type:Object,   default: () =>( {size:5, off:5}) }  // the label ticks options off should be greater off
  ,off:{type:[Number,String],    default: () =>(2)  } // Axis offset in percent of height
  ,showGrid:{ type:Boolean, default: true }
  ,fs : { type:[Number,String], default: ()=>(12)}
});
onMounted( async () => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
})

watch(p.limit, (v) => {
  console.log(`limit is ${v}`);
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
})

const update=()=>{
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
  return 'ok'
}

defineExpose({update});
</script>

<template>
 <pre><code class="language-js">
  < WeDoChart :ds="{width:800,height:500}" :points="data" tky="{{p.tky}}" limit="{{p.limit}}"
   scl="{{p.scl}}"  off="{{p.off}}" fs="{{p.fs}}" showGrid="{{p.showGrid}}" tsz="{{p.tsz}}" />     
</code></pre>
</template>

<style scoped>
 code {
  white-space:normal;

}

</style>