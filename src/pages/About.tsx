import React from 'react';
import { Heart, Users, Globe, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About CharityApp</h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              We're on a mission to make charitable giving accessible, transparent, and impactful for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that everyone has the power to make a difference. CharityApp connects generous hearts 
              with meaningful causes, making it easier than ever to contribute to positive change in the world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compassion</h3>
              <p className="text-gray-600">
                We believe in the power of human kindness and empathy to create positive change.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust</h3>
              <p className="text-gray-600">
                We maintain the highest standards of transparency and security in all our operations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                We foster a global community of donors working together for common good.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p className="text-gray-600">
                We focus on creating measurable, lasting impact in communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                CharityApp was founded in 2024 with a simple yet powerful vision: to democratize charitable giving 
                and make it accessible to everyone, regardless of their background or the size of their contribution.
              </p>
              <p>
                Our founders recognized that while many people want to help others, they often face barriers such as 
                lack of trust in organizations, uncertainty about where their money goes, or simply not knowing where to start.
              </p>
              <p>
                Today, CharityApp serves as a bridge between generous donors and impactful causes, providing a secure, 
                transparent platform where every contribution, no matter how small, can make a meaningful difference.
              </p>
              <p>
                We're proud to have facilitated thousands of donations and helped build a community of compassionate 
                individuals committed to making the world a better place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to maintaining the highest standards of transparency, security, and impact measurement 
              to ensure your generosity creates real, lasting change.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">100% Transparency</h3>
              <p className="text-gray-600">
                Every donation is tracked and reported, so you know exactly where your money goes and the impact it creates.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-gray-600">
                We use industry-leading security measures to protect your personal information and financial data.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-gray-600">
                Supporting causes and communities around the world, making global impact accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;