# Carolina de Canadá - Setup Guide

Congratulations! Your website foundation has been successfully created. This guide will help you get started.

## ✅ What's Been Created

### Project Structure
- **Full Gatsby 5 project** with React 18
- **Bilingual support** (English/Spanish) with language toggle
- **Modern design system** with Tailwind CSS
- **Component library** ready for content
- **Firebase integration** for newsletter subscriptions
- **Contentful CMS** configuration (ready to connect)

### Pages Created
- **Homepage** (`/` and `/es/`) - Hero, featured recipes, categories, newsletter
- **Recipes** (`/recipes` and `/es/recipes`) - Recipe listing with search and filters
- **About** (`/about` and `/es/about`) - About Carolina page
- **Resources** (`/resources` and `/es/resources`) - Resources and guides
- **404** - Custom error page

### Components Built
- Layout system (Header with nav, Footer, Language toggle)
- Recipe components (RecipeCard, RecipeGrid, RecipeFilters)
- Search functionality with context
- SEO components with recipe schema
- Newsletter subscription form

## 🚀 Next Steps

### 1. Start Development Server

```bash
cd "C:\Users\ASUS\Proyectos Web\Carolyn\carolinadecanada"
npm run develop
```

The site will be available at `http://localhost:8000`

### 2. Set Up Contentful CMS

#### Create a Contentful Account
1. Go to https://www.contentful.com
2. Sign up for a free account
3. Create a new space called "Carolina de Canadá"

#### Create Content Models

Create these content models in Contentful:

**Recipe Content Model:**
- title (Short text, localized EN/ES, required)
- slug (Short text, localized, required, unique)
- description (Long text, localized, required)
- featuredImage (Media, required)
- category (Reference to Category, required)
- prepTime (Number, required) - in minutes
- cookTime (Number, required) - in minutes
- totalTime (Number, required) - in minutes
- servings (Number, required)
- difficulty (Short text, required) - values: "Easy", "Medium", "Hard"
- ingredients (Rich text, localized, required)
- instructions (Rich text, localized, required)
- notes (Rich text, localized)
- featured (Boolean, default: false)
- publishDate (Date & time, required)

**Category Content Model:**
- name (Short text, localized, required)
- slug (Short text, localized, required, unique)
- description (Long text, localized)
- image (Media)
- order (Number)

**Author Content Model:**
- name (Short text, required)
- bio (Long text, localized, required)
- photo (Media, required)

#### Enable Locales
In Contentful Settings → Locales:
- English (en) - default
- Spanish (es)

#### Get Your API Keys
1. Go to Settings → API keys
2. Create a new API key
3. Copy the Space ID and Content Delivery API token

#### Update .env File
Edit the `.env` file in your project root:

```
CONTENTFUL_SPACE_ID=your_actual_space_id
CONTENTFUL_ACCESS_TOKEN=your_actual_access_token
```

### 3. Set Up Firebase (for Newsletter)

#### Create Firebase Project
1. Go to https://console.firebase.google.com
2. Create a new project called "Carolina de Canadá"
3. Enable Firestore Database

#### Set Firestore Rules
In Firestore → Rules, set:

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

#### Get Firebase Config
1. Go to Project Settings → General
2. Scroll to "Your apps"
3. Click "Add app" → Web
4. Copy the config values

#### Update .env File
Add these to your `.env` file:

```
GATSBY_FIREBASE_API_KEY=your_api_key
GATSBY_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
GATSBY_FIREBASE_PROJECT_ID=your_project_id
GATSBY_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
GATSBY_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
GATSBY_FIREBASE_APP_ID=your_app_id
```

### 4. Add Content to Contentful

#### Create Categories
Create 7 categories in Contentful (in both EN and ES):
- Breads / Panes
- Cakes / Pasteles
- Cookies / Galletas
- Desserts / Postres
- Loaves / Panes dulces
- Main Dishes / Platos principales
- Muffins / Muffins

#### Add Recipes
1. Create a new Recipe entry
2. Fill in all fields in English
3. Switch to Spanish locale and translate
4. Upload featured image
5. Publish

### 5. Test the Site

After adding Contentful credentials and content:

```bash
npm run clean
npm run develop
```

Visit `http://localhost:8000` to see your site with real content!

### 6. Add a Logo

Replace the temporary icon:
1. Create a 512x512px PNG logo
2. Save it as `static/images/icon.png`
3. Update `gatsby-config.js` line 62: change `icon.svg` to `icon.png`

## 📦 Building for Production

```bash
npm run build
```

The production-ready site will be in the `public` directory.

## 🚢 Deploy

Deploys are automated through GitHub Actions to Firebase Hosting - push to
`master` and it ships. A publish in Contentful also triggers a rebuild via a
webhook, and the Actions tab has a manual "Run workflow" button.

There is no dashboard to configure: build settings live in
`.github/workflows/firebase-hosting-merge.yml` and credentials are repository
secrets. See `CLAUDE.md` for details.

## 🎨 Customizing the Design

### Colors
Edit `tailwind.config.js` to change the color palette:
- `brand-cream` - Background color
- `brand-terracotta` - Primary CTA color
- `brand-sage` - Secondary color
- `accent-honey` - Accent color

### Fonts
The site uses:
- **Lora** for headings (serif, elegant)
- **Inter** for body text (sans-serif, readable)

To change fonts, edit `src/styles/global.css` line 1.

### Layout
- Header: `src/components/Layout/Header.js`
- Footer: `src/components/Layout/Footer.js`
- Main layout: `src/components/Layout/Layout.js`

## 📝 Migrating Content from WordPress

To migrate recipes from carolinadecanada.com:

1. **Manual Export (Recommended)**
   - Copy recipe data from WordPress
   - Create entries in Contentful
   - Ensures quality and allows translation review

2. **WordPress Export**
   - In WordPress: Tools → Export → Posts
   - Download XML file
   - Manually transfer to Contentful (no automated tool needed)

## 🆘 Troubleshooting

### Build Fails
- Run `npm run clean` then `npm run build`
- Check that all environment variables are set
- Ensure Contentful credentials are correct

### Images Not Loading
- Make sure `static/images/icon.png` exists
- Check image sizes (Contentful images should be optimized)

### Translations Missing
- Check that locale JSON files have all keys
- Verify Contentful entries have content in both EN and ES

### Firebase Not Working
- Verify all Firebase env variables are set
- Check Firestore rules are configured
- Ensure Firebase project exists

## 📚 Documentation

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💡 Tips

1. **Test bilingual content** - Always check both EN and ES versions
2. **Optimize images** - Use WebP format when possible, keep file sizes under 500KB
3. **SEO** - Fill in all meta descriptions and titles
4. **Performance** - Run Lighthouse audits regularly
5. **Backups** - Contentful has version history, but export data periodically

## 🎯 Features to Add Later

Consider adding these features as the site grows:
- User accounts and saved recipes
- Recipe ratings and reviews
- Print-friendly recipe format
- Social media sharing
- Meal planning tool
- Recipe videos
- User-submitted recipes
- Comments system

---

**Need help?** Check the README.md file for more detailed information or consult the documentation links above.

Good luck with your website! 🎉👩‍🍳
