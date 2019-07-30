import React, { Component } from 'react';
import factory from './factory';

let past;
class Drawing extends Component {
	render() {
		let icons = [];

		let animate = [];
		for (let icon of this.props.SVGs) {
			if (past !== this.props.SVGs) {
				animate.push(factory(icon, this.props.height, this.props.width, true));
				past = this.props.SVGs;
			} else {
				icons.push(factory(icon, this.props.height, this.props.width, false));
			}
		}

		return (
			<React.Fragment>
				{animate}
				{icons}
			</React.Fragment>
		);
	}
}

export default Drawing;
