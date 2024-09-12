// src/components/FloatingParticles.js
import React from 'react';
import './floatingPart.css' 

const FloatingParticles = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="particle bg-green-500"></div>
        <div className="particle bg-green-400"></div>
        <div className="particle bg-green-300"></div>
        <div className="particle bg-green-600"></div>
        <div className="particle bg-green-200"></div>
      </div>

      <div className="relative z-10 text-white text-center py-20">
        <h1 className="text-4xl">Glowing Dark Theme</h1>
        <p className="mt-4">With floating particles in the background</p>
      </div>
    </div>
  );
};

export default FloatingParticles;
