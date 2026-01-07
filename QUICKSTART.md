# 🎯 JEE Main Mock Test - Quick Start Guide

Welcome! This guide will help you get started quickly.

---

## 🚀 Quick Setup (3 minutes)

### Step 1: Install Dependencies
Open terminal in project folder and run:
```bash
npm install
```

### Step 2: Start the Application
```bash
npm run dev
```

### Step 3: Open in Browser
The app automatically opens at: `http://localhost:3000`

---

## 👤 Demo Credentials

### For Admin Access:
- **Email**: `admin@jee.com`
- **Password**: `admin123`

### For Student:
Create a new account using the "Sign Up" button

---

## 📚 Features Available

### 1️⃣ Home Page
- View platform statistics
- Explore features
- Quick navigation

### 2️⃣ Authentication
- Sign up with email
- Login to access tests
- Automatic session management

### 3️⃣ Test Selection
- **Full Length Mock Tests**: 180 minutes, 75 questions
- **Sectional Tests**: Physics, Chemistry, Math (60 min each)
- **Previous Year Questions**: Actual JEE patterns
- **Chapter-wise Tests**: Focus on specific topics

### 4️⃣ Exam Interface (Real JEE CBT Experience)
- 3-hour countdown timer
- Question palette with status indicators
- Section switching (Physics/Chemistry/Math)
- Save & Next, Mark for Review, Clear Response
- Auto-save progress every 10 seconds
- Auto-submit when time ends

### 5️⃣ Results & Analysis
- **Instant Evaluation**: +4/-1/0 marking scheme
- **Section-wise Performance**: Detailed breakdown
- **Visual Analytics**: Charts and graphs
- **Weak Topic Identification**: AI-powered suggestions
- **Rank Prediction**: Approximate rank estimation
- **Downloadable Report**: Print or save as PDF

### 6️⃣ Admin Panel (Admin Only)
- Add/Edit questions
- Manage tests
- View user statistics
- Platform analytics

---

## 🎮 How to Use

### Taking Your First Test

1. **Sign Up / Login**
   - Click "Sign Up" from home page
   - Fill in details
   - Verify and login

2. **Select a Test**
   - Go to "My Tests" or "Start Free Mock Test"
   - Choose test type and difficulty
   - Read instructions carefully

3. **Start the Exam**
   - Click "Start Test"
   - Read and accept instructions
   - Timer starts automatically

4. **During the Exam**
   - Answer questions by clicking options
   - Use "Save & Next" to proceed
   - "Mark for Review" for questions to revisit
   - "Clear Response" to remove answer
   - Switch sections anytime

5. **Submit & View Results**
   - Click "Submit Test" when done
   - Confirm submission
   - View detailed results immediately

---

## 🎨 Customization Options

### Dark Mode
Click the moon/sun icon (🌙/☀️) in the navigation bar

### Theme Colors
Edit `src/styles/App.css` to change colors:
```css
:root {
  --primary-color: #2196f3;  /* Change this */
  --secondary-color: #ff9800;
}
```

---

## 📝 Adding Your Own Questions

### Method 1: Edit JSON File
Open `src/data/questions.json` and add questions:

```json
{
  "id": 61,
  "section": "Physics",
  "type": "MCQ",
  "difficulty": "Medium",
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A",
  "solution": "Explanation here"
}
```

### Method 2: Use Admin Panel
1. Login with admin credentials
2. Go to Admin Dashboard
3. Click "Manage Questions"
4. Fill the form and submit

---

## 🔧 Common Issues & Solutions

### Port Already in Use
```bash
# Use different port
PORT=3001 npm run dev
```

### Dependencies Not Installing
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules
npm install
```

### Questions Not Showing
- Check `src/data/questions.json` exists
- Verify JSON is valid (use [jsonlint.com](https://jsonlint.com))

### Timer Not Working
- Clear browser cache
- Check browser JavaScript is enabled

---

## 📊 Sample Data Included

- **60 Questions** (20 per section)
- **Mix of MCQ and Numerical types**
- **All difficulty levels**: Easy, Medium, Hard
- **Detailed solutions** for each question

---

## 🎯 Best Practices

### For Students
- Take tests in exam-like conditions
- Complete full-length tests weekly
- Review mistakes thoroughly
- Focus on weak sections
- Track performance over time

### For Administrators
- Add quality questions regularly
- Update with latest patterns
- Monitor user feedback
- Keep content fresh and relevant

---

## 📈 Performance Tips

### Already Optimized:
✅ Fast load times  
✅ Smooth animations  
✅ Efficient state management  
✅ Auto-save functionality  
✅ Responsive design  

---

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **Routing**: React Router v6
- **Styling**: Custom CSS3
- **Storage**: LocalStorage (can be upgraded to backend)
- **State**: React Hooks

---

## 📱 Mobile Support

Works perfectly on:
- 📱 Smartphones (iOS & Android)
- 💻 Tablets (iPad, Android tablets)
- 🖥️ Desktop (All browsers)
- 💼 Laptops (Windows, Mac, Linux)

---

## 🔐 Data Storage

Currently uses **localStorage** for:
- User accounts
- Test progress
- Results history
- Bookmarks

**Note**: Data is stored locally in browser. For production, integrate a backend database.

---

## 🚀 Next Steps

1. ✅ Complete the quick setup above
2. ✅ Take a test to see how it works
3. ✅ Customize questions and branding
4. ✅ Deploy to production (see [DEPLOYMENT.md](DEPLOYMENT.md))
5. ✅ Share with students!

---

## 💡 Need Help?

- 📖 Read full [README.md](README.md)
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting
- 🐛 Report issues on GitHub
- 💬 Join our community forum

---

## 🎉 You're Ready!

Everything is set up and ready to use. Start practicing and ace that JEE Main exam!

**Good Luck! 🍀**

---

**Made with ❤️ for JEE Aspirants**
