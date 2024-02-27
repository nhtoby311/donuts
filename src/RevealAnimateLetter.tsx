import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';
import styled from 'styled-components';

type Props = {
	renderChild: (ref: any) => JSX.Element;
};

export default function AnimateLetterHorizontal({ title, className }: any) {
	const firstRender = useRef(true);
	const activeContainer = useRef('A');

	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (firstRender.current && title) {
			const input = title;

			// Select which container to update and animate
			const containerToUpdate =
				activeContainer.current === 'A' ? 'ContainerA' : 'ContainerB';
			const containerToAnimateOut =
				activeContainer.current === 'A' ? 'ContainerB' : 'ContainerA';
			activeContainer.current =
				activeContainer.current === 'A' ? 'B' : 'A'; // Toggle active container

			const output = Array.from(input as string); // Break text into letters

			const span = document.createElement('span');
			span.innerHTML = output
				.map(
					(letter) =>
						`<div class="letter-cont"><div class="animate-stagger">${letter}</div></div>`
				)
				.join('');

			const containerElementToUpdate = scope.current.querySelector(
				'#' + containerToUpdate
			);
			if (containerElementToUpdate) {
				// Check if there's a first child to replace, otherwise append
				if (containerElementToUpdate.firstChild) {
					containerElementToUpdate.replaceChild(
						span,
						containerElementToUpdate.firstChild
					);
				} else {
					containerElementToUpdate.appendChild(span);
				}

				// Animate out the old container if it has children
				const containerElementToAnimateOut =
					scope.current.querySelector('#' + containerToAnimateOut);
				if (
					containerElementToAnimateOut &&
					containerElementToAnimateOut.firstChild
				) {
					animate(
						`#${containerToAnimateOut} .animate-stagger`,
						{
							x: '100%', // Slide out to the right
							opacity: 0,
						},
						{
							duration: 0.5,
						}
					);
				}

				// Animate in the new container
				animate(
					`#${containerToUpdate} .animate-stagger`,
					{
						opacity: [0, 1],
						x: ['-150%', '0%'], // Horizontal slide
					},
					{
						duration: 1,
						delay: stagger(0.03), // Adjust stagger for letters
						ease: [0.64, 0.13, 0.23, 0.99],
					}
				);
			}
		} else {
			firstRender.current = true;
		}
	}, [title]);

	return (
		<Container ref={scope} className={className}>
			<span id='ContainerA' className='text'></span>
			<span id='ContainerB' className='text-absolute'></span>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	position: relative;

	.text {
		display: flex;
	}

	.text-absolute {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
	}

	.letter-cont {
		display: inline-block; // Display letters inline
		overflow: hidden;
	}
`;
