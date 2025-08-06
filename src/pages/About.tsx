import React from 'react';
import { Heart, Users, Globe, Shield, Target, Award, Zap, CheckCircle, Star, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Announcement Badge */}
            <div className="mb-8 animate-slide-in-down">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 backdrop-blur-sm">
                <Heart className="h-4 w-4 mr-2 animate-pulse-glow" />
                Our Story & Mission
                <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </div>
            
            {/* Main Headline */}
            <div className="animate-slide-in-up stagger-1">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="gradient-text text-shadow">About</span>
                <br />
                <span className="gradient-text-secondary text-shadow">CharityFlow</span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="animate-slide-in-up stagger-2">
              <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
                We're revolutionizing charitable giving through innovative technology, making it accessible, 
                transparent, and impactful for everyone, everywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20 animate-slide-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
              <Target className="h-4 w-4 mr-2" />
              Our Core Values
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text-secondary text-shadow">Our Mission</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              We believe everyone has the power to create meaningful change. CharityFlow connects generous hearts 
              with impactful causes, making philanthropy accessible and transparent for all
            </p>
          </div>
          
          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-1">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-red-500/50 transition-all duration-300">
                  <Heart className="h-10 w-10 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-red-400/10 rounded-3xl blur-xl group-hover:bg-red-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-red-300 transition-colors duration-300">
                Compassion
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                We believe in the transformative power of human kindness and empathy to create positive change
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-2">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300">
                  <Shield className="h-10 w-10 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-blue-400/10 rounded-3xl blur-xl group-hover:bg-blue-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">
                Trust
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                We maintain the highest standards of transparency and security in all our operations and partnerships
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-3">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-violet-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                  <Users className="h-10 w-10 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-purple-400/10 rounded-3xl blur-xl group-hover:bg-purple-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                Community
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                We foster a global community of changemakers working together for the common good and shared impact
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-4">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-emerald-500/50 transition-all duration-300">
                  <Globe className="h-10 w-10 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-emerald-400/10 rounded-3xl blur-xl group-hover:bg-emerald-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300">
                Global Impact
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                We focus on creating measurable, lasting impact that transforms communities worldwide
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Story Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-yellow-500/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-orange-500/6 rounded-full blur-3xl animate-float stagger-3"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-slide-in-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-semibold mb-6">
                <Star className="h-4 w-4 mr-2" />
                Our Journey
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="gradient-text-accent text-shadow">Our Story</span>
              </h2>
            </div>
            
            <div className="card p-12 rounded-3xl animate-slide-in-up stagger-1">
              <div className="text-lg text-slate-300 space-y-8 leading-relaxed">
                <p className="text-xl text-slate-200 font-medium">
                  CharityFlow was founded in 2024 with a revolutionary vision: to democratize charitable giving 
                  and make meaningful impact accessible to everyone, regardless of background or contribution size.
                </p>
                <p>
                  Our founders recognized that while millions of people want to create positive change, they often face 
                  barriers such as lack of trust in organizations, uncertainty about impact transparency, or simply 
                  not knowing where to begin their philanthropic journey.
                </p>
                <p>
                  Today, CharityFlow serves as the bridge between generous hearts and transformative causes, providing 
                  a secure, transparent platform where every contribution—no matter how small—creates measurable, 
                  lasting change in communities worldwide.
                </p>
                <p className="text-cyan-300 font-medium">
                  We're proud to have facilitated millions in donations and built a thriving community of 
                  compassionate changemakers committed to building a better world for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Commitment Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 text-green-300 text-sm font-semibold mb-6">
              <Award className="h-4 w-4 mr-2" />
              Our Promise
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text text-shadow">Our Commitment</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              We're committed to maintaining the highest standards of transparency, security, and impact measurement 
              to ensure your generosity creates real, lasting change
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-1">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                  <Zap className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl blur-xl group-hover:bg-cyan-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                100% Transparency
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                Every donation is tracked and reported in real-time, so you know exactly where your money goes and the impact it creates
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-2">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-green-500/50 transition-all duration-300">
                  <Shield className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-green-400/10 rounded-2xl blur-xl group-hover:bg-green-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors duration-300">
                Secure Platform
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                We use industry-leading security measures and encryption to protect your personal information and financial data
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-3">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                  <Globe className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-purple-400/10 rounded-2xl blur-xl group-hover:bg-purple-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                Global Impact
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                Supporting causes and communities around the world, making global humanitarian impact accessible to everyone
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;