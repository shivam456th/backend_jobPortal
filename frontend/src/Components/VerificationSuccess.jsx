import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const VerificationSuccess = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white p-8">
      <div className="w-full max-w-md text-center">
        <FiCheckCircle className="text-blue-500 text-6xl mb-4 mx-auto" />
        <h2 className="text-3xl font-bold mb-6 text-blue-500">
          Verification Successful!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Your account has been successfully verified. You can now log in with
          your new password.
        </p>
        <Link
          to="/signin"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-block"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default VerificationSuccess;
