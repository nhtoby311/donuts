import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		Plane: THREE.Mesh;
		Circle: THREE.Mesh;
		Cube: THREE.Mesh;
		Filter: THREE.Mesh;
		potted_plant_04002: THREE.Mesh;
		UtensilsJar001_utensil08: THREE.Mesh;
		DonutLeft: THREE.Mesh;
		Torus002: THREE.Mesh;
		Torus002_1: THREE.Mesh;
		DonutRight: THREE.Mesh;
		Icing001: THREE.Mesh;
		DonutRight001: THREE.Mesh;
		Torus008: THREE.Mesh;
		Torus008_1: THREE.Mesh;
		DonutRight002: THREE.Mesh;
		Torus010: THREE.Mesh;
		Torus010_1: THREE.Mesh;
		DonutLeft001: THREE.Mesh;
		Torus012: THREE.Mesh;
		Torus012_1: THREE.Mesh;
		DonutFront: THREE.Mesh;
		Torus014: THREE.Mesh;
		Torus014_1: THREE.Mesh;
	};
	materials: {
		['Material.002']: THREE.MeshBasicMaterial;
		Ceramic: THREE.MeshBasicMaterial;
		Material: THREE.MeshBasicMaterial;
		['Material.003']: THREE.MeshStandardMaterial;
		PottedPlant_04: THREE.MeshBasicMaterial;
		UtensilsJar001_3K: THREE.MeshBasicMaterial;
		Dough: THREE.MeshBasicMaterial;
		Caramel: THREE.MeshBasicMaterial;
		Sprinkles: THREE.MeshBasicMaterial;
		['Dough.001']: THREE.MeshBasicMaterial;
		['Sprinkles.001']: THREE.MeshBasicMaterial;
		['Dough.001']: THREE.MeshBasicMaterial;
		['Icing.001']: THREE.MeshBasicMaterial;
		Chocolate: THREE.MeshBasicMaterial;
		Icing: THREE.MeshBasicMaterial;
	};
};

export function Model(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF('/donuts-full.glb') as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Plane.geometry}
				material={materials['Material.002']}
				material-side={THREE.FrontSide}
				position={[-0.091, 0.002, -0.001]}
				scale={2.037}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Circle.geometry}
				material={materials.Ceramic}
				position={[0.021, 0.006, -0.028]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube.geometry}
				material={materials.Material}
				material-side={THREE.FrontSide}
				position={[-0.185, 0.388, 0.094]}
				scale={0.386}
			/>
			{/* <mesh
				castShadow
				receiveShadow
				geometry={nodes.Filter.geometry}
				material={materials['Material.003']}
				position={[0.205, 0.253, -0.452]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.691, 0.38, 0.25]}
			/> */}
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.potted_plant_04002.geometry}
				material={materials.PottedPlant_04}
				position={[-0.447, 0.002, 0.388]}
				rotation={[Math.PI, -0.206, Math.PI]}
				scale={0.571}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.UtensilsJar001_utensil08.geometry}
				material={materials.UtensilsJar001_3K}
				position={[-0.379, 0.084, -0.303]}
				rotation={[0, 0.402, 0]}
				scale={0.705}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.DonutLeft.geometry}
				material={materials.Dough}
				position={[-0.007, 0.026, 0.038]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus002.geometry}
					material={materials.Caramel}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus002_1.geometry}
					material={materials.Sprinkles}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.DonutRight.geometry}
				material={materials['Dough.001']}
				position={[0.014, 0.024, -0.096]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Icing001.geometry}
					material={materials['Sprinkles.001']}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.DonutRight001.geometry}
				material={materials['Dough.001']}
				position={[-0.012, 0.074, -0.082]}
				rotation={[-3.097, 0.798, 3.079]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus008.geometry}
					material={materials['Icing.001']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus008_1.geometry}
					material={materials['Sprinkles.001']}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.DonutRight002.geometry}
				material={materials['Dough.001']}
				position={[0.005, 0.125, -0.065]}
				rotation={[0.071, 0.428, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus010.geometry}
					material={materials.Chocolate}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus010_1.geometry}
					material={materials['Sprinkles.001']}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.DonutLeft001.geometry}
				material={materials.Dough}
				position={[-0.015, 0.076, 0.039]}
				rotation={[0, 1.15, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus012.geometry}
					material={materials.Icing}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus012_1.geometry}
					material={materials.Sprinkles}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.DonutFront.geometry}
				material={materials.Dough}
				position={[0.087, 0.054, -0.025]}
				rotation={[-3.109, 0.248, -2.426]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus014.geometry}
					material={materials.Icing}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus014_1.geometry}
					material={materials.Sprinkles}
				/>
			</mesh>
		</group>
	);
}

useGLTF.preload('/donuts-full.glb');
