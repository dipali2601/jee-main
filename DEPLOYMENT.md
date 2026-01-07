# 🚀 DEPLOYMENT GUIDE - JEE Main Mock Test Website

This guide will help you deploy your JEE Main Mock Test website to various platforms.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Build for Production](#build-for-production)
4. [Deploy to Vercel](#deploy-to-vercel)
5. [Deploy to Netlify](#deploy-to-netlify)
6. [Deploy to GitHub Pages](#deploy-to-github-pages)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before deploying, ensure you have:
- Node.js (v14 or higher) installed
- npm or yarn package manager
- Git installed (for version control)
- A GitHub account (recommended)

---

## 💻 Local Development

### 1. Install Dependencies
```bash
cd "jee test"
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 3. Test the Application
- Create an account (Sign Up)
- Login with demo credentials:
  - Email: `admin@jee.com`
  - Password: `admin123`
- Take a mock test
- View results and analysis

---

## 🏗️ Build for Production

Before deploying, create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with optimized static files.

To test the production build locally:
```bash
npx serve -s build
```

---

## 🚀 Deploy to Vercel (Recommended)

Vercel offers the easiest deployment with automatic SSL and CDN.

### Method 1: Using Vercel CLI

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **jee-mock-test**
- Directory? Press Enter (current directory)
- Override settings? **N**

4. **Deploy to Production**
```bash
vercel --prod
```

Your site is now live! 🎉

### Method 2: Using Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: **Create React App**
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Click "Deploy"

---

## 🌐 Deploy to Netlify

### Method 1: Drag and Drop

1. Build the project:
```bash
npm run build
```

2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `build/` folder to Netlify dashboard

### Method 2: Using Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Initialize and Deploy**
```bash
netlify init
```

Follow the prompts:
- Create & configure a new site? **Y**
- Team? Select your team
- Site name? **jee-mock-test**
- Build command? `npm run build`
- Directory to deploy? `build`

4. **Deploy to Production**
```bash
netlify deploy --prod
```

### Method 3: GitHub Integration

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect to GitHub
5. Select repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
7. Click "Deploy site"

---

## 📄 Deploy to GitHub Pages

### Setup

1. **Install gh-pages**
```bash
npm install gh-pages --save-dev
```

2. **Update package.json**

Add at the top level:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/jee-mock-test"
```

Add to "scripts" section:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

3. **Deploy**
```bash
npm run deploy
```

4. **Enable GitHub Pages**
- Go to your GitHub repository
- Settings → Pages
- Source: **gh-pages branch**
- Click Save

Your site will be live at: `https://YOUR_GITHUB_USERNAME.github.io/jee-mock-test`

---

## 🔧 Environment Variables (Optional)

If you add backend features, create `.env` file:

```env
REACT_APP_API_URL=your_api_url
REACT_APP_FIREBASE_KEY=your_firebase_key
```

Remember to add these to your deployment platform's environment settings.

---

## 🛠️ Troubleshooting

### Build Fails

**Issue**: `npm run build` fails
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues (404 on refresh)

**For Netlify**: Create `public/_redirects` file:
```
/*    /index.html   200
```

**For Vercel**: Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Questions Not Loading

**Issue**: Questions data not showing
**Solution**: Ensure `src/data/questions.json` exists and is valid JSON

### LocalStorage Not Working

**Issue**: User data not persisting
**Solution**: Check browser privacy settings, ensure localStorage is enabled

---

## 📊 Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test login functionality
- [ ] Attempt a mock test
- [ ] Check timer functionality
- [ ] Submit test and view results
- [ ] Test on mobile devices
- [ ] Check all sections (Physics, Chemistry, Math)
- [ ] Verify admin panel access
- [ ] Test dark mode toggle
- [ ] Check print/download result feature

---

## 🔐 Security Recommendations

For production deployment:

1. **Add Backend**: Replace localStorage with proper backend
2. **Authentication**: Implement JWT or OAuth
3. **Database**: Use MongoDB, Firebase, or PostgreSQL
4. **API Protection**: Add rate limiting and authentication
5. **HTTPS**: Always use SSL certificates (automatic on Vercel/Netlify)

---

## 📈 Performance Optimization

Already implemented:
- ✅ Code splitting with React
- ✅ Lazy loading components
- ✅ Optimized images
- ✅ Minified CSS/JS
- ✅ Gzip compression (automatic on platforms)

---

## 🔄 Continuous Deployment

Both Vercel and Netlify support automatic deployment:

1. Push code to GitHub main branch
2. Platform automatically builds and deploys
3. Every commit triggers new deployment
4. Rollback available in dashboard

---

## 📞 Support

For deployment issues:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)

---

## 🎉 You're All Set!

Your JEE Main Mock Test website is now live and ready to help students ace their exams!

**Share your deployment URL in the issues section if you want feedback!**

---

**Made with ❤️ for JEE Aspirants**
