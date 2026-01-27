# Production Deployment Guide

**Created:** January 25, 2026  
**Goal:** Deploy Home Site (Vercel) + Intake App (Cloud Run/Vercel)  
**Domains:** teachmeai.in + intake.teachmeai.in

---

## 🎯 Architecture Overview

```
teachmeai.in (Vercel)
  ↓ User completes ChatQuiz
  ↓ Email sent with JWT token
  ↓
intake.teachmeai.in (Cloud Run or Vercel)
  ↓ User clicks email link
  ↓ Form pre-filled with ChatUI data
  ↓ Complete analysis & report
```

---

## 📋 Pre-Deployment Checklist

### **What You Need:**
- [x] GitHub account
- [x] Vercel account (free tier works)
- [x] Google Cloud account (for Cloud Run, if using)
- [x] Domain: teachmeai.in (access to DNS settings)
- [x] API Keys ready:
  - GEMINI_API_KEY
  - JWT_SECRET (must be identical in both apps!)
  - RESEND_API_KEY
  - Google Sheets credentials (for intake app)

---

## 🚀 Part 1: Deploy Home Site to Vercel

### **Step 1: Push Code to GitHub**

```bash
# Navigate to home site
cd /Users/khalidirfan/projects/teachmeai-home-site

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "ChatUI Phase 1 complete - ready for production"

# Create GitHub repo (do this on github.com first)
# Then add remote and push:
git remote add origin https://github.com/YOUR_USERNAME/teachmeai-home-site.git
git branch -M main
git push -u origin main
```

**Or if repo already exists:**
```bash
git add .
git commit -m "ChatUI integration complete"
git push origin main
```

---

### **Step 2: Connect to Vercel**

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import `teachmeai-home-site` repository
5. Configure:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
6. **Don't deploy yet!** Click "Environment Variables" first

---

### **Step 3: Add Environment Variables in Vercel**

Click **"Environment Variables"** and add these:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `GEMINI_API_KEY` | `AIza...` | Production, Preview, Development |
| `JWT_SECRET` | `your-64-char-secret` | Production, Preview, Development |
| `RESEND_API_KEY` | `re_...` | Production, Preview, Development |
| `NEXT_PUBLIC_BASE_URL` | `https://teachmeai.in` | Production |
| `NEXT_PUBLIC_BASE_URL` | `https://preview-url.vercel.app` | Preview |
| `NEXT_PUBLIC_INTAKE_APP_URL` | `https://intake.teachmeai.in` | Production |
| `NEXT_PUBLIC_INTAKE_APP_URL` | `https://intake-preview.vercel.app` | Preview |
| `NEXT_PUBLIC_QUIZ_WEBHOOK_URL` | `your-sheets-webhook` | Production, Preview |

**⚠️ CRITICAL:** Copy your **JWT_SECRET** - you'll need the EXACT SAME value for the intake app!

---

### **Step 4: Deploy to Vercel**

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `teachmeai-home-site-xxx.vercel.app`
4. Test the deployment:
   - Open the URL
   - Scroll to ChatQuiz
   - Start a conversation
   - **Don't complete yet** (intake app not deployed)

---

### **Step 5: Configure Custom Domain**

**5.1 Add Domain in Vercel:**
1. Go to Project Settings → Domains
2. Add custom domain: `teachmeai.in`
3. Vercel will show DNS records to add

**5.2 Update DNS (at your domain registrar):**

Add these records at your domain provider (e.g., GoDaddy, Namecheap, Cloudflare):

**For Root Domain (teachmeai.in):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**5.3 Wait for DNS Propagation (5-30 minutes)**

Check status:
```bash
# Check if domain resolves
dig teachmeai.in

# Or use online tool
# https://dnschecker.org
```

**5.4 Enable HTTPS (Automatic)**
- Vercel automatically provisions SSL certificate
- Wait 5-10 minutes after DNS propagates
- Your site will be live at `https://teachmeai.in`

---

## 🚀 Part 2: Deploy Intake App

You have **two options**: Cloud Run OR Vercel

---

### **Option A: Deploy to Google Cloud Run (Recommended for scaling)**

#### **Step 2A.1: Prepare for Cloud Run**

