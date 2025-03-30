import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import axios from "axios"; // Import axios
import sign from "../assets/signup.jpg";
import { EmailContext } from "./Context";

// Initialize the Toast container

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { email } = useContext(EmailContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!"); // Show error toast
      return;
    }

    // Make the API call to reset the password using axios
    try {
      const response = await axios.post(`http://localhost:5000/api/reset-password/${email}`,
        {
          newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully!"); // Show success toast
        // Redirect to the login page immediately after successful reset
        navigate("/signin");
      } else {
        toast.error(
          response.data.message || "An error occurred. Please try again."
        ); // Show error toast
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      ); // Show error toast
    }
  };

  return (
    <div className="flex h-screen bg-blue-500 text-white">
      <ToastContainer />

      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center ">
        <img
          className="w-full h-full object-cover object-center"
          src={sign}
          alt="Sign Up"
        />
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                className="w-full px-3 py-2 border rounded-lg text-blue-500 focus:outline-none focus:border-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border rounded-lg text-blue-500 focus:outline-none focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-white">Remember your password?</span>
            <Link to="/signin" className="text-blue-500 hover:underline ml-2">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;