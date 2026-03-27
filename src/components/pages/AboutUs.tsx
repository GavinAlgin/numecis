import Navbar from "../Navbar";

const AboutUs = () => {
  return (
    <div className="text-black bg-[#F3F3F3] min-h-screen">
      <Navbar />

      {/* ABOUT US SECTION */}
      <div className=" text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About Numecis</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Numecis is a modern platform focused on understanding the hidden
          behavior of numbers. We combine pattern recognition, relationships,
          and data precision to help users make smarter, safer, and more
          informed decisions.
        </p>
      </div>

      <div className="flex justify-center px-4 py-12">
        <div className="max-w-5xl w-full space-y-10">

          {/* MISSION / VISION */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-gray-700">
                To simplify complex numerical behavior and empower users with
                intelligent insights for better decision-making in number-based
                systems like lottery games.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
              <p className="text-gray-700">
                To become a leading intelligent number-analysis platform that
                transforms uncertainty into clarity using data-driven patterns.
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              What We Do
            </h2>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-700 list-disc ml-6">
              <li>Analyze number patterns and trends</li>
              <li>Identify relationships between numerical datasets</li>
              <li>Provide intelligent lottery insights</li>
              <li>Enhance user decision-making with data</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;