# 🧙‍♂️ Setup Wizard - Get Running in 10 Minutes

## 📝 Step-by-Step Checklist

### ✅ Step 1: Get Google Gemini API Key (2 min)

1. Open: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

**Paste here for reference:**
```
GOOGLE_GEMINI_API_KEY=
```

---

### ✅ Step 2: Get Google Sheets Credentials (5 min)

1. Open: https://console.cloud.google.com/
2. Create project: "order-processor"
3. Enable APIs:
   - Search "Google Sheets API" → Enable
   - Search "Google Drive API" → Enable
4. Create Service Account:
   - Menu → IAM & Admin → Service Accounts
   - "Create Service Account"
   - Name: "order-processor"
   - Role: "Editor"
   - Done
5. Create Key:
   - Click on the service account
   - Keys → Add Key → JSON
   - Download file
6. Open the JSON file and copy:

**Paste here for reference:**
```
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
```

---

### ✅ Step 3: Get SendGrid API Key (3 min)

1. Open: https://sendgrid.com/
2. Sign up (free)
3. Settings → API Keys → Create API Key
4. Name: "order-processor"
5. Full Access → Create
6. Copy the key
7. Settings → Sender Authentication → Verify Single Sender
8. Enter your email → Verify

**Paste here for reference:**
```
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
```

---

### ✅ Step 4: Deploy to Vercel (2 min)

**Option A: Web Interface (Easiest)**

1. Go to: https://vercel.com/new
2. Sign in with GitHub
3. Import repository: `yuvikr34567-commits/group-order-processor`
4. Add environment variables (copy from above)
5. Click "Deploy"
6. Wait 2 minutes
7. Done! 🎉

**Option B: Command Line**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add GOOGLE_GEMINI_API_KEY production
vercel env add GOOGLE_SHEETS_CLIENT_EMAIL production
vercel env add GOOGLE_SHEETS_PRIVATE_KEY production
vercel env add SENDGRID_API_KEY production
vercel env add SENDGRID_FROM_EMAIL production
vercel env add TARGET_EMAIL production

# Deploy
vercel --prod
```

---

## 🎯 Your Deployment URL

After deployment, your app will be at:
```
https://group-order-processor-[your-username].vercel.app
```

Or set a custom domain in Vercel settings!

---

## 🧪 Test It Out

1. Visit your deployment URL
2. Drag and drop a PDF order
3. Watch the magic happen:
   - ✅ AI extracts data
   - ✅ Google Sheet created
   - ✅ Email sent to eatcon@terra-ny.com

---

## 📋 Complete Environment Variables Template

Copy this and fill in your values for Vercel:

```env
GOOGLE_GEMINI_API_KEY=your_gemini_key_here
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
SENDGRID_API_KEY=SG.your_sendgrid_key_here
SENDGRID_FROM_EMAIL=your_verified_email@domain.com
TARGET_EMAIL=eatcon@terra-ny.com
```

---

## 🎉 You're Live!

Your order processing system is now:
- ✅ Deployed to production
- ✅ Processing PDFs automatically
- ✅ Creating Google Sheets
- ✅ Sending emails

**Share with your team and start processing orders!**

---

## 🆘 Need Help?

**Common Issues:**

1. **"API Key Invalid"**
   - Check for extra spaces
   - Verify key is active
   - Try regenerating

2. **"Private Key Error"**
   - Must include BEGIN/END lines
   - Keep all \n characters
   - Wrap in quotes

3. **"Email Not Sent"**
   - Verify sender in SendGrid
   - Check activity logs
   - Ensure full access API key

**Still stuck?**
- Check: [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md)
- Review: [SETUP.md](SETUP.md)
- Read: [QUICKSTART.md](QUICKSTART.md)

---

**Time to complete:** ~10 minutes
**Difficulty:** Easy
**Result:** Production-ready app 🚀
