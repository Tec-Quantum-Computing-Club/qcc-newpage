import React from 'react';
import MatrixRain from './MatrixRain';
import { Button } from './ui/button';
import { FaArrowRight } from "react-icons/fa";

export function Hero() {
  return (
    <div className="relative bg-background text-foreground pt-32 pb-20 overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-8xl font-bold text-primary relative inline-block">
            <span className="relative z-10">Quantum</span>
            <span className="absolute inset-0 bg-background blur-sm"></span>
          </h1>
          <h1 className="text-5xl md:text-5xl font-bold text-white relative">
            <span className="relative z-10">is the future</span>
            <span className="inset-0 bg-background blur-sm"></span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl mt-8 mb-5 text-foreground/80 max-w-3xl mx-auto relative inline-block">
          <span className="relative z-10">
            Quantum Computing Club is a community of quantum computing enthusiasts, researchers, and professionals at Tecnologico de Monterrey.
          </span>
          <span className="absolute inset-0 bg-background blur-sm"></span>
        </p>
        <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Learn more <FaArrowRight className="ml-2 inline" /></Button>
        </div>
      </div>
    </div>
  );
}