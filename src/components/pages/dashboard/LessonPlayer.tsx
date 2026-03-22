import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { supabase } from "../../api/supabase";
import type { Lesson, UserPurchase } from "./types";

type Props = {
  packageId: string; // passed from route or parent
};

export default function LessonPlayer({ packageId }: Props) {
  const [userId, setUserId] = useState<string | null>(null);

  const [documents, setDocuments] = useState<Lesson[]>([]);
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);

  const [currentDoc, setCurrentDoc] = useState<Lesson | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [loading, setLoading] = useState(true);

  // =========================
  // GET USER
  // =========================
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
    };

    getUser();
  }, []);

  // =========================
  // FETCH PURCHASES
  // =========================
  useEffect(() => {
    if (!userId) return;

    const fetchPurchases = async () => {
      const { data, error } = await supabase
        .from("user_purchases")
        .select("package_id")
        .eq("user_id", userId);

      if (error) console.error(error.message);

      setPurchases((data as UserPurchase[]) || []);
    };

    fetchPurchases();
  }, [userId]);

  // =========================
  // FETCH LESSONS
  // =========================
  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("package_id", packageId)
        .order("order_index", { ascending: true });

      if (error) {
        console.error(error.message);
        return;
      }

      setDocuments(data as Lesson[]);
      setCurrentDoc(data?.[0] ?? null);
      setLoading(false);
    };

    fetchLessons();
  }, [packageId]);

  // =========================
  // CHECK ACCESS
  // =========================
  const hasAccess = purchases.some(
    (p) => p.package_id === packageId
  );

  const handleNext = () => {
    if (!currentDoc) return;

    const currentIndex = documents.findIndex(
      (doc) => doc.id === currentDoc.id
    );

    const next = documents[currentIndex + 1];
    if (next) setCurrentDoc(next);
  };

  // =========================
  // LOADING / BLOCKED UI
  // =========================
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading lesson...
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-3">
        <p className="text-red-500 font-medium">
          This course is locked 🔒
        </p>
        <p className="text-gray-500 text-sm">
          Purchase the package to access lessons.
        </p>
      </div>
    );
  }

  if (!currentDoc) {
    return (
      <div className="flex h-screen items-center justify-center">
        No lessons found
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 relative">
        {/* MAIN VIEWER */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isFullScreen
              ? "fixed inset-0 z-50 bg-black"
              : ""
          }`}
        >
          <div className="flex justify-between items-center p-3 bg-white border-b">
            <h2 className="font-semibold">
              {currentDoc.title}
            </h2>

            <button
              onClick={() =>
                setIsFullScreen(!isFullScreen)
              }
              className="px-3 py-1 text-sm bg-gray-800 text-white rounded"
            >
              {isFullScreen ? "Minimize" : "Fullscreen"}
            </button>
          </div>

          <iframe
            src={currentDoc.file_url}
            title={currentDoc.title}
            className="w-full h-[calc(100%-56px)] bg-white"
          />
        </div>

        {/* SIDEBAR */}
        {!isFullScreen && (
          <div className="w-80 border-l bg-white hidden lg:flex flex-col">
            <h3 className="p-4 font-semibold border-b">
              Course Documents
            </h3>

            <div className="flex-1 overflow-y-auto">
              {documents.map((doc, index) => (
                <div
                  key={doc.id}
                  onClick={() => setCurrentDoc(doc)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                    currentDoc.id === doc.id
                      ? "bg-gray-100"
                      : ""
                  }`}
                >
                  <h4 className="font-medium text-sm">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-gray-500">
                    {doc.subtitle}
                  </p>

                  <div className="flex justify-between mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentDoc(doc);
                      }}
                      className="text-xs text-blue-600"
                    >
                      Open
                    </button>

                    {index < documents.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentDoc(
                            documents[index + 1]
                          );
                        }}
                        className="text-xs text-green-600"
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

// import { useState } from "react";
// import Sidebar from "./Sidebar";

// const documents = [
//   {
//     id: "1",
//     title: "Introduction to Networking",
//     subtitle: "Basics of how networks work",
//     file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//   },
//   {
//     id: "2",
//     title: "OSI Model",
//     subtitle: "Understanding the 7 layers",
//     file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//   },
//   {
//     id: "3",
//     title: "IP Addressing",
//     subtitle: "Learn IPv4 & IPv6",
//     file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//   },
// ];

// export default function LessonPlayer() {
//   const [currentDoc, setCurrentDoc] = useState(documents[0]);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const handleNext = () => {
//     const currentIndex = documents.findIndex(
//       (doc) => doc.id === currentDoc.id
//     );
//     const nextDoc = documents[currentIndex + 1];
//     if (nextDoc) setCurrentDoc(nextDoc);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-1 relative">
        
//         {/* Document Viewer */}
//         <div
//           className={`flex-1 transition-all duration-300 ${
//             isFullScreen ? "fixed inset-0 z-50 bg-black" : ""
//           }`}
//         >
//           {/* Top Controls */}
//           <div className="flex justify-between items-center p-3 bg-white border-b border-gray-200 border-l">
//             <h2 className="font-semibold text-gray-800">
//               {currentDoc.title}
//             </h2>

//             <button
//               onClick={() => setIsFullScreen(!isFullScreen)}
//               className="px-3 py-1 text-sm bg-gray-800 text-white rounded"
//             >
//               {isFullScreen ? "Minimize" : "Fullscreen"}
//             </button>
//           </div>

//           {/* Document Frame */}
//           <iframe
//             src={currentDoc.file}
//             title={currentDoc.title}
//             className="w-full h-[calc(100%-56px)] bg-white"
//           />
//         </div>

//         {/* Right Sidebar (Documents List) */}
//         {!isFullScreen && (
//           <div className="w-80 border-l bg-white hidden lg:flex flex-col">
//             <h3 className="p-4 font-semibold border-b">
//               Course Documents
//             </h3>

//             <div className="flex-1 overflow-y-auto">
//               {documents.map((doc, index) => (
//                 <div
//                   key={doc.id}
//                   onClick={() => setCurrentDoc(doc)}
//                   className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
//                     currentDoc.id === doc.id ? "bg-gray-100" : ""
//                   }`}
//                 >
//                   <h4 className="font-medium text-sm">{doc.title}</h4>
//                   <p className="text-xs text-gray-500">
//                     {doc.subtitle}
//                   </p>

//                   <div className="flex justify-between mt-2">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setCurrentDoc(doc);
//                       }}
//                       className="text-xs text-blue-600"
//                     >
//                       Open
//                     </button>

//                     {index < documents.length - 1 && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setCurrentDoc(documents[index + 1]);
//                         }}
//                         className="text-xs text-green-600"
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