'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as THREE from 'three';


// Type for shape props
type ShapeProps = {
  position: [number, number, number];
  color: string;
  speed?: number;
};

// Animated 3D Objects Components
function AnimatedCube({ position, color, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe={true}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function AnimatedTetrahedron({ position, color, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <tetrahedronGeometry args={[1]} />
      <meshStandardMaterial
        color={color}
        wireframe={true}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function AnimatedOctahedron({ position, color, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial
        color={color}
        wireframe={true}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

// Floating particles component
function FloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const particlePositions = Array.from({ length: 50 }, () => ([
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20
  ] as [number, number, number]));

  return (
    <group ref={particlesRef}>
      {particlePositions.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial
            color="#a39d92"
            emissive="#a39d92"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.7}
        fade
        speed={0.5}
      />

      <ambientLight intensity={0.4} color="#c0c9cc" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#a39d92" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#636059" />
      <pointLight position={[0, 0, 15]} intensity={0.5} color="#f2f1f0" />

      <AnimatedCube position={[-8, 4, -5]} color="#a39d92" speed={0.8} />
      <AnimatedCube position={[8, -4, -8]} color="#636059" speed={1.2} />

      <AnimatedTetrahedron position={[6, 6, -6]} color="#c0c9cc" speed={1.0} />
      <AnimatedTetrahedron position={[-6, -6, -4]} color="#a39d92" speed={0.9} />

      <AnimatedOctahedron position={[0, 8, -10]} color="#f2f1f0" speed={0.7} />
      <AnimatedOctahedron position={[10, -2, -7]} color="#636059" speed={1.1} />

      <FloatingParticles />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function Education() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative py-20 overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          style={{
            background:
              'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Scene3D />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Educational Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My academic path in Computer Science and Engineering
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      BTech in Computer Science and Engineering
                    </h3>
                    <div className="flex items-center gap-2 text-blue-200 mt-2">
                      <span className="text-sm">📍</span>
                      <span>Lakireddy Bali Reddy College of Engineering</span>
                    </div>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-300">📅</span>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 shadow-sm"
                >
                  2021 - 2025
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">📚</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Intermediate in MPC</h3>
                    <div className="flex items-center gap-2 text-purple-200 mt-2">
                      <span className="text-sm">📍</span>
                      <span>Sri Chaitanya Junior College</span>
                    </div>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-300">📅</span>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 shadow-sm"
                >
                  2019 - 2021
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
