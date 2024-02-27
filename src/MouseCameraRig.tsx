import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { easing } from 'maath';

type Props = {
	startX?: number;
	startY?: number;
	startZ?: number;
	lookAt?: number[];
	alpha?: number;
	propotion?: number;
	propotionY?: number;
	curveRadius?: number;
	reset?: boolean;
	maxAngle?: number;
	depthAxis?: 'X' | 'Z';
	delayInteractive?: boolean;
	easingStartTime?: number;
};

export default function MouseCameraRig({
	startX,
	startY,
	startZ,
	lookAt,
	alpha = 0.025,
	propotion = 1,
	propotionY,
	curveRadius = 5,
	reset = false,
	maxAngle = Math.PI / 2,
	depthAxis = 'Z',
	delayInteractive = true,
	easingStartTime = 0,
}: Props) {
	const vec = new THREE.Vector3();
	const { pointer } = useThree();

	const propotionRef = useRef(0);

	const lerpAlphaRef = useRef(0);

	useFrame(({ camera }, delta) => {
		//if (!enabled) return;
		if (delayInteractive) {
			easing.damp(
				propotionRef,
				'current',
				propotion,
				easingStartTime,
				delta
			);
		}

		if (reset) {
			vec.set(startX || 0, startY || 0, startZ || 0);
			camera.position.lerp(vec, alpha);
			if (lookAt) camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
			return;
		}

		// Set n as the maximum angle in radians
		const n = maxAngle; // Set to π/2 for a max angle of 90 degrees, adjust as needed

		// Map pointer.x directly to the angle range [-n, n]
		const angle = pointer.x * n; // Maps -1 to -n, 0 to 0, and 1 to n

		const curvedDepthAxisFactor =
			(Math.cos(angle) - 1) * curveRadius * propotionRef.current;
		const curvedSideAxisFactor =
			Math.sin(angle) * curveRadius * propotionRef.current;

		// This is work for X axis is the depth axis of the scene. Swap if Z axis is the depth axis.
		const curvedX =
			(startX || 0) +
			(depthAxis === 'Z' ? curvedSideAxisFactor : curvedDepthAxisFactor);

		// Adjust curvedZ calculation to be relative to startZ
		const curvedZ =
			(startZ || 0) +
			(depthAxis === 'Z' ? curvedDepthAxisFactor : curvedSideAxisFactor);

		//console.log('curvedZ', curvedZ);

		vec.set(
			curvedX,
			(startY || 0) +
				pointer.y *
					(propotionY !== undefined
						? propotionY
						: propotionRef.current),
			curvedZ
		);

		if (delayInteractive) {
			easing.damp(lerpAlphaRef, 'current', alpha, easingStartTime, delta);
		}

		camera.position.lerp(vec, lerpAlphaRef.current);

		if (lookAt) camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
	});

	return null;
}
