'use client';

import React, { useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const skillsData = [
  {
    category: "Programming Languages",
    skills: ["Python", "C", "Java", "JavaScript", "TypeScript"],
    icon: "💻",
    color: "from-[#b0c9b8] to-[#afc8c4]",
  },
  {
    category: "Full-Stack Development",
    skills: ["HTML", "CSS", "React.js", "Next.js", "REST APIs"],
    icon: "🌐",
    color: "from-[#2d1674] to-[#b0c9b8]",
  },
  {
    category: "Data Structures & Algorithms",
    skills: ["DSA"],
    icon: "🧩",
    color: "from-[#afc8c4] to-[#cfd6c2]",
  },
  {
    category: "Databases",
    skills: ["MySQL", "MongoDB"],
    icon: "🗄️",
    color: "from-[#2d1674] to-[#cfd6c2]",
  },
  {
    category: "Machine Learning",
    skills: ["Scikit-learn", "PyTorch", "TensorFlow"],
    icon: "🧠",
    color: "from-[#b0c9b8] to-[#2d1674]",
  },
  {
    category: "Version Control",
    skills: ["Git"],
    icon: "🔗",
    color: "from-[#cfd6c2] to-[#afc8c4]",
  },
];

// Floating Code Symbol
const FloatingCodeSymbol: React.FC<{
  position: [number, number, number];
  color?: string;
  scale?: number;
}> = ({ position, color = '#b0c9b8', scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5 + position[1]) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Neural Node
const NeuralNode: React.FC<{
  position: [number, number, number];
  connections?: [number, number, number][];
  color?: string;
}> = ({ position, connections = [], color = '#afc8c4' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.9}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      {connections.map((connection, index) => {
        const linePoints = new Float32Array([...position, ...connection]);
        const bufferAttr = new THREE.BufferAttribute(linePoints, 3);
        return (
          <line key={index}>
            <bufferGeometry>
              <primitive attach="attributes-position" object={bufferAttr} />
            </bufferGeometry>
            <lineBasicMaterial color={color} transparent opacity={0.4} />
          </line>
        );
      })}
    </group>
  );
};

// Binary Ring
const BinaryRing: React.FC<{
  position: [number, number, number];
  radius?: number;
  color?: string;
}> = ({ position, radius = 3, color = '#cfd6c2' }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01;
      groupRef.current.rotation.y += 0.005;
    }
  });

  const binaryNodes = useMemo(() => {
    const nodes: [number, number, number][] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      nodes.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
    }
    return nodes;
  }, [radius]);

  return (
    <group ref={groupRef} position={position}>
      {binaryNodes.map((nodePos, index) => (
        <mesh key={index} position={nodePos}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.7}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

// Data Flow Particles
const DataFlowParticles: React.FC<{ count?: number }> = ({ count = 50 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    // Define color palette based on your scheme
    const colorPalette = [
      [0.69, 0.79, 0.72], // #b0c9b8
      [0.18, 0.09, 0.45], // #2d1674
      [0.69, 0.78, 0.77], // #afc8c4
      [0.81, 0.84, 0.76], // #cfd6c2
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      colors[i3] = colorPalette[colorIndex][0];
      colors[i3 + 1] = colorPalette[colorIndex][1];
      colors[i3 + 2] = colorPalette[colorIndex][2];
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(state.clock.elapsedTime + i) * 0.01;
        positions[i3 + 1] += Math.cos(state.clock.elapsedTime + i) * 0.01;
        positions[i3 + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.005;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive
          attach="attributes-position"
          object={new THREE.BufferAttribute(particles.positions, 3)}
        />
        <primitive
          attach="attributes-color"
          object={new THREE.BufferAttribute(particles.colors, 3)}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Matrix Background - Fixed TypeScript error
const MatrixBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const matrixTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.fillStyle = '#b0c9b8';
    ctx.font = '12px monospace';

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      if (material.map) {
        material.map.offset.x += 0.001;
        material.map.offset.y += 0.0005;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -15]}>
      <planeGeometry args={[60, 60]} />
      <meshBasicMaterial map={matrixTexture} transparent opacity={0.3} />
    </mesh>
  );
};

// Tech Scene
const TechScene3D = () => (
  <>
    <ambientLight intensity={0.3} />
    <pointLight position={[10, 10, 10]} intensity={1} color="#b0c9b8" />
    <pointLight position={[-10, 5, 5]} intensity={0.8} color="#2d1674" />
    <pointLight position={[0, -10, 8]} intensity={0.6} color="#afc8c4" />
    <Stars radius={120} depth={60} count={600} factor={4} fade speed={0.3} />
    <MatrixBackground />
    <FloatingCodeSymbol position={[-8, 3, -2]} color="#2d1674" />
    <FloatingCodeSymbol position={[6, 5, -3]} color="#cfd6c2" />
    <NeuralNode position={[-3, 2, 0]} connections={[[1, -1, 0], [3, 1, 0]]} color="#afc8c4" />
    <BinaryRing position={[0, -3, -4]} radius={2.5} color="#b0c9b8" />
    <DataFlowParticles count={80} />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
  </>
);

// Main Component
const Skills = () => (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <TechScene3D />
      </Canvas>
    </div>

    <div className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-bold text-white text-center mb-10 bg-gradient-to-r from-[#b0c9b8] via-[#afc8c4] to-[#cfd6c2] bg-clip-text text-transparent">
          My Skills
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillsData.map((skill, index) => (
            <Card key={index} className="bg-slate-800/40 backdrop-blur-md text-white hover:scale-105 transition-all duration-300 border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-xl">{skill.icon}</span>
                  </div>
                  <span className="text-slate-100">{skill.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skill.skills.map((item, idx) => (
                    <Badge key={idx} className="bg-slate-700/60 text-slate-100 px-3 py-1 backdrop-blur-sm border-slate-600/50 hover:bg-slate-600/60 transition-colors">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Skills;