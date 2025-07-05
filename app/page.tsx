// app/page.jsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';
import AboutSection from '@/components/AboutSection';


export default function Home() {
  return (
    <>
      <Navbar />
      <div id="Hero"><Hero /></div>
      <div id="Aboutme"><AboutSection /></div>
      <div id="Education"><Education /></div>
      <div id="Projects"><Projects /></div>
      <div id="Skills"><Skills /></div>
      <div id="Experience"><Experience /></div>
      <Footer />
        
    </>
  );
}