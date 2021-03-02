"use strict"
/* eslint-disable */
function Bank() {
	const fs = require('fs');
	const fsPromises = fs.promises;

	async function listDir() {
	  try {
	    return fsPromises.readdir('./webeData/');
	  } catch (err) {
	    console.error('Error occured while reading directory!', err);
	  }
	}

	const readDir = dirPath =>
	   new Promise((resolve, reject) => 
	      fs.readdir(dirPath, (err, result) => err ? reject(err): resolve(result)));

	const test=[{name:'test',data:[{ tm: '2020-08-14', price: 48.61 },
				{ tm: '2020-08-15', price: 60.61 },
				{ tm: '2020-08-16', price: 50.56 },
				{ tm: '2020-08-17', price: 70.61 },
				{ tm: '2020-08-19', price: 30.56 },
				{ tm: '2020-08-20', price: 50.71 },
				{ tm: '2020-08-21', price: 56.28 },
				{ tm: '2020-08-22', price: 20.37 },]}
		];
	const mins=[{name:'mins',data:[
			{ tm: '2020-08-11', price:  0.0002 },
			{ tm: '2020-08-11', price: -0.0082 },
			{ tm: '2020-08-14', price: -0.0060 },
			{ tm: '2020-08-15', price: -0.0071 },
			{ tm: '2020-08-16', price: -0.0079 },]}
			
		];	

	const sto=[{name:'sto',data:[
			{tm:'2019-12-07',price:148.77},
			{tm:'2019-12-08',price:151.26},
			{tm:'2019-12-09',price:148.23},
			{tm:'2019-12-10',price:146.27},
			{tm:'2019-12-11',price:143.61},
			{tm:'2019-12-12',price:145.60},
			{tm:'2019-12-13',price:144.94},
			{tm:'2019-12-14',price:142.87},
			{tm:'2019-12-15',price:143.11},
			{tm:'2019-12-16',price:133.61},
			{tm:'2019-12-17',price:122.60},
			{tm:'2019-12-18',price:133.09},
			{tm:'2019-12-19',price:129.32},
			{tm:'2019-12-20',price:129.07},
			{tm:'2019-12-21',price:128.13},
			{tm:'2019-12-22',price:132.37},
			{tm:'2019-12-23',price:128.61},
			{tm:'2019-12-24',price:129.06},
			{tm:'2019-12-25',price:126.45},
			{tm:'2019-12-26',price:126.36},
			{tm:'2019-12-27',price:127.21},
			{tm:'2019-12-28',price:128.32},
			{tm:'2019-12-29',price:134.76},
			{tm:'2019-12-30',price:132.63},
			{tm:'2019-12-31',price:129.61},
			{tm:'2020-01-01',price:130.80},
			{tm:'2020-01-02',price:127.41},
			{tm:'2020-01-03',price:134.17},
			{tm:'2020-01-04',price:135.07},
			{tm:'2020-01-05',price:136.28},
			{tm:'2020-01-06',price:144.30},
			{tm:'2020-01-07',price:143.54},
			{tm:'2020-01-08',price:141.26},
			{tm:'2020-01-09',price:138.98},
			{tm:'2020-01-10',price:143.96},
			{tm:'2020-01-11',price:142.93},
			{tm:'2020-01-12',price:145.87},
			{tm:'2020-01-13',price:144.23},
			{tm:'2020-01-14',price:165.96},
			{tm:'2020-01-15',price:166.23},
			{tm:'2020-01-16',price:164.39},
			{tm:'2020-01-17',price:170.78},
			{tm:'2020-01-18',price:175.37},
			{tm:'2020-01-19',price:166.97},
			{tm:'2020-01-20',price:167.12},
			{tm:'2020-01-21',price:169.70},
			{tm:'2020-01-22',price:168.29},
			{tm:'2020-01-23',price:162.93},
			{tm:'2020-01-24',price:163.05},
			{tm:'2020-01-25',price:161.28},
			{tm:'2020-01-26',price:168.08},
			{tm:'2020-01-27',price:170.93},
			{tm:'2020-01-28',price:176.37},
			{tm:'2020-01-29',price:175.05},
			{tm:'2020-01-30',price:184.69},
			{tm:'2020-01-31',price:180.16},
			{tm:'2020-02-01',price:183.67},
			{tm:'2020-02-02',price:188.62},
			{tm:'2020-02-03',price:189.87},
			{tm:'2020-02-04',price:189.25},
			{tm:'2020-02-05',price:204.23},
			{tm:'2020-02-06',price:212.34},
			{tm:'2020-02-07',price:222.73},
			{tm:'2020-02-08',price:223.15},
			{tm:'2020-02-09',price:228.58},
			{tm:'2020-02-10',price:223.52},
			{tm:'2020-02-11',price:235.85},
			{tm:'2020-02-12',price:265.41},
			{tm:'2020-02-13',price:268.10},
			{tm:'2020-02-14',price:284.22},
			{tm:'2020-02-15',price:264.73},
			{tm:'2020-02-16',price:259.89},
			{tm:'2020-02-17',price:266.36},
			{tm:'2020-02-18',price:281.94},
			{tm:'2020-02-19',price:259.76},
			{tm:'2020-02-20',price:257.95},
			{tm:'2020-02-21',price:265.60},
			{tm:'2020-02-22',price:262.33},
			{tm:'2020-02-23',price:273.75},
			{tm:'2020-02-24',price:265.22},
			{tm:'2020-02-25',price:247.82},
			{tm:'2020-02-26',price:225.68},
			{tm:'2020-02-27',price:226.75},
			{tm:'2020-02-28',price:226.76},
			{tm:'2020-02-29',price:219.85},
			{tm:'2020-03-01',price:218.97},
			{tm:'2020-03-02',price:230.57},
			{tm:'2020-03-03',price:224.48},
			{tm:'2020-03-04',price:224.52},
			{tm:'2020-03-05',price:229.27},
			{tm:'2020-03-06',price:243.53},
			{tm:'2020-03-07',price:237.85},
			{tm:'2020-03-08',price:200.69},
			{tm:'2020-03-09',price:201.99},
			{tm:'2020-03-10',price:200.77},
			{tm:'2020-03-11',price:194.87},
			{tm:'2020-03-12',price:112.35},
			{tm:'2020-03-13',price:133.20},
			{tm:'2020-03-14',price:123.31},
			{tm:'2020-03-15',price:125.21},]}
	];

	const year=[{name:'year',data:[
		{tm:'2019-12-07',price:148.77},
		{tm:'2019-12-08',price:151.26},
		{tm:'2019-12-09',price:148.23},
		{tm:'2019-12-10',price:146.27},
		{tm:'2019-12-11',price:143.61},
		{tm:'2019-12-12',price:145.6},
		{tm:'2019-12-13',price:144.94},
		{tm:'2019-12-14',price:142.87},
		{tm:'2019-12-15',price:143.11},
		{tm:'2019-12-16',price:133.61},
		{tm:'2019-12-17',price:122.6},
		{tm:'2019-12-18',price:133.09},
		{tm:'2019-12-19',price:129.32},
		{tm:'2019-12-20',price:129.07},
		{tm:'2019-12-21',price:128.13},
		{tm:'2019-12-22',price:132.37},
		{tm:'2019-12-23',price:128.61},
		{tm:'2019-12-24',price:129.06},
		{tm:'2019-12-25',price:126.45},
		{tm:'2019-12-26',price:126.36},
		{tm:'2019-12-27',price:127.21},
		{tm:'2019-12-28',price:128.32},
		{tm:'2019-12-29',price:134.76},
		{tm:'2019-12-30',price:132.63},
		{tm:'2019-12-31',price:129.61},
		{tm:'2020-01-01',price:130.8},
		{tm:'2020-01-02',price:127.41},
		{tm:'2020-01-03',price:134.17},
		{tm:'2020-01-04',price:135.07},
		{tm:'2020-01-05',price:136.28},
		{tm:'2020-01-06',price:144.3},
		{tm:'2020-01-07',price:143.54},
		{tm:'2020-01-08',price:141.26},
		{tm:'2020-01-09',price:138.98},
		{tm:'2020-01-10',price:143.96},
		{tm:'2020-01-11',price:142.93},
		{tm:'2020-01-12',price:145.87},
		{tm:'2020-01-13',price:144.23},
		{tm:'2020-01-14',price:165.96},
		{tm:'2020-01-15',price:166.23},
		{tm:'2020-01-16',price:164.39},
		{tm:'2020-01-17',price:170.78},
		{tm:'2020-01-18',price:175.37},
		{tm:'2020-01-19',price:166.97},
		{tm:'2020-01-20',price:167.12},
		{tm:'2020-01-21',price:169.7},
		{tm:'2020-01-22',price:168.29},
		{tm:'2020-01-23',price:162.93},
		{tm:'2020-01-24',price:163.05},
		{tm:'2020-01-25',price:161.28},
		{tm:'2020-01-26',price:168.08},
		{tm:'2020-01-27',price:170.93},
		{tm:'2020-01-28',price:176.37},
		{tm:'2020-01-29',price:175.05},
		{tm:'2020-01-30',price:184.69},
		{tm:'2020-01-31',price:180.16},
		{tm:'2020-02-01',price:183.67},
		{tm:'2020-02-02',price:188.62},
		{tm:'2020-02-03',price:189.87},
		{tm:'2020-02-04',price:189.25},
		{tm:'2020-02-05',price:204.23},
		{tm:'2020-02-06',price:212.34},
		{tm:'2020-02-07',price:222.73},
		{tm:'2020-02-08',price:223.15},
		{tm:'2020-02-09',price:228.58},
		{tm:'2020-02-10',price:223.52},
		{tm:'2020-02-11',price:235.85},
		{tm:'2020-02-12',price:265.41},
		{tm:'2020-02-13',price:268.1},
		{tm:'2020-02-14',price:284.22},
		{tm:'2020-02-15',price:264.73},
		{tm:'2020-02-16',price:259.89},
		{tm:'2020-02-17',price:266.36},
		{tm:'2020-02-18',price:281.94},
		{tm:'2020-02-19',price:259.76},
		{tm:'2020-02-20',price:257.95},
		{tm:'2020-02-21',price:265.6},
		{tm:'2020-02-22',price:262.33},
		{tm:'2020-02-23',price:273.75},
		{tm:'2020-02-24',price:265.22},
		{tm:'2020-02-25',price:247.82},
		{tm:'2020-02-26',price:225.68},
		{tm:'2020-02-27',price:226.75},
		{tm:'2020-02-28',price:226.76},
		{tm:'2020-02-29',price:219.85},
		{tm:'2020-03-01',price:218.97},
		{tm:'2020-03-02',price:230.57},
		{tm:'2020-03-03',price:224.48},
		{tm:'2020-03-04',price:224.52},
		{tm:'2020-03-05',price:229.27},
		{tm:'2020-03-06',price:243.53},
		{tm:'2020-03-07',price:237.85},
		{tm:'2020-03-08',price:200.69},
		{tm:'2020-03-09',price:201.99},
		{tm:'2020-03-10',price:200.77},
		{tm:'2020-03-11',price:194.87},
		{tm:'2020-03-12',price:112.35},
		{tm:'2020-03-13',price:133.2},
		{tm:'2020-03-14',price:123.31},
		{tm:'2020-03-15',price:125.21},
		{tm:'2020-03-16',price:110.61},
		{tm:'2020-03-17',price:113.94},
		{tm:'2020-03-18',price:114.84},
		{tm:'2020-03-19',price:136.59},
		{tm:'2020-03-20',price:132.74},
		{tm:'2020-03-21',price:132.82},
		{tm:'2020-03-22',price:123.32},
		{tm:'2020-03-23',price:134.91},
		{tm:'2020-03-24',price:138.76},
		{tm:'2020-03-25',price:136.2},
		{tm:'2020-03-26',price:138.36},
		{tm:'2020-03-27',price:133.94},
		{tm:'2020-03-28',price:130.99},
		{tm:'2020-03-29',price:132.9},
		{tm:'2020-03-29',price:125.58},
		{tm:'2020-03-30',price:133.59},
		{tm:'2020-03-31',price:135.63},
		{tm:'2020-04-01',price:142.03},
		{tm:'2020-04-02',price:142.09},
		{tm:'2020-04-03',price:145.22},
		{tm:'2020-04-04',price:143.55},
		{tm:'2020-04-05',price:169.14},
		{tm:'2020-04-06',price:165.1},
		{tm:'2020-04-07',price:172.64},
		{tm:'2020-04-08',price:170.81},
		{tm:'2020-04-09',price:158.41},
		{tm:'2020-04-10',price:158.22},
		{tm:'2020-04-11',price:161.14},
		{tm:'2020-04-12',price:156.28},
		{tm:'2020-04-13',price:157.6},
		{tm:'2020-04-14',price:153.29},
		{tm:'2020-04-15',price:172.16},
		{tm:'2020-04-17',price:186.91},
		{tm:'2020-04-18',price:181.61},
		{tm:'2020-04-19',price:172.3},
		{tm:'2020-04-20',price:172.74},
		{tm:'2020-04-21',price:182.6},
		{tm:'2020-04-22',price:185.03},
		{tm:'2020-04-23',price:189.24},
		{tm:'2020-04-24',price:195.52},
		{tm:'2020-04-25',price:197.32},
		{tm:'2020-04-26',price:197.22},
		{tm:'2020-04-27',price:198.42},
		{tm:'2020-04-28',price:216.97},
		{tm:'2020-04-29',price:207.6},
		{tm:'2020-04-30',price:214.22},
		{tm:'2020-05-01',price:215.33},
		{tm:'2020-05-02',price:210.93},
		{tm:'2020-05-03',price:208.17},
		{tm:'2020-05-04',price:206.77},
		{tm:'2020-05-05',price:204.06},
		{tm:'2020-05-06',price:212.29},
		{tm:'2020-05-07',price:212.99},
		{tm:'2020-05-08',price:211.6},
		{tm:'2020-05-09',price:188.6},
		{tm:'2020-05-10',price:185.91},
		{tm:'2020-05-11',price:189.31},
		{tm:'2020-05-12',price:199.19},
		{tm:'2020-05-13',price:202.95},
		{tm:'2020-05-14',price:195.62},
		{tm:'2020-05-15',price:200.68},
		{tm:'2020-05-16',price:207.16},
		{tm:'2020-05-17',price:214.53},
		{tm:'2020-05-18',price:213.45},
		{tm:'2020-05-19',price:210.1},
		{tm:'2020-05-20',price:199.88},
		{tm:'2020-05-21',price:207.17},
		{tm:'2020-05-22',price:208.69},
		{tm:'2020-05-23',price:202.37},
		{tm:'2020-05-24',price:205.32},
		{tm:'2020-05-25',price:201.9},
		{tm:'2020-05-26',price:208.86},
		{tm:'2020-05-27',price:219.84},
		{tm:'2020-05-28',price:220.68},
		{tm:'2020-05-29',price:242.35},
		{tm:'2020-05-30',price:230.98},
		{tm:'2020-05-31',price:246.99},
		{tm:'2020-06-01',price:237.22},
		{tm:'2020-06-02',price:244.18},
		{tm:'2020-06-03',price:244.43},
		{tm:'2020-06-04',price:241.22},
		{tm:'2020-06-05',price:241.93},
		{tm:'2020-06-06',price:245.17},
		{tm:'2020-06-07',price:246.31},
		{tm:'2020-06-08',price:244.91},
		{tm:'2020-06-09',price:247.44},
		{tm:'2020-06-10',price:231.7},
		{tm:'2020-06-11',price:237.49},
		{tm:'2020-06-12',price:238.91},
		{tm:'2020-06-13',price:234.11},
		{tm:'2020-06-14',price:229.93},
		{tm:'2020-06-15',price:234.42},
		{tm:'2020-06-16',price:233.03},
		{tm:'2020-06-17',price:232.1},
		{tm:'2020-06-18',price:227.14},
		{tm:'2020-06-19',price:229.27},
		{tm:'2020-06-20',price:228.99},
		{tm:'2020-06-21',price:242.53},
		{tm:'2020-06-22',price:244.14},
		{tm:'2020-06-23',price:235.77},
		{tm:'2020-06-24',price:232.94},
		{tm:'2020-06-25',price:229.67},
		{tm:'2020-06-26',price:222.96},
		{tm:'2020-06-27',price:225.35},
		{tm:'2020-06-28',price:228.19},
		{tm:'2020-06-29',price:226.32},
		{tm:'2020-06-30',price:231.11},
		{tm:'2020-07-01',price:229.39},
		{tm:'2020-07-02',price:225.39},
		{tm:'2020-07-03',price:229.07},
		{tm:'2020-07-04',price:227.66},
		{tm:'2020-07-05',price:241.51},
		{tm:'2020-07-06',price:239.08},
		{tm:'2020-07-07',price:246.67},
		{tm:'2020-07-08',price:243.02},
		{tm:'2020-07-09',price:240.98},
		{tm:'2020-07-10',price:239.46},
		{tm:'2020-07-11',price:242.13},
		{tm:'2020-07-12',price:239.6},
		{tm:'2020-07-13',price:240.21},
		{tm:'2020-07-14',price:238.42},
		{tm:'2020-07-15',price:233.64},
		{tm:'2020-07-16',price:232.77},
		{tm:'2020-07-17',price:235.48},
		{tm:'2020-07-18',price:238.49},
		{tm:'2020-07-19',price:236.15},
		{tm:'2020-07-20',price:245.02},
		{tm:'2020-07-21',price:262.19},
		{tm:'2020-07-22',price:274.69},
		{tm:'2020-07-23',price:279.22},
		{tm:'2020-07-24',price:304.06},
		{tm:'2020-07-25',price:309.64},
		{tm:'2020-07-26',price:321.51},
		{tm:'2020-07-27',price:316.66},
		{tm:'2020-07-28',price:318.19},
		{tm:'2020-07-29',price:334.59},
		{tm:'2020-07-30',price:345.55},
		{tm:'2020-07-31',price:385.2},
		{tm:'2020-08-01',price:370.67},
		{tm:'2020-08-02',price:386.3},
		{tm:'2020-08-03',price:389.88},
		{tm:'2020-08-04',price:401.59},
		{tm:'2020-08-05',price:394.96},
		{tm:'2020-08-06',price:379.51},
		{tm:'2020-08-07',price:393.99},
		{tm:'2020-08-08',price:391.12},
		{tm:'2020-08-09',price:395.89},
		{tm:'2020-08-10',price:380.38},
		{tm:'2020-08-11',price:391.02},
		{tm:'2020-08-12',price:428.74},
		{tm:'2020-08-13',price:437.4},
		{tm:'2020-08-14',price:433.35},
		{tm:'2020-08-15',price:433.79},
		{tm:'2020-08-16',price:429.53},
		{tm:'2020-08-17',price:423.67},
		{tm:'2020-08-18',price:406.46},
		{tm:'2020-08-19',price:416.44},
		{tm:'2020-08-20',price:389.13},
		{tm:'2020-08-21',price:395.84},
		{tm:'2020-08-22',price:391.38},
		{tm:'2020-08-23',price:408.14},
		{tm:'2020-08-24',price:384},
		{tm:'2020-08-25',price:386.47},
		{tm:'2020-08-26',price:382.63},
		{tm:'2020-08-27',price:395.87},
		{tm:'2020-08-28',price:399.92},
		{tm:'2020-08-29',price:428.4},
		{tm:'2020-08-30',price:435.08},
		{tm:'2020-08-31',price:477.05},
		{tm:'2020-09-01',price:440.04},
		{tm:'2020-09-02',price:385.67},
		{tm:'2020-09-03',price:388.24},
		{tm:'2020-09-04',price:335.26},
		{tm:'2020-09-05',price:353.36},
		{tm:'2020-09-06',price:352.67},
		{tm:'2020-09-07',price:337.6},
		{tm:'2020-09-08',price:351.11},
		{tm:'2020-09-09',price:368.1},
		{tm:'2020-09-10',price:374.7},
		{tm:'2020-09-11',price:387.18},
		{tm:'2020-09-12',price:365.57},
		{tm:'2020-09-13',price:377.27},
		{tm:'2020-09-14',price:364.84},
		{tm:'2020-09-15',price:365.81},
		{tm:'2020-09-16',price:389.02},
		{tm:'2020-09-17',price:384.36},
		{tm:'2020-09-18',price:385.54},
		{tm:'2020-09-19',price:371.05},
		{tm:'2020-09-20',price:341.79},
		{tm:'2020-09-21',price:344.5},
		{tm:'2020-09-22',price:320.59},
		{tm:'2020-09-23',price:349.36},
		{tm:'2020-09-24',price:352.16},
		{tm:'2020-09-25',price:354.97},
		{tm:'2020-09-26',price:357.32},
		{tm:'2020-09-27',price:354.95},
		{tm:'2020-09-28',price:359.96},
		{tm:'2020-09-29',price:360.02},
		{tm:'2020-09-30',price:353.23},
		{tm:'2020-10-01',price:346.53},
		{tm:'2020-10-02',price:347.32},
		{tm:'2020-10-03',price:353.12},
		{tm:'2020-10-04',price:354.28},
		{tm:'2020-10-05',price:341.02},
		{tm:'2020-10-06',price:342.12},
		{tm:'2020-10-07',price:351.46},
		{tm:'2020-10-09',price:370.97},
		{tm:'2020-10-10',price:375.14},
		{tm:'2020-10-13',price:379.48},
		{tm:'2020-10-14',price:377.44},
		{tm:'2020-10-15',price:366.23},
		{tm:'2020-10-16',price:368.86},
		{tm:'2020-10-17',price:378.21},
		{tm:'2020-10-18',price:379.94},
		{tm:'2020-10-19',price:369.14},
		{tm:'2020-10-20',price:392.19},
		{tm:'2020-10-21',price:413.77},
		{tm:'2020-10-22',price:409.77},
		{tm:'2020-10-23',price:412.46},
		{tm:'2020-10-24',price:406.22},
		{tm:'2020-10-26',price:393.89},
		{tm:'2020-10-27',price:404},
		{tm:'2020-10-28',price:388.65},
		{tm:'2020-10-29',price:386.73},
		{tm:'2020-10-30',price:382.82},
		{tm:'2020-10-31',price:386.59},
		{tm:'2020-11-01',price:396.36},
		{tm:'2020-11-02',price:383.16},
		{tm:'2020-11-03',price:387.6},
		{tm:'2020-11-04',price:402.14},
		{tm:'2020-11-05',price:414.07},
		{tm:'2020-11-06',price:454.72},
		{tm:'2020-11-07',price:435.71},
		{tm:'2020-11-08',price:453.55},
		{tm:'2020-11-09',price:444.16},
		{tm:'2020-11-10',price:449.68},
		{tm:'2020-11-11',price:462.96},
		{tm:'2020-11-12',price:461.01},
		{tm:'2020-11-13',price:474.63},
		{tm:'2020-11-14',price:460.15},
		{tm:'2020-11-15',price:447.56},
		{tm:'2020-11-16',price:459.94},
		{tm:'2020-11-17',price:480.36},
		{tm:'2020-11-18',price:479.48},
		{tm:'2020-11-19',price:471.63},
		{tm:'2020-11-20',price:509.74},
		{tm:'2020-11-21',price:549.49},
		{tm:'2020-11-22',price:558.07},
		{tm:'2020-11-23',price:608.45},
		{tm:'2020-11-24',price:603.9},
		{tm:'2020-11-25',price:570.69},
		{tm:'2020-11-26',price:518.8},
		{tm:'2020-11-27',price:517.49},
		{tm:'2020-11-28',price:538.23},
		{tm:'2020-11-29',price:575.76},
		{tm:'2020-11-30',price:614.84},
		{tm:'2020-12-01',price:587.32},
		{tm:'2020-12-02',price:598.35},
		{tm:'2020-12-03',price:616.71},
		{tm:'2020-12-04',price:569.35},
		{tm:'2020-12-05',price:596.6},
		{tm:'2020-12-06',price:590.17},]}
		];	

	const intra=[{name:'intra',data:[
	 {tm:'2019-12-07 00:00:00',price:148.77},
						{tm:'2019-12-07 00:15:00',price:151.26},
						{tm:'2019-12-07 00:30:00',price:148.23},
						{tm:'2019-12-07 00:45:00',price:146.27},
						{tm:'2019-12-07 01:00:00',price:143.61},
						{tm:'2019-12-07 01:15:00',price:145.6},
						{tm:'2019-12-07 01:30:00',price:144.94},
						{tm:'2019-12-07 01:45:00',price:142.87},
						{tm:'2019-12-07 02:00:00',price:143.11},
						{tm:'2019-12-07 02:15:00',price:133.61},
						{tm:'2019-12-07 02:30:00',price:122.6},
						{tm:'2019-12-07 02:45:00',price:133.09},
						{tm:'2019-12-07 03:00:00',price:129.32},
						{tm:'2019-12-07 03:15:00',price:129.07},
						{tm:'2019-12-07 03:30:00',price:128.13},
						{tm:'2019-12-07 03:45:00',price:132.37},
						{tm:'2019-12-07 04:00:00',price:128.61},
						{tm:'2019-12-07 04:15:00',price:129.06},
						{tm:'2019-12-07 04:30:00',price:126.45},
						{tm:'2019-12-07 04:45:00',price:126.36},
						{tm:'2019-12-07 05:00:00',price:127.21},
						{tm:'2019-12-07 05:15:00',price:128.32},
						{tm:'2019-12-07 05:30:00',price:134.76},
						{tm:'2019-12-07 05:45:00',price:132.63},
						{tm:'2019-12-07 06:00:00',price:129.61},
						{tm:'2019-12-07 06:15:00',price:130.8},
						{tm:'2019-12-07 06:30:00',price:127.41},
						{tm:'2019-12-07 06:45:00',price:134.17},
						{tm:'2019-12-07 07:00:00',price:135.07},
						{tm:'2019-12-07 07:15:00',price:136.28},
						{tm:'2019-12-07 07:30:00',price:144.3},
						{tm:'2019-12-07 07:45:00',price:143.54},
						{tm:'2019-12-07 08:00:00',price:141.26},
						{tm:'2019-12-07 08:15:00',price:138.98},
						{tm:'2019-12-07 08:30:00',price:143.96},
						{tm:'2019-12-07 08:45:00',price:142.93},
						{tm:'2019-12-07 09:00:00',price:145.87},
						{tm:'2019-12-07 09:15:00',price:144.23},
						{tm:'2019-12-07 09:30:00',price:165.96},
						{tm:'2019-12-07 09:45:00',price:166.23},
						{tm:'2019-12-07 10:00:00',price:164.39},
						{tm:'2019-12-07 10:15:00',price:170.78},
						{tm:'2019-12-07 10:30:00',price:175.37},
						{tm:'2019-12-07 10:45:00',price:166.97},
						{tm:'2019-12-07 11:00:00',price:167.12},
						{tm:'2019-12-07 11:15:00',price:169.7},
						{tm:'2019-12-07 11:30:00',price:168.29},
						{tm:'2019-12-07 11:45:00',price:162.93},
						{tm:'2019-12-07 12:00:00',price:163.05},
						{tm:'2019-12-07 12:15:00',price:161.28},
						{tm:'2019-12-07 12:30:00',price:168.08},
						{tm:'2019-12-07 12:45:00',price:170.93},
						{tm:'2019-12-07 13:00:00',price:176.37},
						{tm:'2019-12-07 13:15:00',price:175.05},
						{tm:'2019-12-07 13:30:00',price:184.69},
						{tm:'2019-12-07 13:45:00',price:180.16},
						{tm:'2019-12-07 14:00:00',price:183.67},
						{tm:'2019-12-07 14:15:00',price:188.62},
						{tm:'2019-12-07 14:30:00',price:189.87},
						{tm:'2019-12-07 14:45:00',price:189.25},
						{tm:'2019-12-07 15:00:00',price:204.23},
						{tm:'2019-12-07 15:15:00',price:212.34},
						{tm:'2019-12-07 15:30:00',price:222.73},
						{tm:'2019-12-07 15:45:00',price:223.15},
						{tm:'2019-12-07 16:00:00',price:228.58},
						{tm:'2019-12-07 16:15:00',price:223.52},
						{tm:'2019-12-07 16:30:00',price:235.85},
						{tm:'2019-12-07 16:45:00',price:265.41},
						{tm:'2019-12-07 17:00:00',price:268.1},
						{tm:'2019-12-07 17:15:00',price:284.22},
						{tm:'2019-12-07 17:30:00',price:264.73},
						{tm:'2019-12-07 17:45:00',price:259.89},
						{tm:'2019-12-07 18:00:00',price:266.36},
						{tm:'2019-12-07 18:15:00',price:281.94},
						{tm:'2019-12-07 18:30:00',price:259.76},
						{tm:'2019-12-07 18:45:00',price:257.95},
						{tm:'2019-12-07 19:00:00',price:265.6},
						{tm:'2019-12-07 19:15:00',price:262.33},
						{tm:'2019-12-07 19:30:00',price:273.75},
						{tm:'2019-12-07 19:45:00',price:265.22},
						{tm:'2019-12-07 20:00:00',price:247.82},
						{tm:'2019-12-07 20:15:00',price:225.68},
						{tm:'2019-12-07 20:30:00',price:226.75},
						{tm:'2019-12-07 20:45:00',price:226.76},
						{tm:'2019-12-07 21:00:00',price:219.85},
						{tm:'2019-12-07 21:15:00',price:218.97},
						{tm:'2019-12-07 21:30:00',price:230.57},
						{tm:'2019-12-07 21:45:00',price:224.48},
						{tm:'2019-12-07 22:00:00',price:224.52},
						{tm:'2019-12-07 22:15:00',price:229.27},
						{tm:'2019-12-07 22:30:00',price:243.53},
						{tm:'2019-12-07 22:45:00',price:237.85},
						{tm:'2019-12-07 23:00:00',price:200.69},
						{tm:'2019-12-07 23:15:00',price:201.99},
						{tm:'2019-12-07 23:30:00',price:200.77},
						{tm:'2019-12-07 23:45:00',price:194.87},
						{tm:'2019-12-08 00:00:00',price:112.35},
						{tm:'2019-12-08 00:15:00',price:133.2},
						{tm:'2019-12-08 00:30:00',price:123.31},
						{tm:'2019-12-08 00:45:00',price:125.21},
						{tm:'2019-12-08 01:00:00',price:110.61},
						{tm:'2019-12-08 01:15:00',price:113.94},
						{tm:'2019-12-08 01:30:00',price:114.84},
						{tm:'2019-12-08 01:45:00',price:136.59},
						{tm:'2019-12-08 02:00:00',price:132.74},
						{tm:'2019-12-08 02:15:00',price:132.82},
						{tm:'2019-12-08 02:30:00',price:123.32},
						{tm:'2019-12-08 02:45:00',price:134.91},
						{tm:'2019-12-08 03:00:00',price:138.76},
						{tm:'2019-12-08 03:15:00',price:136.2},
						{tm:'2019-12-08 03:30:00',price:138.36},
						{tm:'2019-12-08 03:45:00',price:133.94},
						{tm:'2019-12-08 04:00:00',price:130.99},
						{tm:'2019-12-08 04:15:00',price:132.9},
						{tm:'2019-12-08 04:30:00',price:125.58},
						{tm:'2019-12-08 04:45:00',price:133.59},
						{tm:'2019-12-08 05:00:00',price:135.63},
						{tm:'2019-12-08 05:15:00',price:142.03},
						{tm:'2019-12-08 05:30:00',price:142.09},
						{tm:'2019-12-08 05:45:00',price:145.22},
						{tm:'2019-12-08 06:00:00',price:143.55},
						{tm:'2019-12-08 06:15:00',price:169.14},
						{tm:'2019-12-08 06:30:00',price:165.1},
						{tm:'2019-12-08 06:45:00',price:172.64},
						{tm:'2019-12-08 07:00:00',price:170.81},
						{tm:'2019-12-08 07:15:00',price:158.41},
						{tm:'2019-12-08 07:30:00',price:158.22},
						{tm:'2019-12-08 07:45:00',price:161.14},
						{tm:'2019-12-08 08:00:00',price:156.28},
						{tm:'2019-12-08 08:15:00',price:157.6},
						{tm:'2019-12-08 08:30:00',price:153.29},
						{tm:'2019-12-08 08:45:00',price:172.16},
						{tm:'2019-12-08 09:00:00',price:186.91},
						{tm:'2019-12-08 09:15:00',price:181.61},
						{tm:'2019-12-08 09:30:00',price:172.3},
						{tm:'2019-12-08 09:45:00',price:172.74},
						{tm:'2019-12-08 10:00:00',price:182.6},
						{tm:'2019-12-08 10:15:00',price:185.03},
						{tm:'2019-12-08 10:30:00',price:189.24},
						{tm:'2019-12-08 10:45:00',price:195.52},
						{tm:'2019-12-08 11:00:00',price:197.32},
						{tm:'2019-12-08 11:15:00',price:197.22},
						{tm:'2019-12-08 11:30:00',price:198.42},
						{tm:'2019-12-08 11:45:00',price:216.97},
						{tm:'2019-12-08 12:00:00',price:207.6},
						{tm:'2019-12-08 12:15:00',price:214.22},
						{tm:'2019-12-08 12:30:00',price:215.33},
						{tm:'2019-12-08 12:45:00',price:210.93},
						{tm:'2019-12-08 13:00:00',price:208.17},
						{tm:'2019-12-08 13:15:00',price:206.77},
						{tm:'2019-12-08 13:30:00',price:204.06},
						{tm:'2019-12-08 13:45:00',price:212.29},
						{tm:'2019-12-08 14:00:00',price:212.99},
						{tm:'2019-12-08 14:15:00',price:211.6},
						{tm:'2019-12-08 14:30:00',price:188.6},
						{tm:'2019-12-08 14:45:00',price:185.91},
						{tm:'2019-12-08 15:00:00',price:189.31},
						{tm:'2019-12-08 15:15:00',price:199.19},
						{tm:'2019-12-08 15:30:00',price:202.95},
						{tm:'2019-12-08 15:45:00',price:195.62},
						{tm:'2019-12-08 16:00:00',price:200.68},
						{tm:'2019-12-08 16:15:00',price:207.16},
						{tm:'2019-12-08 16:30:00',price:214.53},
						{tm:'2019-12-08 16:45:00',price:213.45},
						{tm:'2019-12-08 17:00:00',price:210.1},
						{tm:'2019-12-08 17:15:00',price:199.88},
						{tm:'2019-12-08 17:30:00',price:207.17},
						{tm:'2019-12-08 17:45:00',price:208.69},
						{tm:'2019-12-08 18:00:00',price:202.37},
						{tm:'2019-12-08 18:15:00',price:205.32},
						{tm:'2019-12-08 18:30:00',price:201.9},
						{tm:'2019-12-08 18:45:00',price:208.86},
						{tm:'2019-12-08 19:00:00',price:219.84},
						{tm:'2019-12-08 19:15:00',price:220.68},
						{tm:'2019-12-08 19:30:00',price:242.35},
						{tm:'2019-12-08 19:45:00',price:230.98},
						{tm:'2019-12-08 20:00:00',price:246.99},
						{tm:'2019-12-08 20:15:00',price:237.22},
						{tm:'2019-12-08 20:30:00',price:244.18},
						{tm:'2019-12-08 20:45:00',price:244.43},
						{tm:'2019-12-08 21:00:00',price:241.22},
						{tm:'2019-12-08 21:15:00',price:241.93},
						{tm:'2019-12-08 21:30:00',price:245.17},
						{tm:'2019-12-08 21:45:00',price:246.31},
						{tm:'2019-12-08 22:00:00',price:244.91},
						{tm:'2019-12-08 22:15:00',price:247.44},
						{tm:'2019-12-08 22:30:00',price:231.7},
						{tm:'2019-12-08 22:45:00',price:237.49},
						{tm:'2019-12-08 23:00:00',price:238.91},
						{tm:'2019-12-08 23:15:00',price:234.11},
						{tm:'2019-12-08 23:30:00',price:229.93},
						{tm:'2019-12-08 23:45:00',price:234.42},
						{tm:'2019-12-09 00:00:00',price:233.03},
						{tm:'2019-12-09 00:15:00',price:232.1},
						{tm:'2019-12-09 00:30:00',price:227.14},
						{tm:'2019-12-09 00:45:00',price:229.27},
						{tm:'2019-12-09 01:00:00',price:228.99},
						{tm:'2019-12-09 01:15:00',price:242.53},
						{tm:'2019-12-09 01:30:00',price:244.14},
						{tm:'2019-12-09 01:45:00',price:235.77},
						{tm:'2019-12-09 02:00:00',price:232.94},
						{tm:'2019-12-09 02:15:00',price:229.67},
						{tm:'2019-12-09 02:30:00',price:222.96},
						{tm:'2019-12-09 02:45:00',price:225.35},
						{tm:'2019-12-09 03:00:00',price:228.19},
						{tm:'2019-12-09 03:15:00',price:226.32},
						{tm:'2019-12-09 03:30:00',price:231.11},
						{tm:'2019-12-09 03:45:00',price:229.39},
						{tm:'2019-12-09 04:00:00',price:225.39},
						{tm:'2019-12-09 04:15:00',price:229.07},
						{tm:'2019-12-09 04:30:00',price:227.66},
						{tm:'2019-12-09 04:45:00',price:241.51},
						{tm:'2019-12-09 05:00:00',price:239.08},
						{tm:'2019-12-09 05:15:00',price:246.67},
						{tm:'2019-12-09 05:30:00',price:243.02},
						{tm:'2019-12-09 05:45:00',price:240.98},
						{tm:'2019-12-09 06:00:00',price:239.46},
						{tm:'2019-12-09 06:15:00',price:242.13},
						{tm:'2019-12-09 06:30:00',price:239.6},
						{tm:'2019-12-09 06:45:00',price:240.21},
						{tm:'2019-12-09 07:00:00',price:238.42},
						{tm:'2019-12-09 07:15:00',price:233.64},
						{tm:'2019-12-09 07:30:00',price:232.77},
						{tm:'2019-12-09 07:45:00',price:235.48},
						{tm:'2019-12-09 08:00:00',price:238.49},
						{tm:'2019-12-09 08:15:00',price:236.15},
						{tm:'2019-12-09 08:30:00',price:245.02},
						{tm:'2019-12-09 08:45:00',price:262.19},
						{tm:'2019-12-09 09:00:00',price:274.69},
						{tm:'2019-12-09 09:15:00',price:279.22},
						{tm:'2019-12-09 09:30:00',price:304.06},
						{tm:'2019-12-09 09:45:00',price:309.64},
						{tm:'2019-12-09 10:00:00',price:321.51},
						{tm:'2019-12-09 10:15:00',price:316.66},
						{tm:'2019-12-09 10:30:00',price:318.19},
						{tm:'2019-12-09 10:45:00',price:334.59},
						{tm:'2019-12-09 11:00:00',price:345.55},
						{tm:'2019-12-09 11:15:00',price:385.2},
						{tm:'2019-12-09 11:30:00',price:370.67},
						{tm:'2019-12-09 11:45:00',price:386.3},
						{tm:'2019-12-09 12:00:00',price:389.88},
						{tm:'2019-12-09 12:15:00',price:401.59},
						{tm:'2019-12-09 12:30:00',price:394.96},
						{tm:'2019-12-09 12:45:00',price:379.51},
						{tm:'2019-12-09 13:00:00',price:393.99},
						{tm:'2019-12-09 13:15:00',price:391.12},
						{tm:'2019-12-09 13:30:00',price:395.89},
						{tm:'2019-12-09 13:45:00',price:380.38},
						{tm:'2019-12-09 14:00:00',price:391.02},
						{tm:'2019-12-09 14:15:00',price:428.74},
						{tm:'2019-12-09 14:30:00',price:437.4},
						{tm:'2019-12-09 14:45:00',price:433.35},
						{tm:'2019-12-09 15:00:00',price:433.79},
						{tm:'2019-12-09 15:15:00',price:429.53},
						{tm:'2019-12-09 15:30:00',price:423.67},
						{tm:'2019-12-09 15:45:00',price:406.46},
						{tm:'2019-12-09 16:00:00',price:416.44},
						{tm:'2019-12-09 16:15:00',price:389.13},
						{tm:'2019-12-09 16:30:00',price:395.84},
						{tm:'2019-12-09 16:45:00',price:391.38},
						{tm:'2019-12-09 17:00:00',price:408.14},
						{tm:'2019-12-09 17:15:00',price:384},
						{tm:'2019-12-09 17:30:00',price:386.47},
						{tm:'2019-12-09 17:45:00',price:382.63},
						{tm:'2019-12-09 18:00:00',price:395.87},
						{tm:'2019-12-09 18:15:00',price:399.92},
						{tm:'2019-12-09 18:30:00',price:428.4},
						{tm:'2019-12-09 18:45:00',price:435.08},
						{tm:'2019-12-09 19:00:00',price:477.05},
						{tm:'2019-12-09 19:15:00',price:440.04},
						{tm:'2019-12-09 19:30:00',price:385.67},
						{tm:'2019-12-09 19:45:00',price:388.24},
						{tm:'2019-12-09 20:00:00',price:335.26},
						{tm:'2019-12-09 20:15:00',price:353.36},
						{tm:'2019-12-09 20:30:00',price:352.67},
						{tm:'2019-12-09 20:45:00',price:337.6},
						{tm:'2019-12-09 21:00:00',price:351.11},
						{tm:'2019-12-09 21:15:00',price:368.1},
						{tm:'2019-12-09 21:30:00',price:374.7},
						{tm:'2019-12-09 21:45:00',price:387.18},
						{tm:'2019-12-09 22:00:00',price:365.57},
						{tm:'2019-12-09 22:15:00',price:377.27},
						{tm:'2019-12-09 22:30:00',price:364.84},
						{tm:'2019-12-09 22:45:00',price:365.81},
						{tm:'2019-12-09 23:00:00',price:389.02},
						{tm:'2019-12-09 23:15:00',price:384.36},
						{tm:'2019-12-09 23:30:00',price:385.54},
						{tm:'2019-12-09 23:45:00',price:371.05},
						{tm:'2019-12-10 00:00:00',price:341.79},
						{tm:'2019-12-10 00:15:00',price:344.5},
						{tm:'2019-12-10 00:30:00',price:320.59},
						{tm:'2019-12-10 00:45:00',price:349.36},
						{tm:'2019-12-10 01:00:00',price:352.16},
						{tm:'2019-12-10 01:15:00',price:354.97},
						{tm:'2019-12-10 01:30:00',price:357.32},
						{tm:'2019-12-10 01:45:00',price:354.95},
						{tm:'2019-12-10 02:00:00',price:359.96},
						{tm:'2019-12-10 02:15:00',price:360.02},
						{tm:'2019-12-10 02:30:00',price:353.23},
						{tm:'2019-12-10 02:45:00',price:346.53},
						{tm:'2019-12-10 03:00:00',price:347.32},
						{tm:'2019-12-10 03:15:00',price:353.12},
						{tm:'2019-12-10 03:30:00',price:354.28},
						{tm:'2019-12-10 03:45:00',price:341.02},
						{tm:'2019-12-10 04:00:00',price:342.12},
						{tm:'2019-12-10 04:15:00',price:351.46},
						{tm:'2019-12-10 04:30:00',price:370.97},
						{tm:'2019-12-10 04:45:00',price:375.14},
						{tm:'2019-12-10 05:00:00',price:379.48},
						{tm:'2019-12-10 05:15:00',price:377.44},
						{tm:'2019-12-10 05:30:00',price:366.23},
						{tm:'2019-12-10 05:45:00',price:368.86},
						{tm:'2019-12-10 06:00:00',price:378.21},
						{tm:'2019-12-10 06:15:00',price:379.94},
						{tm:'2019-12-10 06:30:00',price:369.14},
						{tm:'2019-12-10 06:45:00',price:392.19},
						{tm:'2019-12-10 07:00:00',price:413.77},
						{tm:'2019-12-10 07:15:00',price:409.77},
						{tm:'2019-12-10 07:30:00',price:412.46},
						{tm:'2019-12-10 07:45:00',price:406.22},
						{tm:'2019-12-10 08:00:00',price:393.89},
						{tm:'2019-12-10 08:15:00',price:404},
						{tm:'2019-12-10 08:30:00',price:388.65},
						{tm:'2019-12-10 08:45:00',price:386.73},
						{tm:'2019-12-10 09:00:00',price:382.82},
						{tm:'2019-12-10 09:15:00',price:386.59},
						{tm:'2019-12-10 09:30:00',price:396.36},
						{tm:'2019-12-10 09:45:00',price:383.16},
						{tm:'2019-12-10 10:00:00',price:387.6},
						{tm:'2019-12-10 10:15:00',price:402.14},
						{tm:'2019-12-10 10:30:00',price:414.07},
						{tm:'2019-12-10 10:45:00',price:454.72},
						{tm:'2019-12-10 11:00:00',price:435.71},
						{tm:'2019-12-10 11:15:00',price:453.55},
						{tm:'2019-12-10 11:30:00',price:444.16},
						{tm:'2019-12-10 11:45:00',price:449.68},
						{tm:'2019-12-10 12:00:00',price:462.96},
						{tm:'2019-12-10 12:15:00',price:461.01},
						{tm:'2019-12-10 12:30:00',price:474.63},
						{tm:'2019-12-10 12:45:00',price:460.15},
						{tm:'2019-12-10 13:00:00',price:447.56},
						{tm:'2019-12-10 13:15:00',price:459.94},
						{tm:'2019-12-10 13:30:00',price:480.36},
						{tm:'2019-12-10 13:45:00',price:479.48},
						{tm:'2019-12-10 14:00:00',price:471.63},
						{tm:'2019-12-10 14:15:00',price:509.74},
						{tm:'2019-12-10 14:30:00',price:549.49},
						{tm:'2019-12-10 14:45:00',price:558.07},
						{tm:'2019-12-10 15:00:00',price:608.45},
						{tm:'2019-12-10 15:15:00',price:603.9},
						{tm:'2019-12-10 15:30:00',price:570.69},
						{tm:'2019-12-10 15:45:00',price:518.8},
						{tm:'2019-12-10 16:00:00',price:517.49},
						{tm:'2019-12-10 16:15:00',price:538.23},
						{tm:'2019-12-10 16:30:00',price:575.76},
						{tm:'2019-12-10 16:45:00',price:614.84},
						{tm:'2019-12-10 17:00:00',price:587.32},
						{tm:'2019-12-10 17:15:00',price:598.35},
						{tm:'2019-12-10 17:30:00',price:616.71},
						{tm:'2019-12-10 17:45:00',price:569.35},
						{tm:'2019-12-10 18:00:00',price:596.6},
						{tm:'2019-12-10 18:15:00',price:590.17},]}

	]	
  function getData(sym){
		if (sym=="test"){
			return test;
		}
		else if (sym=="sto"){
			return sto;
		}	
		else if (sym=="mins"){
			return mins;
		}	
		else if (sym=="year"){
			return year;
		}	
		else if (sym=="intra"){
			return intra;					
		} else {
			return test;
		}
	}

	this.getData = (sym) => getData(sym);
	this.listDir = () => listDir();
	this.readDir = (path) => readDir(path);
}

module.exports = Bank;