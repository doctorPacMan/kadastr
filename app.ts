import React from 'react';
import ReactDOM from 'react-dom';
import ComponentHeader from './components/Header/Header';
import ComponentFirObjects from './components/FirObjects/FirObjects';
export default class App {
constructor() {
	var root = document.querySelector('#stage'),// App container
		host:HTMLElement|null = null;
	
	if(host = document.getElementById('stage-header')) {
		let text = 'Поиск объектов недвижимости по части кадастрового номера',
			elem = React.createElement(ComponentHeader,{text});
		ReactDOM.render(elem, host);
	}
	if(host = document.getElementById('stage-bodyer')) {
		let elem = React.createElement(ComponentFirObjects,{root});
		ReactDOM.render(elem, host);
	}
}
};