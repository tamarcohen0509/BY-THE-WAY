'use strict'
//creates the queries
const mysql = require('mysql');

const DB_ENG = ['mysql'];

//connect to the DB
var config = {
    host : '127.0.0.1',
    user : 'root',
    port:3306,
    password: 'do782009',
    database: 'bytheway'    
}

//return promise with mysql pool (buffer of connections to DB)
class Database {
    constructor( config) {
        this.connection = mysql.createPool( config);
        console.log( 'connected to MYSQL');
    }
    query( sql, args) {
        return new Promise( ( resolve, reject) => {
            this.connection.query( sql, args, ( err, res) => {
                if ( err )
                    return reject( err);
                resolve( res);
            });
            
        });
    }
    close() {
        return new Promise(( resolve, reject ) => {
            this.connection.end( err => {
                if ( err)
                    return reject( err);
                resolve();
            });
        });
    }
}

  
class Rest {

    constructor(){
    }

    
    static getInstance(){
        if( !this.instance)
            this.instance  = new Rest();
        return this.instance;
    }

    static conf( engine, key, value){
        switch( engine){
            case 'mysql': config[key] = value; break;
            default: throw new Error( `<<Exception thrown by db_con.js Rest.conf>> Database engine ${engine} dosen't exist`); break;
        }        
    }

	//exec query
    rest(){
        this.params = arguments;
        this.chk_param();
        return this.exec_query();
    }

	//check if 'mysql' indicated
    chk_param(){
        if( this.params.length < 2) 
            throw new Error( 'rst():Mismatch params( needs[engine,query])');
        for( let i = 0; i < DB_ENG.length; i++)
            if( this.params[0] == DB_ENG[i]) return;
        throw new Error( '<<Exception thrown by db_con.js Rest.chk_param>> First param must be a known database engine');
    }

    exec_query(){
        switch( this.params[0]){
            case 'mysql': return this.mysql_query(); break;
            default: throw new Error( `<<Exception thrown by db_con.js line:110>> Database engine <${this.params[0]}> dosen't exist`); break;
        }
    }

	//create and run DB
    async mysql_query(){
        if( !this.db)
            this.db = await new Database( config);
        return await this.db.query( this.params[1]).catch();
    }

}

//return promise with DB inside
module.exports = {
    rst:function( engine, query){
        return Rest.getInstance().rest( engine, query);
    },
    conf:function( engine, key, value){
        Rest.conf( engine, key, value);
    }
}   