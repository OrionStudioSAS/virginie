
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Locations } from './components/Locations';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { Impedance } from './components/Impedance';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Impedance />
        <Locations />
        <Testimonials />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;
