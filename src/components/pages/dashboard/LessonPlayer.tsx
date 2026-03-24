import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import Sidebar from "./Sidebar";

/* =========================
   TYPES
========================= */
type Lesson = {
  id: string;
  title: string;
  description: string;
  pdf_url: string;
  preview: string;
};

type Props = {
  packageId: string;
};

export default function LessonPlayer({ packageId }: Props) {
  const [documents, setDocuments] = useState<Lesson[]>([]);
  const [currentDoc, setCurrentDoc] = useState<Lesson | null>(null);

  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  /* =========================
     FETCH DOCUMENTS
  ========================= */
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!packageId) return;

      const { data, error } = await supabase
        .from("package_documents")
        .select(
          `
          documents (
            id,
            title,
            description,
            pdf_url,
            preview
          )
        `
        )
        .eq("package_id", packageId);

      if (error) {
        console.error("Docs error:", error.message);
        setLoading(false);
        return;
      }

      const docs: Lesson[] = data
        .map((item: any) => item.documents)
        .filter(Boolean);

      setDocuments(docs);
      setCurrentDoc(docs[0] ?? null);
      setLoading(false);
    };

    fetchDocuments();
  }, [packageId]);

  /* =========================
     NAVIGATION
  ========================= */
  const currentIndex = documents.findIndex(
    (d) => d.id === currentDoc?.id
  );

  const goNext = () => {
    if (currentIndex < documents.length - 1) {
      setCurrentDoc(documents[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentDoc(documents[currentIndex - 1]);
    }
  };

  /* =========================
     STATES
  ========================= */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading lesson...
      </div>
    );
  }

  if (!currentDoc) {
    return (
      <div className="flex h-screen items-center justify-center">
        No documents found
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      {/* MAIN CONTENT */}
      <div className="flex flex-1 relative">
        {/* VIEWER */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isFullScreen ? "fixed inset-0 z-50 bg-black" : ""
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-3 bg-white border-b">
            <div>
              <h2 className="font-semibold text-sm md:text-base">
                {currentDoc.title}
              </h2>
              <p className="text-xs text-gray-500">
                Lesson {currentIndex + 1} of {documents.length}
              </p>
            </div>

            <div className="flex gap-2">
              {/* MOBILE LESSON LIST BUTTON */}
              <button
                onClick={() => setMobileOpen(true)}
                className="px-2 py-1 text-xs bg-gray-200 rounded lg:hidden"
              >
                Lessons
              </button>

              {/* FULLSCREEN */}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="px-3 py-1 text-xs bg-gray-800 text-white rounded"
              >
                {isFullScreen ? "Minimize" : "Fullscreen"}
              </button>
            </div>
          </div>

          {/* PDF VIEWER */}
          <iframe
            src={currentDoc.pdf_url}
            title={currentDoc.title}
            className="w-full h-[calc(100%-110px)] md:h-[calc(100%-56px)] bg-white"
          />
        </div>

        {/* DESKTOP SIDEBAR */}
        {!isFullScreen && (
          <div className="w-80 border-l bg-white hidden lg:flex flex-col">
            <h3 className="p-4 font-semibold border-b">
              Lessons
            </h3>

            <div className="flex-1 overflow-y-auto">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setCurrentDoc(doc)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                    currentDoc.id === doc.id ? "bg-gray-100" : ""
                  }`}
                >
                  <h4 className="font-medium text-sm">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {doc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================
         MOBILE DRAWER
      ========================= */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Lessons</h3>
              <button onClick={() => setMobileOpen(false)}>
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    setCurrentDoc(doc);
                    setMobileOpen(false);
                  }}
                  className={`p-4 border-b cursor-pointer ${
                    currentDoc.id === doc.id ? "bg-gray-100" : ""
                  }`}
                >
                  <h4 className="text-sm font-medium">
                    {doc.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================
         MOBILE BOTTOM NAV
      ========================= */}
      {!isFullScreen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-between items-center lg:hidden z-50">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="px-3 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            ← Prev
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className="px-3 py-2 text-sm bg-gray-800 text-white rounded"
          >
            Lessons
          </button>

          <button
            onClick={goNext}
            disabled={currentIndex === documents.length - 1}
            className="px-3 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}