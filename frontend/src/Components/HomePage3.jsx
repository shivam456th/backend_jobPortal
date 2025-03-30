import React from 'react';
import { Camera } from 'lucide-react';

function StepItem({ number, title }) {
  return (
    <div className="flex items-center space-x-3 md:space-x-4 group cursor-pointer">
      <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 group-hover:border-blue-500 transition-all">
        <span className="text-gray-400 text-xs md:text-sm">{number}</span>
      </div>
      <span className="text-white text-base md:text-lg font-medium">{title}</span>
    </div>
  );
}

function HomePage3() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                It's easy to find<br className="hidden md:block" /> someone
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-md">
                For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6 md:space-y-8 mt-8 md:mt-12">
              <StepItem number="01" title="First of all build a strong profile" />
              <StepItem number="02" title="Discover job you have" />
              <StepItem number="03" title="Apply direct to terms" />
              <StepItem number="04" title="You can direct knock" />
            </div>
          </div>

          {/* Right Column - Image and Stats */}
          <div className="relative mt-8 lg:mt-0">
            {/* Stats Card */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white p-4 md:p-6 rounded-lg z-10">
              <div className="text-2xl md:text-3xl font-bold">5M+</div>
              <div className="text-xs md:text-sm opacity-90">User worldwide</div>
            </div>

            {/* Main Image */}
            <div className="relative">
              <div className="bg-[#98E2D7] rounded-xl md:rounded-2xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Profile"
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                />
              </div>

              {/* Congratulation Card */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 p-3 md:p-4 rounded-lg border border-gray-800 flex items-center space-x-3 w-max max-w-[90vw] lg:max-w-none">
                <img 
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Avatar"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                />
                <div className="space-y-0.5 md:space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm md:text-base">Congratulation</span>
                    <div className="w-4 h-4 text-green-500">
                      <Camera className="w-full h-full" />
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 whitespace-normal">Your profile was created successfully</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage3;