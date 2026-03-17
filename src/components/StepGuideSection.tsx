import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const features = [
  {
    id: 0,
    title: "Data-Driven Bets",
    description:
      "Use powerful analytics to make informed betting decisions. Track odds movements, historical results, and real-time insights to bet smarter.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
          </svg>,
    image:
      "https://images.unsplash.com/photo-1642790551116-18e4f7c19d1e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "AI Betting Assistance",
    description:
      "Our intelligent assistant analyzes patterns, team form, and probabilities to suggest smarter betting strategies.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Risk Management",
    description:
      "Control your bankroll with smart limits, probability insights, and responsible betting guidance.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function BettingSection() {
  const [active, setActive] = useState(0);

  const activeFeature = features[active];

  return (
    <section className="w-full bg-transparent text-black py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === active;

            return (
              <motion.div
                key={feature.id}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                whileHover={{ scale: 1.02 }}
                className={`cursor-pointer rounded-xl border p-6 transition-all duration-300
                ${
                  isActive
                    ? "border-[#1B2BB8] bg-white/5"
                    : "border-white/10 hover:border-white/20"
                }`}>
                <div className="flex items-start gap-4">

                  <div
                    className={`p-3 rounded-lg ${
                      isActive ? "bg-[#1B2BB8]" : "bg-white/10"
                    }`}>
                    {/* <Icon size={24} /> */}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full h-[420px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/10">

          <AnimatePresence mode="wait">
            <motion.img
              key={activeFeature.image}
              src={activeFeature.image}
              alt={activeFeature.title}
              initial={{ opacity: 0, x: 80, scale: 1.05 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1B2BB8]/30 via-transparent to-blue-500/20" />
        </div>
      </div>
    </section>
  );
}