<template lang="pug">
	v-card
		v-toolbar(color='cyan' dark='' flat='')
			v-app-bar-nav-icon
			v-toolbar-title Your Dashboard
			v-spacer
			v-btn(icon='')
				v-icon mdi-magnify
			v-btn(icon='')
				v-icon mdi-dots-vertical
			template(v-slot:extension)
				v-tabs(v-model='tab' align-with-title)
					v-tabs-slider(color='yellow')
					v-tab(v-for='item in items' :key='item') {{ item }}
		v-tabs-items(v-model='tab')
			v-tab-item(v-for='item in items' :key='item')
				v-card(flat='')
					v-card-text(v-text='text')
					v-list-item
						v-list-item-content
							v-list-item-title 
								| fields 
								code
									| tm, price
								|  is required.	
							v-list-item-subtitle 
					v-list-item
						v-list-item-content
							v-list-item-title 
								| fields 
								code
									| tm, price
								|  is required.		
</template>
<script>
	/* eslint-disable */
	export default {
		data () {
			return {
				tab: null,
				items: [
					'web', 'shopping', 'videos', 'images', 'news',
				],
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			}
		},
	}
</script>