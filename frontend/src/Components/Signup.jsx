import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setText} from "./store/TextSlice"


const SignupPage = () => {
  const [submitStatus, setSubmitStatus] = useState("");

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    role: "employee",
    terms: false,
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    role: true,
    terms: "",
  });
  console.log(formData)

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  // console.log(formData.fname,lname)

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, phone, terms } = formData;

    // Validation
    let isValid = true;
    if (!fname) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fname: "First name is required",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, fname: "" }));
    }

    if (!lname) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lname: "Last name is required",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, lname: "" }));
    }

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    } else if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }

    if (!phone) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone number is required",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }

    if (!terms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: "Please agree to the Terms of Service and Privacy Policy",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, terms: "" }));
    }

    if (!isValid) return;

    try {
      const response = await axios.post(
        "https://backend-jobport.onrender.com/api/signup",
        formData
      );
      navigate('/signin')

      if (response.status === 201) {
        dispatch(setText("success"));
      } else {
        dispatch(setText("error"));
      }
    } catch (error) {
      console.log("error in handle submit", error);
      dispatch(setText("error"));
    }
  };

  // const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#111827] flex md:pt-7">
      {/* Left Side - Illustration/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 flex-col justify-between p-12">
        <div className="flex items-center">
          <svg
            className="h-10 w-10 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-4 text-white text-xl font-bold">YourBrand</span>
        </div>
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-6">
            Start your journey with us
          </h1>
          <p className="text-xl opacity-80 mb-12">
            Join thousands of users who've already transformed their careers.
          </p>
          <div className="flex space-x-1">
            {/* Testimonial avatars */}
            <img
              src="https://images.pexels.com/photos/4924538/pexels-photo-4924538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-16 w-16 rounded-full object-cover"
              alt="User avatar"
            />
            <img
              src="https://images.pexels.com/photos/30217125/pexels-photo-30217125/free-photo-of-contemplative-portrait-of-a-man-in-monochrome.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-16 w-16 rounded-full object-cover"
              alt="User avatar"
            />
            <img
              src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-16 w-16 rounded-full object-cover"
              alt="User avatar"
            />
            <div className="flex items-center">
              <span className="text-sm font-medium">Join 10,000+ members</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-white opacity-70">
          © 2025 YourBrand. All rights reserved.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 px-4 md:px-12 lg:px-20 py-16 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-3 text-gray-500">
              Fill in the details below to get started
            </p>
          </div>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
              <svg
                className="h-5 w-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Account created successfully!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
              <svg
                className="h-5 w-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Error creating account. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-3 rounded-lg text-gray-900 border ${
                    errors.fname ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-[#ffffff]`}
                  placeholder="John"
                />
                {errors.fname && (
                  <p className="mt-1 text-sm text-red-600">{errors.fname}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-3 rounded-lg text-gray-900 border ${
                    errors.lname ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-[#ffffff]`}
                  placeholder="Doe"
                />
                {errors.lname && (
                  <p className="mt-1 text-sm text-red-600">{errors.lname}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full px-4 py-3 rounded-lg text-gray-900 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-[#ffffff]`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-3 rounded-lg text-gray-900 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-[#ffffff]`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                ></button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`block w-full px-4 py-3 rounded-lg text-gray-900 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-[#ffffff]`}
                placeholder="+91 (987) 654-3210"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                I am joining as
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-[#ffffff]"
              >
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                  errors.terms ? "border-red-500" : ""
                }`}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              // onClick={()=>dispatch(texted())}
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => (window.location.href = "/signin")}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
