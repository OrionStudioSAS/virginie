
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
import { NewsPreview } from './components/NewsPreview';
import ReviewModal from './components/ReviewModal';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import NewsList from './pages/NewsList';
import NewsPost from './pages/NewsPost';
import Admin from './pages/Admin';
import Seo from './components/Seo';

const HomePage: React.FC<{ onOpenReview: () => void }> = ({ onOpenReview }) => (
  <div className="min-h-screen flex flex-col font-sans">
    <Seo
      title="Virginie Lelong | Diététicienne Nutritionniste Melun & Corbeil-Essonnes"
      description="Diététicienne nutritionniste à Melun et Corbeil-Essonnes, Virginie Lelong Mazaud propose bilans impédancemétriques, suivi personnalisé et programmes sur-mesure."
      canonical="/"
      ogType="website"
    />
    <Navbar />
    <main className="flex-grow">
      <Hero />
      <About />
      <Impedance />
      <Locations />
      <BlogPreview />
      <NewsPreview />
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
        <Route path="/actualites" element={<NewsList />} />
        <Route path="/actualites/:slug" element={<NewsPost />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ReviewModal open={openReviewModal} onClose={() => setOpenReviewModal(false)} />
    </>
  );
};

export default App;
