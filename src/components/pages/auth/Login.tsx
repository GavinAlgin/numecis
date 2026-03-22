import { useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../../api/supabase";
import { validateEmail, validatePassword } from "../../controllers/validation";
import Logo from "../../../assets/numecis_logoIconRM.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Invalid email format");
    }

    if (!validatePassword(password)) {
      return toast.error("Password must be at least 6 characters");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return toast.error(error.message);

    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Numecis"
            src={Logo}
            className="mx-auto h-18 w-22"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="@"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-[#F3F3F3] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/forgot-password" className="font-semibold text-[#1B2BB8] hover:text-indigo-600">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-[#F3F3F3] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1B2BB8] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="/signup" className="font-semibold text-[#1B2BB8] hover:text-indigo-600">
              Join us now
            </a>
          </p>
        </div>
      </div>
    </>
  )
}