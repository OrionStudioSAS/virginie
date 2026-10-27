/**
 * site-data.js
 * Charge constants.tsx (la source des infos affichées sur la homepage) depuis Node,
 * via Vite, et en dérive les données structurées et le llms.txt.
 * → adresses, horaires, tarifs et FAQ ne sont écrits qu'à un seul endroit.
 */

import { createServer } from 'vite';

export const BASE_URL = 'https://www.virginie-lelong-nutrition.fr';
const PERSON_ID = `${BASE_URL}/#virginie-lelong`;
const BUSINESS_ID = `${BASE_URL}/#cabinet`;

const DAYS = {
  Lundi: 'Monday', Mardi: 'Tuesday', Mercredi: 'Wednesday', Jeudi: 'Thursday',
  Vendredi: 'Friday', Samedi: 'Saturday', Dimanche: 'Sunday',
};

export async function loadConstants() {
  const server = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    logLevel: 'silent',
  });
  try {
    return await server.ssrLoadModule('/constants.tsx');
  } finally {
    await server.close();
  }
}

/* "13 Quai Maréchal Foch, 77000 Melun" → PostalAddress */
function postalAddress(address) {
  const [street, rest = ''] = address.split(/,\s*(?=\d{5})/);
  const [, postalCode = '', locality = ''] = rest.match(/^(\d{5})\s+(.*)$/) || [];
  return {
    '@type': 'PostalAddress',
    streetAddress: street.trim(),
    postalCode,
    addressLocality: locality,
    addressCountry: 'FR',
  };
}

/* Rattache chaque créneau au cabinet dont l'adresse a le même numéro de rue */
function scheduleFor(workplace, schedule) {
  const streetNumber = workplace.address.match(/^\d+/)?.[0];
  return schedule.filter((s) => s.location?.match(/^\d+/)?.[0] === streetNumber);
}

function openingHours(slots) {
  return slots.map((s) => {
    const [opens, closes] = s.hours.split(/\s*-\s*/);
    return { '@type': 'OpeningHoursSpecification', dayOfWeek: DAYS[s.day], opens, closes };
  });
}

/* ─── JSON-LD homepage : cabinet + FAQ ─────────────────────────────────────── */
export function homepageJsonLd(c) {
  const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: c.APROPOS_NOM,
    jobTitle: c.APROPOS_SOUS_TITRE,
    url: `${BASE_URL}/`,
    knowsAbout: c.SPECIALTIES.map((s) => s.title),
    hasCredential: c.DIPLOMAS.map((d) => ({ '@type': 'EducationalOccupationalCredential', name: d })),
    memberOf: c.ASSOCIATIONS.map((a) => ({ '@type': 'Organization', name: a })),
  };

  const business = {
    '@type': 'Dietitian',
    '@id': BUSINESS_ID,
    name: `${c.APROPOS_NOM} – Diététicienne Nutritionniste`,
    description: c.SEO_DESCRIPTION,
    url: `${BASE_URL}/`,
    image: `${BASE_URL}/assets/banner.jpg`,
    logo: `${BASE_URL}/assets/logo.jpeg`,
    telephone: `+33${c.PHONE_TEL.slice(1)}`,
    email: c.EMAIL_ADDRESS,
    founder: { '@id': PERSON_ID },
    sameAs: [c.DOCTOLIB_URL],
    paymentAccepted: c.TARIFS_PAIEMENT.replace(/^[^:]*:\s*/, '').replace(/\.$/, ''),
    currenciesAccepted: 'EUR',
    address: c.WORKPLACES.map((w) => postalAddress(w.address)),
    department: c.WORKPLACES.map((w) => ({
      '@type': 'Dietitian',
      name: w.name,
      address: postalAddress(w.address),
      hasMap: w.mapUrl,
      telephone: `+33${c.PHONE_TEL.slice(1)}`,
      openingHoursSpecification: openingHours(scheduleFor(w, c.SCHEDULE)),
    })),
    makesOffer: c.PRICES.map((p) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: p.label },
      price: p.price.replace(/[^\d,.]/g, '').replace(',', '.'),
      priceCurrency: 'EUR',
    })),
  };

  const faq = {
    '@type': 'FAQPage',
    mainEntity: c.FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return { '@context': 'https://schema.org', '@graph': [business, person, faq] };
}

