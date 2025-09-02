// App.tsx
import React from 'react';
import AsaroScene from './components/AsaroScene';
import ControlPanel from './components/ControlPanel';
import MouseInstructions from './components/MouseInstructions';

const appStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  background: 'var(--bg-primary)',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const sceneContainerStyles: React.CSSProperties = {
  flex: 1,
  position: 'relative',
  minWidth: 0,
  background: 'var(--bg-primary)',
  overflow: 'hidden',
};


const App: React.FC = () => {
  return (
    <div style={appStyles}>
      {/* Left side: the 3D scene */}
      <div style={sceneContainerStyles}>
        <AsaroScene />
        <MouseInstructions />
      </div>

      {/* Right side: the control panel */}
      <ControlPanel />
    </div>
  );
};

export default App;
