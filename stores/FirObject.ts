import FirObject from '../models/FirObject';
import DataLoader from './loader';
export default class StorageFirObjects {
loader = new DataLoader('GET');
_items:Array<FirObject> = [];
_index:any = {};
constructor(props?:any) {}
async requestDetails(objectId:string) {
	var firobject:any = this.getItemById(objectId);
	if(undefined === firobject) return null;
	else if(firobject.details) return firobject;
	else {
		var json:any = await this.loader.request('fir_lite_object',objectId);
		firobject.details = json.objectData;
		return firobject;
	}
}
async requestObjects(query?:string) {
	var json:any = await this.loader.request('fir_objects',query);
	//console.log('response>',json);
	var objects = this.push(json);
	return objects;
}
update(objectId:string, json:any):FirObject {
	var ndex = this._index[objectId],
		item = this._items[ndex];
	item.update(json);
	return item;
}
push(data:any|Array<any>):FirObject|Array<FirObject> {
	if(!Array.isArray(data)) return this.registerItem(data);
	else return data.map((v:any)=>this.registerItem(v));
}
getItemByCn(objectCn:string):FirObject|undefined {
	return this._items.find(v=>{return v.cn === objectCn});
}
getItemById(objectId:string):FirObject|undefined {
	return this._items.find(v=>{return v.id === objectId});
}
registerItem(json:any):FirObject {
	var objectId:string = json.objectId.toString(),
		firobject:any = this.getItemById(objectId);

	if(firobject) firobject.update(json);
	else {
		firobject = new FirObject(objectId, json);
		this._items.push(firobject);
		this._index[objectId] = this._items.length - 1;
	}
	return firobject;
}
}