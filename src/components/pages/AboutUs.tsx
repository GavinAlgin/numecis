import { motion } from "framer-motion";
import Navbar from "../Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-center">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-5xl font-semibold text-gray-800 mb-6">
          The Numecis <span className="text-[#1B2BB8]">Journey</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 text-lg font-medium leading-relaxed mb-6">
            From vision to value - discover how numecis empowers you to take control of your betting future.
        </motion.p>

        {/* Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Team"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto w-[800] h-[900] object-cover rounded-2xl mt-6"
        />

        <div className="text-center mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-2.5 px-4 py-1 text-sm font-semibold bg-blue-100 text-[#1B2BB8] rounded-full">
            Our Mission
          </motion.div>
          <h1 className="m-4 font-semibold text-4xl text-[#1B2BBB]">Empowering individuals to achieve financial freedom through intuitive and personalized learning</h1>
        </div>


      </motion.div>
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