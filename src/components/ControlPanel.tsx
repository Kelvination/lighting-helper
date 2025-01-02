import React from 'react';

const labelStyle: React.CSSProperties = {
  minWidth: '120px',
  marginRight: '8px',
  textAlign: 'right',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '4px 0',
};

const sectionStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '8px',
  marginBottom: '12px',
};

interface ControlPanelProps {
  // Head rotation
  rotation: number;
  onRotationChange: (value: number) => void;

  // Primary light
  primaryLightColor: string;
  onPrimaryLightColorChange: (color: string) => void;
  primaryLightOrbit: number;
  onPrimaryLightOrbitChange: (value: number) => void;
  primaryLightHeight: number;
  onPrimaryLightHeightChange: (value: number) => void;
  primaryLightIntensity: number;
  onPrimaryLightIntensityChange: (value: number) => void;
  primaryLightDistance: number;
  onPrimaryLightDistanceChange: (value: number) => void;

  // Secondary light
  secondaryLightEnabled: boolean;
  onSecondaryLightEnabledChange: (value: boolean) => void;
  secondaryLightColor: string;
  onSecondaryLightColorChange: (color: string) => void;
  secondaryLightOrbit: number;
  onSecondaryLightOrbitChange: (value: number) => void;
  secondaryLightHeight: number;
  onSecondaryLightHeightChange: (value: number) => void;
  secondaryLightIntensity: number;
  onSecondaryLightIntensityChange: (value: number) => void;
  secondaryLightDistance: number;
  onSecondaryLightDistanceChange: (value: number) => void;

  // Material
  materialBaseColor: string;
  onMaterialBaseColorChange: (color: string) => void;
  materialRoughness: number;
  onMaterialRoughnessChange: (value: number) => void;

  // Scene background
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  // Head
  rotation,
  onRotationChange,

  // Primary light
  primaryLightColor,
  onPrimaryLightColorChange,
  primaryLightOrbit,
  onPrimaryLightOrbitChange,
  primaryLightHeight,
  onPrimaryLightHeightChange,
  primaryLightIntensity,
  onPrimaryLightIntensityChange,
  primaryLightDistance,
  onPrimaryLightDistanceChange,

  // Secondary light
  secondaryLightEnabled,
  onSecondaryLightEnabledChange,
  secondaryLightColor,
  onSecondaryLightColorChange,
  secondaryLightOrbit,
  onSecondaryLightOrbitChange,
  secondaryLightHeight,
  onSecondaryLightHeightChange,
  secondaryLightIntensity,
  onSecondaryLightIntensityChange,
  secondaryLightDistance,
  onSecondaryLightDistanceChange,

  // Material
  materialBaseColor,
  onMaterialBaseColorChange,
  materialRoughness,
  onMaterialRoughnessChange,

  // Scene background
  backgroundColor,
  onBackgroundColorChange,
}) => {
  return (
    <div style={{ padding: '1rem', width: 300, maxWidth: '300px', fontFamily: 'sans-serif' }}>
      <h2>Controls</h2>

      {/* Head Section */}
      <section style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Head</h3>
        <div style={rowStyle}>
          <label style={labelStyle}>Rotate (rad): {rotation.toFixed(2)}</label>
          <input
            type="range"
            min={-Math.PI * 2}
            max={Math.PI * 2}
            step={0.1}
            value={rotation}
            onChange={(e) => onRotationChange(parseFloat(e.target.value))}
          />
        </div>
      </section>

      {/* Primary Light Section */}
      <section style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Primary Light</h3>
        <div style={rowStyle}>
          <label style={labelStyle}>Color</label>
          <input
            type="color"
            value={primaryLightColor}
            onChange={(e) => onPrimaryLightColorChange(e.target.value)}
          />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Orbit: {primaryLightOrbit}°</label>
          <input
            type="range"
            min={-360}
            max={360}
            step={1}
            value={primaryLightOrbit}
            onChange={(e) => onPrimaryLightOrbitChange(parseInt(e.target.value))}
          />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Height: {primaryLightHeight.toFixed(2)}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={primaryLightHeight}
            onChange={(e) => onPrimaryLightHeightChange(parseFloat(e.target.value))}
          />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Intensity: {primaryLightIntensity.toFixed(2)}</label>
          <input
            type="range"
            min={0}
            max={3000}
            step={50}
            value={primaryLightIntensity}
            onChange={(e) => onPrimaryLightIntensityChange(parseFloat(e.target.value))}
          />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Distance: {primaryLightDistance.toFixed(1)}</label>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={primaryLightDistance}
            onChange={(e) => onPrimaryLightDistanceChange(parseFloat(e.target.value))}
          />
        </div>
      </section>

      {/* Secondary Light Section */}
      <section style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Secondary Light</h3>
        <div style={rowStyle}>
          <label style={labelStyle}>Enable</label>
          <input
            type="checkbox"
            checked={secondaryLightEnabled}
            onChange={(e) => onSecondaryLightEnabledChange(e.target.checked)}
          />
        </div>

        {secondaryLightEnabled && (
          <>
            <div style={rowStyle}>
              <label style={labelStyle}>Color</label>
              <input
                type="color"
                value={secondaryLightColor}
                onChange={(e) => onSecondaryLightColorChange(e.target.value)}
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Orbit: {secondaryLightOrbit}°</label>
              <input
                type="range"
                min={-360}
                max={360}
                step={1}
                value={secondaryLightOrbit}
                onChange={(e) => onSecondaryLightOrbitChange(parseInt(e.target.value))}
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Height: {secondaryLightHeight.toFixed(2)}</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={secondaryLightHeight}
                onChange={(e) => onSecondaryLightHeightChange(parseFloat(e.target.value))}
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Intensity: {secondaryLightIntensity.toFixed(2)}</label>
              <input
                type="range"
                min={0}
                max={3000}
                step={50}
                value={secondaryLightIntensity}
                onChange={(e) => onSecondaryLightIntensityChange(parseFloat(e.target.value))}
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Distance: {secondaryLightDistance.toFixed(1)}</label>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={secondaryLightDistance}
                onChange={(e) => onSecondaryLightDistanceChange(parseFloat(e.target.value))}
              />
            </div>
          </>
        )}
      </section>

      {/* Material Section */}
      <section style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Material</h3>
        <div style={rowStyle}>
          <label style={labelStyle}>Base Color</label>
          <input
            type="color"
            value={materialBaseColor}
            onChange={(e) => onMaterialBaseColorChange(e.target.value)}
          />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Roughness: {materialRoughness.toFixed(2)}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={materialRoughness}
            onChange={(e) => onMaterialRoughnessChange(parseFloat(e.target.value))}
          />
        </div>
      </section>

      {/* Background Section */}
      <section style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Background</h3>
        <div style={rowStyle}>
          <label style={labelStyle}>Color</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
          />
        </div>
      </section>
    </div>
  );
};

export default ControlPanel;
