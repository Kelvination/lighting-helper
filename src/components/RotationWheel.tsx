import React, { useCallback, useRef, useState, useEffect } from 'react';

interface RotationWheelProps {
  value: number; // rotation in radians
  onChange: (value: number) => void;
  size?: number;
  label?: string;
}

const RotationWheel: React.FC<RotationWheelProps> = ({
  value,
  onChange,
  size = 60,
  label = "Rotation"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const lastAngleRef = useRef<number>(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    lastAngleRef.current = Math.atan2(deltaY, deltaX);
    
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const currentAngle = Math.atan2(deltaY, deltaX);
    
    let deltaAngle = currentAngle - lastAngleRef.current;
    
    // Handle angle wrapping
    if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
    if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;
    
    const newValue = value + deltaAngle;
    onChange(newValue);
    
    lastAngleRef.current = currentAngle;
  }, [isDragging, onChange, value]);

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

  const radius = (size - 20) / 2;
  const tickRadius = radius + 8;

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

  // Generate tick marks every 30 degrees
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) * (Math.PI / 180);
    const x1 = Math.cos(angle) * radius + size / 2;
    const y1 = Math.sin(angle) * radius + size / 2;
    const x2 = Math.cos(angle) * tickRadius + size / 2;
    const y2 = Math.sin(angle) * tickRadius + size / 2;
    
    const isMainTick = i % 3 === 0;
    
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--text-secondary)"
        strokeWidth="1"
        opacity={isMainTick ? "0.6" : "0.3"}
      />
    );
  });

  // Arrow indicator
  const arrowLength = radius - 5;
  const arrowX = Math.cos(value - Math.PI / 2) * arrowLength + size / 2;
  const arrowY = Math.sin(value - Math.PI / 2) * arrowLength + size / 2;

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <svg
        ref={svgRef}
        width={size + 20}
        height={size + 20}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
      >
        {/* Outer wheel rim */}
        <circle
          cx={(size + 20) / 2}
          cy={(size + 20) / 2}
          r={radius}
          fill="url(#wheelGradient)"
          stroke="var(--border-primary)"
          strokeWidth="2"
        />
        
        {/* Inner working surface */}
        <circle
          cx={(size + 20) / 2}
          cy={(size + 20) / 2}
          r={radius - 6}
          fill="var(--bg-secondary)"
          stroke="var(--border-secondary)"
          strokeWidth="1"
          opacity="0.8"
        />
        
        {/* Tick marks - more organic */}
        <g transform={`translate(10, 10)`}>
          {ticks}
        </g>
        
        {/* Center pivot */}
        <circle
          cx={(size + 20) / 2}
          cy={(size + 20) / 2}
          r="4"
          fill="var(--accent-secondary)"
          stroke="var(--text-secondary)"
          strokeWidth="1"
        />
        
        {/* Rotation pointer - more like a sculpting tool */}
        <g transform={`translate(10, 10)`}>
          <line
            x1={size / 2}
            y1={size / 2}
            x2={arrowX}
            y2={arrowY}
            stroke="var(--accent-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle
            cx={arrowX}
            cy={arrowY}
            r="3"
            fill="var(--accent-primary)"
            stroke="var(--text-secondary)"
            strokeWidth="1"
            opacity={isDragging ? "1" : "0.9"}
          />
        </g>
        
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--bg-tertiary)" />
            <stop offset="70%" stopColor="var(--bg-secondary)" />
            <stop offset="100%" stopColor="var(--border-primary)" />
          </radialGradient>
        </defs>
      </svg>
      <span style={valueStyle}>{value.toFixed(2)} rad</span>
    </div>
  );
};

export default RotationWheel;