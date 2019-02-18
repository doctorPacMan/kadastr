export default class FirObject {
id:string;
cn:string;
data:any = {objectData:null};
_details:any = null; //для загруженного objectData
_typeLabels:any = {
	parcel: "Земельный участок",
	flat: "Квартира",
	building: "Здание",
	construction: "Сооружение"
};
constructor(objectId:string, json:any) {

	this.id = objectId;
	this.cn = json.objectCn.toString();
	this.data = Object.assign(this.data, json);
	this.data.objectTypeName = this._typeLabels[json.objectType] || json.objectType;

	if(objectId != json.objectId.toString()) {
		console.warn('!!!', this);
	}
}
get details() {return this._details}
set details(json:any) {this._details = this.attachObjectData(json)}
validateCadNum(cnum:string) {
/*
	Согласно Приказу Министерства экономического развития Российской Федерации «Об утверждении порядка кадастрового деления территории
	Российской Федерации, порядка присвоения объектам недвижимости кадастровых номеров, номеров регистрации, реестровых номеров границ»,
	кадастровый номер земельного участка выглядит так: АА:ВВ:CCCCСCC:КК, где
	АА — кадастровый округ.
	ВВ — кадастровый район.
	CCCCCCС — кадастровый квартал состоит из 6 или 7 цифр.
	КК — номер земельного участка.	
*/
	var re = new RegExp('^(\\d{1,2}):(\\d{1,2}):([0-9]{6,7}):([0-9]*)$','g'),
		nv = re.exec(cnum);
	console.log('test "'+cnum+'"', re.test(cnum));re.lastIndex = 0;
	if(nv!==null) console.log('exec',nv);
}
attachObjectData(data:any) {
/*
- "Дата записи" : Значение поля "objectData"."dateCreated"
- "Наименование" : Значение из "objectData"."name", если поля нет, то значение из "objectData"."objectDesc"
- "Обременения": true = "Зарегистрированы", false = "Не	зарегистрированы". В зависимости от поля "type" значение из:
	parcel -> "parcelData"."encumbrancesExists",
	building -> "building"."encumbrancesExists",
	construction -> "construction"."encumbrancesExists",
	flat -> "flat"."encumbrancesExists",
*/	
	this.data.objectData = data;

	var date = new Date(data.dateCreated),
		dateString:string = 'Invalid Date';
	if(!isNaN(date.getTime())) {// valid Date
		let day = date.getDate(),
			mon = date.getMonth()+1;
		dateString = date.getFullYear().toString();
		dateString += '/'+(mon>=10 ? mon : '0'+mon);
		dateString += '/'+(day>=10 ? day : '0'+day);
	}

	var type = this.data.objectType,
		encumbrances:boolean|null;
	switch(type) {
		case 'parcel': encumbrances = !!data.parcelData.encumbrancesExists;
		break;
		case 'construction':
		case 'building':
		case 'flat': encumbrances = !!data[type].encumbrancesExists;
		break;
		default: encumbrances = null;
	}

	return {
		desc: data.objectDesc,
		name: data.name,
		encumbrances,
		dateString,
		date
	};
}
update(json:any) {
	// TODO: instance update
	// var newdata = Object.assign({},json);
	return this;
}
};