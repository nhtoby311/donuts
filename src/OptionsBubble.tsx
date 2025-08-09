import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import CameraSVG from './CameraSVG';
import CrossSVG from './CrossSVG';
import { useStore } from './store/store';

type OptionsBubbleProps = {
	children?: React.ReactNode;
	size?: string;
	className?: string;
	onClick?: () => void;
};

const OptionsBubble: React.FC<OptionsBubbleProps> = ({
	children,
	size,
	className,
	onClick,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	function closeOptions() {
		setIsOpen(false);
	}

	const setCameraPosition = useStore((state) => state.setCameraPosition);
	return (
		<Wrapper>
			<BubbleContainer
				className={className}
				onClick={() => {
					onClick?.();
					setIsOpen(!isOpen);
				}}>
				<AnimatePresence mode='popLayout'>
					{!isOpen ? (
						<SVGCont
							key={'camera'}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}>
							<CameraSVG />
						</SVGCont>
					) : (
						<SVGCont
							key={'cross'}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}>
							<CrossSVG />
						</SVGCont>
					)}
				</AnimatePresence>
			</BubbleContainer>

			<AnimatePresence mode='wait'>
				{isOpen && (
					<OptionsContainer
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.2 }}>
						<BubbleContainer
							onClick={() => {
								closeOptions();
								setCameraPosition([
									0.5729422674024912, 0.023492594187275853,
									-0.35013878993864206,
								]);
							}}>
							1
						</BubbleContainer>
						<BubbleContainer
							onClick={() => {
								closeOptions();
								setCameraPosition([
									-0.48801586298235544, 0.4772627328310328,
									0.25409429285832513,
								]);
							}}>
							2
						</BubbleContainer>
						<BubbleContainer
							onClick={() => {
								closeOptions();
								setCameraPosition([
									0.45034336889717613, 0.1386964474150724,
									-0.12373525599935827,
								]);
							}}>
							3
						</BubbleContainer>
					</OptionsContainer>
				)}
			</AnimatePresence>
		</Wrapper>
	);
};

export default OptionsBubble;

const Wrapper = styled.div`
	position: relative;
	display: flex;
`;

const BubbleContainer = styled.div`
	position: relative;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	border: 2px solid rgba(255, 255, 255, 0.5);
	color: white;

	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	cursor: pointer;
	pointer-events: all;
`;

const OptionsContainer = styled(motion.div)`
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 10px;
	bottom: calc(100% + 10px);
`;

const SVGCont = styled(motion.div)`
	display: flex;
`;
