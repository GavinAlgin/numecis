import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabase";
import { ArrowLeftIcon } from "lucide-react";

/* =========================
   TYPES
========================= */
type CartItem = {
  id: string;
  name: string;
  price: number;
  type: "package" | "video";
};

/* =========================
   CART PAGE
========================= */
const Cart: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const navigate = useNavigate();

  /* =========================
     LOAD CART
  ========================= */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
    setLoading(false);
  }, []);

  /* =========================
     REMOVE ITEM
  ========================= */
  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  /* =========================
     TOTAL CALC
  ========================= */
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  /* =========================
     CHECKOUT (SUPABASE)
  ========================= */
  const handleCheckout = async () => {
    setCheckoutLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 🔒 Not logged in
    if (!user) {
      navigate("/login");
      setCheckoutLoading(false);
      return;
    }

    try {
      // Insert all purchases
      const inserts = cart.map((item) => ({
        user_id: user.id,
        package_id: item.type === "package" ? item.id : null,
        lesson_id: item.type === "video" ? item.id : null,
      }));

      const { error } = await supabase
        .from("purchases")
        .insert(inserts);

      if (error) throw error;

      // ✅ Clear cart
      localStorage.removeItem("cart");
      setCart([]);

      // ✅ Redirect
      navigate("/success");
    } catch (err: any) {
      console.error("Checkout error:", err.message);
    }

    setCheckoutLoading(false);
  };

  return (
    <section className="flex h-screen overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 w-full overflow-y-auto">
        <div className="mx-auto max-w-3xl">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
            <Link to="/dashboard" className="p-4 py-2.5 px-6 bg-gray-200 items-center justify-between flex rounded-2xl gap-2">
              <ArrowLeftIcon size={20} />
              Back
            </Link>
          </header>

          {/* =========================
              LOADING STATE
          ========================= */}
          {loading ? (
            <div className="mt-10 text-center text-gray-500">
              Loading cart...
            </div>
          ) : cart.length === 0 ? (
            <div className="mt-10 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <>
              {/* =========================
                  CART ITEMS
              ========================= */}
              <div className="mt-8">
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990"
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-xs text-gray-500">
                          {item.type === "video"
                            ? "Video Lesson"
                            : "Package"}
                        </p>
                      </div>

                      <div className="ml-auto flex items-center gap-4">
                        <p className="text-sm font-medium text-[#1B2BB8]">
                          ${item.price}
                        </p>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* =========================
                    SUMMARY
                ========================= */}
                <div className="mt-8 flex justify-end border-t pt-8">
                  <div className="w-full max-w-lg space-y-4">
                    <dl className="space-y-1 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>${subtotal.toFixed(2)}</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>VAT (15%)</dt>
                        <dd>${vat.toFixed(2)}</dd>
                      </div>

                      <div className="flex justify-between font-semibold">
                        <dt>Total</dt>
                        <dd>${total.toFixed(2)}</dd>
                      </div>
                    </dl>

                    {/* =========================
                        CHECKOUT BUTTON
                    ========================= */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleCheckout}
                        disabled={checkoutLoading}
                        className="rounded-lg bg-[#1B2BB8] px-6 py-3 text-sm text-white hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {checkoutLoading
                          ? "Processing..."
                          : "Checkout"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;


// "use client";

// import React, { useState } from "react";
// import Sidebar from "./Sidebar";

// const Cart: React.FC = () => {
//     const [mobileOpen, setMobileOpen] = useState(false);
//     const [collapsed, setCollapsed] = useState(false);
    
//   return (
//     <section className="flex h-screen overflow-hidden">
//       <Sidebar
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//       />
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <div className="mx-auto max-w-3xl">
//           <header className="text-center">
//             <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
//               Your Cart
//             </h1>
//           </header>

//           <div className="mt-8">
//             <ul className="space-y-4">
//               {[1, 2, 3].map((item) => (
//                 <li key={item} className="flex items-center gap-4">
//                   <img
//                     src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1160"
//                     alt="Product"
//                     className="w-16 h-16 rounded-sm object-cover"
//                   />

//                   <div>
//                     <h3 className="text-sm text-gray-900">
//                       Basic Tee 6-Pack
//                     </h3>

//                     <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
//                       <div>
//                         <dt className="inline">Size:</dt>{" "}
//                         <dd className="inline">XXS</dd>
//                       </div>
//                       <div>
//                         <dt className="inline">Color:</dt>{" "}
//                         <dd className="inline">White</dd>
//                       </div>
//                     </dl>
//                   </div>

//                   <div className="flex flex-1 items-center justify-end gap-2">
//                     <form>
//                       <label
//                         htmlFor={`qty-${item}`}
//                         className="sr-only"
//                       >
//                         Quantity
//                       </label>

//                       <input
//                         type="number"
//                         min={1}
//                         defaultValue={1}
//                         id={`qty-${item}`}
//                         className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 text-center text-xs text-gray-600 focus:outline-none"
//                       />
//                     </form>

//                     <button className="text-gray-600 hover:text-red-600 transition">
//                       <span className="sr-only">Remove item</span>

//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                         className="w-4 h-4"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             {/* Summary */}
//             <div className="mt-8 flex justify-end border-t pt-8">
//               <div className="w-full max-w-lg space-y-4">
//                 <dl className="space-y-1 text-sm text-gray-700">
//                   <div className="flex justify-between">
//                     <dt>Subtotal</dt>
//                     <dd>£250</dd>
//                   </div>

//                   <div className="flex justify-between">
//                     <dt>VAT</dt>
//                     <dd>£25</dd>
//                   </div>

//                   <div className="flex justify-between">
//                     <dt>Discount</dt>
//                     <dd>-£20</dd>
//                   </div>

//                   <div className="flex justify-between font-semibold">
//                     <dt>Total</dt>
//                     <dd>£200</dd>
//                   </div>
//                 </dl>

//                 {/* Discount Badge */}
//                 <div className="flex justify-end">
//                   <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700 text-xs">
//                     2 Discounts Applied
//                   </span>
//                 </div>

//                 {/* Checkout */}
//                 <div className="flex justify-end">
//                   <button className="rounded-sm bg-gray-700 px-5 py-3 text-sm text-white hover:bg-gray-600 transition">
//                     Checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;


// import React, { useMemo } from "react";
// import { useCartStore } from "@/store/cartStore";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { supabase } from "../../api/supabase";

// const Cart: React.FC = () => {
//   const {
//     cart,
//     removeFromCart,
//     updateQty,
//     currency,
//     setCurrency,
//     clearCart,
//   } = useCartStore();

//   // ✅ Calculate totals safely
//   const subtotal = useMemo(() => {
//     return cart.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//   }, [cart]);

//   const vat = subtotal * 0.15;
//   const total = subtotal + vat;

//   // ✅ Format currency
//   const format = (amount: number) =>
//     currency === "ZAR"
//       ? `R${amount.toFixed(2)}`
//       : `$${amount.toFixed(2)}`;

//   return (
//     <section className="mx-auto max-w-4xl px-4 py-10">
//       <h1 className="text-2xl font-bold text-center">Your Cart</h1>

//       {/* 🌍 Currency Switch */}
//       <div className="flex justify-end mt-4">
//         <select
//           value={currency}
//           onChange={(e) =>
//             setCurrency(e.target.value as "USD" | "ZAR")
//           }
//           className="border px-2 py-1 rounded"
//         >
//           <option value="USD">USD</option>
//           <option value="ZAR">ZAR</option>
//         </select>
//       </div>

//       {/* 🛒 CART ITEMS */}
//       <ul className="mt-6 space-y-4">
//         {cart.length === 0 && (
//           <p className="text-center text-gray-500">
//             Your cart is empty
//           </p>
//         )}

//         {cart.map((item) => (
//           <li
//             key={item.product_id}
//             className="flex items-center gap-4 border p-4 rounded"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-16 h-16 object-cover rounded"
//             />

//             <div className="flex-1">
//               <h3 className="font-medium">{item.name}</h3>
//               <p className="text-sm text-gray-500">
//                 {format(item.price)}
//               </p>
//             </div>

//             {/* Quantity */}
//             <input
//               type="number"
//               min={1}
//               value={item.quantity}
//               onChange={(e) =>
//                 updateQty(item.product_id, Number(e.target.value))
//               }
//               className="w-14 border rounded text-center"
//             />

//             {/* Remove */}
//             <button
//               onClick={() => removeFromCart(item.product_id)}
//               className="text-red-500 hover:text-red-700"
//             >
//               ✕
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* 💰 SUMMARY */}
//       {cart.length > 0 && (
//         <div className="mt-10 border-t pt-6 space-y-3">
//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>{format(subtotal)}</span>
//           </div>

//           <div className="flex justify-between">
//             <span>VAT (15%)</span>
//             <span>{format(vat)}</span>
//           </div>

//           <div className="flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>{format(total)}</span>
//           </div>

//           {/* 💳 PAYPAL */}
//           <div className="mt-6">
//             <PayPalButtons
//               style={{ layout: "vertical" }}

//               // ✅ Create order via backend
//               createOrder={async () => {
//                 const res = await fetch(
//                   "/functions/v1/create-order",
//                   {
//                     method: "POST",
//                     headers: {
//                       "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                       cart,
//                       currency,
//                     }),
//                   }
//                 );

//                 const data = await res.json();
//                 return data.id;
//               }}

//               // ✅ On successful payment
//               onApprove={async (data, actions) => {
//                 await actions.order?.capture();

//                 const {
//                   data: { user },
//                 } = await supabase.auth.getUser();

//                 if (!user) {
//                   alert("You must be logged in");
//                   return;
//                 }

//                 // 🔒 Always recompute total server-side too (done earlier)
//                 const totalAmount = cart.reduce(
//                   (sum, i) =>
//                     sum + i.price * i.quantity,
//                   0
//                 );

//                 // ✅ Create order
//                 const { data: order, error } = await supabase
//                   .from("orders")
//                   .insert([
//                     {
//                       user_id: user.id,
//                       total: totalAmount,
//                       currency,
//                       paypal_order_id: data.orderID,
//                     },
//                   ])
//                   .select()
//                   .single();

//                 if (error || !order) {
//                   console.error(error);
//                   alert("Order failed");
//                   return;
//                 }

//                 // ✅ Insert order items
//                 await supabase.from("order_items").insert(
//                   cart.map((item) => ({
//                     order_id: order.id,
//                     product_id: item.product_id,
//                     quantity: item.quantity,
//                     price: item.price,
//                   }))
//                 );

//                 // ✅ Clear cart
//                 clearCart();

//                 alert("Payment successful 🎉");
//               }}

//               onError={(err) => {
//                 console.error("PayPal error:", err);
//                 alert("Payment failed");
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Cart;
