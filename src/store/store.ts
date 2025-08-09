//Zustand store
import { create } from 'zustand';

type State = {
	globalState: 'loading' | 'landing';
	setGlobalState: (state: 'loading' | 'landing') => void;
	cameraPosition: [number, number, number];
	setCameraPosition: (position: [number, number, number]) => void;
};

export const useStore = create<State>((set) => ({
	globalState: 'loading',
	setGlobalState: (state) => set(() => ({ globalState: state })),
	cameraPosition: [0, 0, 0],
	setCameraPosition: (position) =>
		set(() => ({
			cameraPosition: position,
		})),
}));
