'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Footer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // FIX 1 & 2: 'width' and 'height' are never reassigned, so use 'const'
    const width = mountRef.current?.clientWidth || window.innerWidth;
    const height = 300; // Footer height

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);

    // FIX 3: Capture mountRef.current in a local variable for the cleanup function
    const currentMount = mountRef.current;
    if (currentMount) { // Ensure mountRef.current exists before appending
      currentMount.appendChild(renderer.domElement);
    }

    // Add stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starVertices = [];

    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animate
    const animate = () => {
      // Use requestAnimationFrame recursively to create the animation loop
      requestAnimationFrame(animate);

      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      // FIX 3 (continued): Use the captured local variable for cleanup
      if (currentMount && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose(); // Important to dispose of the renderer to free up resources
    };
  }, []); // Empty dependency array as this effect runs only once on mount

  return (
    <div
      style={{
        position: 'relative',
        height: '300px',
        width: '100%',
        overflow: 'hidden',
        background: 'black',
        color: 'white',
        textAlign: 'center',
      }}
    >
      {/* The div where Three.js canvas will be mounted */}
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '120px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          textShadow: '0 0 5px #fff',
        }}
      >
        © 2025 Veererendra Nadh | Made with 🚀 Next.js and Three.js
      </div>
    </div>
  );
}