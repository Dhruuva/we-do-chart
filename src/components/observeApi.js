/* eslint-disable */		
export default {
	methods: {

		initObserver() {
			let elem = document.getElementsByClassName(this.parentClass)[0], config = { attributes: true }, vm = this;
			// create the observer
			var x = document.getElementById("sheet").parentElement

			elem= this.svg.parentElement
			//console.log('parentElement ',x.class);
			this.ds.width=elem.clientWidth
			this.ds.height=elem.clientHeight
			//console.log('elem.getBoundingClientRect()','initObserver ', elem);
			const observer = new MutationObserver(function(mutations) {
				//console.log('initObserver22 ', elem);
				mutations.forEach(function(mutation) {
					// check if the mutation is attributes and update the width and height data if it is.
					console.log('initObserver22 ', elem);
					if (mutation.type === "attributes") {
						//console.log('The ' + mutation.attributeName + ' attribute was modified.', vm.d.width);
						let width=elem.style.width, height=elem.style.height
						let elemBox=elem.getBoundingClientRect();
						width=elem.clientWidth
						height=elem.clientHeight
					//	console.log(' elem.style.width= ' , width, ' elem.style.height= ' , height);
						//let {width,height} = elem.style;

						// console.log("vm.wh.w ", vm.wh.w , vm.wh.h, "width=",width ,"height= ",height, "elem.style ",elem.style.height
						// 	,"width =", elem.style.width);
						// vm.wh.w = (width)? width:vm.wh.w;  whBox() copmputed
						// vm.wh.h = (height)? height:vm.wh.h;
						//console.log("###vm.wh",vm.wh);	
						
						//vm.ds.height=(height)? height.replace('px',''):vm.ds.height;
						//vm.ds.width= (width)?  width.replace('px',''):vm.ds.width;

						vm.ds.height=(height)? height:vm.ds.height;
						vm.ds.width= (width)?  width:vm.ds.width;
						
						//console.log("###vm.ds", width, height ,'elemBox',elemBox.width,elemBox.height);
						//console.log("### elem.offsetHeight ",elem.offsetWidth,elem.offsetHeight);
						vm.loadChart()
					}
				}); 
			});
			observer.observe(elem, config);
			this.observer = observer;
		},

		reSize(e) {
			console.log("this.observer",e);
		}
	}
}