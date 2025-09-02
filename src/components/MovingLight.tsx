import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper } from "three";

function DirectionalLightHelperComponent({
  lightRef,
  size,
  color,
}: {
  lightRef: React.MutableRefObject<DirectionalLight>;
  size?: number;
  color?: string;
}) {
  useHelper(lightRef, DirectionalLightHelper, size ?? 5, color ?? '#fff');
  return null;
}

interface MovingLightProps {
  orbitAngle: number;
  height: number;
  color: string;
  intensity: number;
  distance: number;
  showHelper?: boolean;
}

const MovingLight: React.FC<MovingLightProps> = ({
  orbitAngle,
  height,
  color,
  intensity,
  distance,
  showHelper = false,
}) => {
  const lightRef = useRef<DirectionalLight>(null!);

  // Convert orbitAngle from degrees to radians
  // Adjust mapping so 0° (top of control) = front of model (+Z), 90° = right side (+X), etc.
  const azimuth = ((orbitAngle + 90) * Math.PI) / 180;

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
    <>
      <directionalLight
        ref={lightRef}
        position={[x, y, z]}
        color={color}
        intensity={intensity}
      />
      {showHelper && (
        <DirectionalLightHelperComponent
          lightRef={lightRef}
          size={5}
          color={color}
        />
      )}
    </>
  );
};

export default MovingLight;