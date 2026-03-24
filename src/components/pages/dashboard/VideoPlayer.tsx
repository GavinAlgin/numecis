import { useState } from "react";
import Sidebar from "./Sidebar";

const lessons = [
  {
    id: "1",
    type: "pdf",
    title: "Introduction to Networking",
    subtitle: "Basics of how networks work",
    src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "2",
    type: "video",
    title: "OSI Model Explained",
    subtitle: "Deep dive into layers",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "3",
    type: "pdf",
    title: "IP Addressing",
    subtitle: "IPv4 & IPv6",
    src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

export default function LessonPlayer() {
  const [current, setCurrent] = useState(lessons[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleNext = () => {
    const index = lessons.findIndex((l) => l.id === current.id);
    if (index < lessons.length - 1) {
      setCurrent(lessons[index + 1]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex flex-1 relative">
        {/* Viewer */}
        <div
          className={`flex-1 flex flex-col ${
            isFullScreen ? "fixed inset-0 z-50 bg-black" : ""
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-white border-b">
            <div>
              <h2 className="font-semibold">{current.title}</h2>
              <p className="text-xs text-gray-500">
                {current.subtitle}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleNext}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded"
              >
                Next
              </button>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="px-3 py-1 text-sm bg-gray-800 text-white rounded"
              >
                {isFullScreen ? "Minimize" : "Fullscreen"}
              </button>
            </div>
          </div>

          {/* Dynamic Viewer */}
          <div className="flex-1 bg-black flex items-center justify-center">
            {current.type === "video" ? (
              <video
                key={current.src}
                controls
                className="w-full h-full max-h-full"
              >
                <source src={current.src} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : (
              <iframe
                src={current.src}
                title={current.title}
                className="w-full h-full bg-white"
              />
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        {!isFullScreen && (
          <div className="w-80 border-l bg-white hidden lg:flex flex-col">
            <h3 className="p-4 font-semibold border-b">
              Lesson Content
            </h3>

            <div className="flex-1 overflow-y-auto">
              {lessons.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setCurrent(item)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                    current.id === item.id ? "bg-gray-100" : ""
                  }`}
                >
                  <h4 className="text-sm font-medium">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.subtitle}
                  </p>

                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-blue-600 capitalize">
                      {item.type}
                    </span>

                    {index < lessons.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrent(lessons[index + 1]);
                        }}
                        className="text-green-600"
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}