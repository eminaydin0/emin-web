"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

const TENDRILS = 14;
const TENDRIL_SEGS = 18;

function JellyfishMesh({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const bell = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const tendrils = useRef<THREE.InstancedMesh>(null);
  const scroll = useRef(0);
  const smooth = useRef(0);
  const time = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMotionValueEvent(scrollProgress, "change", (v) => {
    scroll.current = v;
  });

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    time.current += dt;
    smooth.current = THREE.MathUtils.damp(
      smooth.current,
      scroll.current,
      2.6,
      dt
    );
    const p = smooth.current;
    const ease = p * p * (3 - 2 * p);
    const pulse = 1 + Math.sin(time.current * 1.6 + ease * 4) * 0.06;

    if (bell.current) {
      bell.current.scale.set(pulse, 0.7 + ease * 0.15, pulse);
      bell.current.rotation.y = time.current * 0.15 + ease * 0.8;
    }
    if (inner.current) {
      const ip = 0.92 + Math.sin(time.current * 2) * 0.04;
      inner.current.scale.set(ip * pulse, 0.55, ip * pulse);
    }

    if (tendrils.current) {
      let idx = 0;
      for (let t = 0; t < TENDRILS; t++) {
        const angle = (t / TENDRILS) * Math.PI * 2;
        const ringR = 0.55 + (t % 3) * 0.06;
        for (let s = 0; s < TENDRIL_SEGS; s++) {
          const u = s / (TENDRIL_SEGS - 1);
          const sway =
            Math.sin(time.current * 1.8 + t * 0.7 + u * 3 + ease * 5) *
            (0.2 + u * 0.55);
          const sway2 =
            Math.cos(time.current * 1.3 + t + u * 2) * (0.1 + u * 0.25);

          const x = Math.cos(angle) * ringR + sway;
          const z = Math.sin(angle) * ringR + sway2;
          const y = -0.15 - u * (1.5 + ease * 0.9);

          const r = THREE.MathUtils.lerp(0.045, 0.012, u);
          dummy.position.set(x, y, z);
          dummy.scale.setScalar(r);
          dummy.updateMatrix();
          tendrils.current.setMatrixAt(idx++, dummy.matrix);
        }
      }
      tendrils.current.instanceMatrix.needsUpdate = true;
    }

    if (group.current) {
      group.current.position.y = Math.sin(time.current * 0.8) * 0.12 - ease * 0.15;
      group.current.rotation.y = ease * 0.9;
      group.current.rotation.z = Math.sin(ease * Math.PI) * 0.12;
    }
  });

  const total = TENDRILS * TENDRIL_SEGS;

  return (
    <group ref={group} position={[0, 0.55, 0]}>
      {/* Outer bell — translucent dome */}
      <mesh ref={bell} position={[0, 0.1, 0]}>
        <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshPhysicalMaterial
          color="#c5d4ff"
          roughness={0.12}
          metalness={0.05}
          transparent
          opacity={0.42}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive="#6b8cff"
          emissiveIntensity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow core */}
      <mesh ref={inner} position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.55, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshPhysicalMaterial
          color="#ff9ec8"
          emissive="#ff5ca8"
          emissiveIntensity={0.85}
          roughness={0.25}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      {/* Soft halo */}
      <mesh scale={1.35} position={[0, 0.05, 0]}>
        <sphereGeometry args={[1, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshBasicMaterial
          color="#b8c9ff"
          transparent
          opacity={0.08}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <instancedMesh ref={tendrils} args={[undefined, undefined, total]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshPhysicalMaterial
          color="#c4b0ff"
          emissive="#7a5cff"
          emissiveIntensity={0.35}
          transparent
          opacity={0.7}
          roughness={0.25}
        />
      </instancedMesh>
    </group>
  );
}

export function ScrollJelly({
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
          dpr={lite ? [1, 1.25] : [1, 1.85]}
          camera={{ position: [0, 0.2, 5.6], fov: 32 }}
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
            gl.toneMappingExposure = 1.15;
            gl.domElement.style.display = "block";
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 5]} intensity={1.1} />
          <pointLight position={[0, 1, 2]} intensity={1.2} color="#a8b8ff" />
          <pointLight position={[0, -1, 1]} intensity={0.6} color="#ff7eb9" />
          <Suspense fallback={null}>
            <JellyfishMesh scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
