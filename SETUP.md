# Setup Guide

Complete step-by-step guide to set up the Group Order Processor.

## Prerequisites

- Node.js 18+ installed
- A Google Cloud account
- A SendGrid account
- Git installed

## Step 1: Clone the Repository

```bash
git clone https://github.com/yuvikr34567-commits/group-order-processor.git
cd group-order-processor
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up Google Cloud

### 3.1 Enable APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Google Sheets API
   - Google Drive API

### 3.2 Create Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name it `group-order-processor`
4. Click **Create and Continue**
5. Grant role: **Editor**
6. Click **Done**

### 3.3 Generate Credentials

1. Click on the service account you created
2. Go to **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Choose **JSON** format
5. Download the file
6. Open the JSON file and copy:
   - `client_email`
   - `private_key`

### 3.4 Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the API key

## Step 4: Set Up SendGrid

1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up or log in
3. Go to **Settings** → **API Keys**
4. Click **Create API Key**
5. Name it `group-order-processor`
6. Select **Full Access**
7. Copy the API key

### 4.1 Verify Sender Email

1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in your email details
4. Verify the email

## Step 5: Configure Environment Variables

Create `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
# Google Gemini AI
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Google Sheets API
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"

# SendGrid Email
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=your_verified_email@domain.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
TARGET_EMAIL=eatcon@terra-ny.com
```

**Important Notes:**
- Keep the quotes around `GOOGLE_SHEETS_PRIVATE_KEY`
- Preserve the `\n` characters in the private key
- Use your verified SendGrid email for `SENDGRID_FROM_EMAIL`

## Step 6: Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000`

## Step 7: Test the System

1. Upload a sample PDF from one of the supported platforms
2. Wait for AI processing
3. Review extracted data
4. Click "Confirm & Send"
5. Check that:
   - Google Sheet is created
   - Email is sent to eatcon@terra-ny.com

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial setup"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Click **Import Project**
3. Select your GitHub repository
4. Add all environment variables from `.env.local`
5. Click **Deploy**

### 3. Configure Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### PDF Processing Fails

- Check that `GOOGLE_GEMINI_API_KEY` is correct
- Ensure PDF files are valid and not corrupted
- Check API quota limits

### Google Sheets Not Created

- Verify service account credentials
- Check that Google Sheets API is enabled
- Ensure private key format is correct (with `\n`)

### Email Not Sent

- Verify SendGrid API key
- Check that sender email is verified
- Review SendGrid activity logs

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/yuvikr34567-commits/group-order-processor/issues)
- Review the documentation
- Contact the development team

## Next Steps

- Add more platform templates
- Customize email templates
- Add user authentication
- Implement order history tracking
