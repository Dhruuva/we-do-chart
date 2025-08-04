
export function mousemove(e,pos) {
	if ( e){
		e.preventDefault();
		
		pos.x=e.clientX;
		pos.y=e.clientY;
		 
		return {x:e.clientX,y: e.clientY}
	} else {
		return {x:0,y: 0}
	}
}

