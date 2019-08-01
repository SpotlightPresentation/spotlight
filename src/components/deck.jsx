import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class Deck extends Component {
	state = {
		numPages: NaN
	};
	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
		this.props.passPages({ numPages });
	};

	render() {
		let cards = [];

		for (let x = 1; x <= this.state.numPages; x++) {
			if (this.props.pageNumber === x) {
				cards.push(
					<div key={x} className="card selected">
						<Page width={150} pageNumber={x} />
					</div>
				);
			} else {
				cards.push(
					<div key={x} onClick={() => this.props.onClick(x)} className="card">
						<Page width={150} pageNumber={x} />
					</div>
				);
			}
		}
		return (
			<div className="deck">
				<Document
					error=""
					noData=""
					className="deckDoc"
					file={this.props.content}
					onLoadSuccess={this.onDocumentLoadSuccess}
				>
					{cards}
				</Document>
			</div>
		);
	}
}

export default Deck;
