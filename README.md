![npm](https://img.shields.io/npm/v/we-do-chart?color=green)
![npm](https://img.shields.io/npm/dw/we-do-chart)
![npm bundle size](https://img.shields.io/bundlephobia/min/we-do-chart)
![MIT License](https://img.shields.io/github/license/dhruuva/we-do-chart.svg)
#  we-do-chart
A we-do-chart Vue component for plotting time series line chart, with crosshair, zooming and slider features. Compatible with Vue 2.x and at last with Vue 3.
Vue 2 is legacy now (according to Vue documentation). Vue 3 version have a lot of enhancements and new features, so it is pretty diffrent from Vue 2 version. And all new versions begging with 1.0.9 will not be supported Vue 2 projects. For using it in Vue 2 feel free and follow vue2 branch of this repo.
All below instructions is for Vue 3 projects only.

##  Fast start up 
In vue app  just do it.
```
npm install we-do-chart --save
```
and in your vue page locally used without component registration ( at my view it most easy  way in Vue 3)

``` html

<div id="your_page">
	<p>My Chart</p>
	<div style="margin: auto; padding: 1em;">
		<WeDoChart ref="chart" :ds="{width:600,height:400}" :points="rows" theme="berry"/>
	</div>
</div>
<script setup>
import {ref,reactive} from 'vue'
import WeDoChart from "we-do-chart"
const rows = reactive([                                        
	    { name:"Chart1" , data:[             
	        {tm: '2025-08-14', price: 48.61}, 
	        {tm: '2025-08-15', price: 60.61}, 
	        {tm: '2025-08-16', price: 60.91}
	    ]},
    ])                          
</script>
```
## Or use directly  In-browser , CDN
``` html
<title>Vue3 we-do-chart</title>
  <head>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/we-do-chart"></script>
    <link rel="stylesheet" href="https://unpkg.com/we-do-chart/we-do-chart.css">
  </head>
  <body>
   <div id="app">
  		<we-do-chart :ds="{width:300,height:200}" :points="rows" theme="monaco"></we-do-chart>
	</div>
  </body>	

 	<script type="text/javascript"> 
		const { createApp,computed } = Vue;
 	 	const ds =[  { name:"Chart1" , data:[             
	        {tm: '2025-08-14', price: 48.61}, 
	        {tm: '2025-08-15', price: 60.61}, 
	        {tm: '2025-08-16', price: 60.91}
	    ]},
    ];
   const vm = {
    	components: {
			'WeDoChart': window["WeDoChart"],
		},
    computed: {
		  rows(){
		      return ds;
		  }
		},
  }
  createApp(vm).mount('#app');
</script>

```
## Elaborate manual
For more info about features, demonstration , customization options please see it here  [project pages](https://dhruuva.github.io/we-do-chart/)

## view demo
Go [we-do-chart](https://codepen.io/dhruuva/pen/RNWgNLE) by Aleksey Bazhenov
  ([@dhruuva](https://codepen.io/dhruuva)) on [CodePen](https://codepen.io).

## Contributing
pull requests for Fix bugs, doc errors, new features,new style themes  ... welcome

## License
Copyright (c) 2025
Licensed under the [MIT license](https://github.com/Dhruuva/we-do-chart?tab=MIT-1-ov-file#readme).
