'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { APPS } from '@/lib/apps';
import { AppCard } from './AppCard';

function OrbitalCluster({ category, apps, color, radius, speed }: { 
  category: string; 
  apps: any[]; 
  color: string;
  radius: number;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {apps.map((app, i) => {
        const angle = (i / apps.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={app.id} speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[x, (i % 2) * 2 - 1, z]}>
            <AppCard app={app} color={color} />
          </Float>
        );
      })}
    </group>
  );
}

export function Scene() {
  const toolsApps = APPS.filter(a => a.category === 'Tools');

  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 20, 50]} fov={50} />
        <OrbitControls enablePan={false} maxDistance={100} minDistance={20} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitalCluster 
          category="Tools" 
          apps={toolsApps} 
          color="#00d4ff" 
          radius={15} 
          speed={0.2} 
        />
        
        {/* nebula-like background effect */}
        <mesh position={[0, 0, -20]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0.1} color="#1a1c2e" />
        </mesh>
      </Canvas>
    </div>
  );
}
