import React, { useRef, useState, useEffect } from "react";
import image1 from "../assets/8.png";
import { motion, AnimatePresence } from "framer-motion";

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Create your account",
    description:
      "Sign up in seconds and start exploring the platform with your personal dashboard.",
  },
  {
    title: "Connect your data",
    description:
      "Securely integrate your tools and import the information you need.",
  },
  {
    title: "Personalized tips",
    description:
      "Use our powerful interface to manage everything in one place and get smart insights.",
  },
];

const StepsGuide: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / rect.height;

      const stepIndex = Math.min(
        steps.length - 1,
        Math.max(0, Math.floor(progress * steps.length))
      );

      setActiveStep(stepIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center">

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="flex justify-center">
            <div className="bg-white rounded-[40px] p-8 w-[380px] sm:w-[320px] lg:w-[460px]">
              <img
                src={image1}
                alt="App preview"
                className="w-full"
              />
            </div>
          </div>

          {/* Animated Steps */}
          <div className="min-h-[200px]">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg text-[#1B2BB8] mb-3">
                  Step {activeStep + 1}
                </h3>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black">
                  {steps[activeStep].title}
                </h2>

                <p className="mt-4 text-lg text-gray-500 max-w-lg">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
};

export default StepsGuide;