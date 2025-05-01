
export function mousemove(e,pos) {
	if ( e){
		e.preventDefault();
		//pos.value.x=e.clientX;
		pos.x=e.clientX;
		pos.y=e.clientY;
		 //console.log("mousemove.",e.clientX, e.clientY, " pos==",pos)
		return {x:e.clientX,y: e.clientY}
	} else {
		return {x:0,y: 0}
	}
}

