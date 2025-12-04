# 🚀 Complete Deployment Guide

## ✅ What's Already Done

- ✅ GitHub Repository Created: https://github.com/yuvikr34567-commits/group-order-processor
- ✅ Vercel Project Created: `group-order-processor`
- ✅ All Code Committed and Ready
- ✅ Documentation Complete

## 🔑 Required API Keys (Get These Now)

### 1. Google Gemini AI (2 minutes)
**Purpose:** AI-powered PDF data extraction

**Steps:**
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)

**Save as:** `GOOGLE_GEMINI_API_KEY`

---

### 2. Google Sheets API (5 minutes)
**Purpose:** Automatic spreadsheet generation

**Steps:**
1. Visit: https://console.cloud.google.com/
2. Create new project: "group-order-processor"
3. Enable APIs:
   - Google Sheets API
   - Google Drive API
4. Create Service Account:
   - Go to IAM & Admin → Service Accounts
   - Click "Create Service Account"
   - Name: "order-processor"
   - Role: "Editor"
5. Generate Key:
   - Click on service account
   - Keys tab → Add Key → JSON
   - Download the JSON file
6. Open JSON and copy:
   - `client_email` → Save as `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `private_key` → Save as `GOOGLE_SHEETS_PRIVATE_KEY`

**Important:** Keep the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

---

### 3. SendGrid Email (3 minutes)
**Purpose:** Automated email delivery

**Steps:**
1. Visit: https://sendgrid.com/
2. Sign up (free tier available)
3. Create API Key:
   - Settings → API Keys
   - Create API Key
   - Name: "order-processor"
   - Full Access
   - Copy key (starts with `SG.`)

**Save as:** `SENDGRID_API_KEY`

4. Verify Sender:
   - Settings → Sender Authentication
   - Verify Single Sender
   - Use your email
   - Verify via email link

**Save as:** `SENDGRID_FROM_EMAIL`

---

## 🚀 Deploy to Vercel (5 minutes)

### Option A: Automatic Deployment (Recommended)

1. **Connect GitHub to Vercel:**
   - Go to: https://vercel.com/new
   - Import: `yuvikr34567-commits/group-order-processor`
   - Click "Import"

2. **Add Environment Variables:**
   ```
   GOOGLE_GEMINI_API_KEY=your_key_here
   GOOGLE_SHEETS_CLIENT_EMAIL=your_email_here
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   SENDGRID_API_KEY=your_key_here
   SENDGRID_FROM_EMAIL=your_verified_email
   TARGET_EMAIL=eatcon@terra-ny.com
   ```

3. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live!

### Option B: Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables via CLI
vercel env add GOOGLE_GEMINI_API_KEY
vercel env add GOOGLE_SHEETS_CLIENT_EMAIL
vercel env add GOOGLE_SHEETS_PRIVATE_KEY
vercel env add SENDGRID_API_KEY
vercel env add SENDGRID_FROM_EMAIL
vercel env add TARGET_EMAIL
```

---

## 🧪 Test Your Deployment

1. **Visit your app:** `https://group-order-processor.vercel.app`
2. **Upload a test PDF** from any supported platform
3. **Verify:**
   - ✅ PDF processes successfully
   - ✅ Data extracted correctly
   - ✅ Google Sheet created
   - ✅ Email sent to eatcon@terra-ny.com

---

## 📋 Environment Variables Checklist

Copy this template and fill in your values:

```env
# Google Gemini AI
GOOGLE_GEMINI_API_KEY=AIza...

# Google Sheets
GOOGLE_SHEETS_CLIENT_EMAIL=order-processor@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"

# SendGrid
SENDGRID_API_KEY=SG.xxx...
SENDGRID_FROM_EMAIL=your-email@domain.com

# Target
TARGET_EMAIL=eatcon@terra-ny.com
```

---

## 🎯 Quick Links

- **Live App:** https://group-order-processor.vercel.app (after deployment)
- **GitHub Repo:** https://github.com/yuvikr34567-commits/group-order-processor
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Google Cloud Console:** https://console.cloud.google.com/
- **SendGrid Dashboard:** https://app.sendgrid.com/

---

## 🆘 Troubleshooting

### "Invalid API Key"
- Double-check you copied the entire key
- No extra spaces or line breaks
- Keys are active and not expired

### "Private Key Error"
- Must include BEGIN/END markers
- Keep all `\n` characters
- Wrap in quotes in Vercel

### "Email Not Sent"
- Verify sender email in SendGrid
- Check SendGrid activity logs
- Ensure API key has full access

### "Build Failed"
- Check all environment variables are set
- Verify no syntax errors in .env
- Review Vercel build logs

---

## 🎉 You're Done!

Your Group Order Processor is now:
- ✅ Deployed to production
- ✅ Fully automated
- ✅ Ready to process orders
- ✅ Sending emails automatically

**Next Steps:**
1. Share the URL with your team
2. Upload real order PDFs
3. Monitor Google Sheets creation
4. Check email delivery

---

## 📞 Support

Need help?
- GitHub Issues: https://github.com/yuvikr34567-commits/group-order-processor/issues
- Documentation: See SETUP.md and QUICKSTART.md

---

**Created:** December 4, 2025
**Status:** Ready for Production 🚀
