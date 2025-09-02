// useLightingStore.ts
import { create } from 'zustand';

interface LightingState {
  // Head
  rotation: number;

  // Primary light
  primaryLightColor: string;
  primaryLightOrbit: number;
  primaryLightHeight: number;
  primaryLightIntensity: number;
  primaryLightDistance: number;
  primaryHelperEnabled: boolean;

  // Secondary light
  secondaryLightEnabled: boolean;
  secondaryLightColor: string;
  secondaryLightOrbit: number;
  secondaryLightHeight: number;
  secondaryLightIntensity: number;
  secondaryLightDistance: number;
  secondaryHelperEnabled: boolean;

  // Material
  materialBaseColor: string;
  materialRoughness: number;

  // Background
  backgroundColor: string;
}

interface LightingActions {
  // Head
  setRotation: (value: number) => void;

  // Primary light
  setPrimaryLightColor: (color: string) => void;
  setPrimaryLightOrbit: (value: number) => void;
  setPrimaryLightHeight: (value: number) => void;
  setPrimaryLightIntensity: (value: number) => void;
  setPrimaryLightDistance: (value: number) => void;
  setPrimaryHelperEnabled: (value: boolean) => void;

  // Secondary light
  setSecondaryLightEnabled: (value: boolean) => void;
  setSecondaryLightColor: (color: string) => void;
  setSecondaryLightOrbit: (value: number) => void;
  setSecondaryLightHeight: (value: number) => void;
  setSecondaryLightIntensity: (value: number) => void;
  setSecondaryLightDistance: (value: number) => void;
  setSecondaryHelperEnabled: (value: boolean) => void;


  // Material
  setMaterialBaseColor: (color: string) => void;
  setMaterialRoughness: (value: number) => void;

  // Background
  setBackgroundColor: (color: string) => void;
}

const useLightingStore = create<LightingState & LightingActions>((set) => ({
  // Initial state
  rotation: 0,

  primaryLightColor: '#ffffff',
  primaryLightOrbit: 0,
  primaryLightHeight: 0.5,
  primaryLightIntensity: 2,
  primaryLightDistance: 40,
  primaryHelperEnabled: false,

  secondaryLightEnabled: false,
  secondaryLightColor: '#ffae00',
  secondaryLightOrbit: 180,
  secondaryLightHeight: 0.5,
  secondaryLightIntensity: 0.25,
  secondaryLightDistance: 40,
  secondaryHelperEnabled: false,

  materialBaseColor: '#ffffff',
  materialRoughness: 0.5,

  backgroundColor: '#222222',

  // Actions
  setRotation: (value) => set({ rotation: value }),

  setPrimaryLightColor: (color) => set({ primaryLightColor: color }),
  setPrimaryLightOrbit: (value) => set({ primaryLightOrbit: value }),
  setPrimaryLightHeight: (value) => set({ primaryLightHeight: value }),
  setPrimaryLightIntensity: (value) => set({ primaryLightIntensity: value }),
  setPrimaryLightDistance: (value) => set({ primaryLightDistance: value }),
  setPrimaryHelperEnabled: (value) => set({ primaryHelperEnabled: value }),

  setSecondaryLightEnabled: (value) => set({ secondaryLightEnabled: value }),
  setSecondaryLightColor: (color) => set({ secondaryLightColor: color }),
  setSecondaryLightOrbit: (value) => set({ secondaryLightOrbit: value }),
  setSecondaryLightHeight: (value) => set({ secondaryLightHeight: value }),
  setSecondaryLightIntensity: (value) => set({ secondaryLightIntensity: value }),
  setSecondaryLightDistance: (value) => set({ secondaryLightDistance: value }),
  setSecondaryHelperEnabled: (value) => set({ secondaryHelperEnabled: value }),

  setMaterialBaseColor: (color) => set({ materialBaseColor: color }),
  setMaterialRoughness: (value) => set({ materialRoughness: value }),

  setBackgroundColor: (color) => set({ backgroundColor: color }),
}));

export default useLightingStore;
