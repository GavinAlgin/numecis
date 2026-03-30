import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
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

type SidebarProps = {
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const [userOpen, setUserOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  /* =========================
     USER SESSION
  ========================= */
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

  /* =========================
     NAV ITEMS
  ========================= */
  const navItems = [
    { name: "Dashboard", to: "/dashboard", icon: IconDashboard },
  ]

  const footerItems = [
    { name: "Search", to: "/search", icon: IconSearch },
    { name: "Help", to: "/help", icon: IconHelp },
    { name: "Settings", to: "/dashboard/settings", icon: IconSettings },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUserOpen(false)
  }

  /* =========================
     UI
  ========================= */
  return (
    <>
      {/* Overlay (mobile only) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-50 flex h-full flex-col bg-white transition-transform duration-300",
          collapsed ? "w-16" : "w-64",
          "md:relative md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          {!collapsed && <span className="font-bold">Numecis</span>}

          <div className="flex items-center gap-2">
            {/* Desktop collapse */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1 rounded-md hover:bg-gray-100"
            >
              <PanelLeft className="size-5" />
            </button>

            {/* Mobile close */}
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

          {/* USER */}
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
                      <Link to="/dashboard/profile">Account</Link>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                      <IconCreditCard className="size-4" />
                      <Link to="/dashboard/cart">Cart</Link>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                      <IconNotification className="size-4" />
                      <Link to="/dashboard/settings">Notifications</Link>
                    </button>

                    <div className="h-px bg-gray-200 my-1" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md">
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
