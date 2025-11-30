
import { Workplace, ScheduleItem, NavItem, PriceItem, FaqItem, SpecialtyItem, TestimonialItem } from './types';
import { Scale, Activity, Stethoscope, Baby, Dumbbell, Heart } from 'lucide-react';

// Images
// NOTE: using local images placed in `assets/` (assumed filenames: mds.jpeg, hermitage.jpeg, foh.jpeg)
export const DOCTOR_IMAGE = new URL('./assets/image banner.jpg', import.meta.url).href;
export const SQUARE_LOGO = new URL('./assets/logo.jpeg', import.meta.url).href;
export const IMPEDANCE_IMAGE = new URL('./assets/imdependancemetre.png', import.meta.url).href; // local impédancemètre image

export const LOGO_COLORS = {
  pink: '#F43F5E',
  green: '#8BC242',
  white: '#FFFFFF',
  black: '#1e293b'
};

// Content Text
export const FULL_NAME = "Virginie Lelong - Mazaud";
export const BIO_TEXT = [
  "Experte en nutrition depuis plusieurs années, je vous accompagne dans l’alimentation équilibrée et personnalisée selon votre situation : perte de poids, obésité, diabète, hypertension, ménopause, grossesse, sport, maladies cardiovasculaires, et plus.",
  "Je suis également spécialisée en chirurgie bariatrique (pré et post-opératoire) pour optimiser les résultats et prévenir les complications.",
  "Mon approche : un bilan complet, suivi régulier et conseils pratiques adaptés à votre mode de vie, pour des objectifs réalistes et durables. Grâce à ma balance professionnelle avec impédancemètre, j’évalue précisément votre composition corporelle et vos progrès.",
  "Mon objectif : vous aider à retrouver plaisir et équilibre alimentaire, tout en prenant soin de votre santé."
];

export const SPECIALTIES: SpecialtyItem[] = [
  {
    title: "Perte de poids & Obésité",
    description: "Un accompagnement bienveillant et personnalisé pour retrouver votre poids de forme durablement, sans régimes restrictifs.",
    icon: Scale
  },
  {
    title: "Diabète & Hypertension",
    description: "Gestion nutritionnelle adaptée pour stabiliser la glycémie et la tension artérielle tout en préservant le plaisir de manger.",
    icon: Activity
  },
  {
    title: "Chirurgie Bariatrique",
    description: "Suivi spécialisé pré et post-opératoire pour prévenir les carences et optimiser les résultats de l'intervention.",
    icon: Stethoscope
  },
  {
    title: "Ménopause & Grossesse",
    description: "Adaptation de l'alimentation aux changements hormonaux, pour vivre sereinement ces étapes clés de la vie.",
    icon: Baby
  },
  {
    title: "Nutrition du Sport",
    description: "Stratégies nutritionnelles pour optimiser vos performances, votre énergie et votre récupération musculaire.",
    icon: Dumbbell
  },
  {
    title: "Maladies Cardiovasculaires",
    description: "Prévention et prise en charge des facteurs de risques cardio-vasculaires par une assiette protectrice.",
    icon: Heart
  }
];

export const DIPLOMAS = [
  "B.T.S. Diététique - Educatel",
  "Éducation thérapeutique du patient - Ligue Contre l'Obésité",
  "Préménopause, ménopause et nutrition - SIIN",
  "Surpoids et obésité de l'enfant/adolescent - REPOP",
  "Micronutrition ménopause - Kiné Formations",
  "Diabète - SER diabète",
  "Maladie rénale chronique - RENIF",
  "Nutrition du sport - AFDN",
  "Nutrition comportementale - CFDC",
  "Inflammation & micronutrition - Kiné Formations",
  "Chirurgie bariatrique - Educform",
  "Micronutrition - IEDM",
  "Alimentation & cancer - Gustave Roussy"
];

export const ASSOCIATIONS = [
  "AFDN (Association Française des Diététiciens Nutritionnistes)",
  "IEDM (Institut Européen de Diététique et Micronutrition)",
  "RENIF (Réseau de Néphrologie d’Ile-de-France)",
  "REPOP (Réseau de Prévention de l’Obésité Pédiatrique)",
  "Revesdiab (Réseau de santé diabète)"
];

