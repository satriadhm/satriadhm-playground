'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, Send, ArrowUp } from 'lucide-react';
import { personalInfo } from '@/constants/data';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically integrate with a service like EmailJS, Formspree, etc.
    console.log('Form submitted:', { email, message });
    
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
    
    // Show success message (you could use a toast library here)
    alert('Thanks for reaching out! I\'ll get back to you soon.');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto container-padding section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Let&apos;s Connect</h3>
              <p className="text-slate-400 leading-relaxed">
                Always open to discussing new opportunities, interesting projects, 
                or just having a good conversation about technology and software engineering.
              </p>
            </div>
            
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors group"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
                <span>{personalInfo.email}</span>
              </a>
              
              <div className="flex space-x-4 pt-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-3 bg-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Hi Glorious! I'd love to discuss..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 disabled:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto container-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-center md:text-left">
              <span>© {currentYear} {personalInfo.name}. Built with Next.js & TypeScript</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-sm text-slate-400">
                Professional Portfolio
              </div>
              
              <button
                onClick={scrollToTop}
                className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all hover:scale-110"
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}