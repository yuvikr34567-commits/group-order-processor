# Group Order Processor

AI-powered system for processing catering platform PDFs and generating structured order data.

## Features

- 📄 Multi-PDF upload support
- 🤖 AI-powered data extraction
- 📊 Automatic Google Sheets generation
- 📧 Email automation
- 🔄 Support for 7 platforms: Grubhub, Forkable, Sharebite, CaterCow, EzCater, ClubFeast, Hungry

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes, Python (PDF processing)
- **Database**: Supabase (PostgreSQL)
- **AI/OCR**: Google Gemini AI
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Supabase account
- Google Cloud account (for Sheets API)

### Installation

```bash
# Clone the repository
git clone https://github.com/yuvikr34567-commits/group-order-processor.git
cd group-order-processor

# Install dependencies
npm install
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
GOOGLE_SHEETS_CREDENTIALS=your_credentials_json
SENDGRID_API_KEY=your_sendgrid_key
```

## Usage

1. Upload PDF files from catering platforms
2. System automatically detects platform and extracts data
3. Review extracted data
4. Generate Google Sheet
5. Automatically emails results to eatcon@terra-ny.com

## Project Structure

```
group-order-processor/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions
├── python/                 # PDF processing scripts
├── public/                 # Static assets
└── supabase/              # Database migrations
```

## License

MIT
