import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import {
  IconX,
  IconDashboard,
  IconHelp,
  IconSearch,
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
  IconCreditCard,
  IconNotification,
  IconSettings,
} from "@tabler/icons-react"
import { PanelLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../../api/supabase"

// utility
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const [user, setUser] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  // -----------------------------
  // Fetch Supabase user session
  // -----------------------------
  useEffect(() => {
    let mounted = true

    const getUser = async () => {
      setLoadingUser(true)

      const { data, error } = await supabase.auth.getUser()

      if (!mounted) return

      if (error) {
        console.error(error)
        setUser(null)
      } else {
        setUser(data.user)
      }

      setLoadingUser(false)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoadingUser(false)
      }
    )

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const navItems = [
    { name: "Dashboard", to: "/dashboard", icon: IconDashboard },
  ]

  const footerItems = [
    { name: "Search", to: "/search", icon: IconSearch },
    { name: "Help", to: "/help", icon: IconHelp },
    { name: "Settings", to: "/settings", icon: IconSettings },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUserOpen(false)
  }

  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-300 md:hidden">
        <button onClick={() => setMobileOpen(true)}>
          <PanelLeft className="size-5" />
        </button>
        <span className="font-semibold">Numecis</span>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-50 flex h-full flex-col bg-white transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          "md:relative",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          {!collapsed && <span className="font-bold">Numecis</span>}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1 rounded-md hover:bg-gray-100"
            >
              <PanelLeft className="size-5" />
            </button>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden"
            >
              <IconX />
            </button>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                  "hover:bg-gray-100",
                  isActive && "bg-gray-200 font-medium"
                )
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Footer */}
        <div className="border-t border-gray-200 p-2 space-y-2">
          <nav className="flex flex-col gap-1">
            {footerItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                    "hover:bg-gray-100",
                    isActive && "bg-gray-200 font-medium"
                  )
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && item.name}
              </NavLink>
            ))}
          </nav>

          {/* USER SECTION */}
          <div className="relative">
            <button
              onClick={() => setUserOpen((prev) => !prev)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100 transition",
                collapsed && "justify-center"
              )}
            >
              {/* Avatar */}
              {loadingUser ? (
                <div className="h-8 w-8 rounded-lg bg-gray-200 animate-pulse" />
              ) : (
                <img
                  src={
                    user?.user_metadata?.avatar_url ||
                    "https://github.com/shadcn.png"
                  }
                  alt="avatar"
                  className="h-8 w-8 rounded-lg object-cover"
                />
              )}

              {!collapsed && (
                <>
                  <div className="flex flex-col text-left text-sm flex-1">
                    {loadingUser ? (
                      <>
                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                        <div className="h-3 w-32 bg-gray-100 animate-pulse rounded mt-1" />
                      </>
                    ) : (
                      <>
                        <span className="font-medium truncate">
                          {user?.user_metadata?.full_name || user?.email}
                        </span>
                        <span className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </span>
                      </>
                    )}
                  </div>

                  <IconDotsVertical className="size-4 opacity-60" />
                </>
              )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {userOpen && !loadingUser && user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-14 right-0 w-56 rounded-xl border border-gray-200 bg-white shadow-lg p-1 z-50"
                >
                  <div className="flex flex-col">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                      <IconUserCircle className="size-4" />
                      Account
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                      <IconCreditCard className="size-4" />
                      Billing
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                      <IconNotification className="size-4" />
                      Notifications
                    </button>

                    <div className="h-px bg-gray-200 my-1" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md"
                    >
                      <IconLogout className="size-4" />
                      Log out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>
    </>
  )
}


// import { useState } from "react"
// import { NavLink } from "react-router-dom"
// import {
//   IconX,
//   IconDashboard,
//   IconListDetails,
//   IconChartBar,
//   IconFolder,
//   IconUsers,
//   IconSettings,
//   IconHelp,
//   IconSearch,
//   IconDotsVertical,
//   IconLogout,
//   IconUserCircle,
//   IconCreditCard,
//   IconNotification,
// } from "@tabler/icons-react"
// import { PanelLeft } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// // utility
// function cn(...classes: (string | boolean | undefined)[]) {
//   return classes.filter(Boolean).join(" ")
// }

// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false)
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [userOpen, setUserOpen] = useState(false)

//   const user = {
//     name: "Cyprian",
//     email: "cyprian@email.com",
//     avatar: "https://github.com/shadcn.png",
//   }

//   const navItems = [
//     { name: "Dashboard", to: "/dashboard", icon: IconDashboard },
//     // { name: "Lifecycle", to: "/lifecycle", icon: IconListDetails },
//     // { name: "Analytics", to: "/analytics", icon: IconChartBar },
//     // { name: "Projects", to: "/projects", icon: IconFolder },
//     // { name: "Team", to: "/team", icon: IconUsers },
//   ]

