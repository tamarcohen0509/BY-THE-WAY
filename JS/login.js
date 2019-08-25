'use strict'
const req = Req.getInstance( 'http://localhost:8080');

async function login(){
	let username = document.getElementById("user-name").value;
	let password = document.getElementById("password").value;	
	let data;
	data = await req.request('/login/select', { name: username, pass: password });
	console.log( data);
	if( !data.length ){
		alert( `Login Failed`);
		return;
	}
		
	alert( `Hello ${data[0].user_name}`);
	window.login_id = data.id;
	window.user_name = data[0].user_name;
//alert( `${window.user_name}`);
}


