// ControlPanel.tsx
import React, { useState } from 'react';
import useLightingStore from '../store/useLightingStore';
import CircularOrbitControl from './CircularOrbitControl';
import VerticalHeightControl from './VerticalHeightControl';
import RotationWheel from './RotationWheel';

const controlPanelStyles: React.CSSProperties = {
  padding: '20px',
  width: '320px',
  maxWidth: '320px',
  height: '100vh',
  background: 'var(--bg-secondary)',
  borderLeft: '1px solid var(--border-primary)',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle: React.CSSProperties = {
  margin: '0 0 18px 0',
  fontSize: '18px',
  fontWeight: '600',
  color: 'var(--text-primary)',
  letterSpacing: '-0.025em',
};

const sectionStyle: React.CSSProperties = {
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border-primary)',
  borderRadius: 'var(--radius-md)',
  padding: '12px',
  marginBottom: '12px',
  boxShadow: 'var(--shadow-sm)',
};

const sectionHeaderStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '13px',
  fontWeight: '600',
  color: 'var(--text-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  userSelect: 'none',
};

const chevronStyle: React.CSSProperties = {
  fontSize: '16px',
  color: 'var(--text-secondary)',
  transition: 'transform 0.2s ease',
  display: 'flex',
  alignItems: 'center',
};

const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px',
};

const controlGridFullStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '8px',
  marginBottom: '10px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--text-secondary)',
  fontWeight: '500',
  minWidth: '80px',
};

const colorInputStyle: React.CSSProperties = {
  width: '40px',
  height: '32px',
  border: '1px solid var(--border-primary)',
  borderRadius: 'var(--radius-sm)',
  background: 'transparent',
  cursor: 'pointer',
  outline: 'none',
};

const checkboxStyle: React.CSSProperties = {
  width: '18px',
  height: '18px',
  accentColor: 'var(--accent-primary)',
  cursor: 'pointer',
};