/* ─── JSON-LD article / actualité ───────────────────────────────────────────── */
export function articleJsonLd({ title, excerpt, date, image, url, section }) {
  return {
    '@context': 'https://schema.org',
    '@type': section === 'Actualités' ? 'NewsArticle' : 'BlogPosting',
    headline: title,
    description: excerpt,
    datePublished: date,
    inLanguage: 'fr-FR',
    mainEntityOfPage: url,
    url,
    ...(image ? { image } : {}),
    author: { '@type': 'Person', '@id': PERSON_ID, name: 'Virginie Lelong - Mazaud', jobTitle: 'Diététicienne-Nutritionniste', url: `${BASE_URL}/` },
    publisher: { '@type': 'Organization', '@id': BUSINESS_ID, name: 'Virginie Lelong – Diététicienne Nutritionniste', logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/logo.jpeg` } },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog & Actualités', item: `${BASE_URL}/blog-et-actualites` },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    },
  };
}

/* ─── llms.txt ─────────────────────────────────────────────────────────────── */
export function llmsTxt(c, posts, news) {
  const list = (items) => items.map((i) => `- [${i.title}](${i.url}) (${i.date}) : ${i.excerpt}`).join('\n');
  const lieux = c.WORKPLACES.map((w) => {
    const slots = scheduleFor(w, c.SCHEDULE).map((s) => `${s.day} ${s.hours.replace(/\s*-\s*/, '-')}`).join(', ');
    return `- ${w.name} : ${w.address}${slots ? ` — ${slots}` : ''}`;
  }).join('\n');

  return `# ${c.APROPOS_NOM} – Diététicienne Nutritionniste

> ${c.SEO_DESCRIPTION}

${c.APROPOS_NOM}, ${c.APROPOS_SOUS_TITRE.toLowerCase().replace("d'état", "d'État")}, reçoit ses patients sur rendez-vous dans ${c.WORKPLACES.length} cabinets à Melun (77) et Corbeil-Essonnes (91), ainsi qu'en visioconférence. Bilan nutritionnel avec impédancemétrie, suivi personnalisé et bienveillant.

## Lieux et horaires (${c.CONTACT_HORAIRES_SOUS_TITRE.toLowerCase()})

${lieux}

## Contact et rendez-vous

- Téléphone : ${c.PHONE_NUMBER}
- Email : ${c.EMAIL_ADDRESS}
- Prise de rendez-vous en ligne (Doctolib) : ${c.DOCTOLIB_URL}

## Spécialités

${c.SPECIALTIES.map((s) => `- ${s.title} : ${s.description}`).join('\n')}

## Tarifs

${c.PRICES.map((p) => `- ${p.label} : ${p.price}`).join('\n')}
- ${c.TARIFS_PAIEMENT}
- ${c.TARIFS_NOTE_1} ${c.TARIFS_NOTE_2}

## Diplômes et formations

${c.DIPLOMAS.map((d) => `- ${d}`).join('\n')}

## Associations et réseaux

${c.ASSOCIATIONS.map((a) => `- ${a}`).join('\n')}

## Questions fréquentes

${c.FAQ_ITEMS.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n')}

## Articles du blog

${list(posts)}

## Actualités du cabinet

${list(news)}

## Pages

- [Accueil](${BASE_URL}/)
- [Blog & Actualités](${BASE_URL}/blog-et-actualites)
- [Flux RSS du blog](${BASE_URL}/rss.xml)
`;
}
