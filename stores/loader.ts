export default class DataLoader {
	//API_HOST = 'https://rosreestr.ru';
	API_HOST = 'http://localhost:9000/rosreestr';
	API_PATH = '/fir_lite_rest/api/gkn';
	method:string = 'GET';
	constructor(method?:string) {
		this.method = method || 'GET';
	}
	async request(action?:string, data?:string) {
		var url:string = this.API_HOST+this.API_PATH+'/';
		url += (!action ? '' : (action+'/'));
		url += (data || '');
		
		if('fir_objects' === action) url += '*';
		//url = '/data/objects.json';
		//url = '/data/object2.json';
		// console.log('request:', url);
		return await this.transaction(url);
	}
	transaction(url:string, params?:string) {
		const xhr = new XMLHttpRequest();
		const postBody = !params ? null : this.getPostBody(params);
		const onreadystatechange = (xhr:XMLHttpRequest, resolve:Function) => {
			if(xhr.readyState!==4) return;
			else if(xhr.status!==200) resolve(this.fetchError(xhr));
			else resolve(this.fetchResponse(xhr.responseText));
		};
		
		xhr.open(this.method, url);

		if(this.method=='POST')
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		else xhr.setRequestHeader('Content-Type','text/plain');

		return new Promise((resolve:Function, reject:Function)=>{
			xhr.onreadystatechange = onreadystatechange.bind(this,xhr,resolve);
			xhr.send(postBody || null);
		});
	}
	getPostBody(params:any) {
		var j:string, body:Array<String> = [];
		for(j in params) body.push(j+'='+encodeURIComponent(params[j]));
		return body.join('&');
	}
	fetchError(xhr:any) {
		console.error('ERROR '+xhr.readyState+' '+xhr.status);
		console.error(xhr);
		return false;
	}
	fetchResponse(responseText:string) {
		var json = JSON.parse(responseText);
		return json;
	}
};
export {DataLoader};