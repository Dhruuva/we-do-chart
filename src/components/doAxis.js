"use strict"


const dateFormat = require('dateformat');

function DoAxes() {
	const  ticksX=[], ticksY=[], ds=[], pointY=[], pointX=[], pointYX=[]
	const shape=[]
	let zeroLine=0
	

	const yScale =(hi,lo,tky,a) =>{
		let mv =this.movMin
		let nn= (mv.toString().indexOf(".")>0)? mv.toString().length - mv.toString().indexOf(".")-1:0;
	
		let d = ((hi-lo)/tky < tky*mv) ? tky*mv: (hi-lo)/tky
		if (d >= 1) d =  Math.round((hi-lo)/tky)
		let  step = (a.y.y1-a.y.y2)/(tky), f=a.y.y2;
		let low = (Math.ceil(hi / d) * d),high=low, arr=[{id:tky,price:Number(high).toFixed(nn), y:f } ], t = high
			while(low >= lo) low-=d
		let stp =(high-low)/tky 
		
		for (let i = tky - 1; i >= 0; i--){
			let p=Number( t-=stp).toFixed(nn)
			f+=step
			arr.push( { id:i,price:p, y:f } );
		}
		let rate = (a.y.y1-a.y.y2)/(high-low)
		zeroLine =(hi > 0  & lo < 0)? f-rate*(Math.abs(low)):null;
		let rtn ={ y: arr, high:Number(high).toFixed(nn), low:Number(low).toFixed(nn)}	
   
		return rtn
	}
	const minMove =(ds)=>{

		let mMov = +Infinity, arr = ds.map(a=>a.price),mxl= Math.max( ...arr.map(a=>(''+a).length) )
		for (let i = 0; i <= arr.length - 1; i++) {
			let z = (i == 0) ?  arr[i]: Math.abs(arr[i]-arr[i-1])
			mMov = ( mMov > z )? z:mMov
		
		}
   
		this.movMin=mMov;

		return  { mMov:mMov, width: mxl };
	}
	
	const formulaY = (data, off,tky, wbx,minMove,format) => {
		this.movMin =minMove
		let proxy = [...data];
		while (proxy.length > 0) ds.push(proxy.pop());
		//ds = data.slice();  // shallow copy
		ds.reverse();
		let mini = Math.min(...ds.map(a=>a.price));
		let maxi = Math.max.apply(null,ds.map(a=>a.price));
		let pPct =(off.y.y1-off.y.y2)/100;

		let scale = yScale(maxi,mini,tky, off )
		let hl = scale.high - scale.low
		while (scale.y.length > 0) ticksY.push(scale.y.pop());
		
		// For  AxisX  & xy calc .........................
		let w = off.x.x2 - off.x.x1
		let stepx = w/(ds.length-1);
		let xtm  = off.x.x1
		let wbox = (wbx*1.5) 
		let skip =( (ds.length-1)*wbox)/((ds.length-1)*stepx), n=1

		let out=[]
		shape.forEach((a,i)=>{
			let pct = ((a.price-scale.low)*100)/hl
			a.y = (off.y.y1)-pPct*pct
			let j = ds.map(a=>a.tm).indexOf(a.tm)
			if ( j<0 ) out.push(i);
			a.x = (j*stepx)+xtm
			// console.log(" y = ", a.price,a.y, " j ", j, " x =",a.x)
		})
		out.forEach(a=> {shape.splice(a,1); console.log( "del=",shape.length)})
		

		ds.forEach((a,i)=>{
			let pct = ((a.price-scale.low)*100)/hl;
			let row = {id:i,price:a.price, y:(off.y.y1)-pPct*pct};
			let tms= a.tm
			
			pointY.push(row);
			row.dtm = tms;
			row.x = (i*stepx)+xtm
			pointYX.push(row);
			if (i==0){
				let rowx = {id:i,dtm:tms, x:off.x.x1};
				if (format){
					rowx.tm =  dateFormat( tms,format) // this for x labels
					rowx.d = new Date(tms).getDate()
					rowx.mm =  dateFormat(tms,'mmm')
					rowx.yy =  dateFormat( tms,'yyyy')
				} else rowx.tm = tms
				ticksX.push(rowx);
			} else if (i > 0 && n >=Math.round(skip) ){
				let rowx = {id:i,dtm:tms, x:row.x};
				if (format){
					rowx.tm =  dateFormat( tms,format) // this for x labels
					rowx.d = new Date(tms).getDate()
					rowx.mm =  dateFormat(tms,'mmm')
					rowx.yy =  dateFormat( tms,'yyyy')
				} else rowx.tm = tms
				ticksX.push(rowx);			
				n=1
			}
			n++
			
		})
		
	}


	const isValidDate = (value) => {
		let dateWrapper = new Date(value);
		return !isNaN(dateWrapper.getDate());
	}
	


	this.formulaY = (data, off, tky, wbx,minMove,format) => formulaY(data, off, tky, wbx,minMove,format);
	this.minMove = (data) => minMove(data);
	this.ticksY=() =>(ticksY);
	this.pointY=() =>(pointY);
	this.ticksX=() =>(ticksX);
	this.pointX=() =>(pointX);
	this.pointYX=() =>(pointYX);
	this.zero=() =>(zeroLine);

	this.yScale = (hi,lo,tky,yy) => yScale(hi,lo,tky,yy);
	this.isValidDate=(value) => isValidDate(value);

	Object.defineProperty(this, 'shapes', {
		get : function() {
			return shape;
		},
		set(arr) {
			shape.length=0;
			//console.log(" set shape")
			Array.prototype.push.apply(shape,arr);
			//console.log(" =",shape)
		},
	});
	
}

module.exports = DoAxes;