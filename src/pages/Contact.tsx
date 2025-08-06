import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight, CheckCircle, Star, Zap, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Announcement Badge */}
            <div className="mb-8 animate-slide-in-down">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 backdrop-blur-sm">
                <MessageCircle className="h-4 w-4 mr-2 animate-pulse-glow" />
                Let's Connect
                <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </div>
            
            {/* Main Headline */}
            <div className="animate-slide-in-up stagger-1">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="gradient-text text-shadow">Contact</span>
                <br />
                <span className="gradient-text-secondary text-shadow">CharityFlow</span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="animate-slide-in-up stagger-2">
              <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
                We'd love to hear from you. Whether you have questions, feedback, or partnership opportunities, 
                our team is here to help you make a meaningful impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form and Info */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <div className="animate-slide-in-left">
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold mb-6">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  <span className="gradient-text text-shadow">Get in Touch</span>
                </h2>
                <p className="text-slate-300 text-lg">
                  Ready to make a difference? We're here to help you start your impact journey.
                </p>
              </div>
              
              {success && (
                <div className="card p-6 rounded-2xl mb-8 border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-slide-in-up">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <div>
                      <div className="text-green-300 font-semibold">Message Sent Successfully!</div>
                      <div className="text-green-400/80 text-sm">We'll get back to you within 24 hours.</div>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="animate-slide-in-up stagger-1">
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="animate-slide-in-up stagger-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="animate-slide-in-up stagger-3">
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-300 mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                    placeholder="What can we help you with?"
                  />
                </div>
                
                <div className="animate-slide-in-up stagger-4">
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry, feedback, or how we can collaborate..."
                  />
                </div>
                
                <div className="animate-slide-in-up stagger-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Send className={`h-5 w-5 transition-transform duration-300 ${loading ? 'animate-pulse-glow' : 'group-hover:translate-x-1'}`} />
                    <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                    {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />}
                  </button>
                </div>
              </form>
            </div>

            {/* Enhanced Contact Information */}
            <div className="animate-slide-in-right">
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
                  <Star className="h-4 w-4 mr-2" />
                  Get In Touch
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  <span className="gradient-text-secondary text-shadow">Contact Info</span>
                </h2>
                <p className="text-slate-300 text-lg">
                  Multiple ways to reach our dedicated support team.
                </p>
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="card p-6 rounded-3xl card-hover group animate-slide-in-up stagger-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                      <Mail className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-2">Email</h3>
                      <p className="text-cyan-300 font-medium">support@charityflow.com</p>
                      <p className="text-slate-400 text-sm">For general inquiries and support</p>
                      <p className="text-cyan-300 font-medium mt-1">partnerships@charityflow.com</p>
                      <p className="text-slate-400 text-sm">For partnership opportunities</p>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 rounded-3xl card-hover group animate-slide-in-up stagger-2">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-green-500/50 transition-all duration-300">
                      <Phone className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300 mb-2">Phone</h3>
                      <p className="text-green-300 font-medium">+1 (555) 123-4567</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <p className="text-slate-400 text-sm">Monday - Friday, 9AM - 6PM EST</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 rounded-3xl card-hover group animate-slide-in-up stagger-3">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                      <MapPin className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 mb-2">Address</h3>
                      <p className="text-purple-300 font-medium">CharityFlow Global HQ</p>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        123 Innovation Drive<br />
                        Tech City, TC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced FAQ Section */}
              <div className="animate-slide-in-up stagger-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-semibold mb-6">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Answers
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="card p-6 rounded-2xl card-hover group">
                    <h4 className="font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-2">
                      How secure are my donations?
                    </h4>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      We use military-grade encryption and blockchain technology to protect all transactions and personal data.
                    </p>
                  </div>
                  
                  <div className="card p-6 rounded-2xl card-hover group">
                    <h4 className="font-bold text-white group-hover:text-green-300 transition-colors duration-300 mb-2">
                      Can I track my donation impact?
                    </h4>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      Absolutely! View real-time impact reports and track exactly how your donations create change in your profile dashboard.
                    </p>
                  </div>
                  
                  <div className="card p-6 rounded-2xl card-hover group">
                    <h4 className="font-bold text-white group-hover:text-purple-300 transition-colors duration-300 mb-2">
                      What's the minimum donation amount?
                    </h4>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      Just $0.01! We believe every contribution, no matter the size, can create meaningful impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;