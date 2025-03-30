import React from 'react';
import { Camera } from 'lucide-react';

function PlanCard({ title, price, features }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-800 hover:border-blue-500 transition-all">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
        <Camera className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
      </div>
      
      <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-xs md:text-sm text-gray-400">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
            <span className="break-words">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-baseline mb-4 md:mb-6">
        <span className="text-xl md:text-2xl font-bold text-white">${price}</span>
        <span className="text-xs md:text-sm text-gray-400 ml-2">/ Per Month</span>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm md:text-base">
        Add to Cart
      </button>
    </div>
  );
}

function HomePage3() {
  const plans = [
    {
      title: 'Starter',
      price: 50.00,
      features: [
        'Predefined style system',
        'Post 1 job edit your job listings see job posting stats'
      ]
    },
    {
      title: 'Professional',
      price: 20.00,
      features: [
        'Predefined style system',
        'Post 1 job edit your job listings see job posting stats'
      ]
    },
    {
      title: 'Business',
      price: 99.00,
      features: [
        'Predefined style system',
        'Post 1 job edit your job listings see job posting stats'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Different plans for different needs
          </h1>
          <p className="text-gray-400 text-sm md:text-base lg:text-lg">
            He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-sm md:max-w-none mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage3;