# 🎯 Rizzume.ai

An intelligent resume optimization tool that uses AI to analyze job descriptions and generate tailored resumes with compatibility scores.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![SQLite](https://img.shields.io/badge/Database-SQLite-green)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

- 📄 **Resume Upload & Analysis** - Upload PDF resumes with automatic text extraction
- 🤖 **AI-Powered Matching** - OpenAI embeddings and GPT-4 analysis
- 📊 **Compatibility Scores** - Get 0-100% match scores for each job
- 🔑 **Keyword Detection** - Identify missing keywords from job descriptions
- ✍️ **Resume Tailoring** - AI-generated optimized resume versions
- 💾 **Zero Config Storage** - Built-in SQLite database
- 🚀 **One-Click Setup** - No external services required

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/Rizzume.ai.git
cd resume-ats-optimizer

# Run setup script (Windows)
setup-simple.bat

# OR manual setup (Mac/Linux)
cd apps/web
npm install
cp prisma/schema-simple.prisma prisma/schema.prisma
npx prisma generate
npx prisma migrate dev --name init
```

### Configuration

Create `apps/web/.env`:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=sk-proj-your-key-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-random-32-char-string
```

### Run

```bash
cd apps/web
npm run dev
```

Visit: **http://localhost:3000/simple**

---

## 📖 How It Works

### 1. Upload Resume
Upload your PDF resume → AI extracts text → Generates vector embeddings → Stored in database

### 2. Add Job Posting
Enter job details → Save to tracking system → Link with your resume

### 3. Analyze Match
Click "Analyze" → AI compares resume vs job → Returns:
- **Match Score** (0-100%)
- **Missing Keywords**
- **Tailored Resume Suggestions**

---

## 🏗️ Architecture

```
┌─────────────────────────┐
│     Next.js 14 App      │
│  (Frontend + Backend)   │
└───────────┬─────────────┘
            │
            ├─→ SQLite Database
            │   └─ Resumes, Jobs, Results
            │
            └─→ OpenAI API
                ├─ text-embedding-3-small
                └─ gpt-4o-mini
```

**Tech Stack:**
- **Frontend:** Next.js 14, React, TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** SQLite + Prisma ORM
- **AI:** OpenAI (Embeddings + GPT-4)
- **PDF Processing:** pdf-parse

---

## 📁 Project Structure

```
Rizzume.ai/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   │   ├── simple/
│       │   │   │   └── page.tsx           # Main UI
│       │   │   └── api/
│       │   │       ├── applications/       # Job CRUD
│       │   │       ├── resumes/           # Resume upload/list
│       │   │       └── match/             # AI analysis
│       │   └── lib/
│       │       ├── worker-simple.ts       # AI processing
│       │       └── prisma.ts              # Database client
│       ├── prisma/
│       │   ├── schema-simple.prisma       # Database schema
│       │   └── dev.db                     # SQLite database
│       └── package.json
├── docker-compose.yml                     # Optional: Complex setup
├── setup-simple.bat                       # Windows setup script
├── INSTALL-SIMPLE.md                      # Installation guide
├── README-GITHUB.md                       # This file
└── LICENSE
```

---

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resumes/upload-simple` | Upload PDF resume |
| GET | `/api/resumes/list` | List all resumes |
| POST | `/api/applications` | Create job application |
| GET | `/api/applications` | List all applications |
| POST | `/api/match` | Trigger AI analysis |

---

## 💡 Usage Example

### Upload Resume

```javascript
const formData = new FormData();
formData.append('file', pdfFile);
formData.append('userId', 'user-123');

const response = await fetch('/api/resumes/upload-simple', {
  method: 'POST',
  body: formData
});
```

### Add Job

```javascript
await fetch('/api/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jobTitle: 'Software Engineer',
    company: 'Tech Corp',
    jobDescription: 'Looking for Python developer...',
    resumeId: 'resume-id'
  })
});
```

### Analyze Match

```javascript
await fetch('/api/match', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ applicationId: 'app-id' })
});
```

---

## 🔬 AI Technology

### Vector Embeddings
- Model: `text-embedding-3-small` (1536 dimensions)
- Converts text to numerical vectors for similarity comparison

### Match Scoring
```javascript
similarity = cosineSimilarity(resumeVector, jobVector)
matchScore = Math.round(similarity * 100)
```

### GPT Analysis
- Model: `gpt-4o-mini`
- Provides: keyword extraction, suggestions, tailored resume

---

## 💰 Cost Estimation

Per job analysis (OpenAI API):
- Embeddings: ~$0.0003
- GPT-4 analysis: ~$0.002
- **Total: ~$0.003** (less than 1 cent!)

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
cd apps/web
vercel
vercel env add OPENAI_API_KEY
```

⚠️ **Note:** SQLite resets on Vercel deploys. Use PostgreSQL for production.

### Other Platforms
- Railway
- Netlify
- AWS Amplify

---

## 🔒 Security

- ✅ PDF files stored securely in database
- ✅ No public file access
- ✅ Environment variables for sensitive data
- ✅ API key protection
- ⚠️ Add authentication for production use

---

## 🛣️ Roadmap

- [ ] User authentication
- [ ] Multiple resume versions
- [ ] Job board API integration
- [ ] Chrome extension
- [ ] Email notifications
- [ ] PDF export
- [ ] Team collaboration
- [ ] Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License © 2026 Bharath Raj, AlphaGroup.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [OpenAI](https://openai.com/) - AI models
- [Prisma](https://www.prisma.io/) - Database ORM
- [TailwindCSS](https://tailwindcss.com/) - Styling

---

## 📞 Support

- 🐛 [Report Bug](https://github.com/Bharathrajzero/Rizzume.ai/issues)
- 💡 [Request Feature](https://github.com/Bharathrajzero/Rizzume.ai/issues)
- 📧 Contact: alphagroup2025ltd@gmail.com

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you land your dream job!

---

**Built with ❤️ for job seekers worldwide**
