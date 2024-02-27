import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Loading from './Loading';
import { useStore } from './store/store';
import { AnimatePresence } from 'framer-motion';

function App() {
	const globalState = useStore((state) => state.globalState);

	return (
		<>
			<div className='background-canvas'>
				<Canvas flat camera={{ fov: 20, near: 0.01, far: 10 }}>
					<Scene />
				</Canvas>
			</div>

			<AnimatePresence mode='wait'>
				{globalState === 'loading' && <Loading />}
			</AnimatePresence>
		</>
	);
}

export default App;
