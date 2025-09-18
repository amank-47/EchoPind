import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './RevolvingGlobe.css';

// Globe component that rotates continuously
const Globe = () => {
  const meshRef = useRef();

  // Create earth-like texture using gradient and noise
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    // Create earth-like gradient
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#4a90e2');      // Sky blue (water)
    gradient.addColorStop(0.3, '#22c55e');    // Green (land)
    gradient.addColorStop(0.5, '#16a34a');    // Darker green
    gradient.addColorStop(0.7, '#15803d');    // Forest green
    gradient.addColorStop(1, '#166534');      // Deep forest

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some random "continents" and "oceans"
    context.globalCompositeOperation = 'multiply';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 50 + 10;
      
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fillStyle = Math.random() > 0.6 ? '#0ea5e9' : '#22c55e';
      context.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Rotate the globe continuously
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Adjust speed as needed
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1; // Subtle wobble
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        map={earthTexture}
        roughness={0.7}
        metalness={0.1}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

// Main RevolvingGlobe component
const RevolvingGlobe = () => {
  return (
    <div className="revolving-globe-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.4} />
        
        {/* Directional light to simulate sun */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          color="#ffffff" 
        />
        
        {/* Point light for additional glow */}
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={0.3} 
          color="#22c55e" 
        />
        
        {/* Stars background */}
        <Stars 
          radius={100} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0.5}
          fade={true}
        />
        
        {/* The Earth globe */}
        <Globe />
      </Canvas>
    </div>
  );
};

export default RevolvingGlobe;