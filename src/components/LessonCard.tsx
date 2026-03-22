import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  duration: string;
  description: string;
  price: number;
  locked: boolean;
  image: string;
}

export default function LessonCard({
  id,
  title,
  duration,
  description,
  price,
  locked,
  image,
}: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl hover:shadow-sm transition overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />

        {locked && (
          <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {title}
        </h2>

        <p className="text-xs text-gray-500 mb-2">{duration}</p>

        <p className="text-sm text-gray-600 flex-grow">
          {description}
        </p>

        {/* Action */}
        <div className="mt-4 flex justify-between items-center">
          <span className="font-semibold text-accent">
            ${price}
          </span>

          {locked ? (
            <button
              onClick={() => navigate(`/checkout/${id}`)}
              className="bg-primary text-white px-3 py-2 rounded-lg text-sm hover:opacity-90"
            >
              Unlock
            </button>
          ) : (
            <span className="text-green-600 text-sm font-medium">
              Unlocked
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}