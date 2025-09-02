# Changelog

## [2025-09-02] - GitHub Pages Deployment Fix

### Added
- Missing vite.svg file to public directory for favicon

### Fixed
- Fixed favicon path in index.html to use relative path (./vite.svg) for GitHub Pages compatibility
- Fixed 3D model asset paths in HeadModel.tsx to use relative paths (./material/master.mtl and ./asaro-head3.obj)
- Resolved 404 errors for /vite.svg and /material/master.mtl on GitHub Pages deployment
- Ensured all assets are properly copied to dist folder during build

### Technical Details
- Updated icon href from "/vite.svg" to "./vite.svg" for correct base path resolution
- Updated MTLLoader and OBJLoader paths to use relative URLs instead of absolute paths
- Added default Vite SVG favicon to prevent 404 errors
- Verified material files and other assets are correctly included in production build

## [2025-09-01] - Artistic Studio Design Update

### Added
- Warm, artistic color palette inspired by sculpture studios
- Organic, handcrafted aesthetic for all interactive controls
- Compact layout that fits without scrolling

### Changed
- **Color Scheme**: Replaced futuristic blue with warm earth tones (browns, golds, creams)
- **Control Sizes**: Reduced from 80px to 60px for better space efficiency
- **Visual Style**: More organic shapes, dashed lines, and subtle textures
- **Orbit Control**: Dashed outer ring with subtle compass marks
- **Height Control**: Gradient fill with inset shadow for depth
- **Intensity Control**: Warm glow with dashed concentric rings
- **Rotation Wheel**: Wheel-like design with softer gradients and organic pointer
- **Spacing**: Tighter margins and padding for compact vertical layout

### Technical Details
- Updated CSS custom properties with warm color palette
- Reduced component sizes across all interactive controls
- Added subtle shadows and inset effects for tactile feel
- Maintained all drag-and-drop functionality with new aesthetic

## [2025-09-01] - Interactive Controls Enhancement

### Added
- **CircularOrbitControl**: Interactive circular control for light orbit positioning
- **VerticalHeightControl**: Visual height slider with gradient fill and markers
- **IntensityControl**: Radial intensity control with glow effects and concentric rings
- **RotationWheel**: Rotatable wheel control for head rotation with tick marks and arrow indicator
- Modern drag-and-drop interactions with visual feedback
- Hover effects and glow animations for better user experience

### Changed
- Replaced basic range sliders with intuitive custom controls
- **Orbit control**: Now uses circular drag interface instead of linear slider
- **Height control**: Vertical slider with visual fill indicator
- **Intensity control**: Radial control that shows intensity rings and glow
- **Rotation control**: Wheel interface with visual angle indicators
- Grid-based layout for better organization of interactive controls

### Technical Details
- Custom React components with mouse event handling
- SVG-based graphics for precise control rendering
- useCallback and useEffect hooks for performance optimization
- Proper TypeScript interfaces for all control components
- ESLint compliance with proper React hooks usage
- Maintained all existing functionality while dramatically improving usability

## [2025-09-01] - UI/UX Enhancement

### Added
- Modern dark theme design system with CSS custom properties
- Inter font family for improved typography
- Comprehensive CSS styling for form inputs (range, color, checkbox)
- Visual improvements to control panel layout and spacing
- Responsive design considerations

### Changed
- Complete redesign of ControlPanel component with modern styling
- Updated App component layout for better structure
- Enhanced visual hierarchy with proper spacing and typography
- Improved input controls with custom styling and hover effects
- Better color scheme with consistent dark theme

### Technical Details
- Replaced inline styles with structured CSS design system
- Added CSS variables for consistent theming
- Enhanced form controls with custom webkit styling
- Improved accessibility with better color contrast
- Maintained all existing functionality while upgrading appearance