export const WORKPLACES: Workplace[] = [
  {
    id: 1,
    name: "Cabinet Melun - Quai Foch",
    address: "13 Quai Maréchal Foch, 77000 Melun",
    description: "Cabinet principal situé en bord de Seine.",
    imageUrl: new URL('./assets/foch.jpeg', import.meta.url).href,
    mapUrl: "https://www.google.com/maps?hl=fr&gl=fr&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x47e5fbf99bb9b5b1:0x74e189db56de381e",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJsbW5m_n75UcRHjjeVtuJ4XQ"
  },
  {
    id: 2,
    name: "Cabinet Melun - Clinique St Jean l'Ermitage",
    address: "274 Avenue Marc Jacquet, 77000 Melun",
    description: "Maison des consultations.",
    imageUrl: new URL('./assets/hermitage.jpeg', import.meta.url).href,
    mapUrl: "https://www.google.com/maps/place/Lelong-Mazaud+Virginie+Di%C3%A9t%C3%A9ticienne+clinique+St+Jean+l'Ermitage+Melun/@48.556294,2.640313,17z/data=!3m1!4b1!4m6!3m5!1s0x47e5fb5fb350d58b:0xded221dd99c1dddd!8m2!3d48.556294!4d2.640313!16s%2Fg%2F11lv7pv_2h?hl=fr&entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJi9VQs1_75UcR3d3Bmd0h0t4"
  },
  {
    id: 3,
    name: "Cabinet Corbeil-Essonnes - Maison de santé \"les Allées\"",
    address: "25 Allée Aristide Briand, 91100 Corbeil-Essonnes",
    description: "Cabinet pluridisciplinaire facile d'accès.",
    imageUrl: new URL('./assets/mds.jpeg', import.meta.url).href,
    mapUrl: "https://www.google.com/maps/place/Lelong-Mazaud+Virginie+Di%C3%A9t%C3%A9ticienne+Maison+de+sant%C3%A9+Corbeil-Essonnes/@48.6103233,2.4760804,17z/data=!3m1!4b1!4m6!3m5!1s0x47e5e7896398e091:0x6ac222d9478515ce!8m2!3d48.6103233!4d2.4760804!16s%2Fg%2F11k47msyfn?hl=fr&entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJkeCYY4nn5UcRzhWFR9kiwmo"
  }
];

export const SCHEDULE: ScheduleItem[] = [
  { day: "Lundi", hours: "09:00 - 19:00", location: "13 Quai Maréchal Foch, Melun" },
  { day: "Mardi", hours: "09:00 - 19:00", location: "274 Av. Marc Jacquet, Melun" },
  { day: "Mercredi", hours: "09:30 - 19:00", location: "25 Allée A. Briand, Corbeil" },
  { day: "Jeudi", hours: "09:00 - 15:00", location: "13 Quai Maréchal Foch, Melun" },
  { day: "Vendredi", hours: "09:00 - 19:00", location: "13 Quai Maréchal Foch, Melun" },
  { day: "Vendredi", hours: "09:30 - 19:00", location: "25 Allée A. Briand, Corbeil" },
  { day: "Samedi", hours: "09:00 - 15:00", location: "13 Quai Maréchal Foch, Melun" },
];

