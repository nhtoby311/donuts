import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from './store/store';
import { motion } from 'framer-motion';

export default function Loading() {
	const { progress } = useProgress();
	const { setGlobalState } = useStore();

	useEffect(() => {
		let timeout: any;

		if (progress === 100) {
			timeout = setTimeout(() => {
				setGlobalState('landing');
			}, 1000);
		}

		return () => clearTimeout(timeout);
	}, [progress]);

	return (
		<Wrapper animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<P>{progress}</P>
		</Wrapper>
	);
}

const Wrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #ffbe5e;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 2rem;
	z-index: 1000;
	pointer-events: none;
`;

const P = styled.p`
	font-size: 293px;
	font-weight: 800;
	color: #fff5d0;
`;
