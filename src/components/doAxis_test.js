"use strict"
const DoAxis = require("./doAxis");
const Bank = require( "./bank");
const doAxis = new DoAxis();
const bank = new Bank();
const myMath = require('mathjs');

let points= [
	{ tm: '2020-08-17', price: 70.61 },
	{ tm: '2020-08-19', price: 30.56 },
	{ tm: '2020-08-20', price: 50.71 },
	{ tm: '2020-08-21', price: 56.28 },
	{ tm: '2020-08-22', price: 20.37 },
]; 


//doAxis.fillAxisY(points,200, 20, 10);

//doAxis.formulaY(points,200, 20, 10);

let mini = Math.min(...points.map(a=>new Date(a.tm).getTime()))-(1*24*60*60*1000);

let maxi = Math.max.apply(null,points.map(a=> new Date(a.tm).getTime() ));

let yy ={y: {y2: 10, y1:190}}

//let l=doAxis.yScale(284.22,112,10, yy )

//console.log( "this.yScale",l )
let a=true, b=true
 if ( a && !b){
 	console.log( a," a- b ",b )
 }

//let far = points.map(a=>Math.abs(a.price-5)) 
let far = points.map(a=> ({...a, x: Math.abs(a.price-100)}) ).sort((a, b) =>Number(a.x-b.x) )
console.log( "far",far )

console.log('doAxis.isValidDate',doAxis.isValidDate('2020-08-32 15:15:00'))
console.log(!isNaN(Date.parse("22/05/2001"))  );
console.log(!isNaN(Date.parse(new Date("2020-08-30 15:15:00"))) )

console.log(new Date("2020-08-11 15:15:00").getDate() == new Date("2020-08-31 15:15:00").getDate())
//console.log( "bank",bank.getData('mins') )

// console.log( "Number(2.4567)", Number(2.4567).toFixed(2))

// console.log(new Date(mini).toISOString().slice(0,10));

// console.log(new Date(maxi).toISOString().slice(0,10));

// console.log(points.reverse());