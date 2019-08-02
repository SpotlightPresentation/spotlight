import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Drawing from './drawing';
import Shadow from './shadow';
import socketIOClient from 'socket.io-client';
import Filepond from './filepond';
let headerHeight = 150;
const socket = socketIOClient('http://localhost:5000');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default class Display extends Component {
	state = {
		SVGs: [],
		shadow: null,
		height: null,
		width: null
	};
	componentWillMount() {
		if (window.location.pathname === '/audience') {
			headerHeight = 0;
		}
	}
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

	socketState = () => {
		socket.on('joinedDataReturn', (joinedData) => {
			console.log(joinedData);
			var data = JSON.parse(joinedData);
			this.setState({ SVGs: data, shadow: null });
		});
	};
	handleClick = (e) => {
		if (this.state.shadow) {
			if (
				this.state.shadow.content === '' ||
				(this.state.shadow.content === undefined && this.props.selectedTool === 'text')
			) {
				document.querySelector('#textCatcher').focus();
			} else {
				let arrayed = [ this.state.shadow ];
				let joined = arrayed.concat(this.state.SVGs);
				let data = JSON.stringify(joined);
				socket.emit('joinedData', data);
				this.socketState();
			}
		} else if (this.props.selectedTool !== 'none' && this.props.selectedTool !== 'text') {
			this.setState({
				shadow: {
					type: this.props.selectedTool,
					startX: e.nativeEvent.layerX / this.state.width * 10000,
					startY: e.nativeEvent.layerY / this.state.height * 10000,
					endX: e.nativeEvent.layerX / this.state.width * 10000,
					endY: e.nativeEvent.layerY / this.state.height * 10000,
					page: this.props.pageNumber
				}
			});
		} else {
			document.querySelector('#textCatcher').focus();
			this.setState({
				shadow: {
					type: this.props.selectedTool,
					endX: e.nativeEvent.layerX / this.state.width * 10000,
					endY: e.nativeEvent.layerY / this.state.height * 10000,
					content: '',
					page: this.props.pageNumber
				}
			});
		}
	};
	setContent = () => {
		if (this.props.selectedTool === 'text') {
			let shadow = { ...this.state.shadow };
			shadow.content = document.querySelector('#textCatcher').value;
			this.setState({ shadow });
		}
	};
	clearInput = () => {
		document.querySelector('#textCatcher').value = '';
	};

	componentDidMount() {
		this.socketState();
	}

	render() {
		return (
			<React.Fragment>
				{!this.props.content ? (
					<Filepond />
				) : (
					<Document className="display" file={this.props.content}>
						<input
							type="text"
							onChange={() => this.setContent()}
							onBlur={this.clearInput}
							id="textCatcher"
						/>
						<Page
							onRenderSuccess={this.setDrawing}
							height={window.innerHeight - headerHeight}
							pageNumber={this.props.pageNumber}
						/>
						<Drawing
							SVGs={this.state.SVGs}
							shadow={this.state.shadow}
							height={this.state.height}
							width={this.state.width}
							pageNumber={this.props.pageNumber}
						/>
						<Shadow
							shadow={this.state.shadow}
							onClick={this.handleClick}
							onMouseMove={this.handleMouseMove}
							height={this.state.height}
							width={this.state.width}
						/>
					</Document>
				)}
			</React.Fragment>
		);
	}
}
