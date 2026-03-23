import type { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';import { supabase } from '../../api/supabase';
import LessonCard from '../../LessonCard';


const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        setUser(null);
      } else {
        setUser(data.user);
      }

      setLoading(false);
    };

    getUser();

    // listen for auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex flex-1 flex-col">
        <Header onOpenSidebar={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <p className="text-sm text-gray-500 mb-6">
            Logged in as: {user.email}
          </p>

          <LessonCard />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

// import { useEffect, useState } from "react";
// import LessonCard from "../../LessonCard";
// import Sidebar from "./Sidebar";
// import Header from "./Header"; // ✅ IMPORT HEADER
// import { supabase } from "../../api/supabase";
// import type { User } from "@supabase/supabase-js";
// import LessonImg from "../../../assets/pexels-codioful-7135013.jpg";

// /* =========================
//    TYPES
// ========================= */

// type Package = {
//   id: string;
//   name?: string;
//   title?: string;
//   description: string | null;
//   price: number;
//   currency?: number | null;
//   duration?: string;
// };

// type Purchase = {
//   package_id: string;
// };

// export default function Dashboard() {
//   const [user, setUser] = useState<User | null>(null);

//   // ✅ SHARED SIDEBAR STATE
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   const [packages, setPackages] = useState<Package[]>([]);
//   const [purchases, setPurchases] = useState<Purchase[]>([]);

//   const [loading, setLoading] = useState<boolean>(true);
//   const [buyingId, setBuyingId] = useState<string | null>(null);

//   /* =========================
//      1. GET USER
//   ========================= */
//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();

//       if (error) {
//         console.error(error.message);
//         setUser(null);
//       } else {
//         setUser(user);
//       }

//       setLoading(false);
//     };

//     getUser();
//   }, []);

//   /* =========================
//      2. FETCH PACKAGES
//   ========================= */
//   useEffect(() => {
//     const fetchPackages = async () => {
//       const { data, error } = await supabase
//         .from("packages")
//         .select("*");

//       if (error) {
//         console.error("packages error:", error.message);
//         return;
//       }

//       setPackages((data as Package[]) || []);
//     };

//     fetchPackages();
//   }, []);

//   /* =========================
//      3. FETCH PURCHASES
//   ========================= */
//   useEffect(() => {
//     if (!user) return;

//     const fetchPurchases = async () => {
//       const { data, error } = await supabase
//         .from("user_purchases")
//         .select("package_id")
//         .eq("user_id", user.id);

//       if (error) {
//         console.error("purchases error:", error.message);
//         return;
//       }

//       setPurchases((data as Purchase[]) || []);
//     };

//     fetchPurchases();
//   }, [user]);

//   /* =========================
//      4. CHECK IF UNLOCKED
//   ========================= */
//   const isUnlocked = (packageId: string): boolean => {
//     return purchases.some((p) => p.package_id === packageId);
//   };

//   /* =========================
//      5. BUY PACKAGE
//   ========================= */
//   const handleBuy = async (packageId: string): Promise<void> => {
//     if (!user) return;

//     setBuyingId(packageId);

//     const alreadyBought = purchases.some(
//       (p) => p.package_id === packageId
//     );

//     if (alreadyBought) {
//       setBuyingId(null);
//       return;
//     }

//     const { error } = await supabase
//       .from("user_purchases")
//       .insert([
//         {
//           user_id: user.id,
//           package_id: packageId,
//         },
//       ]);

//     if (error) {
//       console.error("buy error:", error.message);
//     } else {
//       setPurchases((prev) => [
//         ...prev,
//         { package_id: packageId },
//       ]);
//     }

//     setBuyingId(null);
//   };

//   /* =========================
//      LOADING STATE
//   ========================= */
//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p className="text-gray-600 animate-pulse">
//           Loading dashboard...
//         </p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p className="text-red-500">
//           You must be logged in to view this page.
//         </p>
//       </div>
//     );
//   }

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* SIDEBAR */}
//       <Sidebar
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//       />

//       {/* RIGHT SIDE (HEADER + CONTENT) */}
//       <div className="flex flex-1 flex-col">
//         {/* HEADER */}
//         <Header onOpenSidebar={() => setMobileOpen(true)} />

//         {/* MAIN CONTENT */}
//         <main className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full">
//           <h2 className="text-xl font-semibold mb-4">
//             Dashboard
//           </h2>

//           <p className="text-sm text-gray-500 mb-6">
//             Logged in as: {user.email}
//           </p>

//           {/* =========================
//               CARDS
//           ========================= */}
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {packages.map((pkg) => {
//               const unlocked = isUnlocked(pkg.id);

//               return (
//                 <div key={pkg.id} className="relative">
//                   <LessonCard
//                     image={LessonImg}
//                     {...pkg}
//                     locked={!unlocked}
//                   />

//                   {!unlocked && (
//                     <button
//                       onClick={() => handleBuy(pkg.id)}
//                       disabled={buyingId === pkg.id}
//                       className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       {buyingId === pkg.id
//                         ? "Processing..."
//                         : `Buy for $${pkg.price}`}
//                     </button>
//                   )}

//                   {unlocked && (
//                     <p className="mt-2 text-green-600 text-sm font-medium">
//                       ✓ Unlocked
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* =========================
//               TABLE VIEW
//           ========================= */}
//           <div className="mt-10 bg-white rounded-lg">
//             <h3 className="text-lg font-semibold p-4 border-b">
//               Lesson Overview
//             </h3>

//             <div className="overflow-x-auto hidden md:block">
//               <table className="w-full text-left">
//                 <tbody>
//                   {packages.map((pkg) => {
//                     const unlocked = isUnlocked(pkg.id);

//                     return (
//                       <tr key={pkg.id} className="border-t">
//                         <td className="p-4 font-medium">
//                           {pkg.title || pkg.name}
//                         </td>

//                         <td className="p-4 text-gray-600">
//                           {pkg.description}
//                         </td>

//                         <td className="p-4">
//                           ${pkg.price}
//                         </td>

//                         <td className="p-4">
//                           {pkg.duration || "—"}
//                         </td>

//                         <td className="p-4">
//                           {unlocked ? (
//                             <span className="text-green-600">
//                               Unlocked
//                             </span>
//                           ) : (
//                             <button
//                               onClick={() => handleBuy(pkg.id)}
//                               className="text-blue-600 hover:underline"
//                             >
//                               Buy
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* MOBILE */}
//             <div className="md:hidden divide-y">
//               {packages.map((pkg) => {
//                 const unlocked = isUnlocked(pkg.id);

//                 return (
//                   <div key={pkg.id} className="p-4">
//                     <h4 className="font-semibold">
//                       {pkg.title || pkg.name}
//                     </h4>

//                     <p className="text-sm text-gray-500">
//                       {pkg.description}
//                     </p>

//                     <div className="flex justify-between mt-2">
//                       <span>${pkg.price}</span>

//                       {unlocked ? (
//                         <span className="text-green-600 text-sm">
//                           Unlocked
//                         </span>
//                       ) : (
//                         <button
//                           onClick={() => handleBuy(pkg.id)}
//                           className="text-blue-600 text-sm"
//                         >
//                           Buy
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }