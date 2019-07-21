import React, { Component } from 'react';
class Toolbar extends Component {
	render() {
		return (
			<div className="toolbar">
				<button onClick={this.props.onBack}>Back</button>

				<button onClick={this.props.onNext}>Next</button>
			</div>
		);
	}
}

export default Toolbar;
