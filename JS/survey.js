'use strict'
const req = Req.getInstance( 'http://localhost:8080');

function init(){
    hide_continuous_car_accident_questions();    
}

function hide_continuous_car_accident_questions()
{
	document.getElementById('continuous_car_accident_questions').style.display = "none";
}

function show_continuous_car_accident_questions()
{
	document.getElementById('continuous_car_accident_questions').style.display = "block";
}

function int_cast( str){
    let int =  parseInt( str);
    if( isNaN(int))
        return str;
    else
        return int;
}

function radio_button_checked() {
    let doc = document.getElementsByTagName('input');	//array with all inputs in the page
    let len = doc.length;
    let map = {};

    for( let i = 0; i < len; i++){
        let ptr = doc[i];
        if( ptr.checked && ptr && ptr.name != 'accident_cause' && ptr.name != 'accident_severe'){	//temp condition
            map[ptr.name] = int_cast(ptr.value);
        }
    }
    return map;	//{buttin_name:input}
}

function insert(){
  let data = radio_button_checked();
  data.id = window.id || 1;
//  console.log( data);
  req.request('/survey/insert',data,1);	//?data={...}
//  alert( 'Thanks');
   $("#myModal").modal('show'); 
}
