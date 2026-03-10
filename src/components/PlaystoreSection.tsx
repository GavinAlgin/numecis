import { motion } from "framer-motion"
import bettingImage from "../assets/pexels-pnw-prod-7327099.jpg"

export default function DownloadSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* LEFT SIDE - IMAGE */}
        <div className="relative order-1 lg:order-none">
          <img
            src={bettingImage}
            alt="Person analyzing bets on phone"
            className="w-full h-[320px] sm:h-[420px] lg:h-[560px] object-cover rounded-2xl lg:rounded-3xl"
          />

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md w-full max-w-[260px] sm:max-w-xs p-4 text-center"
            >
              <p className="text-xs sm:text-sm font-semibold text-[#1B2BB8]">
                Strategy Optimized
              </p>
              <p className="text-xs text-gray-500 mt-1">
                +18% ROI This Month
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center lg:justify-between lg:h-[560px] max-w-xl mx-auto lg:mx-0 text-center lg:text-left space-y-10">

          {/* MAIN MESSAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Stop Guessing.
              <br />
              Start Calculating.
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              We combine real-time data, probability modeling, and advanced
              analytics to help you make smarter betting decisions.
              <br className="hidden sm:block" /><br className="hidden sm:block" />
              Built for thinkers. Designed for disciplined growth.
            </p>
          </motion.div>

          {/* VALUE PROPS */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              ✔ Data-Driven Insights
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              ✔ Risk-Adjusted Strategies
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              ✔ Performance Tracking & Optimization
            </p>
          </motion.div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1B2BB8] cursor-pointer text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg mx-auto lg:mx-0"
          >
            Download the App
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </motion.button>

        </div>
      </div>
    </section>
  )
}