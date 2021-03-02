"use strict"
/* eslint-disable */
const myMath = require('mathjs');
const dateFormat = require('dateformat');
function DoAxes() {
	const  ticksX=[], ticksY=[], ds=[], pointY=[], pointX=[], pointYX=[]
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
	
		// console.log(nn,'#############decimal place', Math.ceil(mv * 1000000)/1000000 )
		//let d =  Math.round((hi-lo)/tky)
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
        let rtn ={ y: arr, high:Number(high).toFixed(nn), low:Number(low).toFixed(nn)}	
       // console.log(" low ", low," high ", high," hi ", hi , " lo " ,lo, " stp ", stp, " d ", d) ;
        return rtn
	}
	const minMove =(ds)=>{

		let mMov = +Infinity, arr = ds.map(a=>a.price),mxl= Math.max( ...arr.map(a=>(''+a).length) )
        for (let i = 0; i <= arr.length - 1; i++) {
        	let z = (i == 0) ?  arr[i]: Math.abs(arr[i]-arr[i-1])
           	mMov = ( mMov > z )? z:mMov
           //	mxl =( (''+mMov).length > mxl) ? (''+mMov).length:mxl
        }
        //this.movMin=Math.ceil(mMov * 100)/100;
        //this.movMin=Math.round(mMov);
        this.movMin=mMov;
        //console.log(mxl,'>>>>>>>>>this.movMin',this.movMin)
        return  { mMov:mMov, width: mxl };
	}
	
	const formulaY = (data, off,tky, wbx,minMove,format) => {
		this.movMin =minMove
		let proxy = [...data];
		//console.log ("--- off++++ ",off);
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
       	//ticksY.reverse()
       	//console.log(ticksY)
	    // For  AxisX  & xy calc .........................
		let w = off.x.x2 - off.x.x1
		let stepx = w/(ds.length-1);
		let xtm  = off.x.x1,  nxLbl= xtm
		let wbox = (wbx*1.5) 
		let skip =( (ds.length-1)*wbox)/((ds.length-1)*stepx), n=1
		//console.log("skip ", ds[0])
		//let prevDate=ds[0].tm
	    ds.forEach((a,i)=>{
	    	let pct = ((a.price-scale.low)*100)/hl;
			let row = {id:i,price:a.price, y:(off.y.y1)-pPct*pct};
			let tms= a.tm
			//let tms= (format)? dateFormat( a.tm,format):a.tm
            // if ( format &&  (new Date(a.tm).getDate() !== new Date(prevDate).getDate()) ) {
            // 	tms = new Date(a.tm).getDate()
            // }
            // prevDate=a.tm
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
				}
				//console.log(nxLbl, " 0 nxLbl  ", rowx , )
				nxLbl+=wbox
				ticksX.push(rowx);
			} else if (i > 0 && n >=Math.round(skip) ){
				let rowx = {id:i,dtm:tms, x:row.x};
				if (format){
					rowx.tm =  dateFormat( tms,format) // this for x labels
					rowx.d = new Date(tms).getDate()
					rowx.mm =  dateFormat(tms,'mmm')
					rowx.yy =  dateFormat( tms,'yyyy')
				}
				ticksX.push(rowx);
				//console.log(nxLbl, "nxLbl  ", rowx , " wbx ",wbx )
				nxLbl+=wbox
				n=1
			}
			n++
			//console.log("row pointYX ", row )
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
	      //console.log(mayBeSize, " ###oddTickSize ", rtn);
	    }
	    // console.log(mayBeSize, " ###oddTickSize ", rtn);
	    return rtn;
	};
	//dev
	const fillAxisY = (data, height, ofy) => {
		let proxy = [...data];
		console.log ("--- ", ofy,ticksY,proxy);
		while (ds.length > 0) ds.pop();
		while (proxy.length > 0) ds.push(proxy.pop());
		let mini = Math.min(...ds.map(a=>a.price));
		let maxi = Math.max.apply(null,ds.map(a=>a.price));
		let priceOffset =(( maxi-mini)/100)*5;
		mini-=priceOffset;
		maxi+=priceOffset;
		let y0 = ofy ,y1 = height-ofy;
		//let step = (y1-y0)/(maxi-mini);
		let step = (y1-y0)/((maxi-mini)*100);
		//let step1 = (maxi-mini)/(y1-y0);
		let step1 = 0.01;
	
		let n = ofy, id=1,p=maxi;
		while( n <= y1){
			let row ={id: id, price:p , y:n}
			ticksY.push(row);
			n += step
			p = Number(p-step1).toFixed(2)
			id++
			if (n>y1){
				let row ={id: id, price:p , y:n}
				ticksY.push(row);	
			}
		}

		// let f=ticksY.find(b=>b.price <= 20.37)
		// console.log(f);
		ds.forEach((a,i)=>{
			console.log(i,"a.price ",a.price);
			let f=ticksY.find(b=>b.price <= a.price)
			console.log ("f ",f);
			let row = {id:i,price:a.price, y:f.y};
			pointY.push(row);
			// let f=ticksY.find(b=>b.price <= a.price)[0]
			// pointY.push(ticksY.find(b=>b.price <= a.price)[0]);
		})

		return console.log ( mini, maxi, step);

	}
    // dev
	const fillAxisX = (off) => {
		let w = off.x.x2 - off.x.x1
		let step = w/(ds.length+2);
		let mini =  Math.min(...ds.map(a=>new Date(a.tm).getTime()))-(1*24*60*60*1000);
		let maxi = Math.max.apply(null,ds.map(a=> new Date(a.tm).getTime() ))+(1*24*60*60*1000);

		let n = off.x.x1, id = 1, d = new Date(mini).toISOString().slice(0,10);
		while( n <= off.x.x2){
			let row ={id: id, dtm:d , x:n}
			ticksX.push(row);
			n += step
			d =  new Date(new Date(d).getTime()+(1*24*60*60*1000)).toISOString().slice(0,10);
			id++
		}
		ds.forEach((a,i)=>{
			console.log(i,"a.tm ",a.tm);
			let f=ticksX.find(b=>b.dtm == a.tm)
			console.log ("f ",f);
			if (f) {
				let row = {id:i,dtm:a.tm, x:f.x};
				pointX.push(row);
			}
			
			// let f=ticksY.find(b=>b.price <= a.price)[0]
			// pointY.push(ticksY.find(b=>b.price <= a.price)[0]);
		})

		pointY.forEach(a=>{
			let f=pointX.find(b=>b.id == a.id);
            let row = a;
            row.dtm = f.dtm;
            row.x =f.x;
           // console.log(row);
            pointYX.push(row);
		})


		return console.log (" fillAxisX- ",new Date(mini).toISOString().slice(0,10), 
			new Date(maxi).toISOString().slice(0,10) );
	}
    // dev
	function agregate() {
		[1, 2, 3, 4].reduce((a, x) => a + x) // 10
		[1, 2, 3, 4].reduce((a, x) => a * x) // 24
		[1, 2, 3, 4].reduce((a, x) => Math.max(a, x)) // 4
		[1, 2, 3, 4].reduce((a, x) => Math.min(a, x)) // 1
	}
	const isValidDate = (value) => {
	    let dateWrapper = new Date(value);
	    return !isNaN(dateWrapper.getDate());
	}
	// const dateFormat = (tm,format) => {
	//     return  dateFormat( tm,format);
	// }



	this.formulaY = (data, off, tky, wbx,minMove,format) => formulaY(data, off, tky, wbx,minMove,format);
	this.minMove = (data) => minMove(data);
	this.fillAxisY = (data, height, ofy, wbx) => fillAxisY(data, height, ofy, wbx);
	this.fillAxisX = (off) => fillAxisX(off);
	this.ticksY=() =>(ticksY);
	this.pointY=() =>(pointY);
	this.ticksX=() =>(ticksX);
	this.pointX=() =>(pointX);
	this.pointYX=() =>(pointYX);
	this.yScale = (hi,lo,tky,yy) => yScale(hi,lo,tky,yy);
	this.isValidDate=(value) => isValidDate(value);
	//this.dateFormat =(tm,format) => dateFormat(tm,format);
}

module.exports = DoAxes;