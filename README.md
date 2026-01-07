# 🎓 JEE Main Mock Test Website

A complete, production-ready mock test platform designed exactly like the official NTA JEE Main CBT exam interface.

![JEE Main Mock Test](https://img.shields.io/badge/JEE-Mock%20Test-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### ✅ Core Features
- **Real JEE Main CBT Interface** - Exact replica of official exam
- **3-Hour Full Length Mock Tests** - Complete exam simulation
- **Sectional Tests** - Physics, Chemistry, Mathematics
- **Previous Year Questions (PYQ)** - Year-wise & chapter-wise
- **Multiple Question Types** - MCQ & Numerical (NAT)
- **Auto-Evaluation** - Instant results with JEE marking scheme (+4/-1/0)
- **Performance Analytics** - Detailed section-wise analysis
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🎯 Advanced Features
- Timer with auto-submit functionality
- Save & Next, Mark for Review, Clear Response
- Question palette with color-coded status
- Section switching during exam
- Resume test later
- Dark/Light mode support
- Bookmark important questions
- Detailed result analysis with weak topic suggestions
- Approximate rank prediction

## 📁 Project Structure

```
jee-main-mock-test/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── TestSelection.js
│   │   ├── ExamInterface/
│   │   │   ├── ExamScreen.js
│   │   │   ├── QuestionPanel.js
│   │   │   ├── QuestionPalette.js
│   │   │   ├── Timer.js
│   │   │   └── SectionSelector.js
│   │   ├── Results/
│   │   │   ├── ResultPage.js
│   │   │   ├── ScoreCard.js
│   │   │   └── Analysis.js
│   │   └── Admin/
│   │       ├── AdminDashboard.js
│   │       └── QuestionManager.js
│   ├── data/
│   │   └── questions.json
│   ├── utils/
│   │   ├── auth.js
│   │   ├── evaluation.js
│   │   └── storage.js
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
```bash
cd jee-main-mock-test
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📖 Usage Guide

### For Students

1. **Sign Up / Login**
   - Create an account or login
   - Your progress is saved automatically

2. **Select a Test**
   - Choose from Full Length, Sectional, or PYQ tests
   - Select difficulty level

3. **Take the Exam**
   - Interface matches real JEE Main CBT
   - Use controls: Save & Next, Mark for Review, Clear Response
   - Timer counts down automatically
   - Switch between Physics, Chemistry, Math sections

4. **View Results**
   - Instant evaluation after submission
   - Section-wise performance
   - Question-wise analysis
   - Weak chapter identification

### For Admins

1. **Access Admin Panel**
   - Login with admin credentials
   - Default: admin@jee.com / admin123

2. **Manage Questions**
   - Add new questions
   - Edit existing questions
   - Set difficulty levels
   - Create custom mock tests

## 📊 Question Format (JSON)

```json
{
  "id": 1,
  "section": "Physics",
  "type": "MCQ",
  "difficulty": "Medium",
  "question": "What is the SI unit of force?",
  "options": ["Newton", "Joule", "Watt", "Pascal"],
  "correctAnswer": "Newton",
  "solution": "Force = mass × acceleration, SI unit is Newton (N)"
}
```

## 🎨 Marking Scheme

- ✅ **Correct Answer**: +4 marks
- ❌ **Wrong Answer**: -1 mark
- ⭕ **Unattempted**: 0 marks
- **Total**: 300 marks (75 questions × 4)

## 🔧 Configuration

### Timer Settings
Edit in `src/components/ExamInterface/ExamScreen.js`:
```javascript
const EXAM_DURATION = 180; // 3 hours in minutes
```

### Marking Scheme
Edit in `src/utils/evaluation.js`:
```javascript
const MARKS = {
  correct: 4,
  wrong: -1,
  unattempted: 0
};
```

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Deploy
```bash
vercel
```

### Deploy to Netlify

1. Build the project
```bash
npm run build
```

2. Drag and drop `build/` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages
```bash
npm install gh-pages --save-dev
```

2. Add to package.json
```json
"homepage": "https://yourusername.github.io/jee-mock-test",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy
```bash
npm run deploy
```

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **Routing**: React Router v6
- **Styling**: CSS3 with custom styles
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Storage**: LocalStorage for persistence
- **Timer**: Custom JavaScript timer with auto-submit

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🔐 Security Features

- Client-side answer encryption
- Session management
- Auto-logout on inactivity
- Prevent multiple tabs
- Anti-cheating measures

## 🎯 Future Enhancements

- [ ] Backend with Node.js + Express
- [ ] Database integration (MongoDB/Firebase)
- [ ] Real-time leaderboard
- [ ] Email notifications
- [ ] Payment gateway for premium tests
- [ ] Mobile app (React Native)
- [ ] AI-based personalized recommendations
- [ ] Video solutions for questions
- [ ] Discussion forum

## 📝 Sample Questions Included

- 20 Physics questions
- 20 Chemistry questions
- 20 Mathematics questions
- Mix of MCQ and Numerical types
- Easy, Medium, Hard difficulty levels

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For support, email support@jeemock.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Inspired by official NTA JEE Main CBT interface
- Question patterns based on JEE Main exam syllabus
- UI/UX designed for optimal exam experience

## 📞 Contact

- Website: [www.jeemock.com](http://www.jeemock.com)
- Email: contact@jeemock.com
- Twitter: [@JEEMockTest](https://twitter.com/jeemocktest)

---

**Made with ❤️ for JEE Aspirants**

*Practice like you're taking the real exam!*
