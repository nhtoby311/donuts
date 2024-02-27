import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

function App() {
	return (
		<Canvas flat camera={{ fov: 20, near: 0.01, far: 10 }}>
			<Scene />
		</Canvas>
	);
}

export default App;
