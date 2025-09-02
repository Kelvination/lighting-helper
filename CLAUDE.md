# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Use pnpm for all package management:
- `pnpm dev` - Start development server with hot reloading
- `pnpm build` - Build for production (runs TypeScript check + Vite build)
- `pnpm lint` - Run ESLint on entire codebase
- `pnpm preview` - Preview production build locally

## Architecture Overview

This is a React + TypeScript + Vite application for 3D lighting visualization using Three.js. The app displays an Asaro head model with interactive lighting controls.

### Core Architecture

**State Management**: Uses Zustand for global state (`useLightingStore.ts`) - single store containing all lighting parameters, head rotation, material properties, and background settings.

**3D Rendering**: 
- Built with `@react-three/fiber` (React wrapper for Three.js)
- Uses `@react-three/drei` for utilities like OrbitControls
- Main scene is `AsaroScene.tsx` containing Canvas, lights, and 3D model
- ACES Filmic tone mapping applied for realistic lighting

**Layout**: Split-screen design (App.tsx) with 3D scene on left and control panel on right.

### Custom Interactive Controls

The app features custom-built interactive controls (not standard HTML inputs) for intuitive lighting manipulation:

- `CircularOrbitControl` - Circular drag interface for light orbital positioning
- `VerticalHeightControl` - Visual height slider with gradient fill
- `IntensityControl` - Radial control with concentric rings for light intensity  
- `RotationWheel` - Rotatable wheel for head rotation

All controls use mouse events with `useCallback` and `useEffect` for drag interactions.

### Styling System

Uses CSS custom properties in `main.css` with warm, artistic color palette (earth tones, browns, golds). Design theme is "sculpture studio" aesthetic rather than technical/sci-fi.

### Key Dependencies

- **React Three Fiber**: 3D scene management
- **Three.js**: Core 3D graphics
- **Zustand**: Lightweight state management
- **TypeScript**: Type safety throughout

### File Structure

- `src/store/` - Zustand state management
- `src/components/` - React components (both 2D UI and 3D scene components)  
- `public/` - Static assets including 3D model files (.obj, .mtl)

### Development Notes

- All interactive controls maintain precise mouse tracking and provide immediate visual feedback
- 3D scene responds to all control changes via Zustand state updates
- Uses TypeScript strict mode with proper interfaces for all components
- ESLint configured for React hooks compliance