//   const footerItems = [
//     { name: "Search", to: "/search", icon: IconSearch },
//     { name: "Help", to: "/help", icon: IconHelp },
//     { name: "Settings", to: "/settings", icon: IconSettings },
//   ]

//   return (
//     <>
//       {/* Mobile Topbar */}
//       <div className="flex items-center justify-between p-3 border-b border-gray-300 md:hidden">
//         <button onClick={() => setMobileOpen(true)}>
//           <PanelLeft className="size-5" />
//         </button>
//         <span className="font-semibold">Numecis</span>
//       </div>

//       {/* Overlay */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={cn(
//           "fixed z-50 flex h-full flex-col bg-white transition-all duration-300",
//           collapsed ? "w-16" : "w-64",
//           "md:relative",
//           mobileOpen
//             ? "translate-x-0"
//             : "-translate-x-full md:translate-x-0"
//         )}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-3 border-b border-gray-200">
//           {!collapsed && <span className="font-bold">Numecis</span>}

//           <div className="flex items-center gap-2">
//             {/* Collapse */}
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="hidden md:flex p-1 rounded-md hover:bg-gray-100"
//             >
//               <PanelLeft className="size-5" />
//             </button>

//             {/* Close mobile */}
//             <button
//               onClick={() => setMobileOpen(false)}
//               className="md:hidden"
//             >
//               <IconX />
//             </button>
//           </div>
//         </div>

//         {/* Main Nav */}
//         <nav className="flex flex-col gap-1 p-2">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.to}
//               end
//               onClick={() => setMobileOpen(false)}
//               className={({ isActive }) =>
//                 cn(
//                   "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
//                   "hover:bg-gray-100",
//                   isActive && "bg-gray-200 font-medium"
//                 )
//               }
//             >
//               <item.icon className="w-5 h-5 shrink-0" />
//               {!collapsed && item.name}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Spacer */}
//         <div className="flex-1" />

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-2 space-y-2">
//           {/* Footer links */}
//           <nav className="flex flex-col gap-1">
//             {footerItems.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.to}
//                 onClick={() => setMobileOpen(false)}
//                 className={({ isActive }) =>
//                   cn(
//                     "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
//                     "hover:bg-gray-100",
//                     isActive && "bg-gray-200 font-medium"
//                   )
//                 }
//               >
//                 <item.icon className="w-5 h-5 shrink-0" />
//                 {!collapsed && item.name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* User Section */}
//           <div className="relative">
//             <button
//               onClick={() => setUserOpen((prev) => !prev)}
//               className={cn(
//                 "flex w-full items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100 transition",
//                 collapsed && "justify-center"
//               )}
//             >
//               {/* Avatar */}
//               <img
//                 src={user.avatar}
//                 alt="avatar"
//                 className="h-8 w-8 rounded-lg object-cover"
//               />

//               {!collapsed && (
//                 <>
//                   <div className="flex flex-col text-left text-sm flex-1">
//                     <span className="font-medium truncate">
//                       {user.name}
//                     </span>
//                     <span className="text-xs text-gray-500 truncate">
//                       {user.email}
//                     </span>
//                   </div>

//                   <IconDotsVertical className="size-4 opacity-60" />
//                 </>
//               )}
//             </button>

//             {/* Dropdown */}
//             <AnimatePresence>
//               {userOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95, y: 8 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95, y: 8 }}
//                   transition={{ duration: 0.18 }}
//                   className="absolute bottom-14 right-0 w-56 rounded-xl border border-gray-200 bg-white shadow-lg p-1 z-50"
//                 >
//                   {/* User info */}
//                   <div className="flex items-center gap-2 p-2">
//                     <img
//                       src={user.avatar}
//                       className="h-9 w-9 rounded-lg"
//                     />
//                     <div className="flex flex-col">
//                       <span className="text-sm font-medium">
//                         {user.name}
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         {user.email}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="h-px bg-gray-200 my-1" />

//                   {/* Menu */}
//                   <div className="flex flex-col">
//                     <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
//                       <IconUserCircle className="size-4" />
//                       Account
//                     </button>

//                     <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
//                       <IconCreditCard className="size-4" />
//                       Billing
//                     </button>

//                     <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
//                       <IconNotification className="size-4" />
//                       Notifications
//                     </button>
//                   </div>

//                   <div className="h-px bg-gray-200 my-1" />

//                   <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md">
//                     <IconLogout className="size-4" />
//                     Log out
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </aside>
//     </>
//   )
// }