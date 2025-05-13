export function Slide(axis,pos,height,thumbs,wline,cross,fs) {
	const farPoints =new Array(); // dev
	this.axis=axis;
	this.pos=pos;
	this.h=height;
	this.thumbs=thumbs.value;
	this.wline=wline.value;
	this.cross=cross.value;
	this.fs=fs;
	let scl=0.41;	
	let leftDrug=false,draggingLeft=false,rightDrug=false,draggingRight=false,draggingCenter=false,moveDrug=false;
	const init=(gds,svg,pointYX,limitSize)=> {
		this.gds=gds;
		this.svg=svg.value;
		this.pointYX=pointYX;
		this.limitSize=limitSize?.value;
		console.log("pointYX---$$$$$$$$$$$$$$$",pointYX, "limitSize init ",limitSize)
		this.pos.value.x =  this.axis.x.x1 
		let hf =  (this.h-(this.axis.y.y1 + this.fs*1.18))/2 + (scl*40)/2
		let y = this.h-hf
		//console.log("hf ",hf, "this.h ",this.h)

		this.thumbs.left.x = this.axis.x.x1 - scl*31
		this.thumbs.left.y = y
		this.wline.left.x1 = this.axis.x.x1
		this.wline.left.x2 = this.axis.x.x1
		this.wline.left.y1 =  y + scl*40/2
		this.wline.left.y2 =  y +scl*40/2
		this.wline.left.sSize = scl*40*0.6
		this.wline.left.active = false

		this.wline.middle.x = this.axis.x.x1
		this.wline.middle.y = y+scl*8
		this.wline.middle.w = this.axis.x.x2 - this.axis.x.x1
		this.wline.middle.h = scl*(40-16)

		this.thumbs.right.x = this.axis.x.x2 
		this.thumbs.right.y = y
		this.wline.right.x1 = this.axis.x.x2
		this.wline.right.x2 = this.axis.x.x2
		this.wline.right.y1 = y + scl*40/2
		this.wline.right.y2 = y + scl*40/2
		this.wline.right.sSize = scl*40*0.6
		return 'ok'
	}

	

	const zoomSlider=(x)=>{
		let wd = scl*31,lmt =this.thumbs.step*this.limitSize,zms=10
		let xLeft,offset = (this.thumbs.left.off)? this.thumbs.left.off:wd
		if (x>0) {
			xLeft = this.thumbs.left.x + zms
			if ( (this.thumbs.right.x -xLeft - offset)>lmt  ) {
				this.thumbs.left.x = xLeft 
				this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
				this.wline.middle.x = this.thumbs.left.x + wd
				this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
				console.log(" zoom1 -->",this.thumbs.left.x,this.thumbs.right.x)
				this.gds(this.thumbs.left.x, this.thumbs.right.x)
			} 

		} else {
			xLeft = this.thumbs.left.x - zms
			if ( xLeft+wd > this.axis.x.x1   ) {
				this.thumbs.left.x = xLeft   //offset
				this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
				this.wline.middle.x = this.thumbs.left.x + wd
				this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
				console.log(" zoom2 -->",this.thumbs.left.x,this.thumbs.right.x)
				this.gds(this.thumbs.left.x, this.thumbs.right.x)
			} else {
				this.thumbs.left.x = this.axis.x.x1 -wd
				this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
				this.wline.middle.x = this.thumbs.left.x + wd
				this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
				console.log(" zoom3 -->",this.thumbs.left.x,this.thumbs.right.x)
				this.gds(this.thumbs.left.x, this.thumbs.right.x)

			}
		}
	}
	const thumbY=()=> {
		let wd =scl*31,lmt =this.thumbs.step*this.limitSize
		if (draggingCenter && !rightDrug && !leftDrug && moveDrug ){
			moveChartLeft(wd);

		} else if ((leftDrug && draggingLeft) || this.wline.left.active){
			let offset = (this.thumbs.left.off)? this.thumbs.left.off:wd
			console.log("thumbY offset---->",offset, " lmt=",lmt,  "thumbs.step>>>>>>",thumbs.step)
			console.log("left cond=",this.pos.value.x - offset+wd>axis.x.x1," a.x1 ",axis.x.x1)
			console.log(" right cond ",this.thumbs.right.x -this.pos.value.x - offset>lmt)

			if ( (this.pos.value.x - offset+wd) > this.axis.x.x1  && (this.thumbs.right.x -this.pos.value.x - offset)>lmt  ) {
				this.thumbs.left.x = this.pos.value.x - offset
				this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
				this.wline.middle.x = this.thumbs.left.x + wd
				this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
				this.gds(this.thumbs.left.x, this.thumbs.right.x)
				console.log("drug left---->",this.thumbs.left.x, this.pos.value.x, offset)
			} 
		}
		this.wline.left.active = false
	}
	const thumbYY=()=> {
		let wd = this.scl*31,lmt =this.thumbs.step*this.limitSize
		let offset = (this.thumbs.right.off)? this.thumbs.right.off:0
		if (draggingCenter && !rightDrug && !leftDrug && moveDrug ){
			moveChartRight(wd)
		} else if (rightDrug && draggingRight || this.wline.right.active){
			console.log("thumbYY offset---->",offset, " lmt=",lmt,  "thumbs.step>>>>>>",thumbs.step);
			if( this.pos.value.x  < this.axis.x.x2+wd && (this.pos.value.x - offset -this.thumbs.left.x)>lmt ) {
				this.thumbs.right.x = this.pos.value.x - offset
				this.wline.right.x1 = (this.pos.value.x > this.axis.x.x2 - wd ) ?  this.wline.right.x2:this.thumbs.right.x+wd
				this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
				this.gds(this.thumbs.left.x, this.thumbs.right.x)

			}
			
		}
		this.wline.right.active = false 
	}
	const moveChartLeft=(wd)=>{
		let xp = this.pos.value.x-this.thumbs.left.mp, rx = this.thumbs.right.mp+this.pos.value.x
		if(  rx <= this.axis.x.x2) this.gds(xp, this.thumbs.right.x) 
		if( xp >= this.axis.x.x1-wd &&  rx <= this.axis.x.x2){
			this.thumbs.left.x = xp
			this.wline.left.x2 = ( xp < this.axis.x.x1)? this.axis.x.x1:xp
			this.wline.middle.x = this.thumbs.left.x + wd
		} else if ( xp< this.axis.x.x1-wd &&  rx <= this.axis.x.x2){
			
			xp=this.axis.x.x1-wd
			this.thumbs.left.x = xp
			this.wline.left.x2 = ( xp < this.axis.x.x1)? this.axis.x.x1:xp
			this.wline.middle.x = this.thumbs.left.x + wd
		}
	}
	const moveChartRight=(wd)=>{
		let xp = this.thumbs.right.mp+this.pos.value.x ,lx = this.pos.value.x-this.thumbs.left.mp
		if (lx >= this.axis.x.x1-wd) this.gds(this.thumbs.left.x, xp)
		if (xp <= this.axis.x.x2 && lx >= this.axis.x.x1-wd) { 
			this.thumbs.right.x = xp
			this.wline.right.x1 = (xp+wd > this.axis.x.x2)? this.axis.x.x2: xp+wd
			this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
			this.move = "move"
		} else if (xp > this.axis.x.x2 && lx >= this.axis.x.x1-wd) {
			xp=this.axis.x.x2
			this.thumbs.right.x = xp
			this.wline.right.x1 = (xp+wd > this.axis.x.x2)? this.axis.x.x2: xp+wd
			this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
		} 
		else if ( lx < this.axis.x.x1-wd) {
			xp=this.wline.middle.w+this.thumbs.left.x
			this.thumbs.right.x = xp
			this.wline.right.x1 = (xp+wd > this.axis.x.x2)? this.axis.x.x2: xp+wd
			this.move = "dont't move";
		}
	}
	const moveSlider=(x1,x2)=>{
	  let wd = this.scl*31
	  this.thumbs.left.x = x1-wd
	  this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
	  this.wline.middle.x = this.thumbs.left.x + wd
	  this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
	  this.thumbs.right.x = x2
	  this.wline.right.x1 = (x2 > this.axis.x.x2 - wd ) ?  this.wline.right.x2:this.thumbs.right.x+wd
	  this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
	}

	const stopDrag=()=> {
		draggingLeft = false;
		draggingRight = false;
		leftDrug = false;
		rightDrug = false
		moveDrug = false;
		draggingCenter=false;
		console.log("stopDrag **********************",)
		if (this.pos.value.x<this.axis.x.x2 && this.pos.value.x>this.axis.x.x1 && this.pos.value.y>this.axis.y.y2 && this.pos.value.y<this.axis.y.y1 ) {
			console.log("stopDrag **********************",)
			this.cross.cursor='cursor: default;'
			
		}
		
	}
	const startDrag=(evt)=> {
		evt.preventDefault();
		if (this.pos.value.x<this.axis.x.x2 && this.pos.value.x>this.axis.x.x1 && this.pos.value.y>this.axis.y.y2 && this.pos.value.y<this.axis.y.y1 ) {
				this.cross.cursor='cursor: grabbing;'
				draggingCenter=true;
		}
		if (leftDrug) {
				draggingCenter=false
				rightDrug = false
				draggingLeft = true
				let pt = this.svg.createSVGPoint();
				pt.x = evt.clientX;
				pt.y = evt.clientY;
				let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse())
				this.thumbs.left.off =   Math.floor(cursorPt.x) - this.thumbs.left.x 
		}
		if (rightDrug) {
				draggingCenter=false;
				leftDrug = false;
				draggingRight = true;
				let pt = this.svg.createSVGPoint();
				pt.x = evt.clientX;
				pt.y = evt.clientY;
				let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse())
				this.thumbs.right.off =   Math.floor(cursorPt.x) - this.thumbs.right.x 

		} 
		if (draggingCenter ) {
			moveDrug = true;
			draggingRight = true;
			draggingLeft = true;
			let pt = this.svg.createSVGPoint();
				pt.x = evt.clientX;
				pt.y = evt.clientY;
			let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse())
				this.thumbs.right.mp = this.thumbs.right.x- Math.floor(cursorPt.x)
				this.thumbs.left.mp =  Math.floor(cursorPt.x) -this.thumbs.left.x
			
		} 

	}
	// not use here
	const crossMove=()=>{
		//console.log("crossMove----",this.pointYX);
		if (this.pos.value.x<this.axis.x.x2 && this.pos.value.x>this.axis.x.x1 && this.pos.value.y>this.axis.y.y2 && this.pos.value.y<this.axis.y.y1 
		) {
			if ( this.cross.cursor!=='cursor: move;'){
			  this.cross.hide=false;
			  this.cross.cursor='cursor: crosshair;'
			  let arr = (this.pointYX.length >0)? this.pointYX:(this.points.length>0)?this.points[0].data:[]
			  let far = arr.map(a=> ({...a, f: Math.abs(a.x-this.pos.value.x) }) ).sort((a, b) =>Number(a.f-b.f))
			  this.farPoints.splice(0,this.farPoints.length)
			  this.farPoints = far
			  let p = (far.length>0) ? far[0] : null
			  if (p ){
			    this.cross.v.x1=p.x
			    this.cross.v.x2=p.x
			    this.cross.v.y1=this.axis.y.y1
			    this.cross.v.y2=this.axis.y.y2
			    this.cross.txt = p.price + " " + p.dtm;
			    this.cross.h.x1=this.axis.x.x1
			    this.cross.h.x2=this.axis.x.x2
			    this.cross.h.y1=p.y
			    this.cross.h.y2=p.y
			  } else {
			    this.cross.txt = "_" ;
			  }
			} 
		} else {
		this.cross.cursor='cursor: default;'
		this.cross.hide=true;

		}

	}
	const stopThumb=()=> {
		if ( this.leftDrug  )  this.leftDrug = false;
		if ( this.rightDrug  )  this.rightDrug = false;
	}


	this.init = (gds,svg,pointYX,limitSize) => init(gds,svg,pointYX,limitSize);
	this.zoomSlider = (x) => zoomSlider(x);
	this.thumbYY = () => thumbYY();
	this.thumbY = () => thumbY();
	this.moveSlider=(x1,x2)=> moveSlider(x1,x2);
	this.startDrag=(evt)=> startDrag(evt);
	this.stopDrag=()=> stopDrag();
	this.crossMove=()=> crossMove();
	this.stopThumb=()=> stopThumb();

	Object.defineProperty(this, 'leftDrug', {
		get : function() {
			return leftDrug;
		},
		set(val) {
			//console.log("set0 leftDrug" , val)
			leftDrug=val;
			//console.log("leftDrug=",leftDrug)
		},
	});
	Object.defineProperty(this,'rightDrug',{	get : function() {return rightDrug;}, set(val) {	rightDrug=val;} });
	Object.defineProperty(this, 'draggingLeft', {
		get : function() {
			return draggingLeft;
		},
		set(val) {draggingLeft=val;},
	});
	Object.defineProperty(this, 'draggingRight', {
		get : function() {
			return draggingRight;
		},
		set(val) {draggingRight=val;},
	});
	Object.defineProperty(this, 'draggingCenter', {
		get : function() {
			return draggingCenter;
		},
		set(val) {draggingCenter=val;},
	});
	Object.defineProperty(this, 'moveDrug', {
		get : function() {
			return moveDrug;
		},
		set(val) {moveDrug=val;},
	});
	Object.defineProperty(this, 'scl', {
		get : function() {
			return scl;
		},
		set(val) {scl=val;},
	});
}