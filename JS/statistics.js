'use strict'
const req = Req.getInstance( 'http://localhost:8080');

async function getData(){
    let data = await req.request( '/survey/select');
    //console.log( data.gender);
    chartIT_gender( data.gender);
    chartIT_age( data.ages);
    chartIT_mobileye( data.acctec);
    chartIT_avg( data.avg);
    chartIT_age_fac( data.age_fac);
}