# ⚡ DEPLOY NOW - Simple Checklist

**Get your app live in 15 minutes!**

---

## ✅ Pre-Deployment Checklist

- [x] ✅ Code is ready
- [x] ✅ GitHub repository created
- [x] ✅ Vercel project created
- [x] ✅ Documentation complete
- [ ] 🔑 Get API keys (10 min)
- [ ] 🚀 Deploy to Vercel (5 min)

---

## 🔑 Step 1: Get API Keys (10 minutes)

### A. Google Gemini AI (2 min)

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

**Save this:**
```
GOOGLE_GEMINI_API_KEY=AIza...
```

---

### B. Google Sheets API (5 min)

1. Go to: https://console.cloud.google.com/
2. Create project: "order-processor"
3. Enable APIs:
   - Google Sheets API
   - Google Drive API
4. Create Service Account:
   - IAM & Admin → Service Accounts
   - Create → Name: "order-processor"
   - Role: "Editor"
5. Create Key:
   - Click service account → Keys → Add Key → JSON
   - Download file
6. Open JSON and copy:

**Save these:**
```
GOOGLE_SHEETS_CLIENT_EMAIL=xxx@xxx.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----"
```

---

### C. SendGrid Email (3 min)

1. Go to: https://sendgrid.com/
2. Sign up (free)
3. Settings → API Keys → Create
4. Name: "order-processor"
5. Full Access → Create
6. Copy key
7. Settings → Sender Authentication → Verify Single Sender
8. Enter your email → Verify

**Save these:**
```
SENDGRID_API_KEY=SG.xxx...
SENDGRID_FROM_EMAIL=your-email@domain.com
```

---

## 🚀 Step 2: Deploy to Vercel (5 minutes)

### Method 1: Web Interface (Recommended)

1. **Go to Vercel:**
   ```
   https://vercel.com/new
   ```

2. **Sign in with GitHub**

3. **Import Repository:**
   - Search: `yuvikr34567-commits/group-order-processor`
   - Click "Import"

4. **Add Environment Variables:**
   
   Click "Environment Variables" and add:

   ```
   GOOGLE_GEMINI_API_KEY = [paste your key]
   GOOGLE_SHEETS_CLIENT_EMAIL = [paste your email]
   GOOGLE_SHEETS_PRIVATE_KEY = [paste your key with quotes]
   SENDGRID_API_KEY = [paste your key]
   SENDGRID_FROM_EMAIL = [paste your email]
   TARGET_EMAIL = eatcon@terra-ny.com
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! 🎉

---

### Method 2: CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Clone repo
git clone https://github.com/yuvikr34567-commits/group-order-processor.git
cd group-order-processor

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add GOOGLE_GEMINI_API_KEY production
vercel env add GOOGLE_SHEETS_CLIENT_EMAIL production
vercel env add GOOGLE_SHEETS_PRIVATE_KEY production
vercel env add SENDGRID_API_KEY production
vercel env add SENDGRID_FROM_EMAIL production
vercel env add TARGET_EMAIL production

# Redeploy
vercel --prod
```

---

## 🎯 Your App URL

After deployment, your app will be at:

```
https://group-order-processor-[your-username].vercel.app
```

Or set a custom domain in Vercel settings!

---

## 🧪 Step 3: Test It (2 minutes)

1. Visit your deployment URL
2. Upload a test PDF
3. Verify:
   - ✅ PDF processes
   - ✅ Data extracted
   - ✅ Google Sheet created
   - ✅ Email sent

---

## ✅ Post-Deployment Checklist

- [ ] App is live
- [ ] Test PDF upload works
- [ ] Google Sheet created
- [ ] Email received at eatcon@terra-ny.com
- [ ] Share URL with team

---

## 🎉 YOU'RE LIVE!

Your order processing system is now:
- ✅ Deployed to production
- ✅ Processing PDFs automatically
- ✅ Creating Google Sheets
- ✅ Sending emails

**Start processing orders now!** 🚀

---

## 🆘 Troubleshooting

### "Build Failed"
- Check all environment variables are set
- Verify no typos in variable names
- Review Vercel build logs

### "API Key Invalid"
- Double-check you copied the entire key
- No extra spaces
- Keys are active

### "Private Key Error"
- Must include BEGIN/END lines
- Keep all \n characters
- Wrap in quotes

### "Email Not Sent"
- Verify sender in SendGrid
- Check SendGrid activity logs
- Ensure full access API key

---

## 📞 Need Help?

**Documentation:**
- [FINAL_DEPLOYMENT_SUMMARY.md](FINAL_DEPLOYMENT_SUMMARY.md) - Complete guide
- [setup-wizard.md](setup-wizard.md) - Interactive setup
- [QUICKSTART.md](QUICKSTART.md) - Quick start
- [SETUP.md](SETUP.md) - Detailed setup

**Support:**
- GitHub Issues: https://github.com/yuvikr34567-commits/group-order-processor/issues

---

## 📊 What You Get

✅ AI-powered PDF processing  
✅ Automatic Google Sheets  
✅ Email automation  
✅ Beautiful UI  
✅ 7 platform support  
✅ Production-ready  
✅ Free to start  

---

**Total Time:** ~15 minutes  
**Difficulty:** Easy  
**Cost:** $0 (free tier)  
**Result:** Production app 🎉

---

**Ready? Start with Step 1 above!** ⬆️
