# 📊 Configuration Google Analytics 4 (GA4)

## Étape 1 : Créer un compte Google Analytics

1. Allez sur https://analytics.google.com/
2. Cliquez sur **"Commencer à mesurer"** ou **"Créer un compte"**
3. Renseignez :
   - **Nom du compte** : "Virginie Lelong Nutrition"
   - **Nom de la propriété** : "Site Web Virginie Lelong"
   - **Fuseau horaire** : France (GMT+1)
   - **Devise** : EUR (€)

## Étape 2 : Configurer le flux de données

1. Sélectionnez **"Web"** comme plateforme
2. Configurez le flux :
   - **URL du site web** : `https://www.virginie-lelong-nutrition.fr`
   - **Nom du flux** : "Site Principal"
   - Activez **"Mesure améliorée"** (recommandé)

## Étape 3 : Récupérer votre ID de mesure

1. Dans l'administration, allez dans **"Flux de données"**
2. Cliquez sur votre flux web
3. Copiez l'**ID de mesure** (format : `G-XXXXXXXXXX`)

## Étape 4 : Ajouter l'ID dans le code

Dans le fichier `index.html`, remplacez `G-XXXXXXXXXX` par votre vrai ID :

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VOTRE-ID-ICI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-VOTRE-ID-ICI');
</script>
```

**Exemple :**
Si votre ID est `G-ABC123XYZ`, remplacez les deux occurrences de `G-XXXXXXXXXX` par `G-ABC123XYZ`.

## Étape 5 : Déployer et vérifier

1. **Commitez et pushez** les modifications
2. Attendez le déploiement sur Vercel/Netlify
3. Visitez votre site : `https://www.virginie-lelong-nutrition.fr`
4. Dans Google Analytics, allez dans **"Rapports" → "Temps réel"**
5. Vous devriez voir votre visite apparaître en temps réel (attendre 30-60 secondes)

## Étape 6 : Tester localement (optionnel)

Pour vérifier que le code fonctionne en local :

1. Installez l'extension Chrome **"Google Analytics Debugger"**
2. Lancez `npm run dev`
3. Ouvrez `http://localhost:3000`
4. Ouvrez la console du navigateur (F12)
5. Vous devriez voir les événements GA4 se déclencher

## 📈 Données que vous allez collecter

**Automatiquement (avec mesure améliorée) :**
- ✅ Pages vues
- ✅ Clics sur liens externes (Doctolib, Google Maps)
- ✅ Défilements de page (scroll)
- ✅ Recherches sur site (si recherche activée)
- ✅ Vues de vidéos (si vidéos intégrées)
- ✅ Téléchargements de fichiers
- ✅ Provenance du trafic (Google, réseaux sociaux, etc.)
- ✅ Appareils utilisés (mobile, desktop, tablette)
- ✅ Localisation géographique des visiteurs
- ✅ Temps passé sur le site

**Données démographiques :**
- Âge et sexe des visiteurs (anonymisé)
- Centres d'intérêt
- Langue du navigateur

## 🎯 Rapports utiles à consulter

### 1. Acquisition (d'où viennent vos visiteurs)
**Rapports → Acquisition → Vue d'ensemble**
- Recherche Google (Organic)
- Réseaux sociaux
- Liens directs
- Sites référents

### 2. Engagement (que font-ils sur le site)
**Rapports → Engagement → Pages et écrans**
- Pages les plus visitées
- Temps moyen par page
- Taux de rebond par page

### 3. Événements (actions importantes)
**Rapports → Engagement → Événements**
- Clics sur "Prendre rendez-vous" (Doctolib)
- Clics sur numéro de téléphone
- Clics sur email
- Clics sur Google Maps

### 4. Conversions (objectifs atteints)
Configurez des **conversions** pour suivre :
- Clics sur Doctolib (= prise de RDV potentielle)
- Appels téléphoniques
- Soumission formulaire contact (si ajouté)

## ⚙️ Configuration avancée recommandée

### A. Créer des événements personnalisés

Pour suivre spécifiquement les clics sur Doctolib, ajoutez ceci dans votre code (optionnel) :

```javascript
// Dans index.html, après le code GA4
<script>
  // Tracker les clics sur Doctolib
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href*="doctolib"]').forEach(function(link) {
      link.addEventListener('click', function() {
        gtag('event', 'clic_doctolib', {
          'event_category': 'engagement',
          'event_label': 'Prise de rendez-vous'
        });
      });
    });
  });
</script>
```

