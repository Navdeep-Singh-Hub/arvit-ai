"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { TabletModel } from "@/components/three/tablet-model";

export type TabletCanvasSize = "hero" | "card" | "default";

type TabletCanvasProps = {
  variant?: "dark" | "light";
  size?: TabletCanvasSize;
  interactive?: boolean;
  followPointer?: boolean;
  scrollProgress?: MotionValue<number>;
  className?: string;
};

const SIZE_CONFIG: Record<
  TabletCanvasSize,
  { scale: number; cameraZ: number; fov: number; positionY: number; tiltY: number; tiltX: number }
> = {
  hero: { scale: 2.35, cameraZ: 3.95, fov: 28, positionY: 0, tiltY: -0.32, tiltX: 0.08 },
  card: { scale: 1.55, cameraZ: 3.9, fov: 30, positionY: 0, tiltY: -0.35, tiltX: 0.1 },
  default: { scale: 1.75, cameraZ: 3.8, fov: 30, positionY: 0, tiltY: -0.35, tiltX: 0.1 },
};

function Lights({ variant }: { variant: "dark" | "light" }) {
  if (variant === "dark") {
    return (
      <>
        <ambientLight intensity={0.48} />
        <directionalLight position={[6, 8, 5]} intensity={2.25} color="#ffffff" />
        <directionalLight position={[-5, 3, 4]} intensity={0.7} color="#f2f2f2" />
        <spotLight position={[2, 9, 4]} intensity={48} angle={0.32} penumbra={0.92} color="#ffffff" />
        <pointLight position={[-2.5, 1.5, 3]} intensity={16} color="#ffffff" />
        <pointLight position={[2, -1.5, 2.5]} intensity={8} color="#eaeaea" />
        <pointLight position={[0, 0.4, -2.2]} intensity={12} color="#d8d8d8" />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 7, 4]} intensity={1.7} color="#ffffff" />
      <directionalLight position={[-3, 3, 2]} intensity={0.65} color="#ececec" />
    </>
  );
}

/**
 * Ultra-smooth cursor + scroll rig.
 * Position offsets are small so the device stays fully visible in the stage.
 */
function SmoothMotionRig({
  children,
  followPointer,
  scrollProgress,
  baseTiltX,
  baseTiltY,
}: {
  children: React.ReactNode;
  followPointer: boolean;
  scrollProgress?: MotionValue<number>;
  baseTiltX: number;
  baseTiltY: number;
}) {
  const group = useRef<THREE.Group>(null);
  const current = useRef({
    rx: baseTiltX,
    ry: baseTiltY,
    rz: 0,
    x: 0,
    y: 0,
    z: 0,
  });

  useFrame((state, delta) => {
    if (!group.current) return;

    const scroll = scrollProgress ? THREE.MathUtils.clamp(scrollProgress.get(), 0, 1) : 0;
    const pointerX = followPointer ? state.pointer.x : 0;
    const pointerY = followPointer ? state.pointer.y : 0;

    const targetRx = baseTiltX - pointerY * 0.42 + scroll * 0.48;
    const targetRy = baseTiltY + pointerX * 0.62 + scroll * 0.22;
    const targetRz = pointerX * 0.08 + scroll * -0.1;
    // Subtle float/parallax — stay nested in frame
    const targetX = pointerX * 0.22 + scroll * 0.18;
    const targetY = -pointerY * 0.16 - scroll * 0.42;
    const targetZ = scroll * 0.55 + pointerY * 0.06;

    // Heavy damp = glassy lag
    const d = delta;
    const dampRot = 1.85;
    const dampPos = 1.65;
    const c = current.current;

    c.rx = THREE.MathUtils.damp(c.rx, targetRx, dampRot, d);
    c.ry = THREE.MathUtils.damp(c.ry, targetRy, dampRot, d);
    c.rz = THREE.MathUtils.damp(c.rz, targetRz, dampRot, d);
    c.x = THREE.MathUtils.damp(c.x, targetX, dampPos, d);
    c.y = THREE.MathUtils.damp(c.y, targetY, dampPos, d);
    c.z = THREE.MathUtils.damp(c.z, targetZ, dampPos, d);

    group.current.rotation.set(c.rx, c.ry, c.rz);
    group.current.position.set(c.x, c.y, c.z);
  });

  return <group ref={group}>{children}</group>;
}

export function TabletCanvas({
  variant = "dark",
  size = "default",
  interactive = false,
  followPointer = false,
  scrollProgress,
  className,
}: TabletCanvasProps) {
  const config = SIZE_CONFIG[size];
  const useSmoothRig = followPointer || !!scrollProgress;

  const model = (
    <TabletModel
      scale={config.scale}
      autoRotate={!useSmoothRig && !interactive}
      tiltX={config.tiltX}
      tiltY={config.tiltY}
      glassy
    />
  );

  const content = useSmoothRig ? (
    <SmoothMotionRig
      followPointer={followPointer}
      scrollProgress={scrollProgress}
      baseTiltX={config.tiltX}
      baseTiltY={config.tiltY}
    >
      <Float speed={0.85} rotationIntensity={0.06} floatIntensity={0.2} floatingRange={[-0.04, 0.04]}>
        {model}
      </Float>
    </SmoothMotionRig>
  ) : interactive ? (
    <PresentationControls
      global
      cursor
      snap
      speed={1.05}
      zoom={1}
      polar={[-0.25, 0.35]}
      azimuth={[-0.65, 0.65]}
    >
      <group position={[0, config.positionY, 0]}>{model}</group>
    </PresentationControls>
  ) : (
    <group position={[0, config.positionY, 0]}>{model}</group>
  );

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: variant === "dark" ? 1.22 : 1.05,
        }}
        camera={{ position: [0, 0.04, config.cameraZ], fov: config.fov }}
        className="!h-full !w-full"
        eventSource={
          followPointer && typeof document !== "undefined" ? document.documentElement : undefined
        }
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <Lights variant={variant} />
          {variant === "dark" ? (
            <Environment preset="city" environmentIntensity={0.55} />
          ) : (
            <Environment preset="studio" environmentIntensity={0.35} />
          )}

          {content}

          {variant === "light" ? (
            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.4}
              scale={10}
              blur={2.8}
              far={3.5}
              color="#000000"
            />
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default TabletCanvas;
