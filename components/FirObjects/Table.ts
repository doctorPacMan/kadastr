import FirObject from '../../models/FirObject';
export default class FirObjectsTable {
_emitter = document.createElement('em');
//_emitter = new EventTarget(); не поддерживается Edge
_table:HTMLTableElement = document.createElement('table');
_field:Array<any> = [
	{field:'objectCn', title:'Кад. номер'},
	{field:'objectTypeName', title:'Тип'},
	{field:'addressNotes', title:'Адрес'}
];
constructor(props?:any) {
	this._table.setAttribute('class','firobjects-table');
}
onClick(callback:any) {
	this._emitter.addEventListener('click',callback);
}
onclick(objectId:string, e:Event) {
	var evnt = new CustomEvent('click',{detail:objectId});
	this._emitter.dispatchEvent(evnt);
}
getObjectTableRow(firobject:FirObject) {
	var tr = document.createElement('tr');
	this._field.forEach((f)=>{
		var value = firobject.data[f.field],
			td = document.createElement('td'),
			txt = document.createTextNode(value);
		if(f.field=='addressNotes') {
			let a = document.createElement('span');
			a.appendChild(txt);
			td.appendChild(a);
		}
		else if(f.field=='objectCn') {
			let a = document.createElement('a');
			a.addEventListener('click',this.onclick.bind(this,firobject.data.objectId));
			a.appendChild(txt);
			td.appendChild(a);
		}
		else td.appendChild(txt);
		tr.appendChild(td);
	})
	return tr;
}
reset(df?:DocumentFragment) {
	var tr, tbody = this._table.getElementsByTagName('tbody')[0];
	while(tr = tbody.firstElementChild) tbody.removeChild(tr);
	//if(df) dl.appendChild(df);
	return this;
}
update(data:any) {
	var tbody = this._table.getElementsByTagName('tbody')[0];
	this.reset();	
	for(var i=0; i<data.length; i++) {
		let tr = this.getObjectTableRow(data[i]);
		tbody.appendChild(tr);
	};
}
get node() {
	var thead = document.createElement('thead'),
		tbody = document.createElement('tbody'),
		tr = document.createElement('tr');

	this._field.forEach((f)=>{
		var th:any = document.createElement('th');
		if(f.field) th.setAttribute('id',f.field);
		th.appendChild(document.createTextNode(f.title));
		tr.appendChild(th);
	});
	thead.appendChild(tr);

	this._table.appendChild(thead);
	this._table.appendChild(tbody);
	return this._table;
}
};