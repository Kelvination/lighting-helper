//AsaroScene.tsx
import { OrbitControls, useHelper } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import HeadModel from './HeadModel';
import MovingPointLight from './MovingPointLight';
import { PointLight, PointLightHelper } from 'three';

interface AsaroSceneProps {
  rotation: number;
  primaryLightColor: string;
  secondaryLightColor: string;
  primaryLightOrbit: number;    // in degrees
  secondaryLightOrbit: number; // in degrees
  primaryLightHeight: number;  // 0..1
  secondaryLightHeight: number; // 0..1
  secondaryLightEnabled: boolean;
  backgroundColor: string;
  primaryLightIntensity: number;
  primaryLightDistance: number;
  secondaryLightIntensity: number;
  secondaryLightDistance: number;
  materialBaseColor: string;
  materialRoughness: number;
}

const AsaroScene: React.FC<AsaroSceneProps> = ({
  rotation,
  primaryLightColor,
  secondaryLightColor,
  primaryLightOrbit,
  secondaryLightOrbit,
  primaryLightHeight,
  secondaryLightHeight,
  secondaryLightEnabled,
  backgroundColor,
  primaryLightIntensity,
  primaryLightDistance,
  secondaryLightIntensity,
  secondaryLightDistance,
  materialBaseColor,
  materialRoughness,
}) => {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 100], fov: 45 }}
    >
      <color attach="background" args={[backgroundColor]} />
      <OrbitControls makeDefault enableZoom={true} />
      <ambientLight intensity={0.05} />

      {/* Primary Light */}
      <MovingLight
        orbitAngle={primaryLightOrbit}
        height={primaryLightHeight}
        color={primaryLightColor}
        intensity={primaryLightIntensity}
        distance={primaryLightDistance}
      />

      {/* Secondary Light */}
      {secondaryLightEnabled && (
        <MovingLight
          orbitAngle={secondaryLightOrbit}
          height={secondaryLightHeight}
          color={secondaryLightColor}
          intensity={secondaryLightIntensity}
          distance={secondaryLightDistance}
        />
      )}

      {/* Asaro Head */}
      <group rotation={[0, rotation, 0]} position={[0, -15, 0]}>
        <HeadModel
          baseColor={materialBaseColor}
          roughness={materialRoughness}
        />
      </group>
    </Canvas>
  );
};

interface MovingLightProps {
  orbitAngle: number;
  height: number;
  color: string;
  intensity: number;
  distance: number;
}

const MovingLight: React.FC<MovingLightProps> = ({
  orbitAngle,
  height,
  color,
  intensity,
  distance,
}) => {
  const lightRef = useRef<PointLight>(null!);
  useHelper(lightRef, PointLightHelper, 0.2, color);

  // Convert orbitAngle from degrees to radians
  const azimuth = (orbitAngle * Math.PI) / 180;

  // Map height (0..1) to -π/2..+π/2
  // => at 0, light is below the head
  // => at 1, light is above the head
  const verticalAngle = -Math.PI / 2 + height * Math.PI;

  // Spherical coordinate approach:
  // x = R * cos(verticalAngle) * cos(azimuth)
  // y = R * sin(verticalAngle)
  // z = R * cos(verticalAngle) * sin(azimuth)
  const x = distance * Math.cos(verticalAngle) * Math.cos(azimuth);
  const y = distance * Math.sin(verticalAngle);
  const z = distance * Math.cos(verticalAngle) * Math.sin(azimuth);


  return (
    <MovingPointLight
      position={[x, y, z]}
      color={color}
      intensity={intensity}
    />
  );
};

export default AsaroScene;
