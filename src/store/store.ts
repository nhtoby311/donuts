//Zustand store
import { create } from 'zustand';

type State = {
	globalState: 'loading' | 'landing';
	setGlobalState: (state: 'loading' | 'landing') => void;
};

export const useStore = create<State>((set) => ({
	globalState: 'loading',
	setGlobalState: (state) => set(() => ({ globalState: state })),
}));
