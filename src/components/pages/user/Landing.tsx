import BentoSection from "../../BentoSection"
import DownloadSection from "../../DownloadSection"
import Footer from "../../Footer"
import Navbar from "../../Navbar"
import mockup from "../../../assets/8.png"
import StepsGuide from "../../StepGuideSection"
import CTASection from "../../CtaSection"

import { motion, type Variants } from "framer-motion"


const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">

        <div className="relative isolate px-6 pt-6 lg:px-8 bg-[#F3F3F3]">

          {/* TOP GRADIENT */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            />
          </div>

          {/* HERO */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-100px" }}
            className="mx-auto max-w-2xl py-20 sm:py-28 lg:py-32"
          >
            <motion.div
              variants={fadeUp}
              className="hidden sm:mb-6 sm:flex sm:justify-center"
            >
              <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Numecis secures beta version of its launch.
                <a href="#" className="font-semibold text-[#1B2BB8] ml-1">
                  Read more →
                </a>
              </div>
            </motion.div>

            <div className="text-center">
              <motion.h1
                variants={fadeUp}
                className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
              >
                Smart Number Strategies with Numecis
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg font-medium text-gray-500 sm:text-xl"
              >
                Numecis the art n technique of playing lottery number games using sequence and interrelation.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex items-center justify-center gap-x-6"
              >
                <a
                  href="/signup"
                  className="rounded-md bg-[#1B2BB8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1B2AB7]"
                >
                  Get started
                </a>

                <a href="/login" className="text-sm font-semibold text-gray-900">
                  View Lessons →
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* PHONE MOCKUP */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
            className="relative flex justify-center -mt-10 border-b border-gray-800/20"
          >
            <div className="w-[600px] h-[400px] overflow-hidden relative">
              <img src={mockup} alt="numecis-mockup" />
            </div>
          </motion.div>

          {/* BOTTOM GRADIENT */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
            />
          </div>

          {/* STEPS */}
          {/* <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <StepsGuide />
          </motion.div> */}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <CTASection />
          </motion.div>

          {/* BENTO */}
          {/* <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <BentoSection />
          </motion.div> */}

          {/* DOWNLOAD */}
          {/* <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <DownloadSection />
          </motion.div> */}

        </div>
      </main>

      <Footer />
    </div>
  )
}