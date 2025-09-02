import React, { useCallback, useRef, useState, useEffect } from 'react';

interface CircularOrbitControlProps {
  value: number; // angle in degrees
  onChange: (value: number) => void;
  size?: number;
  label?: string;
}

const CircularOrbitControl: React.FC<CircularOrbitControlProps> = ({
  value,
  onChange,
  size = 60,
  label = "Orbit"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Calculate angle directly from mouse position
    // Adjust so that top of circle (negative Y) corresponds to 0° (forward in 3D)
    // and right side corresponds to 90°, bottom to 180°, left to -90°
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    // Rotate the mapping so top = 0°, right = 90°, etc. (subtract 90°)
    angle = angle - 90;
    // Keep in -180 to 180 range
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;
    
    onChange(Math.round(angle));
  }, [isDragging, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Convert angle to coordinates - match the 3D coordinate system
  const radius = (size - 20) / 2;
  const angleRad = (value * Math.PI) / 180;
  // Add 90° to the visual representation to match the input mapping
  // Now 0° appears at the top, 90° at the right, etc.
  const displayAngleRad = angleRad + (Math.PI / 2);
  const x = Math.cos(displayAngleRad) * radius + size / 2;
  const y = Math.sin(displayAngleRad) * radius + size / 2;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontFamily: 'mono',
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
      >
        {/* Outer ring with organic texture */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-primary)"
          strokeWidth="3"
          strokeDasharray="2,1"
          opacity="0.7"
        />
        
        {/* Inner guide circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 8}
          fill="none"
          stroke="var(--border-secondary)"
          strokeWidth="1"
          opacity="0.3"
        />
        
        {/* Center pivot */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="3"
          fill="var(--accent-secondary)"
          stroke="var(--text-secondary)"
          strokeWidth="1"
        />
        
        {/* Direction arc */}
        <path
          d={`M ${size / 2} ${size / 2} L ${x} ${y}`}
          stroke="var(--accent-primary)"
          strokeWidth="2"
          opacity="0.8"
        />
        
        {/* Draggable handle - more organic */}
        <circle
          cx={x}
          cy={y}
          r="5"
          fill="var(--accent-primary)"
          stroke="var(--bg-secondary)"
          strokeWidth="2"
          opacity={isDragging ? "1" : "0.9"}
          style={{
            transition: isDragging ? 'none' : 'all 0.2s ease',
          }}
        />
        
        {/* Subtle compass marks */}
        {[0, 90, 180, 270].map(angle => {
          const markerRad = (angle * Math.PI) / 180;
          const markerX = Math.cos(markerRad) * (radius + 3) + size / 2;
          const markerY = Math.sin(markerRad) * (radius + 3) + size / 2;
          return (
            <circle
              key={angle}
              cx={markerX}
              cy={markerY}
              r="1.5"
              fill="var(--text-secondary)"
              opacity="0.5"
            />
          );
        })}
      </svg>
      <span style={valueStyle}>{value}°</span>
    </div>
  );
};

export default CircularOrbitControl;