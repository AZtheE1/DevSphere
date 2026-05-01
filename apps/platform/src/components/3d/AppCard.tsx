'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { AppMetadata } from '@devsphere/types';

export function AppCard({ app, color }: { app: AppMetadata; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, hovered ? 0.2 : 0, 0.1);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.2 : 1, 0.1));
    }
  });

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => window.location.href = app.path}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[4, 5, 0.2]} />
        <meshPhysicalMaterial
          transmission={0.6}
          roughness={0.1}
          metalness={0.2}
          color={hovered ? color : '#ffffff'}
          thickness={1}
        />
        
        {/* App Emoji */}
        <Text
          position={[0, 1, 0.15]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {app.emoji}
        </Text>
        
        {/* App Name */}
        <Text
          position={[0, -1, 0.15]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
          textAlign="center"
        >
          {app.name}
        </Text>
      </mesh>
      
      {/* Glow effect when hovered */}
      {hovered && (
        <pointLight position={[0, 0, 1]} intensity={5} color={color} distance={10} />
      )}
    </group>
  );
}
