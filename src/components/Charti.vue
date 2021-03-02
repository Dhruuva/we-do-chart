<template lang="pug">
	.svgResponsive
		svg(viewBox='0 0 500 100' xmlns="http://www.w3.org/2000/svg")
			polyline(fill='none' stroke='#0074d9' stroke-width='1' v-bind:points='pointsAsPolyline')
</template>
<script>
// @ is an alias to /src
/* eslint-disable */

export default {
	name: 'Charti',
	components: {
	 
	},
	data: () => (
	{
		x: '25' ,
		points: [
			{ date: '2020-08-17', price: 70.61 },
			{ date: '2020-08-19', price: 30.56 },
			{ date: '2020-08-20', price: 50.71 },
			{ date: '2020-08-21', price: 56.28 },
			{ date: '2020-08-22', price: 20.37 },
		]
		
	}),
	mounted() {
		this.points.forEach(a=> {
			this.getLen(a.price);
		})

	},
	computed: {
		pointsAsPolyline: function() {
			return this.points.map((p, i) => `${i * 70} ${p.price}`).join(' ');
		}
	},
	methods: {
		getLen(val){
       console.log( val, " val-", (''+val).length);
		}
	}
}
</script>
<style scoped>
	.svgResponsive {
	   fill: none;  width: 100%; height: auto; background-color: lightblue;
	}
</style>