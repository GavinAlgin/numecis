import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Feature = {
  id: number;
  title: string;
  description: string;
  color: string;
};

const features: Feature[] = [
  {
    id: 0,
    title: "Smart Dashboard",
    description:
      "Monitor analytics, user activity, and real-time insights in a beautiful and intuitive dashboard.",
    color: "bg-indigo-500",
  },
  {
    id: 1,
    title: "Instant Notifications",
    description:
      "Receive smart alerts and push notifications to stay updated with important changes.",
    color: "bg-pink-500",
  },
  {
    id: 2,
    title: "Seamless Payments",
    description:
      "Integrated secure payments with lightning-fast checkout and multiple payment methods.",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    title: "AI Automation",
    description:
      "Automate repetitive tasks using AI-powered workflows and smart recommendations.",
    color: "bg-orange-500",
  },
];

export default function CTASection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveFeature(index);
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT SIDE - Scroll Content */}
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => (sectionsRef.current[index] = el)}
                className="min-h-[70vh] flex items-center"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-300 max-w-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - Sticky Phone Mockup */}
          <div className="hidden lg:flex justify-center">
            <div className="sticky top-32">
              <div className="relative w-[300px] h-[600px] bg-zinc-900 rounded-[40px] border-4 border-zinc-700 shadow-2xl overflow-hidden">
                {/* Screen */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold ${features[activeFeature].color}`}
                  >
                    {features[activeFeature].title}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MOCKUP BELOW CONTENT */}
        <div className="lg:hidden mt-16 flex justify-center">
          <div className="relative w-[260px] h-[520px] bg-zinc-900 rounded-[32px] border-4 border-zinc-700 shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 flex items-center justify-center text-white text-xl font-semibold ${features[activeFeature].color}`}
              >
                {features[activeFeature].title}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
