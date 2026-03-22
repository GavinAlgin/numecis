import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../controllers/validation";
import { supabase } from "../../api/supabase";
import Logo from "../../../assets/numecis_logoIconRM.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) return toast.error("Invalid email");
    if (!validatePassword(password))
      return toast.error("Password too weak");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    if (!acceptedTerms)
      return toast.error("You must accept terms and conditions");

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) return toast.error(error.message);

    toast.success("Account created! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Numecis"
          src={Logo}
          className="mx-auto h-18 w-18"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign up to create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              type="email"
              required
              placeholder="@"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md bg-[#F3F3F3] px-3 py-2 border border-gray-300 focus:outline-indigo-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-500">
                  {showPassword ? (
                    // close icon
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
              />
              <span
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-2 cursor-pointer text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-indigo-600 font-medium cursor-pointer">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#1B2BB8] py-2 text-sm font-semibold text-white hover:bg-indigo-600">
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        {/* Redirect to login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-[#1B2BB8] cursor-pointer">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}