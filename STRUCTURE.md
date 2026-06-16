# 📂 Project Structure

```
Rizzume.ai/
│
├── apps/
│   └── web/                          # Main Next.js application
│       ├── prisma/
│       │   ├── schema.prisma         # Current database schema
│       │   ├── schema-simple.prisma  # SQLite schema (recommended)
│       │   └── dev.db                # SQLite database (auto-generated)
│       │
│       ├── src/
│       │   ├── app/
│       │   │   ├── simple/
│       │   │   │   └── page.tsx      # ⭐ Main demo page
│       │   │   │
│       │   │   ├── api/
│       │   │   │   ├── applications/
│       │   │   │   │   └── route.ts  # Job CRUD operations
│       │   │   │   │
│       │   │   │   ├── resumes/
│       │   │   │   │   ├── upload-simple/
│       │   │   │   │   │   └── route.ts  # Upload PDF
│       │   │   │   │   └── list/
│       │   │   │   │       └── route.ts  # List resumes
│       │   │   │   │
│       │   │   │   └── match/
│       │   │   │       └── route.ts  # AI analysis
│       │   │   │
│       │   │   ├── dashboard/        # Alternative UI (complex)
│       │   │   ├── demo/             # Demo page
│       │   │   ├── upload/           # Upload page
│       │   │   ├── globals.css       # Global styles
│       │   │   ├── layout.tsx        # Root layout
│       │   │   └── page.tsx          # Home page
│       │   │
│       │   └── lib/
│       │       ├── worker-simple.ts  # ⭐ AI processing logic
│       │       ├── prisma.ts         # Database client
│       │       ├── queue.ts          # BullMQ queue (complex)
│       │       └── redis.ts          # Redis client (complex)
│       │
│       ├── .env                      # Environment variables (gitignored)
│       ├── .env.example              # Example env file
│       ├── .env.simple               # Simple version env
│       ├── package.json              # Dependencies
│       ├── tsconfig.json             # TypeScript config
│       ├── tailwind.config.js        # TailwindCSS config
│       └── next.config.js            # Next.js config
│
├── docker-compose.yml                # Docker services (PostgreSQL, Redis)
├── docker-compose.dev.yml            # Dev environment
├── setup-simple.bat                  # Windows setup script
├── INSTALL-SIMPLE.md                 # Installation guide
├── README.md                         # Main documentation
├── LICENSE                           # MIT license
└── .gitignore                        # Git ignore rules
```

---

## 🎯 Key Files for Simple Version

### Frontend
- `apps/web/src/app/simple/page.tsx` - Main UI with upload, jobs, analysis

### Backend APIs
- `apps/web/src/app/api/resumes/upload-simple/route.ts` - Upload PDF
- `apps/web/src/app/api/resumes/list/route.ts` - List resumes
- `apps/web/src/app/api/applications/route.ts` - Job CRUD
- `apps/web/src/app/api/match/route.ts` - AI matching

### Core Logic
- `apps/web/src/lib/worker-simple.ts` - AI processing (embeddings, matching)
- `apps/web/src/lib/prisma.ts` - Database client

### Database
- `apps/web/prisma/schema-simple.prisma` - SQLite schema
- `apps/web/prisma/dev.db` - SQLite database file (auto-generated)

### Configuration
- `apps/web/.env` - Environment variables
- `apps/web/package.json` - Dependencies
- `apps/web/tsconfig.json` - TypeScript settings

---

## 🔧 Configuration Files

### Environment Variables (`.env`)
```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=sk-proj-your-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=random-32-char-string
```

### Database Schema (`prisma/schema-simple.prisma`)
- User model
- Resume model (with embeddings)
- Application model (with match results)

### Dependencies (`package.json`)
- next, react, react-dom
- @prisma/client
- openai
- pdf-parse
- tailwindcss

---

## 🚀 Entry Points

### For Users
- **http://localhost:3000/simple** - Main demo (SQLite version)
- **http://localhost:3000/dashboard** - Full version (needs setup)
- **http://localhost:3000/demo** - UI demo (mock data)

### For API
- POST `/api/resumes/upload-simple` - Upload resume
- GET `/api/resumes/list` - List resumes
- POST `/api/applications` - Create job
- GET `/api/applications` - List jobs
- POST `/api/match` - Analyze match

---

## 📦 Build Output

After `npm run build`:
```
apps/web/.next/          # Next.js build
apps/web/prisma/dev.db   # SQLite database
```

---

## 🗂️ What to Deploy

For simple version:
- `apps/web/` - Entire web folder
- `.env` with `OPENAI_API_KEY`

For Vercel:
- Auto-detects Next.js
- Add environment variables in dashboard
- Note: SQLite resets on each deploy

---

## 🧹 Clean Build

```bash
# Remove generated files
cd apps/web
rm -rf .next node_modules prisma/dev.db
npm install
npx prisma generate
npx prisma migrate dev
```
