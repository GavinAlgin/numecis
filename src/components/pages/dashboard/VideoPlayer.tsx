import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../api/supabase";

type Content = {
  id: string;
  type: "video" | "pdf" | "text";
  url: string;
  title: string;
  order: number;
};

export default function LessonPlayer() {
  const { id } = useParams();

  const [contents, setContents] = useState<Content[]>([]);
  const [current, setCurrent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // ✅ prevent bad query
    fetchContent();
  }, [id]);

  async function fetchContent() {
    setLoading(true);

    const { data, error } = await supabase
      .from("lesson_contents")
      .select("*")
      .eq("lesson_id", id)
      .order("order", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      console.warn("No lesson content found");
      setContents([]);
      setCurrent(null);
      setLoading(false);
      return;
    }

    setContents(data);
    setCurrent(data[0]);
    setLoading(false);
  }

  // ✅ Proper states
  if (loading) return <p className="p-4">Loading lesson...</p>;

  if (!current)
    return <p className="p-4 text-red-500">No content available for this lesson.</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* MAIN PLAYER */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 bg-white border-b flex justify-between">
          <h2 className="font-semibold">{current.title}</h2>
        </div>

        <div className="flex-1 bg-black flex items-center justify-center">
          {current.type === "video" && (
            <video controls className="w-full h-full">
              <source src={current.url} type="video/mp4" />
            </video>
          )}

          {current.type === "pdf" && (
            <iframe src={current.url} className="w-full h-full bg-white" />
          )}

          {current.type === "text" && (
            <div className="text-white p-6">{current.url}</div>
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="w-80 bg-white border-l overflow-y-auto">
        <h3 className="p-4 font-semibold border-b">
          Lesson Content
        </h3>

        {contents.map((item) => (
          <div
            key={item.id}
            onClick={() => setCurrent(item)}
            className={`p-4 border-b cursor-pointer ${
              current.id === item.id ? "bg-gray-100" : ""
            }`}
          >
            <p className="text-sm font-medium">{item.title}</p>
            <span className="text-xs text-blue-600 capitalize">
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { supabase } from "../../api/supabase";

// type LessonContent = {
//   id: string;
//   type: "video" | "pdf" | "text";
//   url: string;
//   title: string;
//   order: number;
// };

// export default function LessonPlayer() {
//   const { id } = useParams(); // lesson id

//   const [contents, setContents] = useState<LessonContent[]>([]);
//   const [current, setCurrent] = useState<LessonContent | null>(null);

//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   useEffect(() => {
//     if (id) fetchLessonContent();
//   }, [id]);

//   async function fetchLessonContent() {
//     const { data, error } = await supabase
//       .from("lesson_contents")
//       .select("*")
//       .eq("lesson_id", id)
//       .order("order", { ascending: true });

//     if (error) {
//       console.error(error);
//       return;
//     }

//     setContents(data || []);
//     setCurrent(data?.[0] || null); // first item auto-load
//   }

//   const handleNext = () => {
//     if (!current) return;
//     const index = contents.findIndex((l) => l.id === current.id);
//     if (index < contents.length - 1) {
//       setCurrent(contents[index + 1]);
//     }
//   };

//   if (!current) return <p className="p-4">Loading lesson...</p>;

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//       />

//       <div className="flex flex-1 relative">
//         {/* PLAYER */}
//         <div
//           className={`flex-1 flex flex-col ${
//             isFullScreen ? "fixed inset-0 z-50 bg-black" : ""
//           }`}
//         >
//           {/* HEADER */}
//           <div className="flex justify-between items-center p-3 bg-white border-b">
//             <div>
//               <h2 className="font-semibold">{current.title}</h2>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={handleNext}
//                 className="px-3 py-1 text-sm bg-green-600 text-white rounded"
//               >
//                 Next
//               </button>

//               <button
//                 onClick={() => setIsFullScreen(!isFullScreen)}
//                 className="px-3 py-1 text-sm bg-gray-800 text-white rounded"
//               >
//                 {isFullScreen ? "Minimize" : "Fullscreen"}
//               </button>
//             </div>
//           </div>

//           {/* CONTENT VIEWER */}
//           <div className="flex-1 bg-black flex items-center justify-center">
//             {current.type === "video" && (
//               <video controls className="w-full h-full">
//                 <source src={current.url} type="video/mp4" />
//               </video>
//             )}

//             {current.type === "pdf" && (
//               <iframe
//                 src={current.url}
//                 className="w-full h-full bg-white"
//               />
//             )}

//             {current.type === "text" && (
//               <div className="p-6 text-white max-w-2xl">
//                 {current.url}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDEBAR */}
//         {!isFullScreen && (
//           <div className="w-80 border-l bg-white hidden lg:flex flex-col">
//             <h3 className="p-4 font-semibold border-b">
//               Lesson Content
//             </h3>

//             <div className="flex-1 overflow-y-auto">
//               {contents.map((item, index) => (
//                 <div
//                   key={item.id}
//                   onClick={() => setCurrent(item)}
//                   className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
//                     current.id === item.id ? "bg-gray-100" : ""
//                   }`}
//                 >
//                   <h4 className="text-sm font-medium">
//                     {item.title}
//                   </h4>

//                   <div className="flex justify-between mt-2 text-xs">
//                     <span className="text-blue-600 capitalize">
//                       {item.type}
//                     </span>

//                     {index < contents.length - 1 && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setCurrent(contents[index + 1]);
//                         }}
//                         className="text-green-600"
//                       >
//                         Next →
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // import { useState } from "react";
// // import Sidebar from "./Sidebar";

// // const lessons = [
// //   {
// //     id: "1",
// //     type: "pdf",
// //     title: "Introduction to Networking",
// //     subtitle: "Basics of how networks work",
// //     src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
// //   },
// //   {
// //     id: "2",
// //     type: "video",
// //     title: "OSI Model Explained",
// //     subtitle: "Deep dive into layers",
// //     src: "https://www.w3schools.com/html/mov_bbb.mp4",
// //   },
// //   {
// //     id: "3",
// //     type: "pdf",
// //     title: "IP Addressing",
// //     subtitle: "IPv4 & IPv6",
// //     src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
// //   },
// // ];

// // export default function LessonPlayer() {
// //   const [current, setCurrent] = useState(lessons[0]);
// //   const [isFullScreen, setIsFullScreen] = useState(false);

// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [collapsed, setCollapsed] = useState(false);

// //   const handleNext = () => {
// //     const index = lessons.findIndex((l) => l.id === current.id);
// //     if (index < lessons.length - 1) {
// //       setCurrent(lessons[index + 1]);
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-100">
// //       <Sidebar
// //         mobileOpen={mobileOpen}
// //         setMobileOpen={setMobileOpen}
// //         collapsed={collapsed}
// //         setCollapsed={setCollapsed}
// //       />

// //       <div className="flex flex-1 relative">
// //         {/* Viewer */}
// //         <div
// //           className={`flex-1 flex flex-col ${
// //             isFullScreen ? "fixed inset-0 z-50 bg-black" : ""
// //           }`}
// //         >
// //           {/* Header */}
// //           <div className="flex justify-between items-center p-3 bg-white border-b">
// //             <div>
// //               <h2 className="font-semibold">{current.title}</h2>
// //               <p className="text-xs text-gray-500">
// //                 {current.subtitle}
// //               </p>
// //             </div>

// //             <div className="flex gap-2">
// //               <button
// //                 onClick={handleNext}
// //                 className="px-3 py-1 text-sm bg-green-600 text-white rounded"
// //               >
// //                 Next
// //               </button>

// //               <button
// //                 onClick={() => setIsFullScreen(!isFullScreen)}
// //                 className="px-3 py-1 text-sm bg-gray-800 text-white rounded"
// //               >
// //                 {isFullScreen ? "Minimize" : "Fullscreen"}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Dynamic Viewer */}
// //           <div className="flex-1 bg-black flex items-center justify-center">
// //             {current.type === "video" ? (
// //               <video
// //                 key={current.src}
// //                 controls
// //                 className="w-full h-full max-h-full"
// //               >
// //                 <source src={current.src} type="video/mp4" />
// //                 Your browser does not support video playback.
// //               </video>
// //             ) : (
// //               <iframe
// //                 src={current.src}
// //                 title={current.title}
// //                 className="w-full h-full bg-white"
// //               />
// //             )}
// //           </div>
// //         </div>

// //         {/* Right Sidebar */}
// //         {!isFullScreen && (
// //           <div className="w-80 border-l bg-white hidden lg:flex flex-col">
// //             <h3 className="p-4 font-semibold border-b">
// //               Lesson Content
// //             </h3>

// //             <div className="flex-1 overflow-y-auto">
// //               {lessons.map((item, index) => (
// //                 <div
// //                   key={item.id}
// //                   onClick={() => setCurrent(item)}
// //                   className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
// //                     current.id === item.id ? "bg-gray-100" : ""
// //                   }`}
// //                 >
// //                   <h4 className="text-sm font-medium">
// //                     {item.title}
// //                   </h4>
// //                   <p className="text-xs text-gray-500">
// //                     {item.subtitle}
// //                   </p>

// //                   <div className="flex justify-between mt-2 text-xs">
// //                     <span className="text-blue-600 capitalize">
// //                       {item.type}
// //                     </span>

// //                     {index < lessons.length - 1 && (
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           setCurrent(lessons[index + 1]);
// //                         }}
// //                         className="text-green-600"
// //                       >
// //                         Next →
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }