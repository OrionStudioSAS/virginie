import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, SQUARE_LOGO } from '../constants';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          {/* Square Logo Placeholder */}
          <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border-2 border-white">
            <img src={SQUARE_LOGO} alt="Logo" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-bold text-slate-900 leading-none">
              Virginie Mazaud
            </span>
            <span className="text-primary text-sm font-medium tracking-wide">
              Diététicienne Nutritionniste
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.targetId}
              onClick={() => scrollToSection(item.targetId)}
              className="text-slate-600 hover:text-primary font-medium transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <a 
            href="https://www.doctolib.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2.5 rounded-full hover:bg-rose-600 transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm font-semibold"
          >
            Prendre RDV
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-primary transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 transition-all duration-300 ease-in-out origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden'}`}>
        <div className="flex flex-col p-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.targetId}
              onClick={() => scrollToSection(item.targetId)}
              className="text-left text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-50 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <a 
            href="https://www.doctolib.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-white px-4 py-3 rounded-lg text-center font-semibold mt-4 shadow-md"
          >
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </nav>
  );
};