import { useRef } from "react";
import { motion, useInView } from "framer-motion";

  // Define motion variants for animations
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and shifted down
    visible: { opacity: 1, y: 0 }, // Animate to visible and centered
  };

export const SectionWithAnimation = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    return (
      <motion.section
        className="motion-section"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariant}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.section>
    );
  };