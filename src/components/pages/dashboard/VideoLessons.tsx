import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import CourseImg from "../../../assets/numecis_logoIcon.jpg";
import { useNavigate } from "react-router-dom";

type Lesson = {
  id: string;
  title: string;
  description: string;
  price: string;
};

export default function VideoLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    const { data, error } = await supabase
      .from("lessons")
      .select("*");

    if (error) console.error(error);
    else setLessons(data || []);

    setLoading(false);
  }

  // ✅ Check if purchased
  function isPurchased(id: string) {
    const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
    return purchased.includes(id);
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Video Lessons</h1>
        <p className="text-gray-500 text-sm">
          Browse and purchase lessons
        </p>
      </div>

      {loading ? (
        <p>Loading lessons...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              purchased={isPurchased(lesson.id)}
              onClick={() => {
                if (isPurchased(lesson.id)) {
                  navigate(`/vidlesson/${lesson.id}`);
                } else {
                  setSelectedLesson(lesson);
                }
              }}
            />
          ))}
        </div>
      )}

      {selectedLesson && (
        <PurchaseModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onPurchase={(lessonId) => {
            const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
            localStorage.setItem(
              "purchased",
              JSON.stringify([...purchased, lessonId])
            );

            setSelectedLesson(null);
            navigate(`/vidlesson/${lessonId}`);
          }}
        />
      )}
    </div>
  );
}

function LessonCard({
  lesson,
  onClick,
  purchased,
}: {
  lesson: Lesson;
  onClick: () => void;
  purchased: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
    >
      <img
        src={CourseImg}
        alt={lesson.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="font-semibold">{lesson.title}</h2>

        <p className="text-sm text-gray-500 mt-1">
          {lesson.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <p className="font-medium text-[#1B2BB8]">
            ${lesson.price}
          </p>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              purchased
                ? "bg-blue-100 text-[#1B2BBB]"
                : "bg-red-200 text-red-600"
            }`}
          >
            {purchased ? "Unlocked" : "Locked"}
          </span>
        </div>
      </div>
    </div>
  );
}

function PurchaseModal({
  lesson,
  onClose,
  onPurchase,
}: {
  lesson: Lesson;
  onClose: () => void;
  onPurchase: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
      <div className="w-full md:max-w-sm bg-white rounded-t-3xl md:rounded-3xl p-6">
        <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 md:hidden" />

        <h2 className="text-lg font-semibold text-center">
          Purchase Lesson
        </h2>

        <p className="text-center text-gray-500 mt-1">
          {lesson.title}
        </p>

        <p className="text-center font-medium mt-2 text-[#1B2BB8]">
          $ {lesson.price}
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => onPurchase(lesson.id)}
            className="w-full bg-[#1B2BB8] text-white py-3 rounded-xl font-medium"
          >
            Confirm Purchase
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}