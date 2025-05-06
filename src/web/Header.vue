<template lang="pug">
header#mynav
	div.logo
		img(src="../assets/vue.svg")
	ul
		li(v-for="n in stuff" :key="n.id" :class="{ active: n.isActive }")
			Icon(:icon="n.ico"  height="28")
			a(:href="n.page") {{n.name}}
			
</template>


<script setup>
	import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
	import { Icon } from '@iconify/vue';
	const p = defineProps({
		active: { type: String, default: "1" },
	})
	,stuff=reactive(new Array(
		{id:1,page:"index.html",isActive:true, name:"Home", ico:"ic:baseline-account-balance"},
		{id:2,page:"inputData.html", name:"Data source", ico:"ic:baseline-contact-support"},
		{id:3,page:"market.html", name:"Market", ico:"ic:sharp-barcode"},
		{id:4,page:"sakura.html", name:"Sakura", ico:"ic:round-compost"},
	));

	onMounted( async () => {
		setActivePage(p.active)
	})

	const	setActivePage=(n)=>{
		stuff.forEach(a=>{
			if (a.id==n)	{a.isActive=true} 
			else {a.isActive=false};
		})
	}	

	


</script>
<style scoped>
@import '.././assets/header.css';
@keyframes rotate {
  0%   {transform: rotate(-1deg);}
  25%  {transform: rotate(-2deg);}
  50%  {transform: rotate(-1deg);}
  100% {transform: rotate(0deg);}
}	

</style>