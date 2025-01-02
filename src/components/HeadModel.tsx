// HeadModel.tsx
import { useLoader } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

interface HeadModelProps {
  baseColor: string;
  roughness: number;
}

const HeadModel: React.FC<HeadModelProps> = ({ baseColor, roughness }) => {
  const obj = useLoader(OBJLoader, '/asaro-head.obj');

  obj.traverse((child) => {
    if ((child as Mesh).isMesh) {
      (child as Mesh).material = new MeshStandardMaterial({
        color: baseColor,
        metalness: 0.0,
        roughness: roughness,
      });
    }
  });

  return (
    <Suspense fallback={null}>
      <primitive object={obj} scale={[1, 1, 1]} />
    </Suspense>
  );
};

export default HeadModel;
