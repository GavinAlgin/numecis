import Navbar from "./components/Navbar"
import mockup from "./assets/8.png"
import PlaystoreSection from "./components/PlaystoreSection"

const App = () => {
  return (
    <div className='h-full'>
      <Navbar />

      {/* Reduced top padding (pt-14 → pt-6) */}
      <div className="relative isolate px-6 pt-6 lg:px-8 bg-[#F3F3F3]">
        
        {/* Top gradient blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        {/* Reduced vertical spacing (py-32 → py-20) */}
        <div className="mx-auto max-w-2xl py-20 sm:py-28 lg:py-32">
          
          <div className="hidden sm:mb-6 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Numecis secures beta version of its launch.
              <a href="#" className="font-semibold text-[#1B2BB8] ml-1">
                Read more →
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Smart Number Strategies with Numecis
            </h1>

            <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
              Predict, track, analyze and calculate – all in one clean and simple app.
            </p>

            <div className="mt-8 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#1B2BB8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1B2AB7]">
                Get started
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                See Features →
              </a>
            </div>
          </div>
        </div>

        {/* PHONE MOCKUP (Half Visible) */}
        <div className="relative flex justify-center -mt-10 border-b border-gray-800/20">
          {/* Cropping container */}
          <div className="w-[600px] h-[400px] overflow-hidden relative">
            
            {/* Phone (shifted down so bottom half is hidden) */}
            <img src={mockup} alt="numecis-mockup" />
            {/* <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[600px] border-2 border-dashed border-gray-300 rounded-3xl flex items-center justify-center text-gray-400 bg-white shadow-xl">
              Phone Mockup Placeholder
            </div> */}

          </div>
        </div>

        <section className="mt-12 text-center">
          <h1 className="text-4xl">Numecis helps you make sense of your betting.</h1>
          <h1 className="text-2xl text-gray-500">It gives you smart, simple, and actionable tips to budget better and grow your savings without the stress.</h1>
        </section>

        {/* Bottom gradient blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>

        <PlaystoreSection />

      </div>
    </div>
  )
}

export default App
