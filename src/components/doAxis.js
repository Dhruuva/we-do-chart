"use strict"
/* eslint-disable */

const dateFormat = require('dateformat');

function DoAxes() {
	const  ticksX=[], ticksY=[], ds=[], pointY=[], pointX=[], pointYX=[]
	let zeroLine=0
	let movMin=0
	const dlm =(hl)=> {
		if (hl<0.10 && hl>=0.01 ){
			return 0.10
		}	
		else if (hl>=0.1 && hl<0.2){
            return 0.15
		}
		else {
			return 0.01
		}
	}

	const yScale =(hi,lo,tky,a) =>{
		let md = Math.abs(hi+lo)/2
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
		let doClear = clear()
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
		let xtm  = off.x.x1,  nxLbl= xtm
		let wbox = (wbx*1.5) 
		let skip =( (ds.length-1)*wbox)/((ds.length-1)*stepx), n=1
		
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
				
				nxLbl+=wbox
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
				
				nxLbl+=wbox
				n=1
			}
			n++
			
		})
		
	}

    const clear = () => {
    	while (ds.length > 0) ds.pop();
    	while (ticksX.length > 0) ticksX.pop();
    	while (ticksY.length > 0) ticksY.pop();
    	while (pointY.length > 0) pointY.pop();
    	while (pointX.length > 0) pointX.pop();
    	while (pointX.length > 0) pointX.pop();
    	while (pointYX.length > 0) pointYX.pop();
    	this.zeroLine=null;
    	return 'ok'
    }
	let oddTickSize = (points, mayBeSize) => {
	    let rtn = points / 24;
	    for (var i = mayBeSize; i <= 24; i++) {
	      let remaider = points % i;
	      if (remaider == 0) {
	        rtn = points / i;
	        break;
	      }
	      
	    }
	    
	    return rtn;
	};
  
	const isValidDate = (value) => {
	    let dateWrapper = new Date(value);
	    return !isNaN(dateWrapper.getDate());
	}
	


	this.formulaY = (data, off, tky, wbx,minMove,format) => formulaY(data, off, tky, wbx,minMove,format);
	this.minMove = (data) => minMove(data);
	this.fillAxisY = (data, height, ofy, wbx) => fillAxisY(data, height, ofy, wbx);
	this.fillAxisX = (off) => fillAxisX(off);
	this.ticksY=() =>(ticksY);
	this.pointY=() =>(pointY);
	this.ticksX=() =>(ticksX);
	this.pointX=() =>(pointX);
	this.pointYX=() =>(pointYX);
	this.zero=() =>(zeroLine);

	this.yScale = (hi,lo,tky,yy) => yScale(hi,lo,tky,yy);
	this.isValidDate=(value) => isValidDate(value);
	
}

module.exports = DoAxes;