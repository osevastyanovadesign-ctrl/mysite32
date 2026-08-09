import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// The Red Thread — a single thin line that tracks the scroll,
// representing the leash / connection to the red dachshund mascot.
export default function RedThread() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-px bg-primary origin-left z-[60]"
      aria-hidden
    />
  );
}