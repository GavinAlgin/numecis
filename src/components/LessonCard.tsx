import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./api/supabase";

interface Package {
  id: string;
  name: string;
  duration: string;
  description: string;
  price: number;
  locked: boolean;
  image: string;
}

export default function LessonsPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const { data, error } = await supabase.from("packages").select("*");

    if (!error && data) setPackages(data);
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Packages
      </h1>

      {/* GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : packages.map((pkg) => (
              <LessonCard key={pkg.id} {...pkg} />
            ))}
      </div>
    </div>
  );
}

/* =========================
   Skeleton Loader
========================= */
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-10 bg-gray-200 rounded mt-4" />
      </div>
    </div>
  );
}

/* =========================
   Card Component
========================= */
function LessonCard({
  id,
  name,
  duration,
  description,
  price,
  locked: initialLocked,
  image,
}: Package) {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(initialLocked);
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    navigate(`/lesson/${id}`);
  };

  const handlePurchase = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    // update directly in packages table (as requested)
    const { error } = await supabase
      .from("packages")
      .update({ locked: false })
      .eq("id", id);

    if (!error) setLocked(false);

    setLoading(false);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-44 object-cover"
        />

        {locked && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow">
            Locked
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">
        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {name}
        </h2>

        {/* SUBTITLE */}
        <p className="text-xs text-gray-400 mb-2">
          {duration}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 flex-grow line-clamp-3">
          {description}
        </p>

        {/* DIVIDER */}
        <div className="border-t border-gray-100 my-4" />

        {/* FOOTER */}
        <div className="flex items-center justify-between">
          {/* PRICE */}
          <span className="text-blue-600 font-bold text-lg">
            ${price}
          </span>

          {/* BUTTON */}
          {locked ? (
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Purchase"}
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="text-blue-600 font-semibold text-sm hover:underline"
            >
              Start →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// interface Props {
//   id: string;
//   title: string;
//   duration: string;
//   description: string;
//   price: number;
//   locked: boolean;
//   image: string;
// }

// export default function LessonCard({
//   id,
//   title,
//   duration,
//   description,
//   price,
//   locked,
//   image,
// }: Props) {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       className="bg-white rounded-xl hover:shadow-sm transition overflow-hidden flex flex-col"
//     >
//       {/* Image */}
//       <div className="relative">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-40 object-cover"
//         />

//         {locked && (
//           <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col flex-grow">
//         <h2 className="text-lg font-semibold text-gray-800 mb-1">
//           {title}
//         </h2>

//         <p className="text-xs text-gray-500 mb-2">{duration}</p>

//         <p className="text-sm text-gray-600 flex-grow">
//           {description}
//         </p>

//         {/* Action */}
//         <div className="mt-4 flex justify-between items-center">
//           <span className="font-semibold text-accent">
//             ${price}
//           </span>

//           {locked ? (
//             <button
//               onClick={() => navigate(`/checkout/${id}`)}
//               className="bg-primary text-white px-3 py-2 rounded-lg text-sm hover:opacity-90"
//             >
//               Unlock
//             </button>
//           ) : (
//             <span className="text-green-600 text-sm font-medium">
//               Unlocked
//             </span>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }