import React from 'react';

const MouseInstructions: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    background: 'rgba(42, 36, 31, 0.9)',
    border: '1px solid var(--border-primary)',
    borderRadius: 'var(--radius-md)',
    padding: '12px',
    backdropFilter: 'blur(4px)',
    pointerEvents: 'none',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const instructionRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    lineHeight: '1.2',
  };

  // SVG Mouse with left click highlighted
  const MouseLeftClick = () => (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path
        d="M2 6C2 3.79086 3.79086 2 6 2H10C12.2091 2 14 3.79086 14 6V14C14 16.2091 12.2091 18 10 18H6C3.79086 18 2 16.2091 2 14V6Z"
        stroke="var(--text-secondary)"
        strokeWidth="1"
        fill="var(--bg-tertiary)"
      />
      <path
        d="M2 6C2 3.79086 3.79086 2 6 2H8V8H2V6Z"
        fill="var(--accent-primary)"
        opacity="0.8"
      />
      <path
        d="M8 2V8H2"
        stroke="var(--text-secondary)"
        strokeWidth="1"
      />
    </svg>
  );

  // SVG Mouse with right click highlighted
  const MouseRightClick = () => (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path
        d="M2 6C2 3.79086 3.79086 2 6 2H10C12.2091 2 14 3.79086 14 6V14C14 16.2091 12.2091 18 10 18H6C3.79086 18 2 16.2091 2 14V6Z"
        stroke="var(--text-secondary)"
        strokeWidth="1"
        fill="var(--bg-tertiary)"
      />
      <path
        d="M14 6C14 3.79086 12.2091 2 10 2H8V8H14V6Z"
        fill="var(--accent-primary)"
        opacity="0.8"
      />
      <path
        d="M8 2V8H14"
        stroke="var(--text-secondary)"
        strokeWidth="1"
      />
    </svg>
  );

  // SVG Mouse with scroll wheel highlighted
  const MouseScroll = () => (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path
        d="M2 6C2 3.79086 3.79086 2 6 2H10C12.2091 2 14 3.79086 14 6V14C14 16.2091 12.2091 18 10 18H6C3.79086 18 2 16.2091 2 14V6Z"
        stroke="var(--text-secondary)"
        strokeWidth="1"
        fill="var(--bg-tertiary)"
      />
      <rect
        x="7"
        y="4"
        width="2"
        height="6"
        rx="1"
        fill="var(--accent-primary)"
        opacity="0.8"
      />
      <path
        d="M8 2V8"
        stroke="var(--text-secondary)"
        strokeWidth="1"
      />
      {/* Scroll arrows */}
      <path
        d="M6 11L8 9L10 11"
        stroke="var(--accent-primary)"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M6 13L8 15L10 13"
        stroke="var(--accent-primary)"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );

  return (
    <div style={containerStyle}>
      <div style={instructionRowStyle}>
        <MouseLeftClick />
        <span style={textStyle}>Drag to rotate</span>
      </div>
      <div style={instructionRowStyle}>
        <MouseRightClick />
        <span style={textStyle}>Drag to pan</span>
      </div>
      <div style={instructionRowStyle}>
        <MouseScroll />
        <span style={textStyle}>Scroll to zoom</span>
      </div>
    </div>
  );
};

export default MouseInstructions;