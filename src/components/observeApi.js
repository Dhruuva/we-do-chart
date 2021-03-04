/* eslint-disable */		
export default {
	methods: {

		initObserver() {
			let  config = { attributes: true }, vm = this;
			// create the observer
			var x = document.getElementById("sheet").parentElement
			let elem = this.svg.parentElement
			this.ds.width=elem.clientWidth
			this.ds.height=elem.clientHeight
			const observer = new MutationObserver(function(mutations) {
				
				mutations.forEach(function(mutation) {					
					if (mutation.type === "attributes") {
						let width=elem.style.width, height=elem.style.height
						let elemBox=elem.getBoundingClientRect();
						width=elem.clientWidth
						height=elem.clientHeight
						vm.ds.height=(height)? height:vm.ds.height;
						vm.ds.width= (width)?  width:vm.ds.width;
						
						vm.loadChart()
					}
				}); 
			});
			observer.observe(elem, config);
			this.observer = observer;
		},

		
	}
}