The intake app is already Cloud Run ready! Let's verify:

```bash
cd /Users/khalidirfan/projects/teachmeai-intake-app

# Check if Dockerfile exists
ls -la | grep Dockerfile
```

If no Dockerfile, create one:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port (Cloud Run uses PORT env var)
ENV PORT=8080
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
```

Also create `.dockerignore`:
```
node_modules
.next
.git
.env.local
.DS_Store
*.log
```

---

#### **Step 2A.2: Install Google Cloud CLI**

```bash
# Install gcloud CLI (if not already)
brew install --cask google-cloud-sdk

# Initialize gcloud
gcloud init

# Login
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID
```

---

#### **Step 2A.3: Enable Required APIs**

```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry
gcloud services enable containerregistry.googleapis.com

# Enable Artifact Registry
gcloud services enable artifactregistry.googleapis.com
```

---

#### **Step 2A.4: Build and Deploy to Cloud Run**

```bash
cd /Users/khalidirfan/projects/teachmeai-intake-app

# Set variables
PROJECT_ID="your-gcp-project-id"
SERVICE_NAME="teachmeai-intake-app"
REGION="us-central1"

# Build and deploy in one command
gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --max-instances 10 \
  --memory 512Mi \
  --timeout 300 \
  --set-env-vars "GEMINI_API_KEY=AIza..." \
  --set-env-vars "JWT_SECRET=your-same-jwt-secret-from-vercel" \
  --set-env-vars "GOOGLE_SHEETS_PRIVATE_KEY=..." \
  --set-env-vars "GOOGLE_SHEETS_CLIENT_EMAIL=..." \
  --set-env-vars "GOOGLE_SHEETS_SPREADSHEET_ID=..."
```

**⚠️ SECURITY:** Don't paste secrets in command line. Use `--env-vars-file` instead:

Create `env.yaml`:
```yaml
GEMINI_API_KEY: "AIza..."
JWT_SECRET: "your-64-char-secret"
GOOGLE_SHEETS_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_CLIENT_EMAIL: "your-sa@project.iam.gserviceaccount.com"
GOOGLE_SHEETS_SPREADSHEET_ID: "1-EGTgJfe..."
RESEND_API_KEY: "re_..."
NEXT_PUBLIC_BASE_URL: "https://intake.teachmeai.in"
```

Then deploy:
```bash
gcloud run deploy teachmeai-intake-app \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --env-vars-file env.yaml
```

**Important:** Delete `env.yaml` after deployment!

---

#### **Step 2A.5: Get Cloud Run URL**

After deployment completes:
```bash
gcloud run services describe teachmeai-intake-app --region us-central1 --format 'value(status.url)'
```

Copy this URL (e.g., `https://teachmeai-intake-app-xxx-uc.a.run.app`)

---

#### **Step 2A.6: Configure Custom Domain for Cloud Run**

**In Google Cloud Console:**
1. Go to Cloud Run → Your Service
2. Click "Manage Custom Domains"
3. Add domain: `intake.teachmeai.in`
4. Verify ownership (if not already verified)
5. Google will show DNS records to add

**Add DNS Records:**

At your domain registrar, add:
```
Type: CNAME
Name: intake
Value: ghs.googlehosted.com
TTL: 3600
```

**Map the domain:**
```bash
gcloud run domain-mappings create \
  --service teachmeai-intake-app \
  --region us-central1 \
  --domain intake.teachmeai.in
```

---

### **Option B: Deploy Intake App to Vercel (Simpler, but more expensive at scale)**

If you prefer Vercel for both apps:

```bash
cd /Users/khalidirfan/projects/teachmeai-intake-app

# Push to GitHub (if not already)
git init
git add .
git commit -m "JWT token integration ready"
git remote add origin https://github.com/YOUR_USERNAME/teachmeai-intake-app.git
git push -u origin main
```

**In Vercel Dashboard:**
1. Add New Project
2. Import `teachmeai-intake-app` repo
3. Add environment variables (same as before, but add JWT_SECRET!)
4. Deploy
5. Add custom domain: `intake.teachmeai.in`
6. Update DNS (CNAME to `cname.vercel-dns.com`)

---