const ControlPanel: React.FC = () => {
  // Collapsible state - all collapsed by default
  const [collapsedSections, setCollapsedSections] = useState({
    head: true,
    primaryLight: true,
    secondaryLight: true,
    material: true,
    background: true,
  });

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Head
  const rotation = useLightingStore((s) => s.rotation);
  const setRotation = useLightingStore((s) => s.setRotation);

  // Primary Light
  const primaryLightColor = useLightingStore((s) => s.primaryLightColor);
  const setPrimaryLightColor = useLightingStore((s) => s.setPrimaryLightColor);
  const primaryLightOrbit = useLightingStore((s) => s.primaryLightOrbit);
  const setPrimaryLightOrbit = useLightingStore((s) => s.setPrimaryLightOrbit);
  const primaryLightHeight = useLightingStore((s) => s.primaryLightHeight);
  const setPrimaryLightHeight = useLightingStore((s) => s.setPrimaryLightHeight);
  const primaryLightIntensity = useLightingStore((s) => s.primaryLightIntensity);
  const setPrimaryLightIntensity = useLightingStore((s) => s.setPrimaryLightIntensity);
  const primaryHelperEnabled = useLightingStore((s) => s.primaryHelperEnabled);
  const setPrimaryHelperEnabled = useLightingStore((s) => s.setPrimaryHelperEnabled);

  // Secondary Light
  const secondaryLightEnabled = useLightingStore((s) => s.secondaryLightEnabled);
  const setSecondaryLightEnabled = useLightingStore((s) => s.setSecondaryLightEnabled);
  const secondaryLightColor = useLightingStore((s) => s.secondaryLightColor);
  const setSecondaryLightColor = useLightingStore((s) => s.setSecondaryLightColor);
  const secondaryLightOrbit = useLightingStore((s) => s.secondaryLightOrbit);
  const setSecondaryLightOrbit = useLightingStore((s) => s.setSecondaryLightOrbit);
  const secondaryLightHeight = useLightingStore((s) => s.secondaryLightHeight);
  const setSecondaryLightHeight = useLightingStore((s) => s.setSecondaryLightHeight);
  const secondaryLightIntensity = useLightingStore((s) => s.secondaryLightIntensity);
  const setSecondaryLightIntensity = useLightingStore((s) => s.setSecondaryLightIntensity);
  const secondaryHelperEnabled = useLightingStore((s) => s.secondaryHelperEnabled);
  const setSecondaryHelperEnabled = useLightingStore((s) => s.setSecondaryHelperEnabled);

  // Material
  const materialBaseColor = useLightingStore((s) => s.materialBaseColor);
  const setMaterialBaseColor = useLightingStore((s) => s.setMaterialBaseColor);

  // Background
  const backgroundColor = useLightingStore((s) => s.backgroundColor);
  const setBackgroundColor = useLightingStore((s) => s.setBackgroundColor);

  return (
    <div style={controlPanelStyles}>
      <h1 style={headerStyle}>Lighting Controls</h1>

      {/* Head Section */}
      <section style={sectionStyle}>
        <h3 style={sectionHeaderStyle} onClick={() => toggleSection('head')}>
          <span>Head</span>
          <span style={{
            ...chevronStyle,
            transform: collapsedSections.head ? 'rotate(-90deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </h3>
        {!collapsedSections.head && (
          <div style={{...controlRowStyle, paddingTop: '10px'}}>
            <label style={labelStyle}>Rotation</label>
            <div style={{width: '50%', display: 'flex', justifyContent: 'center'}}>
              <RotationWheel
                value={rotation}
                onChange={setRotation}
                label=""
              />
            </div>
          </div>
        )}
      </section>

      {/* Primary Light Section */}
      <section style={sectionStyle}>
        <h3 style={sectionHeaderStyle} onClick={() => toggleSection('primaryLight')}>
          <span>Primary Light</span>
          <span style={{
            ...chevronStyle,
            transform: collapsedSections.primaryLight ? 'rotate(-90deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </h3>
        {!collapsedSections.primaryLight && (
          <div style={{paddingTop: '10px'}}>
            <div style={controlRowStyle}>
              <label style={labelStyle}>Color</label>
              <input
                type="color"
                value={primaryLightColor}
                onChange={(e) => setPrimaryLightColor(e.target.value)}
                style={colorInputStyle}
              />
            </div>
            
            <div style={controlGridFullStyle}>
              <CircularOrbitControl
                value={primaryLightOrbit}
                onChange={setPrimaryLightOrbit}
                label="Orbit"
              />
              <VerticalHeightControl
                value={primaryLightHeight}
                onChange={setPrimaryLightHeight}
                label="Height"
                height={60}
              />
              <VerticalHeightControl
                value={primaryLightIntensity / 10}
                onChange={(value) => setPrimaryLightIntensity(value * 10)}
                label="Intensity"
                height={60}
              />
            </div>
            
            <div style={controlRowStyle}>
              <label style={labelStyle}>Show Helper</label>
              <input
                type="checkbox"
                checked={primaryHelperEnabled}
                onChange={(e) => setPrimaryHelperEnabled(e.target.checked)}
                style={checkboxStyle}
              />
            </div>
          </div>
        )}
      </section>

      {/* Secondary Light Section */}
      <section style={sectionStyle}>
        <h3 style={sectionHeaderStyle} onClick={() => toggleSection('secondaryLight')}>
          <span>Secondary Light</span>
          <span style={{
            ...chevronStyle,
            transform: collapsedSections.secondaryLight ? 'rotate(-90deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </h3>
        {!collapsedSections.secondaryLight && (
          <div style={{paddingTop: '10px'}}>
            <div style={controlRowStyle}>
              <label style={labelStyle}>Enable</label>
              <input
                type="checkbox"
                checked={secondaryLightEnabled}
                onChange={(e) => setSecondaryLightEnabled(e.target.checked)}
                style={checkboxStyle}
              />
            </div>

            {secondaryLightEnabled && (
              <>
                <div style={controlRowStyle}>
                  <label style={labelStyle}>Color</label>
                  <input
                    type="color"
                    value={secondaryLightColor}
                    onChange={(e) => setSecondaryLightColor(e.target.value)}
                    style={colorInputStyle}
                  />
                </div>
                
                <div style={controlGridFullStyle}>
                  <CircularOrbitControl
                    value={secondaryLightOrbit}
                    onChange={setSecondaryLightOrbit}
                    label="Orbit"
                  />
                  <VerticalHeightControl
                    value={secondaryLightHeight}
                    onChange={setSecondaryLightHeight}
                    label="Height"
                    height={60}
                  />
                  <VerticalHeightControl
                    value={secondaryLightIntensity / 10}
                    onChange={(value) => setSecondaryLightIntensity(value * 10)}
                    label="Intensity"
                    height={60}
                  />
                </div>
                
                <div style={controlRowStyle}>
                  <label style={labelStyle}>Show Helper</label>
                  <input
                    type="checkbox"
                    checked={secondaryHelperEnabled}
                    onChange={(e) => setSecondaryHelperEnabled(e.target.checked)}
                    style={checkboxStyle}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {/* Material Section */}
      <section style={sectionStyle}>
        <h3 style={sectionHeaderStyle} onClick={() => toggleSection('material')}>
          <span>Material</span>
          <span style={{
            ...chevronStyle,
            transform: collapsedSections.material ? 'rotate(-90deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </h3>
        {!collapsedSections.material && (
          <div style={{...controlRowStyle, paddingTop: '10px'}}>
            <label style={labelStyle}>Base Color</label>
            <input
              type="color"
              value={materialBaseColor}
              onChange={(e) => setMaterialBaseColor(e.target.value)}
              style={colorInputStyle}
            />
          </div>
        )}
      </section>

      {/* Background Section */}
      <section style={sectionStyle}>
        <h3 style={sectionHeaderStyle} onClick={() => toggleSection('background')}>
          <span>Background</span>
          <span style={{
            ...chevronStyle,
            transform: collapsedSections.background ? 'rotate(-90deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </h3>
        {!collapsedSections.background && (
          <div style={{...controlRowStyle, paddingTop: '10px'}}>
            <label style={labelStyle}>Color</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              style={colorInputStyle}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default ControlPanel;
