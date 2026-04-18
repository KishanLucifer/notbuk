import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }) {
  const beams = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 8,
    opacity: 0.08 + Math.random() * 0.12,
    width: 1 + Math.random() * 2,
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(263 70% 58%)" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(263 70% 58%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(190 95% 50%)" stopOpacity="0.8" />
            <stop offset="70%" stopColor="hsl(263 70% 58%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(263 70% 58%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {beams.map((beam) => (
          <motion.line
            key={beam.id}
            x1={`${beam.x}%`}
            y1="0%"
            x2={`${beam.x}%`}
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth={beam.width}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: [0, beam.opacity, beam.opacity, 0],
              pathLength: [0, 1],
            }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Radial glow at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
    </div>
  );
}
