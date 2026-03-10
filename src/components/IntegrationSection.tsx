import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Insight {
  title: string;
  description: string;
  icon: JSX.Element;
}

const insights: Insight[] = [
  {
    title: "Smart Predictions",
    description:
      "Leverage AI-powered predictions to identify high probability betting opportunities and reduce risk.",
    icon: (
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
          d="M3 3v18h18M3 9h18M9 3v18"
        />
      </svg>
    ),
  },
  {
    title: "Calculated Odds",
    description:
      "Get calculated insights based on historical data and real-time trends for smarter bets.",
    icon: (
      <svg
        className="w-12 h-12 text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Profit Optimization",
    description:
      "Maximize potential returns by using data-driven strategies and insights tailored to your betting style.",
    icon: (
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
          d="M12 8c-2 0-3 1-3 3 0 2 1 3 3 3s3-1 3-3c0-2-1-3-3-3zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
    ),
  },
];

export const SmartInsightsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-gray-100 rounded-t-3xl p-6 md:p-12">
      {/* Section Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
        Smart Betting Insights
      </h2>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 cursor-pointer flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            onClick={() => setActiveIndex(index)}
          >
            {insight.icon}
            <h3 className="mt-4 font-semibold text-lg">{insight.title}</h3>
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
            <h3 className="text-xl font-bold mb-2">{insights[activeIndex].title}</h3>
            <p className="text-gray-700">{insights[activeIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};