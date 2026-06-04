"use client";

import HeroScene from "@/components/bot/HeroScene";
import { LoaderContent } from "@/components/page-loader";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

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

function HeroCanvasScene() {
  return (
    <Canvas camera={{ fov: 50 }} gl={{ antialias: true }} className="min-h-96 w-full cursor-pointer">
      <HeroScene />
      <Environment preset="city" />
      <MouseOrbit />
    </Canvas>
  );
}

const HeroCanvas = () => {
  return (
    <div className="relative order-1 h-full w-full min-w-0 overflow-hidden md:order-2">
      {/* <Suspense fallback={<LoaderContent />}> */}
        <HeroCanvasScene />
      {/* </Suspense> */}
    </div>
  );
};

export default HeroCanvas;