### B. Exclure votre propre trafic

1. Dans GA4, allez dans **Administration → Flux de données → Votre flux**
2. Cliquez sur **"Gérer le balisage"**
3. Ajoutez un **"Filtre de trafic interne"** avec votre adresse IP

### C. Activer les signaux Google

1. **Administration → Paramètres des données → Collecte de données**
2. Activez **"Signaux Google"** (données démographiques)

## 📱 Alternative : Google Tag Manager (plus avancé)

Si vous voulez plus de flexibilité, utilisez **Google Tag Manager** (GTM) :

1. Créez un compte sur https://tagmanager.google.com/
2. Créez un conteneur "Web"
3. Installez le code GTM au lieu du code GA4 direct
4. Gérez tous vos tags (GA4, Facebook Pixel, etc.) depuis GTM

**Avantage** : Modifier les tracking sans toucher au code du site.

## 🔒 RGPD & Conformité

**Important** : En Europe, vous devez :
1. ✅ Avoir une **politique de confidentialité** mentionnant GA4
2. ✅ Avoir un **bandeau cookies** (consent management)
3. ✅ Anonymiser les IP (activé par défaut dans GA4)

**Outils de conformité RGPD gratuits :**
- Axeptio (freemium)
- Cookiebot (freemium)
- Tarteaucitron.js (gratuit, open source)

### Exemple simple de bandeau cookies

Ajoutez dans votre site (avant la fermeture de `</body>`) :

```html
<div id="cookie-banner" style="position:fixed;bottom:0;left:0;right:0;background:#333;color:#fff;padding:20px;text-align:center;z-index:9999;display:none;">
  <p>Ce site utilise Google Analytics pour améliorer votre expérience. 
  <a href="/politique-confidentialite" style="color:#8BC242;text-decoration:underline;">En savoir plus</a></p>
  <button onclick="acceptCookies()" style="background:#8BC242;color:#fff;border:none;padding:10px 20px;margin:0 10px;cursor:pointer;border-radius:5px;">Accepter</button>
  <button onclick="refuseCookies()" style="background:#666;color:#fff;border:none;padding:10px 20px;cursor:pointer;border-radius:5px;">Refuser</button>
</div>

<script>
  function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-banner').style.display = 'none';
    // Activer GA4
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
  
  function refuseCookies() {
    localStorage.setItem('cookieConsent', 'refused');
    document.getElementById('cookie-banner').style.display = 'none';
  }
  
  // Afficher le bandeau si pas encore de réponse
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookie-banner').style.display = 'block';
  }
</script>
```

## 📊 Objectifs mensuels à suivre

**Mois 1-3 (Baseline) :**
- Nombre de visiteurs uniques
- Pages par session
- Durée moyenne des sessions
- Taux de rebond

**Mois 4-6 (Croissance) :**
- Augmentation du trafic organique (Google)
- Sources de trafic diversifiées
- Augmentation des clics Doctolib

**Mois 7-12 (Optimisation) :**
- Taux de conversion (visiteurs → RDV)
- Pages qui convertissent le mieux
- Mots-clés qui amènent du trafic

## 🆘 Résolution de problèmes

**Le trafic n'apparaît pas dans GA4 :**
- ✅ Vérifiez que l'ID est correct (G-XXXXXXXXXX)
- ✅ Attendez 24-48h pour les premiers rapports complets
- ✅ Testez en temps réel (Rapports → Temps réel)
- ✅ Désactivez les bloqueurs de pub (peuvent bloquer GA)

**Trafic très faible :**
- Normal au début (site neuf)
- Travaillez le SEO + backlinks
- Patience : le trafic organique prend 3-6 mois

**Données incomplètes :**
- Vérifiez que "Mesure améliorée" est activée
- Attendez quelques jours pour plus de données

## 📚 Ressources

- [Documentation GA4 officielle](https://support.google.com/analytics/answer/10089681)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [GA4 Tutoriels YouTube](https://www.youtube.com/results?search_query=google+analytics+4+tutoriel+français)

---

**Temps d'installation : 15-30 minutes**

Une fois configuré, vous aurez une vision complète de votre trafic et pourrez optimiser votre site en conséquence ! 📈
