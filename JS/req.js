//"ajax file" - 
class Req {

	constructor( baseUrl){
		this.baseUrl = baseUrl;
	}

	static getInstance( baseUrl, _new = false){

		if( _new)
			return new Req( baseUrl);

        if( !this.instance)
			this.instance  = new Req( baseUrl);
		else
			this.baseUrl = baseUrl;

        return this.instance;
	}
	
	//send URL to the server
	_request( url){
		return fetch( url)	//response = what we get from fetch = json with server response 
			.then( ( response) => {
				if( response.status !== 200) {
					console.log('Request returned with code: ' + response.status);
					return;
				}
				return response.json().then( ( data) => {
					return data;
				});
			}).catch(( err) =>  {
				console.log('Fetch Error :-S', err);
			});
	}

	//main public function - build the url (get URL and dict of parameters
	async request( refUrl, args, json = false){
		let reqstr;
		let keys;
		let idx = 0;

		if( !refUrl)
			return this.baseUrl;
		reqstr = this.baseUrl + refUrl;
		if( args){
			if( !json){
				keys = Object.keys( args);
				for( let elem of keys){
					if( !idx){
						reqstr+= '?' + elem + '=' + args[elem];
						idx = 1;
					}else
						reqstr+= '&' + elem + '=' + args[elem];
				}
			}else{
				reqstr+= '?data=' + JSON.stringify(args);
				console.log( reqstr);
			}	
		}
		return await this._request( reqstr);	//get server response
	}
    
}