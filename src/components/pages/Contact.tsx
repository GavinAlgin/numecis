import { ChevronDownIcon } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Support() {
  return (
    <div className="bg-white">
      <Navbar />

      <div className="px-6 py-24 sm:py-32 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold text-gray-900 sm:text-5xl">
            Contact sales
          </h2>
          <p className="mt-2 text-lg text-gray-500">
            Contact us we will reach out and assist where we can 
          </p>
        </div>

        {/* Form */}
        <form className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                First name
              </label>
              <input
                type="text"
                className="mt-2.5 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Last name
              </label>
              <input
                type="text"
                className="mt-2.5 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Company */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Company
              </label>
              <input
                type="text"
                className="mt-2.5 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-2.5 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone number
              </label>

              <div className="mt-2.5 flex rounded-md border border-gray-300">
                <select className="rounded-l-md bg-gray-50 px-3 text-gray-700 focus:outline-none">
                  <option>US</option>
                  <option>RSA</option>
                  <option>EU</option>
                </select>

                <input
                  type="text"
                  placeholder="123-456-7890"
                  className="w-full px-3 py-2 text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                className="mt-2.5 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Checkbox */}
            <div className="flex gap-x-3 sm:col-span-2">
              <input type="checkbox" className="mt-1" />
              <p className="text-sm text-gray-500">
                By selecting this, you agree to our{" "}
                <span className="font-semibold text-indigo-600">
                  privacy policy
                </span>
                .
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-white font-semibold hover:bg-indigo-500"
            >
              Let's talk
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}