@echo off
echo ========================================
echo Resume ATS Optimizer - Simple Setup
echo ========================================
echo.

cd apps\web

echo [1/5] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo [2/5] Copying simple schema...
copy prisma\schema-simple.prisma prisma\schema.prisma
if errorlevel 1 (
    echo ERROR: Schema copy failed
    pause
    exit /b 1
)

echo.
echo [3/5] Generating Prisma client...
call npx prisma generate
if errorlevel 1 (
    echo ERROR: Prisma generate failed
    pause
    exit /b 1
)

echo.
echo [4/5] Creating database...
call npx prisma migrate dev --name init
if errorlevel 1 (
    echo ERROR: Database migration failed
    pause
    exit /b 1
)

echo.
echo [5/5] Setting up environment...
if not exist .env (
    copy .env.simple .env
    echo.
    echo ========================================
    echo IMPORTANT: Add your OpenAI API key to:
    echo apps\web\.env
    echo ========================================
    echo.
) else (
    echo .env already exists, skipping...
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Add your OPENAI_API_KEY to apps\web\.env
echo 2. Run: npm run dev
echo 3. Visit: http://localhost:3000/simple
echo.
pause
