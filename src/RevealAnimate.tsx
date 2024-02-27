import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';
import styled from 'styled-components';

type Props = {
	renderChild: (ref: any) => JSX.Element;
	justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
};

function findTextContentNode(node: any): any {
	if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
		return node;
	}

	for (const child of node.childNodes) {
		const textNode = findTextContentNode(child);
		if (textNode) return textNode;
	}

	return null;
}

export default function RevealAnimate({
	renderChild,
	justify = 'flex-start',
}: Props) {
	const firstRender = useRef(false);

	const [scope, animate] = useAnimate();

	const [childRef, setChildRef] = useState<any>(false);

	const refCallback = useCallback((node: any) => {
		if (node !== null) {
			setChildRef(node);
		}
	}, []);

	useEffect(() => {
		if (firstRender.current && childRef) {
			const textNode = findTextContentNode(childRef);
			if (!textNode) return;

			const input = textNode.textContent;
			const container = textNode.parentElement;

			const output = (input as string).split(/\s+/); // Break text into words

			const span = document.createElement('span');
			span.innerHTML = output
				.map((word) => {
					return `<div class="word-cont"><div class="animate-stagger">${word}</div></div>`;
				})
				.join(' ');

			container.replaceChild(span, textNode);

			animate(
				'.animate-stagger',
				{
					opacity: [0, 1],
					x: ['-150%', '0%'], // Horizontal slide
				},
				{
					duration: 1,
					ease: [0.64, 0.13, 0.23, 0.99],
				}
			);
		} else {
			firstRender.current = true;
		}
	}, [childRef]);

	return (
		<Container justify={justify} ref={scope}>
			{renderChild(refCallback)}
		</Container>
	);
}

const Container = styled.div<any>`
	width: 100%;

	span {
		display: flex;
		flex-wrap: wrap; // Wrap words to the next line if needed
		justify-content: ${(props) => props.justify};
		gap: 5px; // Space between words
	}

	.word-cont {
		//margin: 0 5px; // Space between words
		overflow: hidden;
	}
`;
