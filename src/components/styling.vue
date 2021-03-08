<template>
<vue-code-highlight language="css">
  <pre ref="textToCopy">
        .leftThumb {
          cursor: ew-resize;
          fill: #00f;
        }
        .rightThumb {
          cursor: ew-resize;
          fill: #00f;
        }
        .wline {
          cursor: pointer;
          stroke: #0074d9;
        }
        .mbody {
          cursor: grab;
          fill: #cfebfd;
        }
        .mbody:hover {
          cursor: move;
        }
        .axislabelx {
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #f00;
          text-anchor: middle;
          font-weight: 600;
        }
        .axislabely {
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #f00;
          alignment-baseline: auto;
          font-weight: 600;
        }
        .chartSheet {
          stroke: #00f;
          stroke-width: 2.5;
          fill: #fffafa;
        }
        .legend {
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #0074d9;
          font-weight: 600;
        }
        .titles {
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #0074d9;
          font-weight: 800;
          text-anchor: middle;
        }
        .titlesDot {
          stroke-width: 1.1;
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #0074d9;
          font-weight: 600;
        }
        .axisY {
          stroke: #0074d9;
          stroke-width: 2;
        }
        .axisX {
          stroke: #0074d9;
          stroke-width: 2;
        }
        .cross {
          stroke: #0074d9;
          stroke-width: 0.5;
        }
        .grids {
          stroke-width: 0.2;
          stroke: #0074d9;
          stroke-dasharray: 3;
        }
        .ticks {
          stroke-width: 1.18;
          stroke: #0074d9;
        }
        .plot {
          fill: none;
          stroke: #0074d9;
          stroke-width: 2;
        }
        .zero {
          stroke: #f00;
          stroke-width: 0.5;
        }
  
 </pre>
</vue-code-highlight>

</template>

<script>

import { component as VueCodeHighlight } from 'vue-code-highlight';
export default {
    name: 'styling',
    components:{
        VueCodeHighlight,
    
    },
    mounted() {
        let textToCopy = this.$refs.textToCopy
        this.txt = textToCopy.innerHTML
    },
    data () {
        return {
            txt: "Copy mme here   "
        }
    }
}
</script>

