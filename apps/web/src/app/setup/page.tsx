export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Setup Guide</h1>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">✅ Step 1: Next.js Running</h2>
              <p className="text-gray-600">
                You're seeing this page, so Next.js is working perfectly!
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">⚠️ Step 2: Database Setup</h2>
              <p className="text-gray-600 mb-3">
                Choose one option:
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Option A: Supabase (Recommended)</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Go to supabase.com</li>
                  <li>Create free project (takes 2 minutes)</li>
                  <li>Copy connection string from Settings → Database</li>
                  <li>Add to apps/web/.env</li>
                </ol>
              </div>
            </div>

            <div className="border-l-4 border-gray-300 pl-4">
              <h2 className="text-xl font-semibold mb-2">📝 Step 3: Environment Variables</h2>
              <p className="text-gray-600 mb-2">
                Create apps/web/.env file:
              </p>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`DATABASE_URL="your-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="random-secret"`}
              </pre>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">🔧 Step 4: Run Migrations</h2>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm">
{`npx prisma generate
npx prisma migrate dev`}
              </pre>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
