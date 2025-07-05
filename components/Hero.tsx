'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import { Typewriter } from 'react-simple-typewriter';



// Type definitions
interface ParticleSystemProps {
  count?: number;
}

interface StarFieldProps {
  count: number;
}

// Generate random points in a sphere
const generateSpherePoints = (count: number): Float32Array => {
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * 25 + 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  
  return positions;
};

// Animated particle system component
const ParticleSystem: React.FC<ParticleSystemProps> = ({ count = 2000 }) => {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Generate particle positions
  const positions = useMemo(() => generateSpherePoints(count), [count]);
  
  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the entire particle system
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      
      // Pulse effect
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#495050"
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Floating geometric shapes
const FloatingShapes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.x = time * 0.2;
      groupRef.current.rotation.y = time * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <mesh position={[10, 5, -10]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial wireframe color="#e4e1d0" transparent opacity={0.4} />
      </mesh>
      
      {/* Wireframe torus */}
      <mesh position={[-8, -3, -5]}>
        <torusGeometry args={[2, 0.8, 8, 16]} />
        <meshBasicMaterial wireframe color="#495050" transparent opacity={0.5} />
      </mesh>
      
      {/* Wireframe octahedron */}
      <mesh position={[0, -8, -15]}>
        <octahedronGeometry args={[4]} />
        <meshBasicMaterial wireframe color="#203850" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Main Three.js scene
const Scene: React.FC = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    // Set camera position
    camera.position.z = 30;
  }, [camera]);
  
  return (
    <>
      <ParticleSystem count={1500} />
      <FloatingShapes />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#495050" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#e4e1d0" />
      <pointLight position={[0, 0, 20]} intensity={0.4} color="#203850" />
    </>
  );
};

// Main Hero component
const Hero: React.FC = () => {
  // Animation variants for text content
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.6
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#182340] via-[#e4e1d0] to-[#182340] overflow-hidden">
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 30], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Scene />
        </Canvas>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-[#495050] via-[#203850] to-[#495050] bg-clip-text text-transparent">
              VEERENDRA NADH
            </span>
            <br />
            
          </motion.h1>
          
          {/* Subheading */}
          <motion.h2
          className="text-lg sm:text-xl md:text-2xl text-[#203850] mb-8 max-w-2xl mx-auto leading-relaxed opacity-90"
          variants={itemVariants}
          >
            I specialize in{" "}
            <span className="text-purple-900">
              <Typewriter
              words={[
                "Full-Stack Development",
                "Front End Development",
                "Back End Development",
                "Machine Learning"
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
              />
              </span>
          </motion.h2>
          
          {/* CTA Button */}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
          >
            <Link href="https://github.com/Vnadh">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#e4e1d0] to-[#495050] hover:from-[#e4e1d0] hover:to-[#203850] text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
              >
                Git hub
                <svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </Button>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link href="https://www.linkedin.com/in/vallepuveerendranadh/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#e4e1d0] to-[#495050] hover:from-[#e4e1d0] hover:to-[#203850] text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
              >
                Linkedin
                <svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </Button>
            </Link>
          </motion.div>
          
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex flex-col items-center text-[#203850] opacity-70">
              <span className="text-sm mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#182340]/30 via-transparent to-[#182340]/30 z-5" />
    </section>
  );
};

export default Hero;