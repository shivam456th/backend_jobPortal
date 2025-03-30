import React from 'react';

function StarRating() {
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ name, role, image, quote }) {
  return (
    <div className="bg-[#1A1A1F] p-6 rounded-lg">
      <StarRating />
      <p className="text-gray-300 mb-6 min-h-[100px]">"{quote}"</p>
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="container mx-auto px-4 md:py-20 pb-16 text-center">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do.
        </p>
      </div>

      {/* Image Grid */}
      <div className="container mx-auto px-4 grid grid-cols-4 gap-8 mb-20">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
          alt="Work setup"
          className="rounded-lg w-full aspect-square object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&w=800"
          alt="Creative work"
          className="rounded-lg w-full aspect-square object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800"
          alt="Remote work"
          className="rounded-lg w-full aspect-square object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800"
          alt="Modern workspace"
          className="rounded-lg w-full aspect-square object-cover"
        />
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 grid grid-cols-2 gap-16 mb-20">
        <div>
          <h2 className="text-2xl font-bold mb-4">Mission</h2>
          <p className="text-gray-400">
            Rooms oh fully taken by worse do. Points afraid but may end law lasted. Was out laughter raptures returned outweigh.
            Luckily cheered colonel I do we attack highest enabled.
            <br /><br />
            Tried law yet style child. The bore of true of no be deal.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Vision</h2>
          <p className="text-gray-400">
            Luckily cheered colonel I do we attack highest enabled.
          </p>
          <ul className="text-gray-400 mt-4 space-y-2">
            <li>• Yet uncommonly his ten.</li>
            <li>• Exercise joy man children.</li>
            <li>• Demesne new manners savings.</li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 grid grid-cols-3 gap-8 text-center mb-20">
        <div>
          <h3 className="text-5xl font-bold mb-2">2M</h3>
          <p className="text-gray-400">2 million daily active users</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold mb-2">8k</h3>
          <p className="text-gray-400">Over 8k open job positions</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold mb-2">15M</h3>
          <p className="text-gray-400">Over 15 million stories shared</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-4xl font-bold mb-12">Testimonial</h2>
        <p className="text-gray-400 mb-12 max-w-2xl">
          For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TestimonialCard
            name="Carolyn Ortiz"
            role="Product Designer"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150"
            quote="Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to wider valley young in spring."
          />
          <TestimonialCard
            name="Samuel Bishop"
            role="Marketing Lead"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150"
            quote="Ducimus qui, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure."
          />
          <TestimonialCard
            name="Lori Stevens"
            role="Software Engineer"
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150"
            quote="On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms."
          />
          <TestimonialCard
            name="Bryan Knight"
            role="UX Designer"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150"
            quote="Supposing so be resolving breakfast am or perfectly. It drew a hill from me. Valley by oh twenty direct me so."
          />
        </div>
      </div>
    </div>
  );
}

export default About;