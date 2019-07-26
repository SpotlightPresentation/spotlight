import React, { Component } from 'react';
import factory from './factory';
class Shadow extends Component {
	render() {
		let divStyle = {
			height: this.props.height,
			width: this.props.width
		};

		return (
			<svg
				className="drawing shadow"
				onClick={this.props.onClick}
				onMouseMove={this.props.onMouseMove}
				style={divStyle}
			>
				{this.props.shadow ? factory(this.props.shadow, this.props.height, this.props.width) : null}
			</svg>
		);
	}
}

export default Shadow;
