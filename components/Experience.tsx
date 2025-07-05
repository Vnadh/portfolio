'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    title: "AWS Intern",
    company: "BrainOvision Solutions Pvt. Ltd.",
    location: "Hyderabad, India",
    duration: "Sep 2023 - Oct 2023",
    description: ["Earned positive feedback for quick learning and punctuality."],
    icon: "☁️",
    color: "from-orange-400 to-orange-600",
  },
  {
    title: "Intern",
    company: "National Internship Portal (AICTE)",
    location: "India",
    duration: "Jul 2024 - Sep 2024",
    description: ["Drove project outcomes with technical and problem-solving skills."],
    icon: "💼",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Machine Learning Intern",
    company: "SkillDzire, Andhra Pradesh State Council of Higher Education",
    location: "India",
    duration: "Dec 2024 - Apr 2025",
    description: ["Developed ML models, improving predictive accuracy using Python and TensorFlow."],
    icon: "🧠",
    color: "from-purple-400 to-purple-600",
  },
];

function GrowthTimeline() {
  const timelineRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (timelineRef.current) {
      timelineRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const timelinePoints = [
    { position: [-8, -4, -8], color: '#ff9500' },
    { position: [-2, 0, -6], color: '#3b82f6' },
    { position: [4, 4, -4], color: '#8b5cf6' },
  ];

  return (
    <group ref={timelineRef}>
      {timelinePoints.map((point, index) => {
        if (index < timelinePoints.length - 1) {
          const start = new THREE.Vector3(...point.position);
          const end = new THREE.Vector3(...timelinePoints[index + 1].position);
          const midPoint = start.clone().lerp(end, 0.5);
          const length = start.distanceTo(end);

          return (
            <mesh key={`path-${index}`} position={midPoint.toArray()}>
              <cylinderGeometry args={[0.05, 0.05, length]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} transparent opacity={0.6} />
            </mesh>
          );
        }
        return null;
      })}

      {timelinePoints.map((point, index) => (
        <mesh key={`milestone-${index}`} position={point.position as [number, number, number]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color={point.color} emissive={point.color} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function CloudInfrastructure() {
  const cloudRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      cloudRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  const cloudPoints = [
    { position: [0, 0, 0], scale: 1.2 },
    { position: [1.5, 0.5, 0], scale: 0.8 },
    { position: [-1.5, 0.3, 0], scale: 0.9 },
    { position: [0.5, -0.8, 0], scale: 0.7 },
    { position: [-0.8, -0.5, 0], scale: 0.6 },
  ];

  return (
    <group ref={cloudRef} position={[-10, 6, -10]}>
      {cloudPoints.map((point, index) => (
        <mesh key={index} position={point.position as [number, number, number]} scale={point.scale}>
          <sphereGeometry args={[0.8, 8, 6]} />
          <meshStandardMaterial color="#ff9500" emissive="#ff9500" emissiveIntensity={0.3} transparent opacity={0.6} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function MLNeuralNetwork() {
  const networkRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      networkRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  const layers = [
    { nodes: 4, x: -2, color: '#8b5cf6' },
    { nodes: 6, x: 0, color: '#a855f7' },
    { nodes: 4, x: 2, color: '#c084fc' },
  ];

  return (
    <group ref={networkRef} position={[10, -3, -8]}>
      {layers.map((layer, layerIndex) => (
        <group key={layerIndex}>
          {Array.from({ length: layer.nodes }).map((_, nodeIndex) => {
            const y = (nodeIndex - layer.nodes / 2) * 1.5;
            return (
              <mesh key={nodeIndex} position={[layer.x, y, 0]}>
                <sphereGeometry args={[0.15]} />
                <meshStandardMaterial color={layer.color} emissive={layer.color} emissiveIntensity={0.4} />
              </mesh>
            );
          })}
        </group>
      ))}

      {layers.slice(0, -1).map((layer, layerIndex) => {
        const nextLayer = layers[layerIndex + 1];
        return Array.from({ length: layer.nodes }).map((_, nodeIndex) => {
          const startY = (nodeIndex - layer.nodes / 2) * 1.5;
          return Array.from({ length: nextLayer.nodes }).map((_, nextNodeIndex) => {
            const endY = (nextNodeIndex - nextLayer.nodes / 2) * 1.5;
            const start = new THREE.Vector3(layer.x, startY, 0);
            const end = new THREE.Vector3(nextLayer.x, endY, 0);
            const midPoint = start.clone().lerp(end, 0.5);
            const length = start.distanceTo(end);

            return (
              <mesh key={`${nodeIndex}-${nextNodeIndex}`} position={midPoint.toArray()}>
                <cylinderGeometry args={[0.01, 0.01, length]} />
                <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={0.2} transparent opacity={0.4} />
              </mesh>
            );
          });
        });
      })}
    </group>
  );
}

function ProfessionalBlocks() {
  const blocksRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (blocksRef.current) {
      blocksRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const blocks = [
    { position: [0, 0, 0], color: '#3b82f6', size: [1, 1, 1] },
    { position: [0, 1.2, 0], color: '#1d4ed8', size: [0.8, 0.8, 0.8] },
    { position: [0, 2.2, 0], color: '#1e40af', size: [0.6, 0.6, 0.6] },
  ];

  return (
    <group ref={blocksRef} position={[0, -2, -12]}>
      {blocks.map((block, index) => (
        <mesh key={index} position={block.position as [number, number, number]}>
          <boxGeometry args={block.size as [number, number, number]} />
          <meshStandardMaterial color={block.color} emissive={block.color} emissiveIntensity={0.2} transparent opacity={0.7} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function TechSymbols() {
  const symbolsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (symbolsRef.current) {
      symbolsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      symbolsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  const symbols = Array.from({ length: 25 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 30,
    ] as [number, number, number],
    color: ['#ff9500', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 3)],
    shape: ['cube', 'tetrahedron', 'octahedron'][Math.floor(Math.random() * 3)],
  }));

  return (
    <group ref={symbolsRef}>
      {symbols.map((symbol, index) => (
        <mesh key={index} position={symbol.position}>
          {symbol.shape === 'cube' && <boxGeometry args={[0.1, 0.1, 0.1]} />}
          {symbol.shape === 'tetrahedron' && <tetrahedronGeometry args={[0.1]} />}
          {symbol.shape === 'octahedron' && <octahedronGeometry args={[0.1]} />}
          <meshStandardMaterial color={symbol.color} emissive={symbol.color} emissiveIntensity={0.3} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function ExperienceScene3D() {
  return (
    <>
      <Stars radius={100} depth={50} count={3500} factor={4} saturation={0.6} fade speed={0.4} />
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff9500" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[0, 0, 15]} intensity={0.5} color="#8b5cf6" />
      <directionalLight position={[20, 20, 20]} intensity={0.3} color="#ffffff" castShadow />
      <GrowthTimeline />
      <CloudInfrastructure />
      <MLNeuralNetwork />
      <ProfessionalBlocks />
      <TechSymbols />
      <OrbitControls autoRotate autoRotateSpeed={0.4} enableZoom={false} enablePan={false} enableRotate={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
    </>
  );
}

const Experience = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative py-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas
          camera={{ position: [0, 0, 18], fov: 75 }}
          style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1e293b 100%)' }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <ExperienceScene3D />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            My Experience
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A summary of my professional journey, showcasing my contributions in internships and projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-xl">{exp.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-gray-200 mt-2">
                        <span className="text-sm">📍</span>
                        <span>{exp.company}, {exp.location}</span>
                      </div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-300">🗓️</span>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 shadow-sm">
                    {exp.duration}
                  </Badge>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
