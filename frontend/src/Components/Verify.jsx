import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import sign from "../assets/signup.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmailContext } from "./Context";

const Verify = () => {
  const [OTP, setOTP] = useState("");
  const { email } = useContext(EmailContext);
  console.log(email);

  const navigate = useNavigate();
  console.log(OTP);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/verify-otp/${email}`,
        { OTP }
      );
      console.log(response);

      if (response.status === 200) {
        navigate("/reset");
        toast.success("OTP Verified Successfully!");
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex h-screen bg-blue-500 text-white">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center ">
        <img
          className="w-full h-full object-cover object-center"
          src={sign}
          alt=""
        />
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Verify OTP</h2>
          <form onSubmit={handleSubmit}>
            {/* OTP input */}
            <div className="mb-4">
              <input
                type="text"
                name="OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter your OTP"
                className="w-full px-3 py-2 border rounded-lg text-blue-500 focus:outline-none  focus:border-blue-500"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-blue-500">{"Didn't receive the OTP?"}</span>
            <Link to="/forgot" className="text-blue-500 hover:underline ml-2">
              Resend OTP
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Verify;
