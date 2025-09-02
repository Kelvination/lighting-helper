import React, { useCallback, useRef, useState, useEffect } from 'react';

interface VerticalHeightControlProps {
  value: number; // 0 to 1
  onChange: (value: number) => void;
  height?: number;
  width?: number;
  label?: string;
}

const VerticalHeightControl: React.FC<VerticalHeightControlProps> = ({
  value,
  onChange,
  height = 60,
  width = 30,
  label = "Height"
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
    const y = e.clientY - rect.top;
    const normalizedY = Math.max(0, Math.min(1, 1 - (y - 10) / (height - 20)));
    
    onChange(Number(normalizedY.toFixed(2)));
  }, [isDragging, onChange, height]);

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

  const handleY = (1 - value) * (height - 20) + 10;

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

  const sliderContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: `${width}px`,
    height: `${height}px`,
    background: 'linear-gradient(to top, var(--bg-tertiary) 0%, var(--border-primary) 50%, var(--border-secondary) 100%)',
    borderRadius: 'var(--radius-md)',
    cursor: isDragging ? 'grabbing' : 'grab',
    border: '2px solid var(--border-primary)',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const fillStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
    height: `${Math.max(0, (value * 100) - 4)}%`,
    background: `linear-gradient(to top, var(--accent-secondary) 0%, var(--accent-primary) 80%, var(--accent-hover) 100%)`,
    borderRadius: 'var(--radius-sm)',
    transition: isDragging ? 'none' : 'height 0.2s ease',
    opacity: 0.8,
  };

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: `${handleY}px`,
    transform: 'translateX(-50%) translateY(-50%)',
    width: `${width + 6}px`,
    height: '6px',
    background: 'var(--accent-primary)',
    border: '1px solid var(--text-secondary)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: isDragging ? '0 0 8px var(--accent-primary)' : '0 1px 3px rgba(0, 0, 0, 0.3)',
    transition: isDragging ? 'none' : 'all 0.2s ease',
    opacity: 0.9,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontFamily: 'mono',
  };

  const markerStyle: React.CSSProperties = {
    position: 'absolute',
    right: '-6px',
    width: '3px',
    height: '1px',
    background: 'var(--text-secondary)',
    opacity: 0.4,
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <div
        ref={containerRef}
        style={sliderContainerStyle}
        onMouseDown={handleMouseDown}
      >
        {/* Height markers */}
        {[0, 0.25, 0.5, 0.75, 1].map(marker => (
          <div
            key={marker}
            style={{
              ...markerStyle,
              top: `${(1 - marker) * (height - 20) + 10}px`,
            }}
          />
        ))}
        
        {/* Fill */}
        <div style={fillStyle} />
        
        {/* Handle */}
        <div style={handleStyle} />
      </div>
      <span style={valueStyle}>{value.toFixed(2)}</span>
    </div>
  );
};

export default VerticalHeightControl;