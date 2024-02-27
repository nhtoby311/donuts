import {
	OrbitControls,
	PerspectiveCamera,
	useHelper,
	useVideoTexture,
} from '@react-three/drei';
import ModelScene from './ModelScene';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import MouseCameraRig from './MouseCameraRig';
import { Perf } from 'r3f-perf';
import { useEffect, useRef, useState } from 'react';
import { SpotLightHelper } from 'three';
import { useFrame } from '@react-three/fiber';

import { easing } from 'maath';

export default function Scene() {
	const [startAnimate, setStartAnimate] = useState(false);

	const [enableRig, setEnableRig] = useState(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setStartAnimate(true);
		}, 3000);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		let timeout;

		if (startAnimate) {
			timeout = setTimeout(() => {
				setEnableRig(true);
			}, 1000);
		}

		return () => clearTimeout(timeout);
	}, [startAnimate]);

	return (
		<>
			{/* <mesh>
				<boxGeometry attach='geometry' />
				<meshBasicMaterial attach='material' color='hotpink' />
			</mesh> */}

			<Perf position={'top-left'} />

			{/* <PerspectiveCamera
				makeDefault
				fov={15}
				near={0.1}
				far={2}
				position={[1.2, 0.12, -0.02]}
				rotation={[0, Math.PI / 2, 0]}
			/> */}

			<CameraMovement start={startAnimate} />

			{/* <ambientLight intensity={1} /> */}

			{/* <Model /> */}

			<MouseCameraRig
				//enabled={enableRig === true}
				startX={1.2}
				startY={0.12}
				startZ={0}
				propotion={0.03}
				depthAxis='X'
				delayInteractive={enableRig === true}
				easingStartTime={1.5}
			/>

			{/* 
			<mesh>
				<boxGeometry args={[0.2, 0.2, 0.2]} />
				<meshBasicMaterial color='hotpink' />
			</mesh> */}

			<ModelScene />

			{/* <EffectComposer>
				<DepthOfField
					focusDistance={0.106}
					focalLength={0.08}
					bokehScale={3}
					height={480}
				/>
			</EffectComposer> */}

			{/* <OrbitControls /> */}
		</>
	);
}

function CameraMovement({ start }) {
	const lookAtRef = useRef();

	useFrame(({ camera, clock }, delta) => {
		if (start) {
			//Animate lookAtRef
			easing.damp3(lookAtRef.current.position, [0, 0.1, 0], 2.0, delta);

			//Animate camera
			easing.damp3(camera.position, [1.2, 0.12, -0.02], 2.0, delta);
		}

		//Make camera look at lookAtRef
		camera.lookAt(lookAtRef.current.position);
	});

	return (
		<>
			<object3D ref={lookAtRef} position={[0.4, -0.1, 0]}>
				{/* <boxGeometry args={[0.1, 0.1, 0.1]} />
				<meshBasicMaterial attach='material' color='hotpink' /> */}
			</object3D>

			<PerspectiveCamera
				makeDefault
				fov={15}
				near={0.01}
				far={10}
				position={[1.5, 0.3, -0.02]}
				rotation={[0, Math.PI / 2, 0]}
			/>
		</>
	);
}