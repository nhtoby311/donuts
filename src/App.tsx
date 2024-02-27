import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import * as THREE from 'three';

function App() {
	return (
		<Canvas flat camera={{ fov: 20, near: 0.01, far: 10 }}>
			<Scene />
		</Canvas>
	);
}

export default App;
