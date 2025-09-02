// AsaroScene.tsx
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import HeadModel from './HeadModel';
import MovingLight from './MovingLight';
import useLightingStore from '../store/useLightingStore';
import { ACESFilmicToneMapping } from 'three';

const AsaroScene: React.FC = () => {
  const {
    rotation,
    backgroundColor,
    primaryLightColor,
    primaryLightOrbit,
    primaryLightHeight,
    primaryLightIntensity,
    primaryLightDistance,
    primaryHelperEnabled,

    secondaryLightEnabled,
    secondaryLightColor,
    secondaryLightOrbit,
    secondaryLightHeight,
    secondaryLightIntensity,
    secondaryLightDistance,
    secondaryHelperEnabled,

    materialBaseColor,
    materialRoughness,
  } = useLightingStore();

  return (
    <Canvas gl={{ toneMapping: ACESFilmicToneMapping }} style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 100], fov: 35 }}>
      <color attach="background" args={[backgroundColor]} />
      <OrbitControls makeDefault enableZoom />
      <ambientLight intensity={0.05} />

      {/* Primary Light */}
      <MovingLight
        orbitAngle={primaryLightOrbit}
        height={primaryLightHeight}
        color={primaryLightColor}
        intensity={primaryLightIntensity}
        distance={primaryLightDistance}
        showHelper={primaryHelperEnabled}
      />

      {/* Secondary Light */}
      {secondaryLightEnabled && (
        <MovingLight
          orbitAngle={secondaryLightOrbit}
          height={secondaryLightHeight}
          color={secondaryLightColor}
          intensity={secondaryLightIntensity}
          distance={secondaryLightDistance}
          showHelper={secondaryHelperEnabled}
        />
      )}

      {/* Asaro Head */}
      <group rotation={[Math.PI, rotation, 0]} position={[0, -15, 0]}>
        <HeadModel baseColor={materialBaseColor} roughness={materialRoughness} />
      </group>
    </Canvas>
  );
};

export default AsaroScene;
