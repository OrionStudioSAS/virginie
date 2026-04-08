
import React, { useState } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { getAvailableLangs, t } from './lib/i18n';
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
import NewsPost from './pages/NewsPost';
import Admin from './pages/Admin';
import Seo from './components/Seo';
import ScrollToTop from './components/ScrollToTop';

const HomePage: React.FC<{ onOpenReview: () => void }> = ({ onOpenReview }) => {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Seo
        title={t('SEO_TITLE', lang)}
        description={t('SEO_DESCRIPTION', lang)}
        ogImage={t('SEO_OG_IMAGE', lang)}
        canonical={lang === 'fr' ? '/' : `/${lang}`}
        ogType="website"
        lang={lang}
        hreflang
      />
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
};

const LangRoute: React.FC<{ onOpenReview: () => void }> = ({ onOpenReview }) => {
  const { lang } = useParams<{ lang: string }>();
  const validLangs = getAvailableLangs().filter(l => l !== 'fr');
  if (!lang || !validLangs.includes(lang)) {
    return <Navigate to="/" replace />;
  }
  return <HomePage onOpenReview={onOpenReview} />;
};

const App: React.FC = () => {
  const [openReviewModal, setOpenReviewModal] = useState(false);

  return (
    <LanguageProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage onOpenReview={() => setOpenReviewModal(true)} />} />
        <Route path="/blog-et-actualites" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/actualites/:slug" element={<NewsPost />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/:lang" element={<LangRoute onOpenReview={() => setOpenReviewModal(true)} />} />
      </Routes>
      <ReviewModal open={openReviewModal} onClose={() => setOpenReviewModal(false)} />
    </LanguageProvider>
  );
};

export default App;
