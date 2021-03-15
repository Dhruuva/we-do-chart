export default {
  methods: {
    getLocation(e) {
     
      let xx = 0;
      let yy = 0;
      if (e.touches) {
        xx = e.touches[0].pageX;
        yy = e.touches[0].pageY;
      } else {
        
        xx = e.pageX;
        yy = e.pageY;
      }
      return [xx, yy];
    },
    getMousePosition(evt) {
      let pt = this.svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse());
      return {x: Math.floor(cursorPt.x), y: Math.floor(cursorPt.y)}
    },
    startDrag(evt) {
      evt.preventDefault();
      if (this.leftDrug) {
          this.draggingCenter=false
          this.rightDrug = false
          this.draggingLeft = true
          let pt = this.svg.createSVGPoint();
          pt.x = evt.clientX;
          pt.y = evt.clientY;
          let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse())
          this.thumbs.left.off =   Math.floor(cursorPt.x) - this.thumbs.left.x 
      }
      if (this.rightDrug) {
          this.draggingCenter=false
          this.leftDrug = false
          this.draggingRight = true;
          let pt = this.svg.createSVGPoint();
          pt.x = evt.clientX;
          pt.y = evt.clientY;
          let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse())
          this.thumbs.right.off =   Math.floor(cursorPt.x) - this.thumbs.right.x 
       
          
      } 
      if (this.draggingCenter ) {
        this.moveDrug = true;
        this.draggingRight = true;
        this.draggingLeft = true;
        let pt = this.svg.createSVGPoint();
          pt.x = evt.clientX;
          pt.y = evt.clientY;
        let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse())
         this.thumbs.right.mp = this.thumbs.right.x- Math.floor(cursorPt.x)
         this.thumbs.left.mp =  Math.floor(cursorPt.x) -this.thumbs.left.x
        
      } 

    },
    wlineLeftClick(evt){
      evt.preventDefault();
      let pt = this.svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse())
      this.wline.left.active = true
      this.thumbs.left.off = 0
      this.thumbs.left.x = Math.floor(cursorPt.x)
      this.thumbY()
    },
    wlineRightClick(evt){
      evt.preventDefault();
      let pt = this.svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      let cursorPt = pt.matrixTransform(this.svg.getScreenCTM().inverse())
      this.wline.right.active = true
      this.thumbs.right.off = 0
      this.thumbs.right.x = Math.floor(cursorPt.x)
      this.thumbYY()
    },
    stopDrag() {
      this.draggingLeft = false;
      this.draggingRight = false;
      this.leftDrug = false;
      this.rightDrug = false
      this.moveDrug = false;
      
    },
    stopThumb() {
      if ( this.leftDrug && !this.draggingLeft )  this.leftDrug = false;
      if ( this.rightDrug && !this.draggingRight )  this.rightDrug = false;
      
      
    },

  }
};