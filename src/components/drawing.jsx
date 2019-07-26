import React, { Component } from 'react';
import factory from './factory';
class Drawing extends Component {
	state = {};
	render() {
		let divStyle = {
			height: this.props.height,
			width: this.props.width
		};
		let icons = [];
		for (let icon of this.props.SVGs) {
			if (icon.type === 'hilight') {
				icons.push(factory(icon, this.props.height, this.props.width));
			} else if (icon.type === 'arrow') {
				icons.push(factory(icon, this.props.height, this.props.width));
			}
		}
		return (
			<svg className="drawing" style={divStyle}>
				{icons}
			</svg>
		);
	}
}

export default Drawing;
