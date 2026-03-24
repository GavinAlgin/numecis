import Navbar from "../Navbar";

const AboutUs = () => {
  return (
    <div className="text-black bg-gray-50 min-h-screen">
      <Navbar />
      {/* ABOUT US SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 text-center">
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

          {/* PRIVACY POLICY */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center mb-6">
                Privacy Policy
              </h2>

              <p className="mb-4">
                At <strong>Numecis</strong>, we prioritize your privacy and are
                committed to safeguarding the information you share when using
                our mobile application and website.
              </p>

              {/* Section 1 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                1. About Numecis
              </h3>
              <p className="mb-4">
                Numecis helps users understand the behavior of numbers by
                patternising, interrelating, interlinking, and precising
                numerical data.
              </p>

              {/* Section 2 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                2. Information We Collect
              </h3>
              <ul className="list-disc ml-6 mb-4">
                <li>Account details (name, email, username)</li>
                <li>Device information and logs</li>
                <li>Usage interactions within the app</li>
                <li>Optional user-provided numerical data</li>
              </ul>

              {/* Section 3 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                3. How We Use Your Information
              </h3>
              <ul className="list-disc ml-6 mb-4">
                <li>Enhance app performance</li>
                <li>Provide personalized analysis</li>
                <li>Send updates</li>
                <li>Improve security</li>
              </ul>

              {/* Section 4 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                4. Data Protection & Security
              </h3>
              <p className="mb-4">
                We use industry-standard security measures to protect your data.
              </p>

              {/* Section 5 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                5. Sharing of Information
              </h3>
              <p className="mb-4">
                We do not sell your data. Limited sharing may occur with trusted
                providers.
              </p>

              {/* Section 6 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                6. Cookies
              </h3>
              <p className="mb-4">
                We may use cookies to improve user experience.
              </p>

              {/* Section 7 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                7. Children’s Privacy
              </h3>
              <p className="mb-4">
                We do not knowingly collect data from individuals under 18.
              </p>

              {/* Section 8 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                8. Third-Party Links
              </h3>
              <p className="mb-4">
                We are not responsible for external sites.
              </p>

              {/* Section 9 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                9. Your Rights
              </h3>
              <ul className="list-disc ml-6 mb-4">
                <li>Access your data</li>
                <li>Request deletion</li>
                <li>Withdraw consent</li>
              </ul>

              {/* Section 10 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                10. Updates
              </h3>
              <p className="mb-4">
                Policy updates will be posted here.
              </p>

              {/* Section 11 */}
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                11. Contact Us
              </h3>
              <p className="mb-2">
                <strong>Email:</strong> numecis@gmail.com
              </p>

              <p className="mt-6 text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;