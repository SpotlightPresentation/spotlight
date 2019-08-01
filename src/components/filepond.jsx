import React, { Component } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Our app
class Filepond extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleInit() {
		console.log('FilePond instance has initialised', this.pond);
	}

	render() {
		return (
			<div className="App">
				{/* Pass FilePond properties as attributes */}
				<FilePond
					ref={(ref) => (this.pond = ref)}
					files={this.state.files}
					allowMultiple={true}
					maxFiles={3}
					server="/api"
					oninit={() => this.handleInit()}
					onupdatefiles={(fileItems) => {
						// Set currently active file objects to this.state
						this.setState({
							files: fileItems.map((fileItem) => fileItem.file)
						});
					}}
				/>
			</div>
		);
	}
}
export default Filepond;
