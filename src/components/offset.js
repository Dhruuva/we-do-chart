export function calcOffsetX(f,points,fs){
	if (!points) return  3*fs;
	const maxTimeLabel= Math.max.apply(null,points[0]?.data.map(a=> (f.format(new Date(a.tm))).length  ));
	const boxWidth = (maxTimeLabel)? maxTimeLabel*fs:3*fs;

	return  boxWidth;
}

export function	calcOffsetY(decimals,points,tsz,fs){
	let f = (decimals.length<2)? 2 : decimals.length;
	let maxInteger = (points && points.length>0 ) ? Math.max.apply(null,points[0].data.map(a=> (''+a.price).indexOf(".") ) ):1;
	if (maxInteger<0) maxInteger= Math.max.apply(null,points[0].data.map(a=> (''+a.price).length  ))
	let mxl = maxInteger + f - 1 ;
	if (points && points.length == 0) mxl=6
	let boxWidth = mxl*fs+tsz.off
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