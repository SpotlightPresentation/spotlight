import React, { Component } from 'react';
import Header from './header';
import Deck from './deck';
import Toolbar from './toolbar';
import Display from './display';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:5000');
let audience = false;
let pdf = 'https://spotlight-storage.s3.amazonaws.com/003-10-07-html-5-scalable-vector-graphics.pdf';
class Body extends Component {
	state = {
		displayPage: 1,
		numPages: NaN,
		tool: 'none'
	};
	componentWillMount() {
		if (window.location.pathname === '/audience') {
			require('./../audience.css');
			audience = true;
		}
	}
	socketState = () => {
		socket.on('pageReturn', (page) => {
			this.setState({ displayPage: JSON.parse(page) });
		});
	};
	getPages = (numPages) => {
		this.setState(numPages);
	};
	setPage = (page) => {
		socket.emit('page', JSON.stringify(page));
		// socket.on("pageReturn", page => {
		//   this.setState({ displayPage: JSON.parse(page) });
		// });
		this.socketState();
	};
	setTool = (tool) => {
		this.setState({ tool: tool });
	};
	handleNext = () => {
		if (this.state.displayPage !== this.state.numPages) {
			let page = this.state.displayPage + 1;
			socket.emit('page', JSON.stringify(page));
			// socket.on("pageReturn", page => {
			//   this.setState({ displayPage: JSON.parse(page) });
			// });
			this.socketState();
		}
	};
	handleBack = () => {
		if (this.state.displayPage !== 1) {
			let page = this.state.displayPage - 1;
			socket.emit('page', JSON.stringify(page));
			// socket.on("pageReturn", page => {
			//   this.setState({ displayPage: JSON.parse(page) });
			// });
			this.socketState();
		}
	};
	handleKey = (e) => {
		if (audience === false) {
			if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
				this.handleNext();
			}
			if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				this.handleBack();
			}
		}
	};

	componentDidMount() {
		document.addEventListener('keydown', this.handleKey, false);
		this.socketState();
	}
	render() {
		return (
			<React.Fragment>
				<Header />
				<Deck
					content={pdf}
					onClick={this.setPage}
					passPages={this.getPages}
					pageNumber={this.state.displayPage}
				/>
				<Toolbar onTool={this.setTool} numPages={this.state.numPages} tool={this.state.tool} />
				<Display selectedTool={this.state.tool} content={pdf} pageNumber={this.state.displayPage} />
			</React.Fragment>
		);
	}
}

export default Body;
