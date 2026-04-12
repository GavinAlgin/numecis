import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";

const About = () => {
  return (
    <div>
      <Navbar />

      <main className="bg-gray-50">

        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row min-h-[90vh]">

          {/* LEFT: Background Image */}
          <div
            className="w-full md:w-1/2 h-[300px] md:h-auto bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
            }}
          />

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex items-center justify-center px-6 py-12"
          >
            <div className="max-w-xl text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-6">
                The Numecis{" "}
                <span className="text-[#1B2BB8]">Journey</span>
              </h1>

              <p className="text-gray-600 text-lg font-medium leading-relaxed">
                From vision to value - discover how numecis empowers you to take
                control of your betting future.
              </p>
            </div>
          </motion.div>
        </div>

        {/* MISSION SECTION */}
        <div className="max-w-4xl mx-auto px-4 py-20">

          {/* Badge */}
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-1 text-sm font-semibold bg-blue-100 text-[#1B2BB8] rounded-full">
              Our Mission
            </div>

            <h2 className="text-2xl md:text-4xl font-semibold text-[#1B2BBB] mb-12">
              Empowering individuals to achieve financial freedom through
              intuitive and personalized learning
            </h2>
          </div>

          {/* STACKED LIST */}
          <div className="flex flex-col">

            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-start gap-6 py-6">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                alt="Mission 1"
                className="w-full md:w-32 h-32 object-cover rounded-xl"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Smart Learning
                </h3>
                <p className="text-gray-600">
                  We provide intuitive tools that simplify complex betting
                  strategies into easy learning experiences.
                </p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row items-start gap-6 py-6">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Mission 2"
                className="w-full md:w-32 h-32 object-cover rounded-xl"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Data-Driven Insights
                </h3>
                <p className="text-gray-600">
                  Our platform leverages analytics to guide smarter decisions
                  and improve success rates.
                </p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-start gap-6 py-6">
              <img
                src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
                alt="Mission 3"
                className="w-full md:w-32 h-32 object-cover rounded-xl"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Financial Growth
                </h3>
                <p className="text-gray-600">
                  Helping users build sustainable strategies for long-term
                  financial independence.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

// import Navbar from "../Navbar";

// const AboutUs = () => {
//   return (
//     <div className="text-black bg-[#F3F3F3] min-h-screen">
//       <Navbar />

//       <div className=""></div>

//       {/* ABOUT US SECTION */}
//       <div className=" text-white py-16 px-6 text-center">
//         <h1 className="text-4xl font-bold mb-4">About Numecis</h1>
//         <p className="max-w-2xl mx-auto text-lg opacity-90">
//           Numecis is a modern platform focused on understanding the hidden
//           behavior of numbers. We combine pattern recognition, relationships,
//           and data precision to help users make smarter, safer, and more
//           informed decisions.
//         </p>
//       </div>

//       <div className="flex justify-center px-4 py-12">
//         <div className="max-w-5xl w-full space-y-10">

//           {/* MISSION / VISION */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="bg-white shadow-md rounded-xl p-6">
//               <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
//               <p className="text-gray-700">
//                 To simplify complex numerical behavior and empower users with
//                 intelligent insights for better decision-making in number-based
//                 systems like lottery games.
//               </p>
//             </div>

//             <div className="bg-white shadow-md rounded-xl p-6">
//               <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
//               <p className="text-gray-700">
//                 To become a leading intelligent number-analysis platform that
//                 transforms uncertainty into clarity using data-driven patterns.
//               </p>
//             </div>
//           </div>

//           {/* FEATURES */}
//           <div className="bg-white shadow-md rounded-xl p-8">
//             <h2 className="text-2xl font-semibold mb-4 text-center">
//               What We Do
//             </h2>
//             <ul className="grid md:grid-cols-2 gap-4 text-gray-700 list-disc ml-6">
//               <li>Analyze number patterns and trends</li>
//               <li>Identify relationships between numerical datasets</li>
//               <li>Provide intelligent lottery insights</li>
//               <li>Enhance user decision-making with data</li>
//             </ul>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;