import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PlaystoreSection() {
  const [platform, setPlatform] = useState<"ios" | "android">("ios")

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-neutral-950 to-neutral-900 text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE - IMAGE WITH OVERLAYS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?q=80&w=1200&auto=format&fit=crop"
            alt="Person betting on phone"
            className="w-full h-[520px] object-cover rounded-3xl shadow-2xl"
          />

          {/* Notification Mockup */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white/90 backdrop-blur-lg text-black w-72 rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full" />
                <div>
                  <p className="font-semibold text-sm">Bet Won 🎉</p>
                  <p className="text-xs text-gray-600">
                    You just won $240 on Lakers vs Heat!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center lg:items-start"
        >
          {/* Title */}
          <h2 className="text-4xl font-bold mb-4 text-center lg:text-left">
            Bet Smarter. Win Bigger.
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-400 mb-8 text-center lg:text-left max-w-md">
            Download our app and place bets in seconds. Real-time odds,
            instant payouts, and exclusive bonuses available only in-app.
          </p>

          {/* Platform Switch */}
          <div className="flex flex-col items-center lg:items-start mb-6 w-full max-w-xs">
            <div className="flex bg-neutral-800 p-1 rounded-full w-full relative">

              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white`}
                style={{
                  left: platform === "ios" ? "4px" : "calc(50% - 4px)",
                }}
              />

              <button
                onClick={() => setPlatform("ios")}
                className={`relative z-10 w-1/2 py-2 text-sm font-medium ${
                  platform === "ios" ? "text-black" : "text-white"
                }`}
              >
                iPhone
              </button>

              <button
                onClick={() => setPlatform("android")}
                className={`relative z-10 w-1/2 py-2 text-sm font-medium ${
                  platform === "android" ? "text-black" : "text-white"
                }`}
              >
                Android
              </button>
            </div>
          </div>

          {/* ID Card Sized QR Component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-black w-[320px] h-[200px] rounded-2xl shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <p className="font-bold text-lg">
                  {platform === "ios"
                    ? "Download on the App Store"
                    : "Get it on Google Play"}
                </p>
                <p className="text-sm text-gray-600">
                  Scan the QR code to install instantly
                </p>
              </div>

              <div className="flex justify-between items-end">
                {/* QR Placeholder */}
                <div className="w-24 h-24 bg-neutral-200 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-black"
                      />
                    ))}
                  </div>
                </div>

                <div className="text-right text-xs text-gray-500">
                  <p>Secure</p>
                  <p>Fast</p>
                  <p>Trusted</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}