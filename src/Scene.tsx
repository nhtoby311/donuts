import {
	OrbitControls,
	PerformanceMonitor,
	PerspectiveCamera,
	useHelper,
	useVideoTexture,
} from '@react-three/drei';
import ModelScene from './ModelScene';
import {
	DepthOfField,
	EffectComposer,
	TiltShift2,
} from '@react-three/postprocessing';
import MouseCameraRig from './MouseCameraRig';
import { Perf } from 'r3f-perf';
import { useEffect, useRef, useState } from 'react';
import { SpotLightHelper } from 'three';
import { useFrame } from '@react-three/fiber';

import { easing } from 'maath';
import { useStore } from './store/store';

export default function Scene() {
	const [startAnimate, setStartAnimate] = useState(false);

	const [enableRig, setEnableRig] = useState<boolean | null>(null);

	const [graphicsLevel, setGraphicsLevel] = useState<1 | 2>(2);

	const globalState = useStore((state) => state.globalState);

	useEffect(() => {
		if (globalState === 'landing') {
			setStartAnimate(true);
		}
	}, [globalState]);

	useEffect(() => {
		let timeout: any;

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

			{/* <Perf position={'top-left'} /> */}

			{/* <PerspectiveCamera
				makeDefault
				fov={15}
				near={0.1}
				far={2}
				position={[1.2, 0.12, -0.02]}
				rotation={[0, Math.PI / 2, 0]}
			/> */}

			<PerformanceMonitor
				onIncline={() => setGraphicsLevel(2)}
				onDecline={() => setGraphicsLevel(1)}
			/>

			<CameraMovement start={startAnimate} />

			{/* <ambientLight intensity={1} /> */}

			{/* <Model /> */}

			<MouseCameraRig
				//enabled={enableRig === true}
				startX={1.2}
				startY={0.12}
				startZ={-0.02}
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

			<EffectComposer>
				{graphicsLevel === 2 ? (
					<DepthOfField
						focusDistance={0.106}
						focalLength={0.02}
						bokehScale={3}
						height={480}
					/>
				) : (
					<TiltShift2 samples={10} blur={0.12} />
				)}
			</EffectComposer>

			{/* <OrbitControls /> */}
		</>
	);
}

function CameraMovement({ start }: any) {
	const lookAtRef = useRef<any>();

	useFrame(({ camera, clock }, delta) => {
		if (start) {
			//Animate lookAtRef
			easing.damp3(lookAtRef.current.position, [0, 0.1, 0], 2.0, delta);

			//Animate camera
			easing.damp3(camera.position, [0.9, 0.62, -0.02], 2.0, delta);
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
				fov={14}
				near={0.01}
				far={10}
				position={[1.5, 1.2, -0.02]}
				rotation={[0, Math.PI / 2, 0]}
			/>
		</>
	);
}
