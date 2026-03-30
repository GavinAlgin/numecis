import type { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';import { supabase } from '../../api/supabase';
import LessonCard from '../../LessonCard';
import VideoLessons from './VideoLessons';
import { Link } from 'react-router-dom';
import { IconShoppingCartCheck } from '@tabler/icons-react';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const cartCount = 1;

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
        <div className="w-full flex flex-col gap-6 mb-12">
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <p className="text-sm text-gray-500">
                  Logged in as: {user.email}
                </p>
              </div>

              {/* Cart Button */}
              <Link
                to="/dashboard/cart"
                className="relative flex items-center gap-2 bg-gray-200 px-5 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition">
                <IconShoppingCartCheck size={20} />
                Cart

                {/* Count Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className='flex flex-col items-center justify-between p-4 bg-[#1B2BB8] text-white rounded-2xl mb-2.5'>
            <h2 className='text-xl font-semibold'>Welcome to Numecis E-Learning</h2>
            <p className='m-3.5 font-medium text-gray-300'>Numecis has theory part and lessons part avaiable for all, Numecis covers lottery lessons and retail items, Developers secrete movements, Precise Movements, Lottery Arributes, how to bet or play wisely lottery number games</p>
            <a href="/aboutus" className="rounded-md bg-gray-200 px-4 py-2.5 text-sm font-semibold text-[#1B2BBB] shadow-sm hover:cursor-pointer hover:bg-white">Learn More</a>
          </div>

          <LessonCard />
          <VideoLessons />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
