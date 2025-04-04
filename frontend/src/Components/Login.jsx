import { Link, useNavigate } from "react-router-dom";
import sign from "../assets/signup.jpg";
import { EmailContext } from "../Components/Context";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
} from "react-icons/md";

const Login = () => {
  const [password, setPassword] = useState("");
  const { email, setEmail } = useContext(EmailContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const text = useSelector((store) => store.text.value);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        email,
        password,
      });

      toast.success(response.data.message);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userName", user.fname);
      localStorage.setItem("userId", user.id);
console.log(response);

      if (user.role === "employer") {
        navigate("/RecuterDashboard/CreateJob");
      } else {
        navigate("/dash");
      }
    } catch (err) {
      console.log(err);
      
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 md:pt-20 text-gray-100">
      <ToastContainer />

      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-600/80 z-10"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={sign}
          alt="Login Background"
        />
        <div className="relative z-20 flex flex-col justify-center items-start p-12 w-full h-full">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome Back</h1>
          <p className="text-xl text-gray-100 max-w-md">
            Access your account and continue your journey with us.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold">Thank You To Login {text}</h1>
          <div className="mb-10">
            <p className="text-gray-400">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="h-5 w-5" />
                  ) : (
                    <MdVisibility className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-gray-400 hover:text-gray-300 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              <span>{loading ? "Signing in..." : "Sign in"}</span>
              {!loading && <MdArrowForward className="h-5 w-5" />}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;