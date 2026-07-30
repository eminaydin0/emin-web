"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField({ count = 120 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 1.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      speeds[i] = 0.15 + Math.random() * 0.35;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.userData.speeds = speeds;
    return geometry;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.05;
    const attr = points.current.geometry.attributes.position as THREE.BufferAttribute;
    const speeds = points.current.geometry.userData.speeds as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      attr.setY(i, attr.getY(i) + Math.sin(t * speeds[i] + i) * 0.0015);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial
        size={0.028}
        color="#0071e3"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
