# Carolina de Canadá

A modern, bilingual recipe website showcasing authentic Canadian recipes and culinary traditions. Built with Gatsby, React, Contentful CMS, and Firebase.

## 🌟 Features

- **Bilingual Support**: Full English and Spanish translations with language toggle
- **Modern Design**: Fresh, inviting aesthetic with terracotta and sage green color palette
- **Recipe Management**: Powered by Contentful CMS for easy content updates
- **Advanced Search**: Filter recipes by category, difficulty, and cooking time
- **Newsletter**: Firebase-powered email subscription system
- **SEO Optimized**: Recipe schema markup for rich search results
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Static site generation with Gatsby for blazing-fast loading

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Contentful account (for CMS)
- Firebase project (for newsletter)

### Installation

1. **Clone the repository**
   ```bash
   cd carolinadecanada
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `CONTENTFUL_SPACE_ID` - Your Contentful space ID
   - `CONTENTFUL_ACCESS_TOKEN` - Contentful delivery API token
   - `GATSBY_FIREBASE_API_KEY` - Firebase API key
   - `GATSBY_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
   - `GATSBY_FIREBASE_PROJECT_ID` - Firebase project ID
   - `GATSBY_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
   - `GATSBY_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
   - `GATSBY_FIREBASE_APP_ID` - Firebase app ID

4. **Start development server**
   ```bash
   npm run develop
   ```

   The site will be available at `http://localhost:8000`

## 📁 Project Structure

```
carolinadecanada/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── Home/            # Homepage sections
│   │   ├── Layout/          # Layout components
│   │   ├── Recipe/          # Recipe components
│   │   └── SEO/             # SEO components
│   ├── pages/               # Page components
│   ├── templates/           # Page templates
│   ├── locales/             # Translation files
│   ├── styles/              # Global styles
│   ├── context/             # React context
│   ├── hooks/               # Custom hooks
│   └── firebase.js          # Firebase configuration
├── static/                  # Static assets
├── gatsby-config.js         # Gatsby configuration
├── gatsby-node.js           # Gatsby Node APIs
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🎨 Tech Stack

### Frontend
- **Gatsby 5.14.1** - Static site generator
- **React 18** - UI library
- **Tailwind CSS 3.4.18** - Utility-first CSS
- **Styled Components 6.1.15** - CSS-in-JS
- **Framer Motion 12.4.1** - Animations

### Backend & CMS
- **Contentful** - Headless CMS for recipe content
- **Firebase 11.10.0** - Newsletter subscriptions

### Internationalization
- **gatsby-plugin-react-i18next** - i18n routing
- **i18next** - Translation framework

### SEO & Performance
- **gatsby-plugin-image** - Optimized images
- **gatsby-plugin-sitemap** - XML sitemap
- **Recipe schema markup** - Rich search results

## 🌐 Contentful Setup

### Content Models

You need to create these content models in Contentful:

#### Recipe
- `title` (Short text, localized, required)
- `slug` (Short text, localized, required, unique)
- `description` (Long text, localized, required)
- `featuredImage` (Media, required)
- `gallery` (Media, multiple)
- `category` (Reference, required)
- `prepTime` (Number, required)
- `cookTime` (Number, required)
- `totalTime` (Number, required)
- `servings` (Number, required)
- `difficulty` (Short text, required) - values: "Easy", "Medium", "Hard"
- `ingredients` (Rich text, localized, required)
- `instructions` (Rich text, localized, required)
- `notes` (Rich text, localized)
- `tags` (Short text, multiple)
- `featured` (Boolean)
- `publishDate` (Date & time, required)

#### Category
- `name` (Short text, localized, required)
- `slug` (Short text, localized, required, unique)
- `description` (Long text, localized)
- `image` (Media)
- `order` (Number)

#### Author
- `name` (Short text, required)
- `bio` (Long text, localized, required)
- `photo` (Media, required)
- `socialLinks` (JSON object)

### Locales
Enable these locales in Contentful:
- English (en) - default
- Spanish (es)

## 🔥 Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Create a collection called `newsletterSubscribers`
4. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /newsletterSubscribers/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

## 🚢 Deployment

### Firebase Hosting (automated)

The site deploys itself; there is nothing to run by hand. GitHub Actions builds
and pushes to Firebase Hosting (project `carolina-de-canada`) on three triggers:

1. **A push to `master`.**
2. **A publish in Contentful** - a webhook fires a `repository_dispatch` of type
   `contentful-publish`. This is what makes content edits reach production.
3. **The "Run workflow" button** on the Actions tab, to force a deploy.

Pull requests get their own preview channel.

Because the site is statically generated, a content change is only live once the
build finishes - roughly 2-4 minutes after publishing, not instantly.

Build credentials live as repository secrets (`CONTENTFUL_SPACE_ID`,
`CONTENTFUL_ACCESS_TOKEN`, `FIREBASE_SERVICE_ACCOUNT_CAROLINA_DE_CANADA`), not in
any hosting dashboard. See `CLAUDE.md` for the full pipeline.

### Manual Build

```bash
npm run build
npm run serve
```

The production build will be in the `public` directory.

## 📝 Scripts

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build locally
- `npm run clean` - Clean Gatsby cache

## 🌍 Adding Translations

1. Edit translation files in `src/locales/en/translation.json` and `src/locales/es/translation.json`
2. Use translations in components:
   ```javascript
   import { useTranslation } from 'gatsby-plugin-react-i18next';

   const MyComponent = () => {
     const { t } = useTranslation();
     return <h1>{t('nav.home')}</h1>;
   };
   ```

## 🎯 Adding Recipes

1. Log in to your Contentful space
2. Go to Content
3. Create a new Recipe entry
4. Fill in all required fields in both English and Spanish
5. Publish the entry
6. The recipe will appear on your site after the next build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👩‍🍳 About Carolina

Carolina is a passionate baker and recipe creator dedicated to sharing the best of Canadian culinary traditions with a bilingual audience. Her recipes are known for their authentic flavors and clear instructions.

Visit the website: [carolinadecanada.com](https://carolinadecanada.com)

---

Built with ❤️ by Carolina de Canadá
