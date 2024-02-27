import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Loading from './Loading';
import { useStore } from './store/store';
import { AnimatePresence } from 'framer-motion';
import RevealAnimate from './RevealAnimate';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RevealAnimateLetter from './RevealAnimateLetter';

function App() {
	const globalState = useStore((state) => state.globalState);

	const [revealText, setRevealText] = useState(false);

	useEffect(() => {
		let timeout: any;
		if (globalState === 'landing') {
			timeout = setTimeout(() => {
				setRevealText(true);
			}, 3500);
		}
		return () => clearTimeout(timeout);
	}, [globalState]);

	return (
		<>
			<div className='background-canvas'>
				<Canvas flat camera={{ fov: 20, near: 0.01, far: 10 }}>
					<Scene />
				</Canvas>
			</div>

			<div className='fixed-overlay'>
				<Contents>
					{revealText && (
						<>
							<StyledAnimateLetter title='DONUT.' />
							<Spacer />
							<RevealAnimate
								renderChild={(ref) => (
									<Pronounce ref={ref}>
										noun / do · nut
									</Pronounce>
								)}
							/>
							<RevealAnimate
								renderChild={(ref) => (
									<Description ref={ref}>
										A small usually ring-shaped piece of
										sweet fried dough
									</Description>
								)}
							/>
						</>
					)}
				</Contents>
			</div>

			<AnimatePresence mode='wait'>
				{globalState === 'loading' && <Loading />}
			</AnimatePresence>
		</>
	);
}

export default App;

const Contents = styled.div`
	display: flex;
	flex-direction: column;
	width: 700px;
	align-self: flex-start;
	margin-left: 40px;
	margin-top: 40px;
	position: relative;
	gap: 20px;

	@media (max-width: 768px) {
		width: 300px;
	}
`;

const Pronounce = styled.p`
	color: #fff5d0;
	font-size: 28px;
	font-style: normal;
	font-weight: 300;
	line-height: normal;

	@media (max-width: 768px) {
		font-size: 20px;
	}
`;

const Description = styled.p`
	color: #fff5d0;
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-top: 5px;

	width: 450px;

	@media (max-width: 768px) {
		font-size: 16px;
		width: auto;
	}
`;

const StyledAnimateLetter = styled(RevealAnimateLetter)`
	color: #fff5d0;
	font-size: 140px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	position: absolute;
	top: -50px;
	left: -12px;

	@media (max-width: 768px) {
		font-size: 80px;
		top: -35px;
		left: -5px;
	}
`;

const Spacer = styled.div`
	height: 110px;
	@media (max-width: 768px) {
		height: 50px;
	}
`;
