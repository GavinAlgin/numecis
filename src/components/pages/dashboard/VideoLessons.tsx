import { useState } from "react";

type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  image: string;
};

const lessons: Lesson[] = [
  {
    id: 1,
    title: "React Basics",
    subtitle: "Learn components & hooks",
    price: "$19.99",
    image: "https://source.unsplash.com/300x200/?coding",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    subtitle: "Types, generics & patterns",
    price: "$29.99",
    image: "https://source.unsplash.com/300x200/?laptop",
  },
  {
    id: 3,
    title: "UI Design Principles",
    subtitle: "Modern mobile UI thinking",
    price: "$14.99",
    image: "https://source.unsplash.com/300x200/?design",
  },
];

export default function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  return (
    <div className="p-4 md:p-6">
      {/* Header fits dashboard */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Video Lessons</h1>
        <p className="text-gray-500 text-sm">
          Browse and purchase lessons
        </p>
      </div>

      {/* Responsive grid for dashboard */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onClick={() => setSelectedLesson(lesson)}
          />
        ))}
      </div>

      {selectedLesson && (
        <PurchaseModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}

function LessonCard({
  lesson,
  onClick,
}: {
  lesson: Lesson;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition active:scale-[0.98] cursor-pointer"
    >
      {/* LEFT IMAGE */}
      <img
        src={lesson.image}
        alt={lesson.title}
        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl flex-shrink-0"
      />

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold text-base md:text-lg truncate">
          {lesson.title}
        </h2>
        <p className="text-sm text-gray-500 truncate">
          {lesson.subtitle}
        </p>

        <p className="mt-2 font-medium text-sm md:text-base">
          {lesson.price}
        </p>
      </div>
    </div>
  );
}

function PurchaseModal({
  lesson,
  onClose,
}: {
  lesson: Lesson;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
      
      {/* iOS-style bottom sheet (mobile) + centered modal (desktop) */}
      <div className="w-full md:max-w-sm bg-white rounded-t-3xl md:rounded-3xl p-6 animate-slideUp">
        
        {/* Drag indicator */}
        <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 md:hidden" />

        <h2 className="text-lg font-semibold text-center">
          Purchase Lesson
        </h2>

        <p className="text-center text-gray-500 mt-1">
          {lesson.title}
        </p>

        <p className="text-center font-medium mt-2">
          {lesson.price}
        </p>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-black text-white py-3 rounded-xl font-medium active:opacity-80">
            Confirm Purchase
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-gray-600 active:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}