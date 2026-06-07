"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { skills } from "@/data/skills";

function SkillNodes() {
  const groupRef = useRef<Group>(null);
  const nodes = useMemo(() => {
    return skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const radius = 2.2;
      return {
        name: skill.name,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 0.5) * 0.8,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        level: skill.level / 100,
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position} scale={0.15 + node.level * 0.2}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SkillsOrb() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
        <SkillNodes />
      </Canvas>
    </div>
  );
}
