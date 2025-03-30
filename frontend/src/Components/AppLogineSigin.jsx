import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "./Signup";
import VerificationFailed from "./VerificationFailed";
import VerificationSuccess from "./VerificationSuccess";
import Login from "./Login";
import Forgot from "./Forgot";
import Verify from "./Verify";
import ResetPassword from "./ResetPassword";
import JobBoard from "./JobBoard";
import JobPortalLanding from "./JobPortalLanding";
import Navbar from "./Navbar"; // Import Navbar
import { EmailProvider } from "./Context";
import HomePage from "./HomePage";
import Profile from "./Profile";
import About from "./About/About";
import Employee from "./Employee";
import Profile2 from "./CompanyProfile";
import Employer from "./Employer";
import Create_job from "./Create_job";
import ProfileRecuter from "./ProfileRecuter";
import AppliedJob from "./AppliedJob";
import CompanyProfile from "./CompanyProfile";

const AppLogineSigin = () => {
  return (
    <EmailProvider>
      <div className="">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Navbar will be displayed on all pages */}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mail-verified-successfully"
            element={<VerificationSuccess />}
          />
          <Route
            path="/mail-verified-failed"
            element={<VerificationFailed />}
          />
          <Route path="/signin" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/CompanyProfile" element={<CompanyProfile/>} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/role" element={<JobBoard />} />
          <Route path="/RecuterDashboard/CreateJob" element={<Employer/>} />
          <Route path="/RecuterDashboard/profile" element={<CompanyProfile/>} />
          <Route path="/job" element={<JobBoard/>} />
          <Route path="/createJob" element={<Create_job/>} />
          <Route path="/about" element={<About />} />
          <Route path="/dash" element={<JobPortalLanding  />} />
          <Route path="/applied-job" element={<AppliedJob/>} />
        </Routes>
      </div>
    </EmailProvider>
  );
};

export default AppLogineSigin;
