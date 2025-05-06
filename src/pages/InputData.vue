<script setup>
import { ref,computed} from 'vue'
import WeDoChart from '../components/WeDoChart.vue'
import Navi from '../web/Header.vue'
import hData from '../web/hLightData.vue'
const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
</script>

<template lang="pug">
header
	Navi(id="mynav" active="2")
body
	main
		article
			hData
</template>

<style scoped>
article {
	display: inline-flex;
	text-align: left;
}
</style>