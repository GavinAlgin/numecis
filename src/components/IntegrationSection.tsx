import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Insight {
  title: string;
  description: string;
  icon: React.ReactNode;
}

/* === SVG ICON COMPONENTS === */

const ChartIcon = () => (
  <svg
    className="w-12 h-12 text-blue-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3v18h18M7 14l3-3 4 4 5-5"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="w-12 h-12 text-green-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
  </svg>
);

const SparkIcon = () => (
  <svg
    className="w-12 h-12 text-yellow-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* === DATA === */

const insights: Insight[] = [
  {
    title: "Smart Predictions",
    description:
      "Leverage AI-powered predictions to identify high probability betting opportunities and reduce risk.",
    icon: <ChartIcon />,
  },
  {
    title: "Calculated Odds",
    description:
      "Get calculated insights based on historical data and real-time trends for smarter bets.",
    icon: <ClockIcon />,
  },
  {
    title: "Profit Optimization",
    description:
      "Maximize potential returns by using data-driven strategies and insights tailored to your betting style.",
    icon: <SparkIcon />,
  },
];

/* === COMPONENT === */

export const SmartInsightsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-gray-100 rounded-t-3xl p-6 md:p-12">
      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
        Smart Betting Insights
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`bg-white rounded-xl shadow p-6 cursor-pointer flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              activeIndex === index ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {insight.icon}
            <h3 className="mt-4 font-semibold text-lg">
              {insight.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Active Content */}
      <div className="mt-8 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow p-6 text-center"
          >
            <h3 className="text-xl font-bold mb-2">
              {insights[activeIndex].title}
            </h3>
            <p className="text-gray-700">
              {insights[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};