import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Drawing from './drawing';
import Shadow from './shadow';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Display extends Component {
	state = {
		SVGs: [],
		shadow: null,
		height: null,
		width: null
	};
	setDrawing = () => {
		let page = document.querySelector('.display canvas');
		this.setState({ height: page.clientHeight, width: page.clientWidth });
	};
	handleMouseMove = (e) => {
		if (this.state.shadow) {
			let shadow = { ...this.state.shadow };
			shadow.endX = e.nativeEvent.layerX / this.state.width * 10000;
			shadow.endY = e.nativeEvent.layerY / this.state.height * 10000;
			this.setState({
				shadow
			});
		}
	};
	handleClick = (e) => {
		if (this.state.shadow) {
			let joined = this.state.SVGs.concat(this.state.shadow);
			this.setState({ SVGs: joined, shadow: null });
		} else if (this.props.selectedTool !== 'none') {
			this.setState({
				shadow: {
					type: this.props.selectedTool,
					startX: e.nativeEvent.layerX / this.state.width * 10000,
					startY: e.nativeEvent.layerY / this.state.height * 10000,
					endX: e.nativeEvent.layerX / this.state.width * 10000,
					endY: e.nativeEvent.layerY / this.state.height * 10000
				}
			});
		}
	};

	render() {
		return (
			<Document className="display" file={this.props.content}>
				<Page
					onRenderSuccess={this.setDrawing}
					height={window.innerHeight - 150}
					pageNumber={this.props.pageNumber}
				/>
				<Drawing SVGs={this.state.SVGs} height={this.state.height} width={this.state.width} />
				<Shadow
					shadow={this.state.shadow}
					onClick={this.handleClick}
					onMouseMove={this.handleMouseMove}
					height={this.state.height}
					width={this.state.width}
				/>
			</Document>
		);
	}
}
