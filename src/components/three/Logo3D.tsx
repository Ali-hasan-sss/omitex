"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function LogoRing() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#c9a227"
          emissive="#c9a227"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, Math.PI / 3]}>
        <torusGeometry args={[1.8, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#0d9488"
          emissive="#0d9488"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, -Math.PI / 6]}>
        <torusGeometry args={[1.4, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#e8c547"
          emissive="#c9a227"
          emissiveIntensity={0.2}
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[0.35, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#c9a227"
            emissive="#c9a227"
            emissiveIntensity={0.5}
            distort={0.3}
            speed={2}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>

      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 2.2,
              Math.sin(angle * 2) * 0.2,
              Math.sin(angle) * 2.2,
            ]}
          >
            <octahedronGeometry args={[0.1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#14b8a6" : "#e8c547"}
              emissive={i % 2 === 0 ? "#0d9488" : "#c9a227"}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#e8c547" emissive="#c9a227" emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#14b8a6" emissive="#0d9488" emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function FallbackLogo() {
  return (
    <mesh>
      <torusGeometry args={[1.5, 0.1, 16, 100]} />
      <meshStandardMaterial color="#c9a227" />
    </mesh>
  );
}

interface Logo3DProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo3D({ className = "", size = "md" }: Logo3DProps) {
  const heights = { sm: "h-24 w-24", md: "h-40 w-40", lg: "h-64 w-64" };

  return (
    <div className={`${heights[size]} ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#c9a227" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#0d9488" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="#e8c547"
        />
        <Suspense fallback={<FallbackLogo />}>
          <LogoRing />
        </Suspense>
      </Canvas>
    </div>
  );
}
