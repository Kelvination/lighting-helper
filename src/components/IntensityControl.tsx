import React, { useCallback, useRef, useState, useEffect } from 'react';

interface IntensityControlProps {
  value: number; // 0 to 10
  onChange: (value: number) => void;
  size?: number;
  label?: string;
}

const IntensityControl: React.FC<IntensityControlProps> = ({
  value,
  onChange,
  size = 60,
  label = "Intensity"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    const maxRadius = size / 2 - 10;
    const normalizedDistance = Math.max(0, Math.min(1, distance / maxRadius));
    const newValue = normalizedDistance * 10;
    
    onChange(Number(newValue.toFixed(2)));
  }, [isDragging, onChange, size]);

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

  const normalizedValue = value / 10;
  const glowRadius = (size / 2 - 10) * normalizedValue;

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

  const controlStyle: React.CSSProperties = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: `radial-gradient(circle, var(--bg-tertiary) 20%, var(--bg-secondary) 80%, var(--border-primary) 100%)`,
    border: '2px solid var(--border-primary)',
    cursor: isDragging ? 'grabbing' : 'grab',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const glowStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${glowRadius * 2}px`,
    height: `${glowRadius * 2}px`,
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(212, 165, 116, ${0.6 * normalizedValue}) 0%, rgba(212, 165, 116, ${0.2 * normalizedValue}) 60%, transparent 100%)`,
    transition: isDragging ? 'none' : 'all 0.2s ease',
    pointerEvents: 'none',
  };

  const centerStyle: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: `var(--accent-primary)`,
    border: '1px solid var(--text-secondary)',
    opacity: 0.4 + normalizedValue * 0.6,
    transition: isDragging ? 'none' : 'all 0.2s ease',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontFamily: 'mono',
  };

  // Intensity rings
  const rings = [0.3, 0.6, 0.9].map(intensity => {
    const ringRadius = (size / 2 - 8) * intensity;
    const opacity = normalizedValue >= intensity ? 0.4 : 0.15;
    
    return (
      <div
        key={intensity}
        style={{
          position: 'absolute',
          width: `${ringRadius * 2}px`,
          height: `${ringRadius * 2}px`,
          borderRadius: '50%',
          border: `1px dashed var(--accent-primary)`,
          opacity,
          pointerEvents: 'none',
        }}
      />
    );
  });

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <div
        ref={containerRef}
        style={controlStyle}
        onMouseDown={handleMouseDown}
      >
        {rings}
        <div style={glowStyle} />
        <div style={centerStyle} />
      </div>
      <span style={valueStyle}>{value.toFixed(2)}</span>
    </div>
  );
};

export default IntensityControl;