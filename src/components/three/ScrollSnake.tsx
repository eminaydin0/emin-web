"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

const COUNT = 72;

function pointOnSerpent(t: number, progress: number, time: number) {
  const climb = progress * Math.PI * 2.8;
  const y = 2.05 - t * 4.3;
  const envelope = 0.7 + t * 0.65;
  const x =
    Math.sin(t * Math.PI * 2.8 - climb + time * 0.55) * envelope +
    Math.sin(t * Math.PI * 6 + time * 1.2) * 0.07 * (1 - t);
  const z =
    Math.cos(t * Math.PI * 1.6 - climb * 0.55) * 0.42 +
    Math.sin(t * 5 - time * 0.8) * 0.06;
  return new THREE.Vector3(x, y, z);
}

function SerpentBody({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const instanced = useRef<THREE.InstancedMesh>(null);
  const head = useRef<THREE.Group>(null);
  const trail = useRef<THREE.InstancedMesh>(null);
  const scroll = useRef(0);
  const smooth = useRef(0);
  const time = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useMotionValueEvent(scrollProgress, "change", (v) => {
    scroll.current = v;
  });

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    time.current += dt;
    smooth.current = THREE.MathUtils.damp(
      smooth.current,
      scroll.current,
      3.5,
      dt
    );
    const p = smooth.current;
    const ease = p * p * (3 - 2 * p);
    const mesh = instanced.current;
    const ghost = trail.current;
    if (!mesh) return;

    let headPos = new THREE.Vector3();
    let headLook = new THREE.Vector3();

    for (let i = 0; i < COUNT; i++) {
      const t = i / (COUNT - 1);
      const pos = pointOnSerpent(t, ease, time.current);
      const next = pointOnSerpent(
        Math.min(1, t + 1 / COUNT),
        ease,
        time.current
      );

      // Thickness: fat head → whip tail
      const radius = THREE.MathUtils.lerp(0.2, 0.035, Math.pow(t, 0.75));
      dummy.position.copy(pos);
      dummy.scale.set(radius, radius * 1.15, radius);
      dummy.lookAt(next);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Iridescent shift along body
      color.setHSL(0.38 + t * 0.08 + ease * 0.04, 0.75, 0.38 + (1 - t) * 0.12);
      mesh.setColorAt(i, color);

      if (ghost) {
        dummy.scale.set(radius * 2.1, radius * 2.4, radius * 2.1);
        dummy.updateMatrix();
        ghost.setMatrixAt(i, dummy.matrix);
      }

      if (i === 0) headPos = pos;
      if (i === 2) headLook = next;
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (ghost) ghost.instanceMatrix.needsUpdate = true;

    if (head.current) {
      head.current.position.copy(headPos);
      head.current.lookAt(headLook);
    }

    if (group.current) {
      group.current.rotation.y = -0.2 + ease * 0.65;
      group.current.position.y = -ease * 0.25;
    }
  });

  return (
    <group ref={group}>
      <instancedMesh ref={trail} args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial
          color="#8bffc9"
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </instancedMesh>

      <instancedMesh ref={instanced} args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshPhysicalMaterial
          roughness={0.2}
          metalness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.12}
          sheen={1}
          sheenColor="#d4ffe9"
          sheenRoughness={0.35}
        />
      </instancedMesh>

      <group ref={head}>
        <mesh>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshPhysicalMaterial
            color="#14c973"
            roughness={0.18}
            metalness={0.4}
            clearcoat={1}
            emissive="#0a5c38"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0.09, 0.09, 0.16]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#04140c" />
        </mesh>
        <mesh position={[-0.09, 0.09, 0.16]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#04140c" />
        </mesh>
        <mesh position={[0, 0, 0.22]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#b7ffdc" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export function ScrollSnake({
  scrollProgress,
  lite = false,
}: {
  scrollProgress: MotionValue<number>;
  lite?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const check = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 8 && height > 8) setReady(true);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    const t = window.setTimeout(check, 80);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      {ready ? (
        <Canvas
          dpr={lite ? [1, 1.35] : [1, 2]}
          camera={{ position: [0, 0.1, 6.4], fov: 30 }}
          resize={{ scroll: false, debounce: 0 }}
          gl={{
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: lite ? "default" : "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.setClearAlpha(0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.25;
            gl.domElement.style.display = "block";
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 6]} intensity={1.45} />
          <directionalLight
            position={[-4, 0, 2]}
            intensity={0.6}
            color="#9bffd0"
          />
          <pointLight position={[1, 0, 3]} intensity={0.7} color="#7dffc0" />
          <Suspense fallback={null}>
            <SerpentBody scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
