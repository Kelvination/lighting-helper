import React, { useState } from 'react';
import AsaroScene from './components/AsaroScene';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [primaryLightColor, setPrimaryLightColor] = useState<string>('#ffffff');
  const [secondaryLightColor, setSecondaryLightColor] = useState<string>('#ff0000');
  const [primaryLightOrbit, setPrimaryLightOrbit] = useState<number>(0);
  const [secondaryLightOrbit, setSecondaryLightOrbit] = useState<number>(180);
  const [primaryLightHeight, setPrimaryLightHeight] = useState<number>(0.5);
  const [secondaryLightHeight, setSecondaryLightHeight] = useState<number>(0.5);
  const [secondaryLightEnabled, setSecondaryLightEnabled] = useState<boolean>(false);
  const [primaryLightIntensity, setPrimaryLightIntensity] = useState<number>(1000);
  const [primaryLightDistance, setPrimaryLightDistance] = useState<number>(25);
  const [secondaryLightIntensity, setSecondaryLightIntensity] = useState<number>(100);
  const [secondaryLightDistance, setSecondaryLightDistance] = useState<number>(25);
  const [materialBaseColor, setMaterialBaseColor] = useState<string>('#ffffff');
  const [materialRoughness, setMaterialRoughness] = useState<number>(0.5);
  const [backgroundColor, setBackgroundColor] = useState<string>('#000000');




  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Left side: the 3D scene */}
      <div style={{ flex: 1, position: 'relative' }}>
        <AsaroScene
          rotation={rotation}
          primaryLightColor={primaryLightColor}
          secondaryLightColor={secondaryLightColor}
          primaryLightOrbit={primaryLightOrbit}
          secondaryLightOrbit={secondaryLightOrbit}
          primaryLightHeight={primaryLightHeight}
          secondaryLightHeight={secondaryLightHeight}
          secondaryLightEnabled={secondaryLightEnabled}
          primaryLightIntensity={primaryLightIntensity}
          primaryLightDistance={primaryLightDistance}
          secondaryLightIntensity={secondaryLightIntensity}
          secondaryLightDistance={secondaryLightDistance}
          materialBaseColor={materialBaseColor}
          materialRoughness={materialRoughness}
          backgroundColor={backgroundColor}
        />
      </div>

      {/* Right side: the control panel */}
      <ControlPanel
        rotation={rotation}
        onRotationChange={setRotation}

        primaryLightColor={primaryLightColor}
        onPrimaryLightColorChange={setPrimaryLightColor}

        secondaryLightColor={secondaryLightColor}
        onSecondaryLightColorChange={setSecondaryLightColor}

        primaryLightOrbit={primaryLightOrbit}
        onPrimaryLightOrbitChange={setPrimaryLightOrbit}

        secondaryLightOrbit={secondaryLightOrbit}
        onSecondaryLightOrbitChange={setSecondaryLightOrbit}

        primaryLightHeight={primaryLightHeight}
        onPrimaryLightHeightChange={setPrimaryLightHeight}

        secondaryLightHeight={secondaryLightHeight}
        onSecondaryLightHeightChange={setSecondaryLightHeight}

        secondaryLightEnabled={secondaryLightEnabled}
        onSecondaryLightEnabledChange={setSecondaryLightEnabled}

        primaryLightIntensity={primaryLightIntensity}
        onPrimaryLightIntensityChange={setPrimaryLightIntensity}

        primaryLightDistance={primaryLightDistance}
        onPrimaryLightDistanceChange={setPrimaryLightDistance}

        secondaryLightIntensity={secondaryLightIntensity}
        onSecondaryLightIntensityChange={setSecondaryLightIntensity}

        secondaryLightDistance={secondaryLightDistance}
        onSecondaryLightDistanceChange={setSecondaryLightDistance}

        materialBaseColor={materialBaseColor}
        onMaterialBaseColorChange={setMaterialBaseColor}

        materialRoughness={materialRoughness}
        onMaterialRoughnessChange={setMaterialRoughness}

        backgroundColor={backgroundColor}
        onBackgroundColorChange={setBackgroundColor}

      />
    </div>
  );
};

export default App;