## 🔄 Part 3: Update Cross-App Configuration

### **Step 3.1: Update Home Site Environment Variables**

In Vercel dashboard for `teachmeai-home-site`:

1. Go to Settings → Environment Variables
2. **Update or add:**
   - `NEXT_PUBLIC_INTAKE_APP_URL` = `https://intake.teachmeai.in` (Production)
3. **Redeploy** (Deployments → Click "..." → Redeploy)

---

### **Step 3.2: Update Intake App with JWT_SECRET**

**If Cloud Run:**
```bash
gcloud run services update teachmeai-intake-app \
  --region us-central1 \
  --update-env-vars JWT_SECRET=your-same-secret-from-vercel
```

**If Vercel:**
- Go to Settings → Environment Variables
- Add `JWT_SECRET` with the EXACT same value as home site
- Redeploy

---

## 🧪 Part 4: Production Testing

### **Test 1: End-to-End Flow**

1. **Open:** https://teachmeai.in
2. **Scroll to ChatQuiz**
3. **Complete conversation:**
   - Name: "Production Test"
   - Email: YOUR_REAL_EMAIL
   - Role: "Developer"
   - Goal: "Testing"
4. **Check email inbox** (within 2 minutes)
5. **Click link** in email
6. **Verify:**
   - Opens: `https://intake.teachmeai.in?token=xxx`
   - Form shows pre-filled data
   - "Welcome back, Production Test!"

---

### **Test 2: JWT Token Validation**

1. Copy token from email URL
2. Go to https://jwt.io
3. Paste token
4. Verify payload matches your input
5. Signature should be valid (if you paste JWT_SECRET)

---

### **Test 3: Email Delivery**

**In Resend Dashboard** (https://resend.com/emails):
- Check delivery status
- Confirm "Delivered" status
- Review bounce/complaint rates

---

## 📊 Part 5: Monitoring & Analytics

### **Vercel Analytics**

Already integrated! View in Vercel Dashboard:
- Pageviews
- Custom events (`chatquiz_started`, `chatquiz_completed`)
- Performance metrics

---

### **Cloud Run Monitoring (if using)**

```bash
# View logs
gcloud run services logs read teachmeai-intake-app --region us-central1

# Or use Cloud Console
# https://console.cloud.google.com/run
```

---

### **Set Up Alerts**

**Vercel:**
- Settings → Integrations → Slack/Discord
- Get notified on deploy failures

**Cloud Run:**
- Set up error rate alerts in Cloud Monitoring
- Configure budget alerts

---

## 🔐 Part 6: Security Checklist

### **Before Going Live:**

- [ ] All `.env.local` files are gitignored
- [ ] JWT_SECRET is strong (64+ characters)
- [ ] JWT_SECRET is identical in both apps
- [ ] HTTPS enabled on both domains
- [ ] Resend domain verified (khalid@teachmeai.in)
- [ ] API keys have appropriate rate limits
- [ ] Google Sheets shared with service account email
- [ ] No API keys in client-side code
- [ ] CORS configured correctly
- [ ] Environment variables set in Production only (not exposed in logs)

---

## 🚨 Troubleshooting Production Issues

### **Issue: ChatQuiz loads but AI doesn't respond**

**Check:**
```bash
# Vercel: View Function Logs
# Click on deployment → Functions → /api/chat-quiz

# Look for errors:
# - "GEMINI_API_KEY not found"
# - "API quota exceeded"
# - "Network timeout"
```

**Fix:**
- Verify GEMINI_API_KEY is set
- Check Gemini API quota in Google AI Studio
- Increase function timeout in `vercel.json`

---

### **Issue: Email not received in production**

**Check Resend:**
1. Verify domain in Resend dashboard
2. Check DNS records (SPF, DKIM, DMARC)
3. Review delivery logs
4. Test with different email providers

**Check Vercel logs:**
```bash
# View function logs for send-intake-link
# Look for "Error sending email"
```

---

### **Issue: JWT token invalid in intake app**

**Common causes:**
1. JWT_SECRET mismatch between apps
2. Token expired (> 7 days)
3. URL encoding issue

**Debug:**
```bash
# In intake app Cloud Run logs:
gcloud run services logs read teachmeai-intake-app --limit 50

# Look for "Invalid token" or "TokenExpiredError"
```

**Fix:**
- Ensure JWT_SECRET is identical in both apps
- Regenerate JWT_SECRET if compromised:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Update in BOTH Vercel and Cloud Run
- Redeploy both apps

---

### **Issue: CORS errors in browser console**

**Add to intake app:**

Create `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://teachmeai.in' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}
```

Redeploy after adding.

---

## 📈 Part 7: Performance Optimization

### **Vercel (Home Site)**

**In `next.config.js`:**
```javascript
module.exports = {
  compress: true,
  poweredByHeader: false,
  
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Cache API routes
  async headers() {
    return [
      {
        source: '/api/chat-quiz',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ]
  },
}
```

---

### **Cloud Run (Intake App)**

**Optimize for cold starts:**

```bash
gcloud run services update teachmeai-intake-app \
  --region us-central1 \
  --min-instances 1 \
  --cpu 2 \
  --memory 1Gi
```

**Enable HTTP/2:**
Already enabled by default in Cloud Run!

---

## 💰 Part 8: Cost Estimation

### **Vercel (Free Tier: $0/month)**
- ✅ 100GB bandwidth
- ✅ Unlimited deployments
- ✅ Custom domains
- ⚠️ Upgrade to Pro ($20/mo) if bandwidth > 100GB

### **Cloud Run (Pay-per-use)**
**Estimated costs (1,000 requests/month):**
- CPU: ~$0.50/month
- Memory: ~$0.20/month
- Requests: ~$0.40/month
- **Total: ~$1-2/month**

**Free tier:**
- 2 million requests/month
- 360,000 GB-seconds compute time
- **Your usage will likely stay in free tier!**

### **Resend (Free Tier: $0/month)**
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- Upgrade to $20/mo for 50,000 emails

### **Total Monthly Cost: $0-2** 🎉

---

## 🎯 Deployment Checklist

### **Home Site (teachmeai.in):**
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables added
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] HTTPS enabled
- [ ] ChatQuiz tested in production
- [ ] Analytics working

