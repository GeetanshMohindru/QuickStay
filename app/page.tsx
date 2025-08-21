'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Users, TrendingUp, Shield, ChevronLeft, ChevronRight } from 'lucide-react'

export default function QuickStayLanding() {
// HeroCarousel component
const HeroCarousel = () => {
  const originalSlides = [
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QuickStay%20Mockups-7-1HaAFSwRgLL1ja1kHPFEWaMS6rJM2H.png", alt: "QuickStay Dashboard" }, // QuickStay Mockups-7.png
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QuickStay%20Mockups-8-bBsgz1wMgCu9yREzuFYCbjw2oEiGiW.png", alt: "QuickStay My Properties" }, // QuickStay Mockups-8.png
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QuickStay%20Mockups-9-tv60aVLjWESNsenOlTNr3n0zVy4CwX.png", alt: "QuickStay All Tenants" }, // QuickStay Mockups-9.png
  ];

  // Duplicate slides for infinite loop effect (e.g., [last, original, first])
  // For 3 slides, we need to duplicate one from each end to make it seamless
  const slides = [
    originalSlides[originalSlides.length - 1], // Last slide
    ...originalSlides,
    originalSlides[0] // First slide
  ];

  const realStartIndex = 1; // Index of the first original slide in `slides`
  const realEndIndex = realStartIndex + originalSlides.length - 1; // Index of the last original slide

  const [currentSlide, setCurrentSlide] = useState(realStartIndex); // Start at the first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(realStartIndex + index); // Go to the corresponding real slide
  };

  const nextSlide = () => {
    let next = currentSlide + 1;
    if (next > realEndIndex) {
      setIsTransitioning(true); // Ensure transition is on for the last step
      setCurrentSlide(next);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(realStartIndex);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500); // Match transition duration
    } else {
      setIsTransitioning(true);
      setCurrentSlide(next);
    }
  };

  const prevSlide = () => {
    let prev = currentSlide - 1;
    if (prev < realStartIndex) {
      setIsTransitioning(true); // Ensure transition is on for the last step
      setCurrentSlide(prev);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(realEndIndex);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500); // Match transition duration
    } else {
      setIsTransitioning(true);
      setCurrentSlide(prev);
    }
  };

  const getSlideStyle = (index: number) => {
    const totalDisplaySlides = slides.length;
    
    // Calculate the distance from the current slide, considering circularity
    let distance = index - currentSlide;

    // Adjust distance for circularity (shortest path)
    if (distance > totalDisplaySlides / 2) {
      distance -= totalDisplaySlides;
    } else if (distance < -totalDisplaySlides / 2) {
      distance += totalDisplaySlides;
    }

    const absDistance = Math.abs(distance);

    let scale = 1;
    let opacity = 1;
    let zIndex = 1;
    let translateXOffset = 0;

    // Define scaling and positioning based on distance from currentSlide
    if (absDistance === 0) {
      scale = 1.1; // Main image is slightly bigger
      zIndex = 10;
      translateXOffset = 0;
    } else if (absDistance === 1) {
      scale = 0.9; // Adjacent images are smaller
      zIndex = 5;
      translateXOffset = distance * 220; // Adjust this value for spacing and overlap
    } else if (absDistance === 2) {
      scale = 0.7; // Further images are even smaller
      zIndex = 2;
      opacity = 0.7;
      translateXOffset = distance * 350; // Adjust this value for spacing and overlap
    } else {
      // For images far away, make them very small or completely transparent
      scale = 0.5;
      opacity = 0;
      zIndex = 1;
      translateXOffset = distance * 450; // Push far away
    }

    return {
      transform: `translateX(-50%) translateX(${translateXOffset}px) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      position: 'absolute',
      left: '50%',
      top: '50%', // Center vertically
      transformOrigin: 'center center',
      transition: isTransitioning ? 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out' : 'none',
      marginTop: '-200px', // Half of the image height (approx 400px) to center it vertically
    };
  };

  return (
    <div className="relative w-full max-w-3xl md:max-w-4xl mx-auto h-[450px] overflow-hidden"> {/* Adjusted max-w and added height */}
      <div className="relative w-full h-full"> {/* Inner container for absolute positioning */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={getSlideStyle(index)}
          >
            <img
              src={slide.src || "/placeholder.svg"}
              alt={slide.alt}
              className="w-[250px] h-auto" // Fixed width for phone mockups
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
      
      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2 absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        {originalSlides.map((_, index) => ( // Map over originalSlides for dots
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === (currentSlide - realStartIndex + originalSlides.length) % originalSlides.length ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ExploreCarousel component (remains unchanged from previous turn)
const ExploreCarousel = () => {
  const originalSlides = [
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1-nhdx21zCzQtAIjA5gzuM4Tq4NLc48L.png", alt: "QuickStay Dashboard" }, // Untitled-1.png
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-3-rXD5ytE1ehioL7VJQLuqF9Kv1dUaGf.png", alt: "QuickStay My Properties" }, // Untitled-3.png
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2-zFwSqhZYKJrv34dSLVujvaEBjx0GE3.png", alt: "QuickStay Tenant Profile" }, // Untitled-2.png
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-5-toyRgMOeDDJn4yC3yfwSRvcSm41cwU.png", alt: "QuickStay All Tenants" }, // Untitled-5.png
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-4-GQldVu5P99wSRHSGjTHZAKIYMPS37F.png", alt: "QuickStay Property Details" }, // Untitled-4.png
  ];

  // Duplicate slides for infinite loop effect (e.g., [last2, original, first2])
  const slides = [
    ...originalSlides.slice(-2),
    ...originalSlides,
    ...originalSlides.slice(0, 2)
  ];

  const realStartIndex = 2; // Index of the first original slide in `slides`
  const realEndIndex = realStartIndex + originalSlides.length - 1; // Index of the last original slide

  const [currentSlide, setCurrentSlide] = useState(realStartIndex); // Start at the first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      let next = currentSlide + 1;
      if (next > realEndIndex) {
        setIsTransitioning(false); // Disable transition for the jump
        setCurrentSlide(realStartIndex); // Jump back to the first real slide
        setTimeout(() => setIsTransitioning(true), 50); // Re-enable transition after a tiny delay
      } else {
        setIsTransitioning(true);
        setCurrentSlide(next);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length, realStartIndex, realEndIndex]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(realStartIndex + index); // Go to the corresponding real slide
  };

  const nextSlide = () => {
    let next = currentSlide + 1;
    if (next > realEndIndex) {
      setIsTransitioning(true); // Ensure transition is on for the last step
      setCurrentSlide(next);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(realStartIndex);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500); // Match transition duration
    } else {
      setIsTransitioning(true);
      setCurrentSlide(next);
    }
  };

  const prevSlide = () => {
    let prev = currentSlide - 1;
    if (prev < realStartIndex) {
      setIsTransitioning(true); // Ensure transition is on for the last step
      setCurrentSlide(prev);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(realEndIndex);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500); // Match transition duration
    } else {
      setIsTransitioning(true);
      setCurrentSlide(prev);
    }
  };

  const getSlideStyle = (index: number) => {
    const totalDisplaySlides = slides.length;
    
    // Calculate the distance from the current slide, considering circularity
    let distance = index - currentSlide;

    // Adjust distance for circularity (shortest path)
    if (distance > totalDisplaySlides / 2) {
      distance -= totalDisplaySlides;
    } else if (distance < -totalDisplaySlides / 2) {
      distance += totalDisplaySlides;
    }

    const absDistance = Math.abs(distance);

    let scale = 1;
    let opacity = 1;
    let zIndex = 1;
    let translateXOffset = 0;

    // Define scaling and positioning based on distance from currentSlide
    if (absDistance === 0) {
      scale = 1.1; // Main image is slightly bigger
      zIndex = 10;
      translateXOffset = 0;
    } else if (absDistance === 1) {
      scale = 0.9; // Adjacent images are smaller
      zIndex = 5;
      translateXOffset = distance * 220; // Increased from 180 for more spacing
    } else if (absDistance === 2) {
      scale = 0.7; // Further images are even smaller
      zIndex = 2;
      opacity = 0.7;
      translateXOffset = distance * 350; // Increased from 280 for more spacing
    } else {
      // For images far away, make them very small or completely transparent
      scale = 0.5;
      opacity = 0;
      zIndex = 1;
      translateXOffset = distance * 450; // Increased from 350 to push far away
    }

    return {
      transform: `translateX(-50%) translateX(${translateXOffset}px) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      position: 'absolute',
      left: '50%',
      top: '50%', // Center vertically
      transformOrigin: 'center center',
      transition: isTransitioning ? 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out' : 'none',
      marginTop: '-200px', // Half of the image height (approx 400px) to center it vertically
    };
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[450px] overflow-hidden"> {/* Adjusted max-w and added height */}
      <div className="relative w-full h-full"> {/* Inner container for absolute positioning */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={getSlideStyle(index)}
          >
            <img
              src={slide.src || "/placeholder.svg"}
              alt={slide.alt}
              className="w-[250px] h-auto" // Fixed width for phone mockups
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
      
      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2 absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        {originalSlides.map((_, index) => ( // Map over originalSlides for dots
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === (currentSlide - realStartIndex + originalSlides.length) % originalSlides.length ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

return (
  <div className="min-h-screen bg-rose-50">
    {/* Header */}
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2">
        <img src="/quickstay-logo.png" alt="QuickStay Logo" className="w-8 h-8" />
        <span className="font-semibold text-gray-900">QuickStay</span>
      </div>
      <Button className="bg-red-600 hover:bg-red-700 text-white px-6">Download</Button>
    </header>

    {/* Hero Section */}
    <section className="px-6 py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Manage your rental
          <br />
          property with ease!
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamline your property management with our comprehensive platform designed for modern landlords and
          property managers.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" />
            App Store
          </Button>
          <Button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" />
            Google Play
          </Button>
        </div>

        {/* Interactive Carousel */}
        <HeroCarousel />
      </div>
    </section>

    {/* Property Management Section */}
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 mb-4">Property Management</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Manage everything with
            <br />
            ease and accuracy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left side features */}
          <div className="col-span-full md:col-span-3 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Smart Coliving</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Comfort, Convenience, Hassle-free.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Fully Furnished</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Stays for modern professionals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Staff Management</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Manage Coliving/PG/Flat/Hostel.
                </p>
              </div>
            </div>
          </div>

          {/* Center image */}
          <div className="col-span-full md:col-span-6 flex justify-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/section2-zNESz6eUp4CxgoLocIfS7UuYtYp44H.png" 
              alt="Property Management Mobile Apps" 
              className="w-full max-w-md h-auto"
            />
          </div>

          {/* Right side features */}
          <div className="col-span-full md:col-span-3 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Star className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Check Rent</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Tenants, Property, Reminders.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Download className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Payment History</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Track all transactions and dues.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Tenant Profile</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Complete tenant information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Tenant Section */}
    <section className="px-6 py-16 bg-red-600 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Are you a tenant?</h2>
            <p className="text-red-100 mb-8 text-lg">
              Download our tenant app to pay rent, submit maintenance requests, and communicate with your landlord
              seamlessly.
            </p>
            <div className="flex gap-4">
              <Button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                App Store
              </Button>
              <Button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Google Play
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <img 
              src="/section3.png" 
              alt="QuickStay Tenant App Store Listings" 
              className="w-full max-w-lg h-auto"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Journey Section */}
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img 
              src="/section4.png" 
              alt="QuickStay Smart App Store" 
              className="w-full max-w-lg h-auto"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your Journey to Smarter
              <br />
              Property Management
              <br />
              Starts Here!
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of property managers who have transformed their business with QuickStay. Start your free
              trial today.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">Get Started</Button>
          </div>
        </div>
      </div>
    </section>

    {/* Income Section */}
    <section className="px-6 py-16 bg-gradient-to-r from-purple-100 to-orange-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Handle your rental income
              <br />
              the smart way
            </h2>
            <p className="text-gray-600 mb-8">
              Automate rent collection, track payments, and generate financial reports with ease. Never miss a payment
              again.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">Learn More</Button>
          </div>

          <div className="flex justify-center">
            <img 
              src="/section5.png" 
              alt="Rental Income Management Interface" 
              className="w-full max-w-2xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Fill Rooms Section */}
    <section className="px-6 py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-80 h-96 bg-white rounded-3xl shadow-xl p-4">
              <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl p-4">
                <div className="space-y-4">
                  <div className="h-6 bg-blue-200 rounded w-2/3"></div>
                  <div className="h-32 bg-white rounded-lg shadow-sm"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 bg-white rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Fill Rooms Fast, Earn
              <br />
              Faster!
            </h2>
            <p className="text-gray-600 mb-8">
              List your properties on multiple platforms simultaneously and find quality tenants quickly with our
              integrated marketing tools.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">Start Listing</Button>
          </div>
        </div>
      </div>
    </section>

    {/* Control Section */}
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Take control of your
              <br />
              Property, Staff and
              <br />
              Tenants
            </h2>
            <p className="text-gray-600 mb-8">
              Comprehensive management tools that give you complete oversight of your property portfolio, staff
              performance, and tenant relationships.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">Get Started</Button>
          </div>

          <div className="flex justify-center">
            <img 
              src="/section7.png" 
              alt="Property Staff and Tenant Control Interface" 
              className="w-full max-w-2xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Tenant Management Section */}
    <section className="px-6 py-16 bg-red-600 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img 
              src="/section8.png" 
              alt="Tenant Management Mobile Interface" 
              className="w-full max-w-md h-auto"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Tenant Management
              <br />
              Made Easy
            </h2>
            <p className="text-red-100 mb-8">
              Streamline tenant communications, track lease agreements, and manage all tenant-related activities from
              one central dashboard.
            </p>
            <Button className="bg-black text-white px-8 py-3">Learn More</Button>
          </div>
        </div>
      </div>
    </section>

    {/* Market Section */}
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Market Your Property
              <br />
              Like a Pro
            </h2>
            <p className="text-gray-600 mb-8">
              Professional listing tools, high-quality photo management, and multi-platform distribution to maximize
              your property's visibility.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">Start Marketing</Button>
          </div>

          <div className="flex justify-center">
            <img 
              src="/section9.png" 
              alt="Property Marketing Interface" 
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Download Section */}
    <section className="px-6 py-16 bg-red-600 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Download QuickStay
              <br />
              Smart!
            </h2>
            <p className="text-red-100 mb-8">
              Get the complete property management solution in your pocket. Available for iOS and Android devices.
            </p>
            <div className="flex gap-4">
              <Button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                App Store
              </Button>
              <Button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Google Play
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <div className="w-64 h-96 bg-white rounded-3xl shadow-xl p-4">
              <div className="w-full h-full bg-gradient-to-b from-red-50 to-red-100 rounded-2xl"></div>
            </div>
            <div className="w-64 h-96 bg-white rounded-3xl shadow-xl p-4 transform translate-y-8">
              <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Explore Section */}
    <section className="px-6 py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Explore QuickStay Smart!</h2>

        {/* New Carousel for Explore Section */}
        <ExploreCarousel />

        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 mt-12">Get Started Today</Button>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-semibold">QuickStay</span>
            </div>
            <p className="text-gray-400 text-sm">
              The complete property management solution for modern landlords and property managers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Features</li>
              <li>Pricing</li>
              <li>Security</li>
              <li>Updates</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Download</h3>
            <div className="space-y-3">
              <Button className="bg-black text-white px-4 py-2 text-sm w-full">
                <Download className="w-4 h-4 mr-2" />
                App Store
              </Button>
              <Button className="bg-black text-white px-4 py-2 text-sm w-full">
                <Download className="w-4 h-4 mr-2" />
                Google Play
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2024 QuickStay. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Policy</span>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
)
}
