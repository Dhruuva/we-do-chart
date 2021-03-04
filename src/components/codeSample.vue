<template>
<vue-code-highlight language="js">
<pre>
	[ 
		{  name:"text", data:
			[
				{tm: '2020-08-14', price: 48.61},
				{tm: '2020-08-15', price: 60.61},
				{tm: '2020-08-15', price: 60.61}
			]
		},
		...
	]	
</pre>
</vue-code-highlight>

</template>

<script>
/* eslint-disable */
import { component as VueCodeHighlight } from 'vue-code-highlight';

export default {
	name: 'codeSample',
	components:{
		VueCodeHighlight,
	
	},
	mounted() {
		
	},
	data () {
		return {
			txt: ""
		}
	}
}
</script>