### **Intake App (intake.teachmeai.in):**
- [ ] Code pushed to GitHub (if Vercel) or Dockerfile ready (if Cloud Run)
- [ ] Deployed to Cloud Run or Vercel
- [ ] Environment variables added (including JWT_SECRET!)
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] HTTPS enabled
- [ ] JWT token decoding tested
- [ ] Form pre-fill working

### **Integration:**
- [ ] Full end-to-end test completed
- [ ] Email delivery working
- [ ] JWT token validates
- [ ] Data flows from ChatQuiz → Email → Intake App
- [ ] No CORS errors
- [ ] Analytics tracking events

---

## 🚀 Quick Start Commands

**Deploy Home Site to Vercel:**
```bash
cd /Users/khalidirfan/projects/teachmeai-home-site
git add . && git commit -m "Production ready"
git push origin main
# Then connect in Vercel dashboard
```

**Deploy Intake App to Cloud Run:**
```bash
cd /Users/khalidirfan/projects/teachmeai-intake-app
gcloud run deploy teachmeai-intake-app \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --env-vars-file env.yaml
```

**Update Environment Variable:**
```bash
# Vercel: Use dashboard (Settings → Environment Variables)

# Cloud Run:
gcloud run services update teachmeai-intake-app \
  --region us-central1 \
  --update-env-vars KEY=VALUE
```

---

## 📞 Support Resources

**Vercel:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Cloud Run:**
- Docs: https://cloud.google.com/run/docs
- Pricing: https://cloud.google.com/run/pricing

**Resend:**
- Docs: https://resend.com/docs
- Email: support@resend.com

---

## 🎉 Congratulations!

Once all checklist items are complete, your production system is live!

**Your users can now:**
1. Visit https://teachmeai.in
2. Chat with AI assistant
3. Receive personalized email with link
4. Complete full intake at https://intake.teachmeai.in
5. Get comprehensive AI analysis report

---

**Last Updated:** January 25, 2026  
**Deployment Type:** Vercel (Home) + Cloud Run (Intake)  
**Status:** Production Ready ✅
