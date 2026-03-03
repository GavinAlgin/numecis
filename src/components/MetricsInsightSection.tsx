import { motion } from "framer-motion"

const metrics = [
  {
    stat: "98.4%",
    title: "Customer Satisfaction",
    description:
      "Based on monthly user surveys and platform feedback, reflecting consistent performance and trust."
  },
  {
    stat: "1.2s",
    title: "Average Transaction Speed",
    description:
      "Lightning-fast processing powered by optimized infrastructure and real-time data systems."
  },
  {
    stat: "24/7",
    title: "Platform Accessibility",
    description:
      "Reliable cross-device availability across mobile, tablet, and desktop environments."
  },
  {
    stat: "27%",
    title: "Average Cost Savings",
    description:
      "Users reduce unnecessary betting through optimized strategies and smarter allocation."
  },
  {
    stat: "3x",
    title: "Improved Betting Tracking",
    description:
      "Enhanced visibility into financial activity with intelligent categorization and reporting."
  },
  {
    stat: "98.98%",
    title: "System Uptime",
    description:
      "Enterprise-grade infrastructure ensuring uninterrupted performance and reliability."
  }
]

export default function MetricsInsights() {
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Performance That Speaks in Numbers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Measurable impact across speed, reliability, satisfaction, and savings.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              {/* Stat Number */}
              <h3 className="text-4xl sm:text-5xl font-extrabold text-[#1B2BB8]">
                {item.stat}
              </h3>

              {/* Metric Title */}
              <p className="mt-4 text-lg font-semibold text-gray-900">
                {item.title}
              </p>

              {/* Description */}
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}