"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";

// ================= GOLDEN RAIN =================
function GoldenRain() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            width: "1px",
            height: `${20 + Math.random() * 30}px`,
          }}
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// ================= STARS =================
function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-200"
          style={{
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ================= STAIR =================
function Stair({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position} rotation={[0, -0.4, 0]}>
        <boxGeometry args={[3.5, 0.3, 1.5]} />
        <meshPhysicalMaterial
          color="#a855f7"
          transparent
          opacity={0.7}
          roughness={0}
          metalness={0.1}
          transmission={0.8}
          thickness={1}
          emissive="#7e22ce"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

// ================= SCENE =================
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-5, 5, 5]} intensity={50} color="#eab308" />
      
      {Array.from({ length: 7 }).map((_, i) => (
        <Stair key={i} position={[-2 + i * 0.8, -2 + i * 0.7, -i * 0.3]} />
      ))}

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      </EffectComposer>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
    </>
  );
}

// ================= MAIN COMPONENT =================
export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-900/10 blur-[150px] rounded-full" />
      </div>

      <GoldenRain />
      <Stars />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-10 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-black tracking-tighter italic">JMKC</h2>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-gray-400">
          {["Home", "Academy", "Careers"].map((link) => (
            <a key={link} href="#" className="hover:text-yellow-500 transition-colors">{link}</a>
          ))}
          <a href="#contact" className="text-white hover:text-yellow-500 transition-colors">Contact Us</a>
        </div>
        <button className="px-6 py-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all text-sm font-bold">
          LOGIN
        </button>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 container mx-auto px-10 pt-20 flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="text-6xl lg:text-8xl font-black tracking-tight"
          >
            IGNITE YOUR <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">POTENTIAL</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg max-w-lg leading-relaxed"
          >
            Transform your career with industry-led mentorship, hands-on projects, and a path designed for the future of tech.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <button className="px-10 py-4 bg-yellow-500 text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              Get Started
            </button>
            <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              Contact Us
            </button>
          </motion.div>
        </div>

        {/* 3D Canvas Container */}
        <div className="hidden lg:block w-1/2 h-[600px] cursor-grab active:cursor-grabbing">
          <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-gray-500">Loading...</div>}>
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
              <Scene />
            </Canvas>
          </Suspense>
        </div>
      </main>
    </section>
  );
}