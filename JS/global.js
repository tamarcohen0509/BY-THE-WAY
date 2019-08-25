/*not supported yet*/

window.onload = function() {
	/*window.login_id = "sara";//Demo data*/
	set_navbar_login();
};

function set_navbar_login()
{
	if(window.login_id == null){//not loged in
		document.getElementById('nav_loged').style.display = "none";
		document.getElementById('nav_not_loged').style.display = "block";
	}
	else{//loged in
		document.getElementById("hi_user").innerHTML = "<a>hi, " +  window.login_id + "!</a>";
		document.getElementById('nav_not_loged').style.display = "none";
		document.getElementById('nav_loged').style.display = "block";
	}
}

function sign_out()
{
	window.login_id = null;
	set_navbar_login();
}