import React from "react";
import MockUpImg from "../assets/8.png";

const DownloadSection: React.FC = () => {
  return (
    <section className="w-full bg-[#1B2BB8] rounded-2xl py-16 px-6 overflow-hidden relative">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Download Our App
          </h2>

          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            Get the best experience by downloading our mobile app.
            Available on Android and iOS devices.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center">

          {/* Store Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-14 hover:opacity-90 transition"
              />
            </a>

            <a href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-14 hover:opacity-90 transition"
              />
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full max-w-xs my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-300 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://example.com"
              alt="QR Code"
              className="w-36 h-36"
            />
            <p className="text-gray-300 text-sm mt-2">
              Scan to download
            </p>
          </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <img
        src={MockUpImg}
        alt="Phone Mockup"
        className="hidden md:block absolute right-0 bottom-[-80px] w-[420px]"
      />
    </section>
  );
};

export default DownloadSection;

