import React from 'react';
export default function(icon, height, width, animate) {
	let divStyle = {
		height: height,
		width: width
	};
	let animated = 'drawing';
	if (animate) {
		animated += ' animated fadeInUp';
	}
	if (icon.type === 'hilight') {
		let startX = icon.startX / 10000 * width;
		let startY = icon.startY / 10000 * height;
		let endX = icon.endX / 10000 * width;
		let endY = icon.endY / 10000 * height;

		if (startX > endX) {
			endX = [ startX, (startX = endX) ][0];
		}
		if (startY > endY) {
			endY = [ startY, (startY = endY) ][0];
		}

		return (
			<svg key={Math.random()} className={animated} style={divStyle}>
				<rect x={startX} y={startY} width={endX - startX} height={endY - startY} fill="yellow" opacity="0.4" />
			</svg>
		);
	} else if (icon.type === 'arrow') {
		let startX = icon.startX / 10000 * width;
		let startY = icon.startY / 10000 * height;
		let endX = icon.endX / 10000 * width;
		let endY = icon.endY / 10000 * height;
		let distance = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY));
		let angle = Math.atan2(startY - endY, startX - endX);
		let topX = Math.cos(angle + Math.PI / 8) * (distance / width * 60 + 20) + endX;
		let topY = Math.sin(angle + Math.PI / 8) * (distance / width * 60 + 20) + endY;
		let botX = Math.cos(angle - Math.PI / 8) * (distance / width * 60 + 20) + endX;
		let botY = Math.sin(angle - Math.PI / 8) * (distance / width * 60 + 20) + endY;
		let path = `M${startX} ${startY} L${endX} ${endY} L${topX} ${topY} L${botX} ${botY}L${endX} ${endY}`;
		return (
			<svg key={Math.random()} className={animated} style={divStyle}>
				<path
					className={animated}
					d={path}
					stroke="red"
					fill="red"
					strokeWidth={distance / width * 20}
					strokeLinecap="round"
				/>
			</svg>
		);
	} else if (icon.type === 'text') {
		let endX = icon.endX / 10000 * width;
		let endY = icon.endY / 10000 * height;
		return (
			<svg key={Math.random()} className={animated} style={divStyle}>
				<text className={animated} textAnchor="middle" x={endX} y={endY}>
					{icon.content ? icon.content : 'Type Something'}
				</text>
			</svg>
		);
	}
}
