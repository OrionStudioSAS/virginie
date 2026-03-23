import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;   // chemin relatif ex: "/blog/mon-article"
  ogImage?: string;     // URL absolue de l'image
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  publishedDate?: string; // ISO 8601, ex: "2024-03-15"
}

const BASE_URL = 'https://www.virginie-lelong-nutrition.fr';
const DEFAULT_IMAGE = `${BASE_URL}/assets/og-image.jpg`;
const SITE_NAME = 'Virginie Lelong – Diététicienne Nutritionniste';

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
  publishedDate,
}) => {
  const fullTitle = title.endsWith('Virginie Lelong')
    ? title
    : `${title} | Virginie Lelong Diététicienne`;

  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const image = ogImage || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      {description && <meta name="description" content={description} />}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="fr_FR" />
      {ogType === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  );
};

export default Seo;
