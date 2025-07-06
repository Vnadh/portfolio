'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

// Animated geometric shapes
function AnimatedSphere({ position, color, speed = 1, size = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={true} 
        emissive={color} 
        emissiveIntensity={0.3}
        transparent={true}
        opacity={0.7}
      />
    </mesh>
  );
}

function AnimatedTorus({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.6;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.3, 8, 20]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={true} 
        emissive={color} 
        emissiveIntensity={0.2}
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  );
}

function AnimatedIcosahedron({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={true} 
        emissive={color} 
        emissiveIntensity={0.25}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
}

// Floating code-like particles
function CodeParticles() {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      ],
      size: Math.random() * 0.05 + 0.02,
      color: ['#00ffff', '#0099ff', '#3366ff', '#6633ff'][Math.floor(Math.random() * 4)]
    });
  }

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <boxGeometry args={[particle.size, particle.size, particle.size]} />
          <meshStandardMaterial 
            color={particle.color} 
            emissive={particle.color} 
            emissiveIntensity={0.4}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Neural network-like connections
function NeuralNetwork() {
  const linesRef = useRef();
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const nodes = [
    [-8, 6, -5], [8, 6, -5], [0, 8, -8],
    [-6, -6, -6], [6, -6, -6], [0, -8, -8],
    [-10, 0, -7], [10, 0, -7]
  ];

  const connections = [
    [0, 1], [0, 2], [1, 2], [3, 4], [3, 5], [4, 5],
    [0, 6], [1, 7], [2, 6], [2, 7], [6, 7]
  ];

  return (
    <group ref={linesRef}>
      {/* Nodes */}
      {nodes.map((position, index) => (
        <mesh key={`node-${index}`} position={position}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {/* Connections */}
      {connections.map(([start, end], index) => {
        const startPos = new THREE.Vector3(...nodes[start]);
        const endPos = new THREE.Vector3(...nodes[end]);
        const midPoint = startPos.clone().lerp(endPos, 0.5);
        const length = startPos.distanceTo(endPos);
        
        return (
          <mesh key={`connection-${index}`} position={midPoint.toArray()}>
            <cylinderGeometry args={[0.01, 0.01, length]} />
            <meshStandardMaterial 
              color="#0099ff" 
              emissive="#0099ff" 
              emissiveIntensity={0.3}
              transparent={true}
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Main 3D Scene
function AboutScene3D() {
  return (
    <>
      {/* Starry background */}
      <Stars 
        radius={120} 
        depth={60} 
        count={4000} 
        factor={3} 
        saturation={0.8} 
        fade 
        speed={0.3}
      />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.3} color="#4dd0e1" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#3366ff" />
      <pointLight position={[0, 0, 20]} intensity={0.5} color="#6633ff" />
      <spotLight 
        position={[0, 15, 10]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={0.7}
        color="#00ffff"
      />
      
      {/* Animated geometric shapes */}
      <AnimatedSphere position={[-7, 5, -6]} color="#00ffff" speed={0.8} size={0.8} />
      <AnimatedSphere position={[7, -5, -8]} color="#0099ff" speed={1.2} size={1.0} />
      <AnimatedSphere position={[0, 7, -10]} color="#3366ff" speed={0.6} size={0.6} />
      
      <AnimatedTorus position={[6, 3, -5]} color="#4dd0e1" speed={0.9} />
      <AnimatedTorus position={[-6, -3, -7]} color="#6633ff" speed={1.1} />
      
      <AnimatedIcosahedron position={[8, -2, -6]} color="#00ccff" speed={0.7} />
      <AnimatedIcosahedron position={[-8, 2, -9]} color="#3399ff" speed={1.0} />
      <AnimatedIcosahedron position={[0, -6, -5]} color="#6666ff" speed={0.8} />
      
      {/* Floating code particles */}
      <CodeParticles />
      
      {/* Neural network visualization */}
      <NeuralNetwork />
      
      {/* Orbit controls with subtle auto-rotation */}
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.3}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

const AboutSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex justify-center items-center py-8 overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          style={{ 
            background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)' 
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <AboutScene3D />
        </Canvas>
      </div>

      {/* Content */}
      <Card className="relative z-10 w-full max-w-2xl mx-auto px-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <h2 className="text-4xl font-bold text-cyan-300 mb-2 drop-shadow-lg">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full shadow-lg" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 border-2 border-cyan-400/30 shadow-2xl">
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-2xl font-bold">
                VNadh
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-4 text-center">
            <p className="text-cyan-100/90 leading-relaxed text-lg drop-shadow-sm">
              Hello! I'm <span className="font-semibold text-cyan-300 drop-shadow-sm">Veerendra Nadh</span>, a B.Tech Computer Science and Engineering 
              student at Lakireddy Bali Reddy College of Engineering (2021-2025).
            </p>
            <p className="text-cyan-100/90 leading-relaxed text-lg drop-shadow-sm">
              My journey through the digital cosmos is fueled by a deep fascination 
              for both <span className="font-semibold text-cyan-300 drop-shadow-sm">web development</span> and{' '}
              <span className="font-semibold text-cyan-300 drop-shadow-sm">machine learning</span>. I thrive on crafting 
              intuitive and visually appealing user interfaces, while also delving 
              into the complexities of artificial intelligence to build intelligent 
              systems.
            </p>
            <p className="text-cyan-100/90 leading-relaxed text-lg drop-shadow-sm">
              I believe in continuous learning and leveraging technology to 
              solve real-world problems.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AboutSection;