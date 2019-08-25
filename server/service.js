'use strict'
//execute queries on demand of main.js
const db = require('./db_con');
const rst = db.rst;

class Service{
    constructor(){}

    static getInstance(){
        if( !this.instance)
            this.instance  = new Service();
        return this.instance;
    }

    async login_select( name, pass) {   
        console.log(`select id, user_name, _password from tbl_login where user_name = '${name}' and _password = '${pass}'`)
        return await rst( 'mysql',`select id, user_name, _password from tbl_login where user_name = '${name}' and _password = '${pass}'`).catch( e => console.log( e));     //add and password
    }

    async login_insert( name, pass) {
        let data = await rst('mysql', `insert into tbl_login values(null,'${name}', '${pass}')`).catch( e => console.log( e));
        if( data)
            return 'ok';
        else
            return 'Failed';
    }

    async survey_insert( data){
        let data$ = this.parseJson( data);
        let resp = await rst('mysql', `insert into tbl_main_quest (${data$.cols}) values(${data$.vals})`);
        if( resp)
            return 'ok';
        else
            return 'Failed';
    }

    async survey_gender(){
        let arr = this.init_arr(4);
        let data = await rst('mysql', `select gender FROM tbl_main_quest`);
        
        data.forEach( d => {
            arr[d.gender]++;
        });
        return arr;
    }

    async survey_ages(){
        let arr = this.init_arr(7);
        let unique = await rst('mysql',`select distinct age from tbl_main_quest order by age`);
        let data = await rst('mysql', `select age FROM tbl_main_quest`);
        
        data.forEach( d => {
            let idx = unique.findIndex( f => f.age == d.age);
            arr[idx]++;
        })
        return arr;
    }

    async survey_tech(){
        let tec = await rst('mysql', `select count(*) as c from tbl_main_quest WHERE technology = 1`);
        let acc = await rst('mysql', `select count(*) as c from tbl_main_quest  WHERE technology = 1  AND accident = 1`);
        let arr = [];
        arr.push(tec[0].c);
        arr.push(acc[0].c);
        return arr;
    }

    async survey_avg(){
        let tec = await rst('mysql', `SELECT AVG(rate_tiredness) AS rate_tiredness, AVG(rate_speeding) AS rate_speeding, AVG(rate_drunk) AS rate_drunk,
		                    AVG(rate_swerving) AS rate_swerving,AVG(rate_swerving) AS rate_swerving,AVG(rate_phone) AS rate_phone
                            FROM tbl_main_quest`);
        tec = tec[0];
        let arr = [];
        let keys = Object.keys( tec);
        for( let i = 0; i < keys.length; i++)
            arr.push( tec[keys[i]])
        return arr;
    }

    async survey_age_fac(){
        let arr = [];
        let data = await rst('mysql', `select t.age, ((t.acc_sum * 100) / t.total) as perc 
                            from (SELECT age, count(*) as total,
				            sum(case when(accident=1) then 1 ELSE 0 END) as acc_sum
                            from tbl_main_quest group by age) t group by t.age order by t.age`);
        data.forEach( d => arr.push(d.perc));
        return arr;
    }

    parseJson( data){
        data = JSON.parse( data.data);
        let cols = Object.keys( data).join(',');
        let vals = Object.values( data).join(',');
        return { cols:cols, vals:vals};
    }

    init_arr( len){
        let arr = [];
        for( let i = 0; i < len; i++)
            arr.push(0);
        return arr;
    }

}

module.exports = Service.getInstance();