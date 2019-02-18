import React from 'react';
export default class Header extends React.PureComponent {
props:any;
constructor(props:any) {super(props)}
render() {
	return React.createElement('h2',{},`${ this.props.text }`);
}
};