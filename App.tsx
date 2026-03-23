
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Locations } from './components/Locations';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { Impedance } from './components/Impedance';
import { BlogPreview } from './components/BlogPreview';
import ReviewModal from './components/ReviewModal';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';

const HomePage: React.FC<{ onOpenReview: () => void }> = ({ onOpenReview }) => (
  <div className="min-h-screen flex flex-col font-sans">
    <Navbar />
    <main className="flex-grow">
      <Hero />
      <About />
      <Impedance />
      <Locations />
      <BlogPreview />
      <Testimonials onOpenReview={onOpenReview} />
      <Contact onOpenReview={onOpenReview} />
      <FAQ />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  const [openReviewModal, setOpenReviewModal] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onOpenReview={() => setOpenReviewModal(true)} />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ReviewModal open={openReviewModal} onClose={() => setOpenReviewModal(false)} />
    </>
  );
};

export default App;
