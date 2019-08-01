import React, { Component } from 'react';
class Toolbar extends Component {
	render() {
		let arrow = false;
		let text = false;
		let hilight = false;
		if (this.props.tool === 'arrow') {
			arrow = true;
		} else if (this.props.tool === 'text') {
			text = true;
		} else if (this.props.tool === 'hilight') {
			hilight = true;
		}
		return (
			<div className="toolbar">
				<button className={arrow ? 'selectedBtn' : null} onClick={() => this.props.onTool('arrow')}>
					Arrow
				</button>
				<button className={text ? 'selectedBtn' : null} onClick={() => this.props.onTool('text')}>
					Text
				</button>
				<button className={hilight ? 'selectedBtn' : null} onClick={() => this.props.onTool('hilight')}>
					Hi-Light
				</button>
			</div>
		);
	}
}

export default Toolbar;
