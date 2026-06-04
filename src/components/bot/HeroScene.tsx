"use client";

import { Float, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, LoopOnce, LoopRepeat } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroScene = () => {
  const botRef = useRef<Group>(null!);
  // const clickPlayedRef = useRef(false);

  const model = useGLTF("/assets/bot_final.glb");

  const { actions, mixer } = useAnimations(model.animations, model.scene);

  const idleNames = [
    "Eyes Animation",
    "Waves looping ",
    "hoverAction",
    "Right Hand",
    "CircleAction1",
    "CircleAction2",
    "CircleAction3",
  ] as const;


  const playIdle = () => {
    idleNames.forEach((name) => {
      const a = actions[name];
      if (!a) return;
      a.enabled = true;
      a.reset();
      a.setLoop(LoopRepeat, Infinity);
      a.clampWhenFinished = false;
      a.play();
    });
  };

  const stopIdle = () => {
    idleNames.forEach((name) => actions[name]?.stop());
  };

  const handAnime = () => {
    const hand = actions["Left Hand"];
    if (!hand) return;
    hand.reset();
    hand.setLoop(LoopOnce, 1);
    hand.clampWhenFinished = true;
    hand.play();

  };

  const clickAnime = () => {
    const click = actions["Click Here.001"];
    if (!click) return;
    click.reset();
    click.setLoop(LoopOnce, 1);
    click.clampWhenFinished = true;
    click.play();
  }
  // Idle should start as soon as the page loads (once actions are ready).
  useEffect(() => {
    playIdle();

    const onFinished = (e: any) => {
      const actionName = e?.action?._clip?.name as string | undefined;

      playIdle();
    };

    mixer.addEventListener("finished", onFinished);

    return () => {
      mixer.removeEventListener("finished", onFinished);
      stopIdle();
    };

  }, [actions, mixer]);

  useGSAP(() => {
    const botTl = gsap.timeline({
      defaults: { duration: 3.2, ease: "back.inOut(0.8)" },
    });

    botTl.from(botRef.current.scale, { scale: 3 }, 0);
    botTl.from(botRef.current.position, { x: "+=20", z: "-=20" }, 0);

    // Play click animation once when the intro timeline finishes.
    botTl.call(() => handAnime(), undefined, 1);
    botTl.call(() => clickAnime(), undefined, 1.4);

  }, { dependencies: [actions] })

  return (
    <group ref={botRef} >
      {/* <Float floatIntensity={2} rotationIntensity={0.2} speed={4}> */}
      <mesh>
        <primitive object={model.scene} scale={4.8} rotation={[0, 0, 0]} position={[0, -2, 0]}  />
      </mesh>
      {/* </Float> */}
    </group>
  )
}

export default HeroScene