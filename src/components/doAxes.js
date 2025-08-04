
//const dateFormat = require('dateformat');

const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
const ftime = new Intl.DateTimeFormat("sv-SE", { timeStyle: "short", timeZone: "MET" });

export function DoAxes() {
	const  ticksX=[], ticksY=[], ds=[], pointY=[], pointYX=[]
	, shape=[];
	let zeroLine=0;
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
	
	const formulaY = (data, off,tky, wbx,minMove,fmt) => {
		pointYX.length=0;
		ticksX.length=0;
		ticksY.length=0;
		pointY.length=0;
		ds.length=0;
		
		this.movMin =minMove
		let proxy = [...data];
		while (proxy.length > 0) ds.push(proxy.pop());
		
		ds.reverse();
		let mini = Math.min(...ds.map(a=>a.price));
		let maxi = Math.max.apply(null,ds.map(a=>a.price));
		let pPct =(off.y.y1-off.y.y2)/100;

		let scale = yScale(maxi,mini,tky, off )
		let hl = scale.high - scale.low
		while (scale.y.length > 0) ticksY.push(scale.y.pop());
		
		
		let w = off.x.x2 - off.x.x1
		let stepx = w/(ds.length-1);
		let xtm  = off.x.x1
		let wbox = (wbx*1.5) 
		let skip =( (ds.length-1)*wbox)/((ds.length-1)*stepx), n=1

		let out=[]
		shape.forEach((a,i)=>{
			let pct = ((a.price-scale.low)*100)/hl;
			a.y = (off.y.y1)-pPct*pct;
			let j = ds.map(a=>a.tm).indexOf(a.tm);
			a.x = (j*stepx)+xtm;
			if ( j>=0 ){ 
				out.push(a);
				a.visiable=1;
			} else a.visiable=-1;
			
		})
		
		const o=fmt.resolvedOptions();
		const mmm =new Intl.DateTimeFormat(o.locale,{ month: "short",  timeZone: o.locale.timeZone});
		const yyyy =new Intl.DateTimeFormat(o.locale,{ year: "numeric",  timeZone: o.locale.timeZone});

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
				if (fmt){
					rowx.tm = fmt.format(new Date(tms)) // this for x labels
					rowx.d = new Date(tms).getDate()
					rowx.mm = mmm.format(new Date(tms))
					rowx.yy = yyyy.format(new Date(tms))
				} else rowx.tm = tms
				ticksX.push(rowx);
			} else if (i > 0 && n >=Math.round(skip) ){
				let rowx = {id:i,dtm:tms, x:row.x};
				if (fmt){
					rowx.tm =  fmt.format(new Date(tms)) // this for x labels
					rowx.d = new Date(tms).getDate()
					rowx.mm =  mmm.format(new Date(tms))
					rowx.yy =  yyyy.format(new Date(tms))
				} else rowx.tm = tms
				ticksX.push(rowx);			
				n=1
			}
			n++
			
		})
		
	}
	const formatTicksX=(ticksX,f)=>{
		let prevDtm=ticksX[0]?.dtm;
		const usedOptions=f.resolvedOptions();
		ticksX.forEach((a)=>{
			if (usedOptions.timeStyle && !usedOptions.dateStyle){
				if ( new Date(a.dtm).getFullYear() !== new Date(prevDtm).getFullYear() ) {
					a.tm = a.yy
				}
				else if (new Date(a.dtm).getMonth() !== new Date(prevDtm).getMonth()){
					a.tm=a.mm
				}
				else if (new Date(a.dtm).getDate() !== new Date(prevDtm).getDate()){
					a.tm = new Date(a.dtm).getDate()
				}
			}	else if (usedOptions.day && !usedOptions.dateStyle && !usedOptions.timeStyle && !usedOptions.year
				&& !usedOptions.month) {
				if ( new Date(a.dtm).getFullYear() !== new Date(prevDtm).getFullYear() ) {
					a.tm = a.yy
				}
				else if (new Date(a.dtm).getMonth() !== new Date(prevDtm).getMonth()){
					a.tm=a.mm
				}
			}
			prevDtm=a.dtm
			
		})
	}

	const isValidDate = (value) => {
		let dateWrapper = new Date(value);
		return !isNaN(dateWrapper.getDate());
	}


	
	this.formulaY = (data, off, tky, wbx,minMove,fmt) => formulaY(data, off, tky, wbx,minMove,fmt);
	this.minMove = (data) => minMove(data);
	this.formatTicksX=(ticksX,f) => formatTicksX(ticksX,f);
	this.ticksY=() =>(ticksY);
	this.pointY=() =>(pointY);
	this.ticksX=() =>(ticksX);
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
			Array.prototype.push.apply(shape,arr);
			
		},
	});
	
}

