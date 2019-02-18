import FirObject from '../../models/FirObject';
export default class FirObjectDetails {
$kids:any = {};
_node:HTMLDivElement = document.createElement('div');
_back:HTMLDivElement = document.createElement('div');
_dataFields:any = {
	'date':'Дата записи',
	'name':'Наименование',
	'encumbrances':'Обременения'
};
hidden = true;
constructor(props?:any) {
	this._back.setAttribute('class','firobjects-popup');
	if(this.hidden) this._back.classList.add('hddn');
	this._back.appendChild(this._node);
}
update(firobject:FirObject) {
	this.toggle(true);

	var data = firobject.details;
	var df = document.createDocumentFragment();
	for(var i in this._dataFields) {
		let dt = document.createElement('dt'),
			dd = document.createElement('dd'),
			label = this._dataFields[i],
			value;
		
		df.appendChild(dt);
		df.appendChild(dd);

		if(i=='encumbrances') value = data[i] ? 'Зарегистрированы' : 'Не зарегистрированы';
		else if(i=='name') value = data.name || data.desc || '';
		else if(i=='date') value = data.dateString;
		else value = data[i];

		dt.innerText = label.toString();
		dd.innerText = value.toString();
	}

	//var prev = this._node.getElementsByTagName('dl')[0];
	//if(prev) this._node.replaceChild(dl, prev);
	//else this._node.appendChild(dl);
	this.title = firobject.cn;
	return this.reset(df);
}
set title(text:string) {
	this.$kids.title.innerText = text;
}
reset(df?:DocumentFragment) {
	var dl = this.$kids.dlist, cc;
	while(cc = dl.firstElementChild) dl.removeChild(cc);
	if(df) dl.appendChild(df);
	return this;
}
toggle(st?:boolean|null) {
	if(true===st) {
		this._back.classList.remove('hddn');
		this.hidden = false;
	}
	else if(false===st) {
		this._back.classList.add('hddn')
		this.hidden = true;
	}
	else this.toggle(this.hidden);
}
get node() {
	var head = document.createElement('h2'),
		title = document.createElement('u'),
		close = document.createElement('s'),
		dl = document.createElement('dl');
	
	head.appendChild(title);
	head.appendChild(close);
	title.innerText = '00:0000:000:000:00';
	close.addEventListener('click',this.toggle.bind(this,null));
	
	this.$kids.title = title;
	this.$kids.dlist = dl;
	
	this._node.appendChild(head);
	this._node.appendChild(dl);
	return this._back;
}
}
/*
Модальное окно содержит табличку со следующей информацией:

- "Дата записи" : Значение поля "objectData"."dateCreated"

- "Наименование" : Значение из "objectData"."name", если поля нет, то
значение из "objectData"."objectDesc"

- "Обременения": true = "Зарегистрированы", false = "Не
зарегистрированы". В зависимости от поля "type" значение из:

     parcel -> "parcelData"."encumbrancesExists",

     building -> "building"."encumbrancesExists",

     construction -> "construction"."encumbrancesExists",

     flat -> "flat"."encumbrancesExists",

     для прочих типов ничего не выводим
*/