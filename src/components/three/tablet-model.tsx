"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TABLET_MODEL } from "@/lib/media/tablet-model";

type TabletModelProps = {
  scale?: number;
  /** Soft idle float (disabled when pointer-driven) */
  autoRotate?: boolean;
  tiltX?: number;
  tiltY?: number;
  /** Polish materials for a glassier product look */
  glassy?: boolean;
};

function polishMaterial(material: THREE.Material) {
  if (!(material instanceof THREE.MeshStandardMaterial) && !(material instanceof THREE.MeshPhysicalMaterial)) {
    return;
  }

  material.metalness = THREE.MathUtils.clamp(Math.max(material.metalness ?? 0, 0.82), 0, 1);
  material.roughness = THREE.MathUtils.clamp(Math.min(material.roughness ?? 1, 0.14), 0, 1);
  material.envMapIntensity = 1.65;

  if (material instanceof THREE.MeshPhysicalMaterial) {
    material.clearcoat = 1;
    material.clearcoatRoughness = 0.05;
    material.reflectivity = 1;
    material.specularIntensity = 1;
  }

  material.needsUpdate = true;
}

/**
 * Loads the product GLB and centers it. Motion is controlled by parent rigs.
 */
export function TabletModel({
  scale = 1,
  autoRotate = false,
  tiltX = 0.1,
  tiltY = -0.35,
  glassy = true,
}: TabletModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(TABLET_MODEL.glb);

  const cloned = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (!glassy) return;

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((m) => {
          const next = m.clone();
          polishMaterial(next);
          return next;
        });
      } else if (mesh.material) {
        mesh.material = mesh.material.clone();
        polishMaterial(mesh.material);
      }
    });
    return root;
  }, [scene, glassy]);

  useFrame((state) => {
    if (!group.current || !autoRotate) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = tiltY + Math.sin(t * 0.28) * 0.06;
    group.current.rotation.x = tiltX + Math.sin(t * 0.22) * 0.025;
  });

  return (
    <group ref={group} rotation={[tiltX, tiltY, 0]}>
      <Center scale={scale}>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}

useGLTF.preload(TABLET_MODEL.glb);