export const PRICES: PriceItem[] = [
  { label: "Bilan nutritionnel - Première consultation", price: "65 €" },
  { label: "Consultation de suivi", price: "40 €" },
  { label: "Première consultation pré-opératoire chirurgie bariatrique", price: "75 €" },
  { label: "Bilan nutritionnel visioconférence - Première consultation", price: "65 €" },
  { label: "Consultation de suivi visioconférence", price: "40 €" },
  { label: "Consultation de suivi couple", price: "60 €" },
  { label: "Forfait 2 consultations de suivi/mois au cabinet", price: "70 €" }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quelle est l'adresse de Mme Virginie Lelong - Mazaud ?",
    answer: `Mme Virginie Lelong - Mazaud reçoit des patients aux adresses suivantes:
13 Quai Maréchal Foch, 77000 Melun
274 Avenue Marc Jacquet, 77000 Melun
25 Allée Aristide Briand, 91100 Corbeil-Essonnes`
  },
  {
    question: "Quels sont les horaires d'ouverture ?",
    answer: `Mme Virginie Lelong - Mazaud est ouvert:

13 Quai Maréchal Foch, 77000 Melun
Mme Virginie Lelong - Mazaud est ouvert:
Lundi : 09h00 - 19h00
Jeudi : 09h00 - 15h00
Vendredi : 09h00 - 19h00
Samedi : 09h00 - 15h00

274 Avenue Marc Jacquet, 77000 Melun
Mme Virginie Lelong - Mazaud est ouvert:
Mardi : 09h00 - 19h00

25 Allée Aristide Briand, 91100 Corbeil-Essonnes
Mme Virginie Lelong - Mazaud est ouvert:
Mercredi : 09h30 - 19h00
Vendredi : 09h30 - 19h00`
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Mme Virginie Lelong - Mazaud accepte les moyens de paiements suivants: Chèques, espèces et carte bancaire"
  },
  {
    question: "Est-ce que Mme Virginie Lelong - Mazaud accepte la carte Vitale ?",
    answer: "Non, Mme Virginie Lelong - Mazaud n'accepte pas la carte Vitale"
  },
  {
    question: "Quelles sont les langues parlées ?",
    answer: "Les langues qui peuvent être parlées avec Mme Virginie Lelong - Mazaud sont les suivantes : Français"
  },
  {
    question: "Est-ce que Mme Virginie Lelong - Mazaud accepte des nouveaux patients ?",
    answer: "Oui, Mme Virginie Lelong - Mazaud accepte des nouveaux patients"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Sandrine Munoz",
    text: "Mme Mazaud a su être à l'écoute de mes attentes. Nous avons pu revoir mes habitudes alimentaires alors que la ménopause s'est invitée chez-moi! Avec bienveillance, elle a suivi l'évolution de ma prise de conscience et les petits changements appliqués. Je recommande vivement praticienne.",
    rating: 5
  },
  {
    name: "Leslie Rados",
    text: "Si vous êtes à la recherche d’une professionnelle consciencieuse, Virginie est la personne qu’il vous faut. Un immense merci pour votre accompagnement qui porte ses fruits.",
    rating: 5
  },
  {
    name: "Maxence PECQUENARD — Entraîneur d’aviron",
    text: "Merci beaucoup ! Je recommande, même pour les sportifs ! Donne de bons conseils, à l’écoute,… Top satisfait à 100%",
    rating: 5
  }
];

export const IMPEDANCE_TITLE = "Analyse par Impédancemétrie";
export const IMPEDANCE_DESCRIPTION = "Le poids sur la balance ne suffit pas à évaluer votre santé. Grâce à un impédancemètre professionnel, nous analysons précisément votre composition corporelle pour mieux cibler vos objectifs et mesurer vos progrès réels (perte de gras, prise de muscle, hydratation).";
export const IMPEDANCE_BENEFITS = [
  { title: "Masse Grasse", description: "Mesure précise de la réserve adipeuse." },
  { title: "Masse Musculaire", description: "Suivi de la tonicité et du métabolisme." },
  { title: "Hydratation", description: "Contrôle de la rétention d'eau." },
  { title: "Graisse Viscérale", description: "Prévention des risques cardiovasculaires." },
  { title: "Métabolisme de Base", description: "Calcul exact de vos besoins énergétiques." }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", targetId: "home" },
  { label: "En savoir plus", targetId: "about" },
  { label: "Lieux", targetId: "locations" },
  { label: "Contact", targetId: "contact" },
];

// External Links & Contact
export const DOCTOLIB_URL = "https://www.doctolib.fr/dieteticien/corbeil-essonnes/virginie-lelong-mazaud";
export const GOOGLE_REVIEW_URL = "https://www.google.com/maps";
export const PHONE_NUMBER = "06 99 50 51 57";
export const EMAIL_ADDRESS = "vlelongdiet@orange.fr";
