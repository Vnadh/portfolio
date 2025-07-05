"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Background = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Color palette
    const colors = {
      cream: 0xf2f1f0,
      pewter: 0xc0c9cc,
      sage: 0xa39d92,
      gunmetal: 0x636059,
      darkGunmetal: 0x3a3833
    };

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(colors.darkGunmetal, 10, 200);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(colors.darkGunmetal, 1);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 400;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 400;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 400;

      // Random colors from palette
      const colorChoice = Math.random();
      const color = new THREE.Color(
        colorChoice < 0.3 ? colors.cream :
        colorChoice < 0.6 ? colors.pewter :
        colorChoice < 0.8 ? colors.sage : colors.gunmetal
      );
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create planets and circular objects
    const planets = [];
    const rings = [];
    const orbs = [];
    const particles = [];
    
    // Create multiple planets with random sizes and positions
    for (let i = 0; i < 8; i++) {
      const size = Math.random() * 6 + 2;
      const planetGeometry = new THREE.SphereGeometry(size, 32, 32);
      const colorChoice = Math.random();
      const planetColor = colorChoice < 0.25 ? colors.sage : 
                         colorChoice < 0.5 ? colors.pewter : 
                         colorChoice < 0.75 ? colors.gunmetal : colors.cream;
      
      const planetMaterial = new THREE.MeshPhongMaterial({ 
        color: planetColor,
        shininess: Math.random() * 50 + 10,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.6
      });
      
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.set(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 200 - 50
      );
      
      // Add random movement properties
      planet.userData = {
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        speedZ: (Math.random() - 0.5) * 0.02,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
      };
      
      scene.add(planet);
      planets.push(planet);
    }

    // Create circular rings
    for (let i = 0; i < 12; i++) {
      const innerRadius = Math.random() * 15 + 5;
      const outerRadius = innerRadius + Math.random() * 5 + 2;
      const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: i % 2 === 0 ? colors.pewter : colors.sage,
        transparent: true,
        opacity: Math.random() * 0.3 + 0.2,
        side: THREE.DoubleSide
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 300 - 100
      );
      ring.rotation.x = Math.random() * Math.PI * 2;
      ring.rotation.y = Math.random() * Math.PI * 2;
      
      ring.userData = {
        speedX: (Math.random() - 0.5) * 0.03,
        speedY: (Math.random() - 0.5) * 0.03,
        speedZ: (Math.random() - 0.5) * 0.03,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
        rotSpeedZ: (Math.random() - 0.5) * 0.03,
      };
      
      scene.add(ring);
      rings.push(ring);
    }

    // Create glowing orbs
    for (let i = 0; i < 15; i++) {
      const orbGeometry = new THREE.SphereGeometry(Math.random() * 3 + 1, 16, 16);
      const orbMaterial = new THREE.MeshBasicMaterial({ 
        color: i % 3 === 0 ? colors.cream : i % 3 === 1 ? colors.pewter : colors.sage,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3
      });
      
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 400 - 50
      );
      
      orb.userData = {
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: (Math.random() - 0.5) * 0.04,
        speedZ: (Math.random() - 0.5) * 0.04,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        originalOpacity: orb.material.opacity
      };
      
      scene.add(orb);
      orbs.push(orb);
    }

    // Create circular particle groups
    for (let i = 0; i < 20; i++) {
      const particleGeometry = new THREE.CircleGeometry(Math.random() * 2 + 0.5, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({ 
        color: colors.gunmetal,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.2,
        side: THREE.DoubleSide
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 250,
        (Math.random() - 0.5) * 500 - 20
      );
      
      particle.userData = {
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        speedZ: (Math.random() - 0.5) * 0.05,
        rotSpeedZ: (Math.random() - 0.5) * 0.05,
      };
      
      scene.add(particle);
      particles.push(particle);
    }

    // Create nebula clouds
    const cloudGeometry = new THREE.SphereGeometry(30, 16, 16);
    const cloudMaterial = new THREE.MeshBasicMaterial({
      color: colors.sage,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    
    const cloud1 = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud1.position.set(-40, 20, -120);
    cloud1.scale.set(2, 1, 1);
    scene.add(cloud1);

    const cloud2 = new THREE.Mesh(cloudGeometry, cloudMaterial.clone());
    cloud2.material.color.setHex(colors.pewter);
    cloud2.material.opacity = 0.08;
    cloud2.position.set(50, -30, -140);
    cloud2.scale.set(1.5, 2, 1);
    scene.add(cloud2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(colors.cream, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(colors.pewter, 0.8);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(colors.sage, 0.5, 100);
    pointLight.position.set(-30, 20, 30);
    scene.add(pointLight);

    // Animation variables
    const time = { value: 0 };

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time.value += 0.01;

      // Rotate and move stars
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0003;
      stars.position.x = Math.sin(time.value * 0.1) * 2;
      stars.position.z = Math.cos(time.value * 0.1) * 1;

      // Animate planets with random movement
      planets.forEach((planet) => {
        // Update positions with random movement
        planet.position.x += planet.userData.speedX;
        planet.position.y += planet.userData.speedY;
        planet.position.z += planet.userData.speedZ;
        
        // Update rotations
        planet.rotation.x += planet.userData.rotSpeedX;
        planet.rotation.y += planet.userData.rotSpeedY;
        planet.rotation.z += planet.userData.rotSpeedZ;
        
        // Boundary check and random direction change
        if (Math.abs(planet.position.x) > 200) {
          planet.userData.speedX *= -1;
        }
        if (Math.abs(planet.position.y) > 100) {
          planet.userData.speedY *= -1;
        }
        if (Math.abs(planet.position.z) > 200) {
          planet.userData.speedZ *= -1;
        }
      });

      // Animate rings
      rings.forEach((ring) => {
        ring.position.x += ring.userData.speedX;
        ring.position.y += ring.userData.speedY;
        ring.position.z += ring.userData.speedZ;
        
        ring.rotation.x += ring.userData.rotSpeedX;
        ring.rotation.y += ring.userData.rotSpeedY;
        ring.rotation.z += ring.userData.rotSpeedZ;
        
        // Boundary check
        if (Math.abs(ring.position.x) > 300) {
          ring.userData.speedX *= -1;
        }
        if (Math.abs(ring.position.y) > 150) {
          ring.userData.speedY *= -1;
        }
        if (Math.abs(ring.position.z) > 300) {
          ring.userData.speedZ *= -1;
        }
      });

      // Animate orbs with pulsing effect
      orbs.forEach((orb) => {
        orb.position.x += orb.userData.speedX;
        orb.position.y += orb.userData.speedY;
        orb.position.z += orb.userData.speedZ;
        
        // Pulsing effect
        orb.material.opacity = orb.userData.originalOpacity + 
          Math.sin(time.value * orb.userData.pulseSpeed) * 0.3;
        
        // Scale pulsing
        const scale = 1 + Math.sin(time.value * orb.userData.pulseSpeed) * 0.2;
        orb.scale.set(scale, scale, scale);
        
        // Boundary check
        if (Math.abs(orb.position.x) > 400) {
          orb.userData.speedX *= -1;
        }
        if (Math.abs(orb.position.y) > 200) {
          orb.userData.speedY *= -1;
        }
        if (Math.abs(orb.position.z) > 400) {
          orb.userData.speedZ *= -1;
        }
      });

      // Animate particles
      particles.forEach((particle) => {
        particle.position.x += particle.userData.speedX;
        particle.position.y += particle.userData.speedY;
        particle.position.z += particle.userData.speedZ;
        
        particle.rotation.z += particle.userData.rotSpeedZ;
        
        // Boundary check
        if (Math.abs(particle.position.x) > 500) {
          particle.userData.speedX *= -1;
        }
        if (Math.abs(particle.position.y) > 250) {
          particle.userData.speedY *= -1;
        }
        if (Math.abs(particle.position.z) > 500) {
          particle.userData.speedZ *= -1;
        }
      });

      // Move and rotate clouds
      cloud1.rotation.y += 0.002;
      cloud1.rotation.x += 0.001;
      cloud1.position.x = Math.sin(time.value * 0.05) * 20 - 40;
      cloud1.position.y = Math.cos(time.value * 0.03) * 10 + 20;

      cloud2.rotation.y -= 0.0015;
      cloud2.rotation.z += 0.0008;
      cloud2.position.x = Math.cos(time.value * 0.04) * 15 + 50;
      cloud2.position.y = Math.sin(time.value * 0.06) * 8 - 30;

      // Move point light
      pointLight.position.x = Math.sin(time.value * 0.03) * 30;
      pointLight.position.y = Math.cos(time.value * 0.02) * 20 + 20;
      pointLight.position.z = Math.sin(time.value * 0.025) * 25 + 30;

      // Dynamic camera movement
      camera.position.x = Math.sin(time.value * 0.02) * 5;
      camera.position.y = Math.cos(time.value * 0.015) * 3;
      camera.position.z = 50 + Math.sin(time.value * 0.01) * 5;
      
      // Camera look at slight offset
      camera.lookAt(
        Math.sin(time.value * 0.01) * 2,
        Math.cos(time.value * 0.008) * 1,
        0
      );

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div ref={mountRef} className="w-full h-full" />
      {/* Optional overlay content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-white opacity-70">
          
        </div>
      </div>
    </div>
  );
};

export default Background;