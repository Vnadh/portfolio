// app/components/Projects.jsx
'use client';
import React, { useState, useRef, useMemo } from 'react';
import { Eye, TrendingUp, Brain, Shield, Video, Github } from 'lucide-react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  {
    title: "VisionGuard",
    description: "A state-of-the-art deep learning system for detecting and classifying 8 ocular diseases from retinal images. Built on EfficientNet-B4 with enhancements like Stochastic Depth and Squeeze-and-Excitation layers, it achieves robust performance across diverse clinical scenarios.",
    icon: <Eye className="w-8 h-8" />,
    image: "/assets/visionguard-screenshot.jpg",
    tags: ["Deep Learning", "Computer Vision", "EfficientNet", "Medical AI"],
    color: "from-blue-500 to-cyan-500",
    githubLink: "https://github.com/Vnadh/VisionGuard",
  },
  {
    title: "RL Crypto Trading Bot",
    description: "An advanced reinforcement learning crypto trading system implementing PPO, A2C, and DQN algorithms for optimized BTC/USDT trading strategies.",
    icon: <TrendingUp className="w-8 h-8" />,
    image: "/assets/rl-crypto-bot-screenshot.png",
    tags: ["Reinforcement Learning", "Crypto Trading", "PPO", "DQN", "A2C"],
    color: "from-green-500 to-emerald-500",
    githubLink: "https://github.com/Vnadh/RL-Crypto-Trading-Bot",
  },
  {
    title: "Brain Tumor Classification",
    description: "This Streamlit application enables users to upload brain MRI images and perform tumor classification using a pre-trained ResNet18 model, with visualizations provided by various Grad-CAM techniques. The app supports four tumor classes: glioma, meningioma, no tumor, and pituitary.",
    icon: <Brain className="w-8 h-8" />,
    image: "/assets/brain-tumor-screenshot.png",
    tags: ["Medical AI", "ResNet18", "Grad-CAM", "Streamlit", "Classification"],
    color: "from-purple-500 to-pink-500",
    githubLink: "https://github.com/Vnadh/brain-tumors",
  },
  {
    title: "Deepfake Detection",
    description: "Deepfakes allow bogus(fake) content creation through artificial intelligence technology, and it is impacting society a lot. Human beings are not able to identify which one is fake and which one is real.",
    icon: <Shield className="w-8 h-8" />,
    image: "/assets/deepfake-detection-screenshot.png",
    tags: ["Multimodal Learning", "Computer Vision", "Security", "Detection"],
    color: "from-red-500 to-orange-500",
    githubLink: "https://github.com/Vnadh/DeepfakeDetectionUsingMultimodalDeepLearning",
  },
  {
    title: "Flux - YouTube Clone",
    description: "This project is a modern YouTube clone application built using React JS and Material UI. The application aims to mimic the core functionalities of YouTube, including video browsing, searching, and viewing, all within a sleek and responsive user interface.",
    icon: <Video className="w-8 h-8" />,
    image: "/assets/flux-screenshot.png",
    tags: ["React", "Material UI", "Video Streaming", "Web Development"],
    color: "from-yellow-500 to-red-500",
    githubLink: "https://github.com/Vnadh/flux",
  },
];

// 3D Rotating Cube Component
const RotatingCube = ({ position, scale = 1, color = '#4f46e5' }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={true} 
          transparent={true} 
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// 3D Rotating Tetrahedron Component
const RotatingTetrahedron = ({ position, scale = 1, color = '#059669' }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.015;
      meshRef.current.rotation.z += 0.01;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <tetrahedronGeometry args={[1]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={true} 
          transparent={true} 
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
};

// 3D Rotating Octahedron Component
const RotatingOctahedron = ({ position, scale = 1, color = '#dc2626' }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.z += 0.005;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={true} 
          transparent={true} 
          opacity={0.5}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

// Gradient Background Plane Component
const GradientPlane = () => {
  const meshRef = useRef();
  
  // Create gradient texture
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create radial gradient
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#1e1b4b'); // Deep purple
    gradient.addColorStop(0.5, '#0f172a'); // Dark slate
    gradient.addColorStop(1, '#020617'); // Almost black
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} rotation={[0, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial 
        map={gradientTexture} 
        transparent={true} 
        opacity={0.8}
      />
    </mesh>
  );
};

// Main 3D Scene Component
const Scene3D = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#4f46e5" />
      <pointLight position={[-10, -10, 5]} intensity={0.6} color="#059669" />
      
      {/* Background Elements */}
      <Stars 
        radius={100} 
        depth={50} 
        count={800} 
        factor={4} 
        saturation={0.5} 
        fade={true}
        speed={0.5}
      />
      <GradientPlane />
      
      {/* 3D Objects */}
      <RotatingCube position={[-8, 2, -2]} scale={0.8} color="#4f46e5" />
      <RotatingCube position={[8, -3, -1]} scale={1.2} color="#7c3aed" />
      <RotatingCube position={[0, 5, -3]} scale={0.6} color="#06b6d4" />
      
      <RotatingTetrahedron position={[-5, -2, 0]} scale={1.0} color="#059669" />
      <RotatingTetrahedron position={[6, 4, -2]} scale={0.8} color="#10b981" />
      <RotatingTetrahedron position={[-2, -5, -1]} scale={1.1} color="#34d399" />
      
      <RotatingOctahedron position={[3, 1, 1]} scale={0.9} color="#dc2626" />
      <RotatingOctahedron position={[-6, 3, 0]} scale={0.7} color="#f59e0b" />
      <RotatingOctahedron position={[4, -4, -2]} scale={1.0} color="#ec4899" />
      
      {/* Orbit Controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative group overflow-hidden rounded-2xl bg-black/30 backdrop-blur-lg border border-white/20 transition-all duration-700 hover:scale-105 hover:bg-black/40 shadow-2xl ${
        index % 2 === 0 ? 'animate-pulse' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 0.2}s`,
        animationDuration: '3s'
      }}
    >
      {/* Enhanced gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-25 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative p-8 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg`}>
            {project.icon}
          </div>
          <div className='flex items-center justify-center'>
            <Image src={project.image} alt={project.title} width={150} height={0}/>
          </div>
          <div className="flex space-x-2">
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-300 text-white/90 hover:text-white backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-200 mb-6 leading-relaxed line-clamp-4">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white/95 backdrop-blur-sm border border-white/30"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Enhanced hover effect bottom border */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ 
            width: '100%', 
            height: '100%',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <Scene3D />
        </Canvas>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              Featured Projects
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Explore cutting-edge AI and machine learning projects that push the boundaries of technology and innovation.
            </p>
          </div>
        </div>
        
        <div className="py-16" />
        
        {/* Projects Grid */}
        <div className="container mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;