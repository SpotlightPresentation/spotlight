import React, { Component } from 'react';
import Header from './header';
import Deck from './deck';
import Toolbar from './toolbar';
import Display from './display';
let pdf;
class Body extends Component {
	state = {
		displayPage: 3,
		numPages: NaN,
		tool: 'none'
	};
	getPages = (numPages) => {
		this.setState(numPages);
	};
	setPage = (page) => {
		this.setState({ displayPage: page });
	};
	setTool = (tool) => {
		this.setState({ tool: tool });
	};
	handleNext = () => {
		if (this.state.displayPage !== this.state.numPages) {
			this.setState({ displayPage: this.state.displayPage + 1 });
		}
	};
	handleBack = () => {
		if (this.state.displayPage !== 1) {
			this.setState({ displayPage: this.state.displayPage - 1 });
		}
	};
	handleKey = (e) => {
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			this.handleNext();
		}
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			this.handleBack();
		}
	};
	componentDidMount() {
		document.addEventListener('keydown', this.handleKey, false);
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
