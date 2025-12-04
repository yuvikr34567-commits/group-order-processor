# Quick Start Guide

Get the Group Order Processor running in 10 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Google Cloud account
- [ ] SendGrid account
- [ ] Git installed

## 5-Minute Setup

### 1. Clone & Install (2 minutes)

```bash
git clone https://github.com/yuvikr34567-commits/group-order-processor.git
cd group-order-processor
npm install
```

### 2. Get API Keys (3 minutes)

**Google Gemini AI:**
- Visit: https://makersuite.google.com/app/apikey
- Click "Create API Key"
- Copy the key

**Google Sheets:**
- Visit: https://console.cloud.google.com/
- Create project → Enable Google Sheets API
- Create Service Account → Download JSON
- Copy `client_email` and `private_key`

**SendGrid:**
- Visit: https://sendgrid.com/
- Sign up → Create API Key
- Verify sender email
- Copy API key

### 3. Configure Environment (2 minutes)

Create `.env.local`:

```env
GOOGLE_GEMINI_API_KEY=your_gemini_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SENDGRID_API_KEY=SG.your_sendgrid_key
SENDGRID_FROM_EMAIL=your_verified_email@domain.com
TARGET_EMAIL=eatcon@terra-ny.com
```

### 4. Run (1 minute)

```bash
npm run dev
```

Visit: http://localhost:3000

## First Test

1. **Upload** a PDF from Grubhub, Forkable, etc.
2. **Wait** for AI processing (~10-30 seconds)
3. **Review** extracted data
4. **Confirm** to generate sheet and send email
5. **Check** your email and Google Drive

## Common Issues

### "API Key Invalid"
- Double-check your API keys
- Ensure no extra spaces
- Verify keys are active

### "Private Key Error"
- Keep quotes around the key
- Preserve `\n` characters
- Copy entire key including BEGIN/END

### "Email Not Sent"
- Verify sender email in SendGrid
- Check SendGrid activity logs
- Ensure API key has full access

## Next Steps

- Read [SETUP.md](SETUP.md) for detailed configuration
- Review [ARCHITECTURE.md](ARCHITECTURE.md) to understand the system
- Deploy to Vercel for production use

## Support

Need help? Check:
- [GitHub Issues](https://github.com/yuvikr34567-commits/group-order-processor/issues)
- [Setup Guide](SETUP.md)
- [Architecture Docs](ARCHITECTURE.md)

## Production Deployment

### Deploy to Vercel (5 minutes)

1. Push to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

Your app will be live at: `https://your-app.vercel.app`

## Tips for Success

✅ **Test with real PDFs** from each platform
✅ **Monitor email delivery** in SendGrid
✅ **Check Google Sheets** are created correctly
✅ **Review extracted data** for accuracy
✅ **Keep API keys secure** - never commit them

## What's Included

- ✅ Beautiful drag-and-drop UI
- ✅ AI-powered PDF extraction
- ✅ Google Sheets generation
- ✅ Automatic email delivery
- ✅ Support for 7 platforms
- ✅ Excel file generation
- ✅ Responsive design
- ✅ Error handling
- ✅ Progress tracking

## Performance

- **Upload:** Instant
- **Processing:** 10-30 seconds (depends on PDF size)
- **Sheet Generation:** 2-5 seconds
- **Email Delivery:** 1-2 seconds

## Supported Platforms

1. Grubhub
2. Forkable
3. Sharebite
4. CaterCow
5. EzCater
6. ClubFeast
7. Hungry

## System Requirements

- **Browser:** Chrome, Firefox, Safari, Edge (latest)
- **Internet:** Stable connection required
- **Files:** PDF format, max 50MB per file

Enjoy your automated order processing! 🚀
