import {
	CameraControls,
	OrbitControls,
	PerformanceMonitor,
	PerspectiveCamera,
	useHelper,
	useVideoTexture,
} from '@react-three/drei';
import ModelScene from './ModelScene';
import { Model } from './Model';
import {
	DepthOfField,
	EffectComposer,
	TiltShift2,
} from '@react-three/postprocessing';
import MouseCameraRig from './MouseCameraRig';
import { Perf } from 'r3f-perf';
import { useEffect, useRef, useState } from 'react';
import { SpotLightHelper } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import { easing } from 'maath';
import { useStore } from './store/store';
import { useControls } from 'leva';

export default function Scene() {
	const [startAnimate, setStartAnimate] = useState(false);

	const [enableRig, setEnableRig] = useState<boolean | null>(null);

	const [graphicsLevel, setGraphicsLevel] = useState<1 | 2>(2);

	const cameraControlsRef = useRef<CameraControls>(null);

	const { camera } = useThree();

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

	const cameraPosition = useStore((state) => state.cameraPosition);

	useEffect(() => {
		if (cameraPosition && cameraControlsRef.current) {
			cameraControlsRef.current.setPosition(
				cameraPosition[0],
				cameraPosition[1],
				cameraPosition[2],
				true
			);
		}
	}, [cameraPosition]);

	useEffect(() => {
		if (startAnimate && cameraControlsRef.current) {
			// Set camera boundaries to keep it within the room
			cameraControlsRef.current.minDistance = 0.3; // Minimum distance from target
			cameraControlsRef.current.maxDistance = 0.8; // Maximum distance from target
			// cameraControlsRef.current.minPolarAngle = 0; // Minimum vertical angle (0 = looking down)
			// cameraControlsRef.current.maxPolarAngle = Math.PI; // Maximum vertical angle (PI = looking up)
			// cameraControlsRef.current.minAzimuthAngle = -Math.PI; // Minimum horizontal rotation
			// cameraControlsRef.current.maxAzimuthAngle = Math.PI; // Maximum horizontal rotation

			// Set camera FOV and zoom using useThree camera
			if (camera.type === 'PerspectiveCamera') {
				(camera as any).fov = 22;

				camera.updateProjectionMatrix();
			}

			// Set initial camera position and target
			cameraControlsRef.current.setPosition(0.37, 0.47, -0.03, false);
			cameraControlsRef.current.setTarget(0.2, -0.1, 0, false);

			// Temporarily slow down animation for the initial movement
			const originalSmoothTime = cameraControlsRef.current.smoothTime;
			cameraControlsRef.current.smoothTime = 1.2; // Slower animation (3 seconds)

			// Animate to target position and lookAt target
			cameraControlsRef.current.setPosition(0.67, 0.13, -0.02, true);
			cameraControlsRef.current.setTarget(0, 0.085, 0, true);

			// Reset smoothTime after animation completes

			const timeout = setTimeout(() => {
				if (cameraControlsRef.current) {
					cameraControlsRef.current.smoothTime = originalSmoothTime;
				}
			}, 4000); // Reset after 4 seconds (a bit longer than animation)

			return () => clearTimeout(timeout);
		}
	}, [startAnimate, camera]);

	// useFrame(({ camera }) => {
	// 	console.log('Camera position:', camera.position);
	// 	console.log('Camera rotation:', camera.rotation);
	// 	console.log('camera far:', camera.far);
	// 	console.log('camera near:', camera.near);
	// });

	return (
		<>
			{/* <mesh>
				<boxGeometry attach='geometry' />
				<meshBasicMaterial attach='material' color='hotpink' />
			</mesh> */}

			{/* <Perf position={'top-right'} /> */}

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

			{/* <CameraMovement start={startAnimate} /> */}

			{/* <ambientLight intensity={1} /> */}

			<Model />

			{/* <MouseCameraRig
				//enabled={enableRig === true}
				startX={1.2}
				startY={0.12}
				startZ={-0.02}
				propotion={0.03}
				depthAxis='X'
				delayInteractive={enableRig === true}
				easingStartTime={1.5}
			/> */}

			<CameraControls ref={cameraControlsRef} />

			{/* 
			<mesh>
				<boxGeometry args={[0.2, 0.2, 0.2]} />
				<meshBasicMaterial color='hotpink' />
			</mesh> */}

			{/* <ModelScene /> */}

			<EffectComposer>
				{graphicsLevel === 2 ? (
					<DepthOfField
						focusDistance={0.26}
						focalLength={0.15}
						bokehScale={5.3}
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
			easing.damp3(camera.position, [0.89, 0.15, -0.08], 2.0, delta);
		}

		//Make camera look at lookAtRef
		camera.lookAt(lookAtRef.current.position);
	});

	return (
		<>
			<mesh ref={lookAtRef} position={[0.4, -0.1, 0]}>
				<boxGeometry args={[0.1, 0.1, 0.1]} />
				<meshBasicMaterial attach='material' color='hotpink' />
			</mesh>

			{/* <PerspectiveCamera
				makeDefault
				fov={14}
				near={0.01}
				far={10}
				position={[1.5, 1.2, -0.02]}
				rotation={[0, Math.PI / 2, 0]}
			/> */}
		</>
	);
}
