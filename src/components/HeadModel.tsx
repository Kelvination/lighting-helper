// HeadModel.tsx
import { useLoader } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Mesh, MeshPhongMaterial } from 'three';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

interface HeadModelProps {
  baseColor: string;
  roughness: number;
}

const HeadModel: React.FC<HeadModelProps> = ({ baseColor, roughness }) => {
  const mat = useLoader(MTLLoader, '/material/master.mtl');
  const obj = useLoader(OBJLoader, '/asaro-head3.obj',
    (loader) => {
      (loader as OBJLoader).setMaterials(mat);
    }
  );

  console.log(baseColor, roughness);


  obj.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      // If it already has a material from the MTL
      if (mesh.material)
        (mesh.material as MeshPhongMaterial[])[0].color?.set(baseColor);
    }
  });

  return (
    <Suspense fallback={null}>
      <primitive object={obj} scale={[8, 8, 8]} />
    </Suspense>
  );
};

export default HeadModel;
