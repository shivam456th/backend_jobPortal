import React, { useState } from 'react';
import { Building2, UserCircle2, Camera } from 'lucide-react';
import { FiMapPin } from "react-icons/fi";
import { IoBriefcaseOutline, IoCallOutline } from "react-icons/io5";
import { CiCalendar, CiMail, CiEdit } from "react-icons/ci";
import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const JobBoard = () => {
  const data = [
    { icon: FiMapPin, text: 'Dehradun, INDIA' },
    { icon: IoBriefcaseOutline, text: "Fresher" },
    { icon: CiCalendar, text: "Add availability to join" },
    { icon: IoCallOutline, text: "9639230792" },
    { icon: CiMail, text: "shivamt...@gmail.com" },
  ];

  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate()

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-[#000000] md:pt-20 sm:pt-[4rem] sm:p-8">
      {/* Sidebar */}
      <span onClick={()=>navigate(-1)} className='text-white text-4xl fixed right-0 cursor-pointer'><IoIosArrowForward /></span>

        {/* <span onClick={()=>navigate(+1)} className='text-white'><IoIosArrowForward /></span> */}
      <div className="fixed w-16 ml-[-1.9rem] md:ml-[-8rem] md:w-64 h-full bg-[#111827] text-white">
        <span onClick={()=>navigate(-1)} className='text-white text-4xl cursor-pointer'><IoIosArrowBack /></span>
        <SideBar />
      </div>

      {/* Profile Card */}
      <div className="">
      <div className="px-9 my-10 ml-[2rem] md:ml-[8rem] w-full sm:h-72 md:h-96 text-black rounded-xl flex justify-center items-center">
        <div className="my-6 bg-white mx-6 w-full h-[90%] rounded-xl shadow-md shadow-black md:px-3 flex items-center justify-between">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profileImage || "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* User Info */}
          <div className="text-black w-[80%] h-full py-20 px-2">
            <p className="text-xl flex items-center gap-2">
              Shivam Thapa <Link to='/profile' className="cursor-pointer"><CiEdit /></Link>
            </p>
            <p className="text-sm font-light">Profile last updated - 29 Nov, 2024</p>
            <div className="sm:w-[24rem] md:w-[30rem] py-2 px-1 grid grid-cols-2 gap-5">
              {data.map((item, index) => (
                <div key={index} className="leading-loose">
                  <p className="flex sm:text-sm md:text-base flex-wrap items-center gap-2">
                    <span><item.icon /></span> {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default JobBoard;
