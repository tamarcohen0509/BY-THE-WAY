'use strict'
const express = require ('express'); //framerwork for routing (allows to import from different URLs)
const app = express(); //activate express
const cors = require('cors');	//google required
const srv = require('./service');

let corsOptions = {
  origin: 'null',		//static client
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));	//enables cross reference connection
app.use(express.json())

//listening to port 8080
app.listen(8080, () => {			
    console.log('Server started!');
});

//Queries
//check if loged in
app.route('/login/select').get( async ( req, res, next) => {	//req.query=parameters 
	let name = req.query.name;
	let pass = req.query.pass;
	let data = await srv.login_select( name, pass).catch( e => console.log(e));
	res.json( data);
});

//for sign up
app.route( '/login/insert').get( async ( req, res, next) => {
	let name = req.query.name;
	let pass = req.query.pass;
	let data = await srv.login_insert( name, pass).catch( e => console.log(e));
	res.json( data);
});

//insert data into tbl_main_quest
app.route( '/survey/insert').get( async ( req, res, next) => {
	let map = req.query;
	let resp = await srv.survey_insert( map).catch( e => console.log(e));
	res.send( resp);
});

//send json to the client with the parameters to statistics graphs
//each line is a query to DB
app.route( '/survey/select').get( async ( req, res, next) => {
	let gender = await srv.survey_gender().catch( e => console.log(e));
	let ages = await srv.survey_ages().catch( e => console.log(e));
	let acctec = await srv.survey_tech().catch( e => console.log(e));
	let avg = await srv.survey_avg().catch( e => console.log(e));
	let age_fac = await srv.survey_age_fac().catch( e => console.log(e));
	let data = 	{ gender:gender,ages:ages,acctec:acctec,avg:avg,age_fac:age_fac};	
	res.json( await data);
})
 