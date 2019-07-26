import React, { Component } from 'react';
export default function(icon, height, width) {
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
			<rect
				key={Math.random()}
				x={startX}
				y={startY}
				width={endX - startX}
				height={endY - startY}
				fill="yellow"
				opacity="0.3"
			/>
		);
	} else if (icon.type === 'arrow') {
		let startX = icon.startX / 10000 * width;
		let startY = icon.startY / 10000 * height;
		let endX = icon.endX / 10000 * width;
		let endY = icon.endY / 10000 * height;
		return <line key={Math.random()} x1={startX} y1={startY} x2={endX} y2={endY} stroke="red" strokeWidth={5} />;
	}
}
