# 🚀 SIMPLE VERSION - INSTALLATION GUIDE

This version uses **SQLite** and runs entirely in **Node.js** - no Python, Redis, or PostgreSQL needed!

## ✅ What You Need

1. **Node.js 18+** ([Download](https://nodejs.org/))
2. **OpenAI API Key** ([Get here](https://platform.openai.com/api-keys))

That's it!

---

## 📦 Step 1: Install Dependencies

```bash
cd apps/web
npm install openai pdf-parse
```

---

## 🗄️ Step 2: Setup Database

```bash
# Copy simple schema
cp prisma/schema-simple.prisma prisma/schema.prisma

# Generate Prisma client
npx prisma generate

# Create database
npx prisma migrate dev --name init
```

This creates `apps/web/prisma/dev.db` (SQLite database)

---

## 🔑 Step 3: Configure OpenAI

Create `apps/web/.env`:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

---

## 🎯 Step 4: Run Application

```bash
npm run dev
```

Visit: **http://localhost:3000/simple**

---

## 🎨 How to Use

### 1. Upload Resume
- Click "Choose File"
- Select PDF resume
- Wait for processing (~5 seconds)
- Status will change to "COMPLETED"

### 2. Add Job
- Fill job title, company, description
- Select your resume from dropdown
- Click "Add Job"

### 3. Analyze Match
- Click "🔍 Analyze Match" on any job
- Wait ~10 seconds
- See match score, missing keywords, tailored resume

---

## 📊 Example Output

```
Match Score: 87%

Missing Keywords:
- Machine Learning
- Docker
- Kubernetes

Tailored Resume:
[AI-generated optimized version of your resume]
```

---

## 🗂️ What Files Were Added

### New API Routes:
- `api/resumes/upload-simple/route.ts` - Upload PDF
- `api/resumes/list/route.ts` - List resumes  
- `api/applications/route.ts` - CRUD jobs
- `api/match/route.ts` - AI analysis

### Core Logic:
- `lib/worker-simple.ts` - PDF parsing, embeddings, matching

### UI:
- `app/simple/page.tsx` - Complete demo interface

### Database:
- `prisma/schema-simple.prisma` - SQLite schema

---

## 🔄 Data Flow

```
User uploads PDF
    ↓
Store in SQLite as base64
    ↓
Extract text with pdf-parse
    ↓
Generate embedding (OpenAI)
    ↓
Store text + embedding
    ↓
User adds job
    ↓
Generate job embedding
    ↓
Calculate similarity score
    ↓
Send to GPT-4 for analysis
    ↓
Store results (score, keywords, tailored resume)
```

---

## 🎯 Architecture

```
┌──────────────────────────────────┐
│         Next.js App              │
│  (Frontend + API + AI Worker)   │
└────────┬─────────────────────────┘
         │
         ├─→ SQLite Database
         │   (Resumes + Jobs + Results)
         │
         └─→ OpenAI API
             ├─→ text-embedding-3-small
             └─→ gpt-4o-mini
```

**No external services!** Everything runs in one process.

---

## 💾 Database Location

`apps/web/prisma/dev.db`

To view database:
```bash
npx prisma studio
```

To reset database:
```bash
rm prisma/dev.db
npx prisma migrate dev --name init
```

---

## 🧪 Test It

### 1. Check Database
```bash
cd apps/web
npx prisma studio
```

### 2. Test Upload
```bash
curl -X POST http://localhost:3000/api/resumes/upload-simple \
  -F "file=@resume.pdf" \
  -F "userId=test-user"
```

### 3. Test Analysis
- Go to http://localhost:3000/simple
- Upload resume
- Add job
- Click "Analyze Match"
- Check console logs for processing

---

## 🐛 Common Issues

### "Module not found: pdf-parse"
```bash
npm install pdf-parse
```

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Invalid API key"
- Check `.env` file exists
- Verify OpenAI key starts with `sk-proj-`
- Test key at https://platform.openai.com/playground

### "Failed to extract PDF text"
- Ensure PDF is not encrypted
- Check file size < 10MB
- Try different PDF

---

## 📈 Costs

OpenAI API costs (as of 2024):
- **Embeddings:** $0.0001 per 1K tokens (~$0.0003 per resume)
- **GPT-4o-mini:** $0.00015 per 1K tokens (~$0.002 per analysis)

**Total per job match: ~$0.003** (less than a penny!)

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel

# Add environment variable
vercel env add OPENAI_API_KEY
```

**⚠️ Important:** Vercel resets SQLite on each deploy. Use PostgreSQL for production.

---

## 🎓 Next Steps

Your system is ready! Here's what you can do:

1. **Test with real resume** - Upload your actual resume
2. **Add multiple jobs** - Track all applications
3. **Compare scores** - See which jobs fit best
4. **Use tailored resumes** - Copy AI suggestions
5. **Star on GitHub** - Share with others! ⭐

---

## 📚 Learn More

- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Prisma with SQLite](https://www.prisma.io/docs/concepts/database-connectors/sqlite)

---

## ✨ You're Done!

Visit **http://localhost:3000/simple** and start optimizing your resume! 🎉
