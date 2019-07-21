import React, { Component } from 'react';
import Header from './header';
import Deck from './deck';
import Toolbar from './toolbar';
import Display from './display';
let pdf = 'https://spotlight-storage.s3.amazonaws.com/003-10-07-html-5-scalable-vector-graphics.pdf';
class Body extends Component {
	state = {
		displayPage: 1,
		numPages: NaN
	};
	setPages = (numPages) => {
		this.setState(numPages);
	};
	handleNext = () => {
		if (this.state.displayPage != this.state.numPages) {
			this.setState({ displayPage: this.state.displayPage + 1 });
		}
	};
	handleBack = () => {
		if (this.state.displayPage != 1) {
			this.setState({ displayPage: this.state.displayPage - 1 });
		}
	};
	render() {
		return (
			<React.Fragment>
				<Header />
				<Deck content={pdf} passPages={this.setPages} pageNumber={this.state.displayPage} />
				<Toolbar onNext={this.handleNext} onBack={this.handleBack} numPages={this.state.numPages} />
				<Display onClick={this.next} content={pdf} pageNumber={this.state.displayPage} />
			</React.Fragment>
		);
	}
}

export default Body;
