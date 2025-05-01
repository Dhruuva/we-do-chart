export function calcOffsetX(f,points,fs){
	const maxTimeLabel= Math.max.apply(null,points[0].data.map(a=> (f.format(new Date(a.tm))).length  ));
	const boxWidth = (maxTimeLabel)? maxTimeLabel*fs:3*fs;
	//console.log(boxWidth," --boxWidth ")
	return  boxWidth;
}

export function	calcOffsetY(decimals,points,tsz,fs){
	let f = (decimals.length<2)? 2 : decimals.length;
	//console.log(f," --f ")
	let maxInteger = (points.length>0) ? Math.max.apply(null,points[0].data.map(a=> (''+a.price).indexOf(".") ) ):1;
	//console.log(maxInteger," --maxInteger ")
	if (maxInteger<0) maxInteger= Math.max.apply(null,points[0].data.map(a=> (''+a.price).length  ))
	let mxl = maxInteger + f - 1 ;
	if ( points.length == 0) mxl=6
	let boxWidth = mxl*fs+tsz.off
	//console.log(boxWidth," --calcOffsetY ",tsz.off, fs)
	return  boxWidth;
}


export function calcMiniBottomHight(tsz,fs,scl,height){
	let add=tsz.size+tsz.off
	let miniHeight = fs*1.18 + scl*40 + (height/100)*3+add
	return  miniHeight;
}
export function calcMiniTopHight(tsz,fs){
	let miniHeight = fs*1.18 +tsz.off
	return  miniHeight;
}