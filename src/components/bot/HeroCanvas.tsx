"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";

import HeroScene from "@/components/bot/HeroScene";

useGLTF.preload("/assets/bot_final.glb");

function MouseOrbit() {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  useFrame((state) => {
    const controls = controlsRef.current;
    if (!controls) return;

    const targetAzimuth = state.mouse.x * -0.5;
    controls.setAzimuthalAngle(targetAzimuth);
    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

/**
 * Only ever rendered through DeferredHeroCanvas, which keeps this module (and
 * three.js with it) out of the initial bundle and off phones entirely.
 *
 * dpr is capped at 1.5 so high-DPI laptops do not render a 3x framebuffer for
 * a decorative element, and the canvas pauses whenever it scrolls out of view.
 */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="min-h-96 w-full cursor-pointer"
    >
      <HeroScene />
      <Environment preset="city" />
      <MouseOrbit />
    </Canvas>
  );
}
