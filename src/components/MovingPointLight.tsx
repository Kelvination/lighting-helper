// MovingPointLight.tsx
import { useHelper } from '@react-three/drei';
import React, { useRef } from 'react';
import { PointLight, PointLightHelper } from 'three';

const MovingPointLight: React.FC<{
  position: [number, number, number];
  color: string;
  intensity?: number;
  distance?: number;
}> = ({ position, color, intensity = 1, distance = 50 }) => {
  const lightRef = useRef<PointLight>(null!);

  useHelper(lightRef, PointLightHelper, 0.3, color);

  return (
    <pointLight
      ref={lightRef}
      position={position}
      color={color}
      intensity={intensity}
      distance={distance}
    />
  );
};

export default MovingPointLight;
