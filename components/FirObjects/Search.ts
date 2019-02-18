export default class FirObjectsSearch {
_emitter = document.createElement('em');
//_emitter = new EventTarget(); не поддерживается Edge
_form:HTMLFormElement = document.createElement('form');
_input:HTMLInputElement = document.createElement('input');
_regex = new RegExp('^(\\d{2}):(\\d{2})([0-9:]*)$','g');
constructor(props?:any) {}
get node() {

	var fieldset = document.createElement('fieldset'),
		wrapper = document.createElement('div'),
		baton = document.createElement('button');

	fieldset.appendChild(wrapper);
	wrapper.appendChild(this._input);
	wrapper.appendChild(baton);

	this._input.setAttribute('placeholder','Кадастровый номер');
	//this._input.setAttribute('pattern',this._regex.toString());
	this._input.setAttribute('value','54:10:000000:18');
	this._input.addEventListener('keypress',this._onkeypress.bind(this));
	this._input.addEventListener('blur',this._validate.bind(this,undefined));
	baton.appendChild(document.createTextNode('Найти'));
	
	this._form.appendChild(fieldset);
	this._form.setAttribute('class','firobjects-query');
	this._form.setAttribute('method','get');
	this._form.addEventListener('submit',this.onSubmit.bind(this));
	return this._form;
}
onSearch(callback:any) {
	this._emitter.addEventListener('search',callback);
}
_validate(query?:string) {
	var re = this._regex,
		value = query || this._input.value,
		empty = 0 === value.length,
		valid = re.test(value);
	this._regex.lastIndex = 0;
	this._input.classList[(!empty && !valid) ? 'add' : 'remove']('invalid');
	//console.log('test "'+value+'"', empty, valid);
	return valid;
}
_onkeypress(e:KeyboardEvent) {
	// Строка ввода допускает вводить только цифры либо двоеточие
	var cc = e.charCode,
		charCode = e.key.charCodeAt(0);
	//console.log(cc, charCode);
	if(cc === 0) return true;
	else if(cc === 13) return true; // Enter
	else if(charCode>=48 && charCode<=58) return true;// : 0-9
	else {e.preventDefault();return false}
}
onSubmit(e:Event) {
	e.preventDefault();
	var query = this._input.value,
		valid = this._validate(query);

	if(!valid) {

	} else {
		var evnt = new CustomEvent('search',{detail:query});
		this._emitter.dispatchEvent(evnt);
	}
}
};