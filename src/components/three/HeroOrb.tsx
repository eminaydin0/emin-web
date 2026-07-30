"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function CoreMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.15, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.18;
      mesh.current.rotation.x += delta * 0.06;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.12;
      wire.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.55}>
      <mesh ref={mesh} geometry={geometry}>
        <meshPhysicalMaterial
          color="#eef3ff"
          metalness={0.15}
          roughness={0.28}
          transmission={0.55}
          thickness={1.2}
          transparent
          opacity={0.92}
          envMapIntensity={0.8}
        />
      </mesh>
      <lineSegments ref={wire} geometry={edges}>
        <lineBasicMaterial color="#2f6fed" transparent opacity={0.35} />
      </lineSegments>
      <mesh scale={0.42}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#2f6fed"
          emissive="#2f6fed"
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

export function HeroOrb() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 3, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-3, -2, -2]} intensity={0.35} color="#2f6fed" />
        <CoreMesh />
      </Canvas>
    </div>
  );
}
