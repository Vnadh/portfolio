// app/components/Skills.jsx
'use client';

import React, { useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const skillsData = [
  {
    category: "Programming Languages",
    skills: ["Python", "C", "Java", "JavaScript", "TypeScript"],
    icon: "💻",
    color: "from-blue-500 to-purple-600",
  },
  {
    category: "Full-Stack Development",
    skills: ["HTML", "CSS", "React.js", "Next.js", "REST APIs"],
    icon: "🌐",
    color: "from-green-500 to-teal-600",
  },
  {
    category: "Data Structures & Algorithms",
    skills: ["DSA"],
    icon: "🧩",
    color: "from-purple-500 to-pink-600",
  },
  {
    category: "Databases",
    skills: ["MySQL", "MongoDB"],
    icon: "🗄️",
    color: "from-orange-500 to-red-600",
  },
  {
    category: "Machine Learning",
    skills: ["Scikit-learn", "PyTorch", "TensorFlow"],
    icon: "🧠",
    color: "from-cyan-500 to-blue-600",
  },
  {
    category: "Version Control",
    skills: ["Git"],
    icon: "🔗",
    color: "from-emerald-500 to-green-600",
  },
];

// Floating Code Symbols Component
const FloatingCodeSymbol = ({ position, symbol, color = '#4f46e5', scale = 1 }) => {
  const meshRef = useRef();
  
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
          transparent={true} 
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Neural Network Node Component
const NeuralNode = ({ position, connections = [], color = '#06b6d4' }) => {
  const meshRef = useRef();
  const lineRefs = useRef([]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group>
      {/* Node */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            transparent={true} 
            opacity={0.9}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      
      {/* Connections */}
      {connections.map((connection, index) => (
        <line key={index} ref={el => lineRefs.current[index] = el}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([...position, ...connection])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={0.4} />
        </line>
      ))}
    </group>
  );
};

// Rotating Binary Ring Component
const BinaryRing = ({ position, radius = 3, color = '#10b981' }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01;
      groupRef.current.rotation.y += 0.005;
    }
  });

  const binaryNodes = useMemo(() => {
    const nodes = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      nodes.push([x, y, 0]);
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
            transparent={true} 
            opacity={0.7}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

// Data Flow Particles Component
const DataFlowParticles = ({ count = 50 }) => {
  const pointsRef = useRef();
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      colors[i3] = Math.random();
      colors[i3 + 1] = Math.random();
      colors[i3 + 2] = Math.random();
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      
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
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particles.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors={true} 
        transparent={true} 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Matrix-style Background Component
const MatrixBackground = () => {
  const meshRef = useRef();
  
  const matrixTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Create matrix-like pattern
    ctx.fillStyle = '#000015';
    ctx.fillRect(0, 0, 1024, 1024);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = '12px monospace';
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, x, y);
    }
    
    // Add grid lines
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.1;
    
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 51.2, 0);
      ctx.lineTo(i * 51.2, 1024);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * 51.2);
      ctx.lineTo(1024, i * 51.2);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.map.offset.x += 0.001;
      meshRef.current.material.map.offset.y += 0.0005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -15]} rotation={[0, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshBasicMaterial 
        map={matrixTexture} 
        transparent={true} 
        opacity={0.3}
      />
    </mesh>
  );
};

// Main 3D Scene Component
const TechScene3D = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
      <pointLight position={[-10, 5, 5]} intensity={0.8} color="#4f46e5" />
      <pointLight position={[0, -10, 8]} intensity={0.6} color="#06b6d4" />
      
      {/* Background Elements */}
      <Stars 
        radius={120} 
        depth={60} 
        count={600} 
        factor={4} 
        saturation={0.3} 
        fade={true}
        speed={0.3}
      />
      <MatrixBackground />
      
      {/* Floating Code Symbols */}
      <FloatingCodeSymbol position={[-8, 3, -2]} color="#4f46e5" scale={0.8} />
      <FloatingCodeSymbol position={[8, -2, -1]} color="#06b6d4" scale={1.2} />
      <FloatingCodeSymbol position={[-4, -4, 0]} color="#10b981" scale={0.9} />
      <FloatingCodeSymbol position={[6, 5, -3]} color="#f59e0b" scale={1.1} />
      <FloatingCodeSymbol position={[0, 6, -2]} color="#ec4899" scale={0.7} />
      <FloatingCodeSymbol position={[-6, -1, 1]} color="#8b5cf6" scale={1.0} />
      
      {/* Neural Network Nodes */}
      <NeuralNode 
        position={[-3, 2, 0]} 
        connections={[[1, -1, 0], [3, 1, 0]]}
        color="#06b6d4" 
      />
      <NeuralNode 
        position={[1, -1, 0]} 
        connections={[[3, 1, 0], [-1, 3, 0]]}
        color="#10b981" 
      />
      <NeuralNode 
        position={[3, 1, 0]} 
        connections={[[-1, 3, 0], [-3, 2, 0]]}
        color="#f59e0b" 
      />
      <NeuralNode 
        position={[-1, 3, 0]} 
        connections={[[-3, 2, 0], [1, -1, 0]]}
        color="#ec4899" 
      />
      
      {/* Binary Rings */}
      <BinaryRing position={[-5, 0, -3]} radius={2} color="#4f46e5" />
      <BinaryRing position={[5, 2, -2]} radius={1.5} color="#06b6d4" />
      <BinaryRing position={[0, -3, -4]} radius={2.5} color="#10b981" />
      
      {/* Data Flow Particles */}
      <DataFlowParticles count={80} />
      
      {/* Orbit Controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.3}
        enableDamping={true}
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

const Skills = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Tech Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          style={{ 
            width: '100%', 
            height: '100%',
            background: 'linear-gradient(135deg, #000015 0%, #001122 30%, #002244 60%, #003366 100%)'
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <TechScene3D />
        </Canvas>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
              My Skills
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              A showcase of my technical expertise in programming, full-stack development, and machine learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skillsData.map((skill, index) => (
              <Card
                key={index}
                className="bg-black/40 border-white/30 backdrop-blur-lg hover:bg-black/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-xl group"
              >
                <CardHeader>
                  <CardTitle className="text-white">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white font-bold text-xl drop-shadow-lg">{skill.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                        {skill.category}
                      </h3>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((item, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-white/20 text-white border-white/40 px-3 py-1 text-sm hover:bg-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                      >
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
};

export default Skills;