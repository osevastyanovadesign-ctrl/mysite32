import React from "react";
import { motion, useInView } from "framer-motion";

// Wraps children and fades them up from the bottom edge when scrolled into view.
export default function Reveal({ children, delay = 0, className = "", y = 28 }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}