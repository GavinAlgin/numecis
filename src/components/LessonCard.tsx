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
    <div className="p-2.5 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-3xl font-bold mb-6 text-black">
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

function LessonCard({
  id,
  name,
  duration,
  description,
  price,
  locked: initialLocked,
}: Package) {
  const navigate = useNavigate();

  const [locked, setLocked] = useState(initialLocked);
  const [loading, setLoading] = useState(false);

  /* =========================
     START LESSON
  ========================= */
  const handleStart = () => {
    navigate(`/lesson/${id}`);
  };

  /* =========================
     PURCHASE PACKAGE
  ========================= */
  const handlePurchase = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 🔒 Not logged in
    if (!user) {
      navigate("/login");
      setLoading(false);
      return;
    }

    // ✅ Check if already purchased (extra safety)
    const { data: existing } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("package_id", id)
      .maybeSingle();

    if (existing) {
      setLocked(false);
      setLoading(false);
      return;
    }

    // ✅ Insert purchase
    const { error } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        package_id: id,
      });

    if (error) {
      console.error("Purchase error:", error.message);
      setLoading(false);
      return;
    }

    // ✅ Unlock UI
    setLocked(false);
    setLoading(false);
  };

  /* =========================
     UI
  ========================= */
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl p-1 transition"
    >
      <div className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col h-full">
        {/* PRICE BADGE */}
        <div className="absolute top-3 right-3">
          <div className="bg-white border border-gray-100 text-[#1B2BB8] text-sm font-semibold px-3 py-1 rounded-full">
            ${price}
          </div>
        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold text-[#1B2BB8]">
            Lesson
          </div>

          {locked && (
            <span className="text-[10px] bg-[#1B2BB8] text-white px-2 py-1 rounded-full">
              Locked
            </span>
          )}
        </div>

        {/* TITLE */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-snug line-clamp-2">
          {name}
        </h2>

        {/* DURATION */}
        <p className="text-xs text-gray-400 mt-1 mb-3">
          {duration}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-5">
          {locked ? (
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full bg-[#1B2BB8] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Unlock Lesson"}
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="w-full bg-[#1B2BB8] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-[0.98] transition">
              Start Lesson
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}