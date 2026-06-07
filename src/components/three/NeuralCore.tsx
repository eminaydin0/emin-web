"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import type { Mesh, Group } from "three";

function CoreSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh scale={1.15}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6366f1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function NeuralConnections({ count = 40 }: { count?: number }) {
  const groupRef = useRef<Group>(null);
  const nodes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.8 + Math.random() * 0.5;
      return new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    });
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => {
        if (i % 3 !== 0) return null;
        const target = nodes[(i + 7) % count];
        const points = [node, new THREE.Vector3(0, 0, 0), target];
        return (
          <Line
            key={i}
            points={points}
            color="#22d3ee"
            transparent
            opacity={0.15}
            lineWidth={0.5}
          />
        );
      })}
      {nodes.map((node, i) => (
        <mesh key={`n-${i}`} position={node}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleRing() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const angle = (i / 300) * Math.PI * 2;
      const r = 3.5 + Math.random() * 0.5;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={300} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#a78bfa" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#8b5cf6" />
      <CoreSphere />
      <NeuralConnections />
      <ParticleRing />
    </>
  );
}

export function NeuralCore() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
