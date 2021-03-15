![npm](https://img.shields.io/npm/v/we-do-chart?color=green)
![npm](https://img.shields.io/npm/dw/we-do-chart)

#  we-do-chart
A we-do-chart Vue component. Compatible with Vue 2.x 
For more info about features, demonstration , customization options see the [project pages](dhruuva.github.io/we-do-chart/)

##  Project setup
In vue app  just do it.( if project has no vue.js just add it to the dependencies before next step  )
```
npm install we-do-chart --save
```
and in your page add it to the components in vue instance
``` javascript
import WeDoChart from "we-do-chart";
import "we-do-chart/we-do-chart.min.css";
<script>
export default {
	name: "Your vue page",
	components: {
		'we-do-chart':WeDoChart
	},
	data: () => ({
		chartdata: [  {name:'Chart Name',data:[...] }, ]
	})
   
};
</script>
```
Or use directly from a CDN
``` html
<script src="https://unpkg.com/vue"></script>
<link rel="stylesheet" href="https://unpkg.com/we-do-chart/we-do-chart.min.css">
<script src="https://unpkg.com/we-do-chart"></script>

<div id="your_page">
	<p>My Chart</p>
	<div style="margin: auto; width: 700px;height: 300px;">
		<we-do-chart :points="chartdata"></we-do-chart>
	</div>
</div>
<script>
	new Vue({
		el: '#your_page',
		components: {
		  	'we-do-chart':WeDoChart
		},
		data: () => ({
			chartdata: [  {name:'Chart Name',data:[...] }, ]
		}),
		
	})
</script>

```
# try it
Go [we-do-chart](https://codepen.io/dhruuva/pen/VwjNyjG) by Aleksey Bazhenov
  ([@dhruuva](https://codepen.io/dhruuva)) on [CodePen](https://codepen.io).