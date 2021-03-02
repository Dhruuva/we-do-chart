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
			font-family: "Gill Sans", sans-serif;
			stroke-width: 2.1;
			fill: #f00;
			text-anchor: middle;
			font-weight: 600;
		}
		.axislabely {
			font-family: "Gill Sans", sans-serif;
			stroke-width: 1.1;
			fill: #f00;
			alignment-baseline: middle;
		}
		.chartSheet {
			stroke: #00f;
			stroke-width: 2.5;
			fill: #fffafa;
		}
		.titles {
			stroke-width: 1.1;
			font-family: "Gill Sans", sans-serif;
			fill: #000080;
			font-weight: 600;
		}
		.titlesDot {
			stroke-width: 1.1;
			font-family: "Gill Sans", sans-serif;
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
			stroke-width: 1.2;
		}
 </pre>
</vue-code-highlight>

</template>

<script>
/* eslint-disable */
import { component as VueCodeHighlight } from 'vue-code-highlight';
import "vue-code-highlight/themes/prism.css";
// import '/node_modules/vue-code-highlight/themes/prism.css' 	
//@import './node_modules/highlight.js/styles/tomorrow.css'	
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

<style  scoped>
 @import '/node_modules/vue-code-highlight/themes/prism.css' 
</style>