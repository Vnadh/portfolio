'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Footer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let width = mountRef.current?.clientWidth || window.innerWidth;
    let height = 300; // Footer height

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

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
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

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
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0 }} />
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