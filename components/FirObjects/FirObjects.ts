import React from 'react';
import StorageFirObjects from '../../stores/FirObject';
import ComponentDetails from '../FirObjects/Details';
import ComponentSearch from '../FirObjects/Search';
import ComponentTable from '../FirObjects/Table';
export default class FirObjects extends React.Component {
props:any;
$root:any;// корневой DOM элемент приложения
$stor = new StorageFirObjects();
$kids:any = {
	query: new ComponentSearch(),
	table: new ComponentTable(),
	popup: new ComponentDetails(),
	empty: null
};
$refs:any = {
	container: React.createRef(),
	stage: React.createRef(),
	empty: React.createRef()
};
state = {
	viewState: 'IDLE',
	searchQuery: null,
	currentObject: null
}
constructor(props:any) {super(props);
	this.$root = this.props.root;
}
render() {
	//console.log('FirObjects render', this.state);
	var empty = React.createElement('div',{
		className:'firobjects-empty',
		ref: this.$refs.empty
	},`Увы, по запросу ${this.state.searchQuery} ничего не найдено`);

	var props = {
			ref: this.$refs.stage,
			className: 'firobjects vs-'+this.state.viewState.toLowerCase()
		},
		wrapper = React.createElement('div', props, empty);
	
	return wrapper;
}
shouldComponentUpdate(np:any, ns:any, nc:any) {
	if(this.state.viewState !== ns.viewState) {
		let vs0 = this.state.viewState,
			vs1 = ns.viewState,
			cont = this.$refs.stage.current;
		cont.classList.remove('vs-'+vs0.toLowerCase());
		cont.classList.add('vs-'+vs1.toLowerCase());
	}
	return true;
}
async requestFirObjects(event:CustomEvent) {
	var query = event.detail;
	//console.log('requestFirObjects', query);
	this.$kids.empty.style.display = 'none';
	this.setState({ viewState: 'VIEW', searchQuery: query });

	var firobjects = await this.$stor.requestObjects(query),
		itemscount = Array.isArray(firobjects) ? firobjects.length : 0;
	this.$kids.table.update(firobjects);

	if(!itemscount) this.$kids.empty.style.display = null;
}
requestDetails(event:CustomEvent) {
	var objectId = event.detail,
		cmpDetails = this.$kids.popup;
	//console.log('requestDetails', objectId);
	this.setState({ currentObject: objectId });

	cmpDetails.title = 'Loading '+objectId;
	cmpDetails.reset().toggle(true);
	this.$stor.requestDetails(objectId).then((firobject)=>{
		cmpDetails.update(firobject);
	});
}
componentDidMount() {
	//console.log('Component mount');
	var container = this.$refs.stage.current;
	
	// уведомление "ничего не найдено"
	this.$kids.empty = this.$refs.empty.current;
	this.$kids.empty.style.display = 'none';
	
	// компонент таблицы
	this.$kids.table.onClick(this.requestDetails.bind(this));
	container.insertBefore(this.$kids.table.node, container.firstElementChild);
	
	// компонент Формы поиска
	this.$kids.query.onSearch(this.requestFirObjects.bind(this));
	container.insertBefore(this.$kids.query.node, container.firstElementChild);

	// компонент Модальное окно
	// внедряется в корневой элемент приложения
	var topchild = this.$root.firstElementChild;
	this.$root.insertBefore(this.$kids.popup.node, topchild);
}
test() {}
};