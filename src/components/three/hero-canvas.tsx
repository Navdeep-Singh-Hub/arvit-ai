"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.28;
    const targetX = -state.pointer.y * 0.16;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
  });

  return <group ref={group}>{children}</group>;
}

/** Soft neural core — layered translucent spheres instead of a stock distorted icosahedron. */
function NeuralCore() {
  const inner = useRef<THREE.Mesh>(null);
  const mid = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (inner.current) {
      inner.current.rotation.y += delta * 0.22;
      inner.current.rotation.x += delta * 0.08;
    }
    if (mid.current) {
      mid.current.rotation.y -= delta * 0.12;
      mid.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.55} floatingRange={[-0.1, 0.1]}>
      <mesh ref={inner} scale={0.85}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#4338ca"
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.15}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh ref={mid} scale={1.25}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh scale={1.55}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0d9488"
          emissiveIntensity={0.15}
          transparent
          opacity={0.08}
          roughness={0.8}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group ref={ref} rotation={[Math.PI / 2.6, 0.2, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 12, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function CommunicationNode({
  position,
  color,
  scale = 0.14,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.2} floatingRange={[-0.2, 0.2]}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} roughness={0.35} />
      </mesh>
    </Float>
  );
}

function NeuralLinks() {
  const points = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-2.1, 1.1, -0.4),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2.0, -0.9, -0.6),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.4, 1.7, -1.0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-1.5, -1.4, -0.8),
    ],
    []
  );

  return <Line points={points} color="#60a5fa" lineWidth={1} transparent opacity={0.25} />;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.95} />
      <pointLight position={[4, 3, 5]} intensity={40} color="#60a5fa" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#2dd4bf" />
      <pointLight position={[0, 4, -3]} intensity={22} color="#22d3ee" />

      <ParallaxRig>
        <NeuralCore />
        <OrbitRing radius={2.35} speed={0.08} color="#22d3ee" />
        <OrbitRing radius={2.85} speed={-0.05} color="#6366f1" />
        <NeuralLinks />
        <CommunicationNode position={[-2.1, 1.1, -0.4]} color="#06b6d4" />
        <CommunicationNode position={[2.0, -0.9, -0.6]} color="#06b6d4" scale={0.11} />
        <CommunicationNode position={[1.4, 1.7, -1.0]} color="#6366f1" scale={0.1} />
        <CommunicationNode position={[-1.5, -1.4, -0.8]} color="#818cf8" scale={0.09} />
        <Sparkles count={42} scale={8} size={1.4} speed={0.22} opacity={0.45} color="#a5b4fc" />
      </ParallaxRig>
    </>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.4], fov: 40 }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

export default HeroCanvas;
