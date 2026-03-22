import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
  } from "react";
import { supabase } from "../api/supabase";
import type { Session } from "@supabase/supabase-js";
  
  type AuthContextType = {
    session: Session | null;
    loading: boolean;
  };
  
  const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: true,
  });
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getSession = async () => {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setLoading(false);
      };
  
      getSession();
  
      const { data: listener } = supabase.auth.onAuthStateChange(
        (_, session) => {
          setSession(session);
        }
      );
  
      return () => {
        listener.subscription.unsubscribe();
      };
    }, []);
  
    return (
      <AuthContext.Provider value={{ session, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);