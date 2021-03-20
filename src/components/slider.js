export default {
	methods: {
		initSlider() {
			this.pos.x =  this.axis.x.x1 
			let hf =  (this.ds.height-(this.axis.y.y1 + this.fs*1.18))/2 + (this.scl*40)/2
			let y = this.ds.height-hf
	
			this.thumbs.left.x = this.axis.x.x1 - this.scl*31
			this.thumbs.left.y = y
			this.wline.left.x1 = this.axis.x.x1
			this.wline.left.x2 = this.axis.x.x1
			this.wline.left.y1 =  y + this.scl*40/2
			this.wline.left.y2 =  y +this.scl*40/2
			this.wline.left.sSize = this.scl*40*0.6
			this.wline.left.active = false

			this.wline.middle.x = this.axis.x.x1
			this.wline.middle.y = y+this.scl*8
			this.wline.middle.w = this.axis.x.x2 - this.axis.x.x1
			this.wline.middle.h = this.scl*(40-16)

			this.thumbs.right.x = this.axis.x.x2 
			this.thumbs.right.y = y
			this.wline.right.x1 = this.axis.x.x2
			this.wline.right.x2 = this.axis.x.x2
			this.wline.right.y1 = y + this.scl*40/2
			this.wline.right.y2 = y + this.scl*40/2
			this.wline.right.sSize = this.scl*40*0.6
			return 'ok'
		},
		thumbY() {
			let wd = this.scl*31,lmt =this.thumbs.step*this.limitSize
			if (this.draggingCenter && !this.rightDrug && !this.leftDrug && this.moveDrug ){
				this.moveChartLeft(wd);
				
			} else if ((this.leftDrug && this.draggingLeft) || this.wline.left.active){
				let offset = (this.thumbs.left.off)? this.thumbs.left.off:wd
				
				if ( (this.pos.x - offset+wd) > this.axis.x.x1  && (this.thumbs.right.x -this.pos.x - offset)>lmt  ) {
					this.thumbs.left.x = this.pos.x - offset
					this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
					this.wline.middle.x = this.thumbs.left.x + wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
					this.getDisplayData(this.thumbs.left.x, this.thumbs.right.x)
				} 
			}
			this.wline.left.active = false
			
		},
		thumbYY() {
			let wd = this.scl*31,lmt =this.thumbs.step*this.limitSize
			let offset = (this.thumbs.right.off)? this.thumbs.right.off:0
			if (this.draggingCenter && !this.rightDrug && !this.leftDrug && this.moveDrug ){
				this.moveChartRight(wd)
			} else if (this.rightDrug && this.draggingRight || this.wline.right.active){
				if( this.pos.x  < this.axis.x.x2+wd && (this.pos.x - offset -this.thumbs.left.x)>lmt ) {
					this.thumbs.right.x = this.pos.x - offset
					this.wline.right.x1 = (this.pos.x > this.axis.x.x2 - wd ) ?  this.wline.right.x2:this.thumbs.right.x+wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
					this.getDisplayData(this.thumbs.left.x, this.thumbs.right.x)

				}
				
			}
			this.wline.right.active = false 
		},
		zoomSlider(x){
			let wd = this.scl*31,lmt =this.thumbs.step*this.limitSize,zms=10
			let xLeft,offset = (this.thumbs.left.off)? this.thumbs.left.off:wd
			if (x>0) {
				xLeft = this.thumbs.left.x + zms
				if ( (this.thumbs.right.x -xLeft - offset)>lmt  ) {
					this.thumbs.left.x = xLeft 
					this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
					this.wline.middle.x = this.thumbs.left.x + wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
					this.getDisplayData(this.thumbs.left.x, this.thumbs.right.x)
				} 

			} else {
				xLeft = this.thumbs.left.x - zms
				if ( xLeft+wd > this.axis.x.x1   ) {
					this.thumbs.left.x = xLeft   //offset
					this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
					this.wline.middle.x = this.thumbs.left.x + wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
					this.getDisplayData(this.thumbs.left.x, this.thumbs.right.x)
				} else {
					this.thumbs.left.x = this.axis.x.x1 -wd
					this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
					this.wline.middle.x = this.thumbs.left.x + wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
					this.getDisplayData(this.thumbs.left.x, this.thumbs.right.x)

				}
			}
		},
		moveChartLeft(wd){
			let xp = this.pos.x-this.thumbs.left.mp, rx = this.thumbs.right.mp+this.pos.x
				if(  rx <= this.axis.x.x2) this.getDisplayData(xp, this.thumbs.right.x) 
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
		},
		moveChartRight(wd){
			let xp = this.thumbs.right.mp+this.pos.x ,lx = this.pos.x-this.thumbs.left.mp
				if (lx >= this.axis.x.x1-wd) this.getDisplayData(this.thumbs.left.x, xp)
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
	}
}