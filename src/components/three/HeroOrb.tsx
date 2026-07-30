"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

function EarthScene({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const clouds = useRef<THREE.Mesh>(null);
  const { camera, gl, size } = useThree();
  const scroll = useRef(0);
  const scrollSmooth = useRef(0);
  const idle = useRef(0);

  const [colorMap, cloudMap] = useTexture([
    "/textures/earth.jpg",
    "/textures/earth-clouds.png",
  ]);

  useEffect(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.anisotropy = 16;
    colorMap.minFilter = THREE.LinearMipmapLinearFilter;
    colorMap.magFilter = THREE.LinearFilter;
    cloudMap.anisotropy = 8;
  }, [colorMap, cloudMap]);

  // Keep drawing buffer in sync — fixes intermittent half-clip
  useEffect(() => {
    if (size.width <= 0 || size.height <= 0) return;
    gl.setSize(size.width, size.height, false);
    if ("aspect" in camera) {
      (camera as THREE.PerspectiveCamera).aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    }
  }, [size.width, size.height, gl, camera]);

  useMotionValueEvent(scrollProgress, "change", (v) => {
    scroll.current = v;
  });

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    idle.current += dt * 0.028;

    // Soft follow — premium inertia on scroll
    scrollSmooth.current = THREE.MathUtils.damp(
      scrollSmooth.current,
      scroll.current,
      2.4,
      dt
    );
    const t = scrollSmooth.current;
    const ease = t * t * (3 - 2 * t); // smoothstep

    // Camera stays put — sphere always fully in frame (true circle).
    // Growth is handled by CSS scale on the container in Hero.

    if (group.current) {
      const targetY = idle.current + ease * Math.PI * 2.6;
      const targetX = 0.1 + ease * 0.16;

      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetY,
        1.8,
        dt
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        targetX,
        1.6,
        dt
      );
    }

    if (clouds.current) {
      clouds.current.rotation.y += dt * 0.018;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          map={colorMap}
          color="#e8f2fc"
          roughness={0.88}
          metalness={0}
          emissive="#2a5080"
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh ref={clouds} scale={1.008}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.18}
          depthWrite={false}
          roughness={1}
          metalness={0}
          color="#ffffff"
        />
      </mesh>
    </group>
  );
}

function EarthFallbackMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#7eb6e0" roughness={0.7} metalness={0} />
    </mesh>
  );
}

export function HeroOrb({
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
    const t = window.setTimeout(check, 120);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div ref={wrap} className="relative h-full w-full">
      {ready ? (
        <Canvas
          dpr={lite ? [1, 1.25] : [1, 2]}
          camera={{ position: [0, 0, 3.95], fov: 30, near: 0.1, far: 50 }}
          resize={{ scroll: false, debounce: 0 }}
          gl={{
            antialias: !lite,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: lite ? "default" : "high-performance",
            stencil: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.setClearAlpha(0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.55;
            gl.domElement.style.display = "block";
            gl.domElement.style.width = "100%";
            gl.domElement.style.height = "100%";
          }}
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <ambientLight intensity={1.15} />
          <directionalLight
            position={[3.5, 2.5, 4]}
            intensity={1.7}
            color="#ffffff"
          />
          <directionalLight
            position={[-3, 1, -1]}
            intensity={0.85}
            color="#d0e8fa"
          />
          {!lite && (
            <directionalLight
              position={[0, -2, 2]}
              intensity={0.45}
              color="#f2f8ff"
            />
          )}
          <Suspense fallback={<EarthFallbackMesh />}>
            <EarthScene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="h-[92%] w-[92%] rounded-full bg-cover bg-center"
            style={{ backgroundImage: "url(/textures/earth.jpg)" }}
          />
        </div>
      )}
    </div>
  );
}
