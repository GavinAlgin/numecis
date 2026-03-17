import SideViewImg from "../assets/11.png";
import LoginImg from "../assets/10.png";


export default function BentoSection() {
  return (
    <section className="w-full py-24 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1B2BB8]">
            Bet Smarter, Not Harder
          </h2>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-lg">
            Learn responsible betting strategies and download the beta today on
            Google Play.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[320px]">

          {/* Large Card */}
          <div className="relative flex flex-col justify-between p-8 rounded-3xl bg-white lg:col-span-2 overflow-hidden">

            <div>
              <h3 className="text-2xl font-semibold text-[#1B2BB8]">
                Download the Beta
              </h3>

              <p className="mt-3 text-gray-600 max-w-md">
                Start learning smarter betting strategies. Our Android beta is
                now available on Google Play for early users.
              </p>

              <button className="mt-5 px-5 py-2 rounded-full bg-[#1B2BB8] text-white text-sm">
                Get Beta on Google Play
              </button>
            </div>

            {/* iPhone Side Mockup */}
            <img
              src={LoginImg}
              alt="side_view_img"
              className="absolute right-6 bottom-1/6 h-[240px] object-contain"
            />

          </div>

          {/* Macbook Tall Card */}
          <div className="relative flex flex-col justify-between p-8 rounded-3xl bg-white lg:row-span-2 overflow-hidden">

            <div>
              <h3 className="text-xl font-semibold text-[#1B2BB8]">
                Track Your Decisions
              </h3>

              <p className="mt-2 text-gray-600">
                Visual dashboards help you understand patterns, manage risk,
                and improve your betting habits.
              </p>
            </div>

            {/* Half visible phone */}
            <img
              src={SideViewImg}
              alt=""
              className="absolute -right-24 bottom-0 h-[760] object-contain"
            />

          </div>

          {/* Feature Notifications */}
          <div className="flex flex-col justify-between p-8 rounded-3xl bg-white">

            <div>
              <h3 className="text-xl font-semibold text-[#1B2BB8]">
                Smart Notifications
              </h3>

              <p className="mt-2 text-gray-600">
                Stay informed with insights that help you avoid impulsive bets.
              </p>
            </div>

            {/* Notification UI */}
            <div className="space-y-3 mt-6">

              <div className="bg-gray-100 rounded-xl p-3 text-sm">
                ⚠️ Risk Alert — You’ve reached today's betting limit
              </div>

              <div className="bg-gray-100 rounded-xl p-3 text-sm">
                📊 Insight — 70% of your bets are on the same league
              </div>
{/* 
              <div className="bg-gray-100 rounded-xl p-3 text-sm">
                💡 Tip — Diversifying bets can reduce risk
              </div> */}

            </div>

          </div>

          {/* Education Card */}
          <div className="flex flex-col justify-between p-8 rounded-3xl bg-white overflow-hidden">

            <div>
              <h3 className="text-xl font-semibold text-[#1B2BB8]">
                Learn Responsible Betting
              </h3>

              <p className="mt-2 text-gray-600">
                Interactive lessons teach bankroll management, probability,
                and how to avoid risky behavior.
              </p>
            </div>

            <img
              src="/education-illustration.png"
              alt=""
              className="mt-6 h-28 object-contain"
            />

          </div>

        </div>
      </div>
    </section>
  )
}