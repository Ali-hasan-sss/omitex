"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { siteImages } from "@/lib/site-images";
import { getCanvasDpr } from "@/lib/webgl";

const LOGO_ASPECT = 1600 / 379;
const WIDTH = 3.8;
const HEIGHT = WIDTH / LOGO_ASPECT;
const DEPTH = 0.32;

function ExtrudedLogoMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(siteImages.logo);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const { frontMat, backMat, sideMat, edgeMat, coreMat } = useMemo(() => {
    return {
      frontMat: new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.05,
        metalness: 0.35,
        roughness: 0.4,
      }),
      backMat: new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.05,
        color: new THREE.Color("#94a3b8"),
        metalness: 0.2,
        roughness: 0.6,
      }),
      sideMat: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0f3460"),
        metalness: 0.55,
        roughness: 0.35,
      }),
      edgeMat: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a4a8a"),
        metalness: 0.6,
        roughness: 0.3,
      }),
      coreMat: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a4a8a"),
        metalness: 0.5,
        roughness: 0.4,
        transparent: true,
        opacity: 0.95,
      }),
    };
  }, [texture]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, DEPTH / 2]} material={frontMat}>
        <planeGeometry args={[WIDTH, HEIGHT]} />
      </mesh>

      <mesh
        position={[0, 0, -DEPTH / 2]}
        rotation={[0, Math.PI, 0]}
        material={backMat}
      >
        <planeGeometry args={[WIDTH, HEIGHT]} />
      </mesh>

      <mesh position={[0, HEIGHT / 2, 0]} material={edgeMat}>
        <boxGeometry args={[WIDTH, 0.06, DEPTH]} />
      </mesh>

      <mesh position={[0, -HEIGHT / 2, 0]} material={edgeMat}>
        <boxGeometry args={[WIDTH, 0.06, DEPTH]} />
      </mesh>

      <mesh position={[-WIDTH / 2, 0, 0]} material={sideMat}>
        <boxGeometry args={[0.06, HEIGHT, DEPTH]} />
      </mesh>

      <mesh position={[WIDTH / 2, 0, 0]} material={sideMat}>
        <boxGeometry args={[0.06, HEIGHT, DEPTH]} />
      </mesh>

      <mesh material={coreMat}>
        <boxGeometry args={[WIDTH * 0.92, HEIGHT * 0.88, DEPTH * 0.85]} />
      </mesh>
    </group>
  );
}

function LoadingBox() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[3, 0.8, 0.3]} />
      <meshStandardMaterial color="#1a4a8a" wireframe />
    </mesh>
  );
}

interface Logo3DSpinProps {
  className?: string;
  height?: number;
}

export default function Logo3DSpin({
  className = "",
  height = 44,
}: Logo3DSpinProps) {
  const width = height * 3.4;

  return (
    <div className={className} style={{ width, height }}>
      <Canvas
        dpr={getCanvasDpr()}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 4, 6]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-3, -2, 4]} intensity={0.45} color="#3b8ef0" />
        <pointLight position={[0, 0, 3]} intensity={0.3} color="#1e6fd9" />
        <Suspense fallback={<LoadingBox />}>
          <ExtrudedLogoMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
