import React, { Component } from 'react';
class Toolbar extends Component {
	render() {
		return (
			<div className="toolbar">
				<h3>{this.props.tool}</h3>
				<button onClick={() => this.props.onTool('zoom')}>Zoom</button>
				<button onClick={() => this.props.onTool('arrow')}>Arrow</button>
				<button onClick={() => this.props.onTool('text')}>Text</button>
				<button onClick={() => this.props.onTool('hilight')}>Hi-Light</button>
			</div>
		);
	}
}

export default Toolbar;
