'use strict'
const req = Req.getInstance( 'http://localhost:8080');
const MIN_LEN = 9;
let username,password,repeat;

function init(){
    username = document.getElementById("signup-name").value;
    password = document.getElementById("signup-password").value;
    repeat =  document.getElementById("repeat-password").value;
}

function passValid(){
    return password === repeat && password.length >= MIN_LEN;
}

async function isExist(){
    let data;
    data = await req.request( '/login/select', { name:username, pass:password});
    return (data.length > 0);
}

async function signup(){
    init();
    let data;
    
    if( !passValid()) {
        alert( 'Sign-up failed');
        return;
    }

    if( await isExist()){
        alert( `You're already exist`);
        return;
    }
    
    data = await req.request( '/login/insert',{ name:username, pass:password});
    if( data == 'ok') {
        alert( `You signedup succesfuly`);
        return;
    }
}
    
