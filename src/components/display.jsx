import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Display extends Component {
	render() {
		return (
			<Document className="display" file={this.props.content}>
				<Page height={window.innerHeight - 150} pageNumber={this.props.pageNumber} />
			</Document>
		);
	}
}
