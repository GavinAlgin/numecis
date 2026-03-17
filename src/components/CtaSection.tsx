import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function DownloadStatsSection() {
  return (
    <section className="w-full py-24 flex flex-col items-center justify-center">

      {/* Title ABOVE container */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#1B2BB8]">
        Trusted Worldwide
      </motion.h2>

      {/* Main Container with IMAGE background */}
      <div
        className="w-full max-w-6xl rounded-3xl p-16 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/1200/600')" }}>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <h3 className="text-5xl font-bold text-[#1B2BB8]">
              <CountUp end={120} duration={2} />K+
            </h3>
            <p className="text-gray-200 mt-2">Downloads</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}>
            <h3 className="text-5xl font-bold text-white">
              <CountUp end={96} duration={2} />%
            </h3>
            <p className="text-gray-200 mt-2">Positive Feedback</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}>
            <h3 className="text-5xl font-bold text-white">
              <CountUp end={35} duration={2} />+
            </h3>
            <p className="text-gray-200 mt-2">Countries Available</p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}