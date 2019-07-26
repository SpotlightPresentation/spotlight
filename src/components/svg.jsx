import React, { Component } from 'react';

class Svg extends Component {
	state = {
		height: this.props.height,
		width: this.props.width
	};

	render() {
		for (let icon of this.props.SVGs) {
			if (icon.startX > icon.endX) {
				icon.endX = [ icon.startX, (icon.startX = icon.endX) ][0];
			}
			if (icon.startY > icon.endY) {
				icon.endY = [ icon.startY, (icon.startY = icon.endY) ][0];
			}
			icon.startX = icon.startX / 10000 * this.state.width;
			icon.startY = icon.startY / 10000 * this.state.height;
			icon.endX = icon.endX / 10000 * this.state.width;
			icon.endY = icon.endY / 10000 * this.state.height;
			let draw = SVG('SVG').size(this.state.height, this.state.width);
			draw
				.rect(icon.endX - icon.startX, icon.endY - icon.startY)
				.move(icon.startX, icon.startY)
				.attr({ fill: '#f06' });
		}
		return <svg height={this.state.height} width={this.state.width} id="SVG" />;
	}
}

export default Svg;
