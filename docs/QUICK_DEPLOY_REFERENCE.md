# 🚀 Quick Deploy Reference Card

## One-Command Deploy (Home Site)

```bash
# Navigate to home site
cd /Users/khalidirfan/projects/teachmeai-home-site

# Run deployment script
bash deploy-production.sh
```

This will:
- ✅ Verify directory and files
- ✅ Check environment variables
- ✅ Commit changes
- ✅ Push to GitHub
- ✅ Show next steps for Vercel

---

## Manual Deploy Steps

### **Home Site → Vercel**

```bash
# 1. Commit and push
git add .
git commit -m "Production ready"
git push origin main

# 2. Go to Vercel dashboard
open https://vercel.com/new

# 3. Import repository and add env vars
# 4. Deploy!
```

**Environment Variables:**
```bash
GEMINI_API_KEY=AIza...
JWT_SECRET=your-64-char-secret
RESEND_API_KEY=re_...
NEXT_PUBLIC_BASE_URL=https://teachmeai.in
NEXT_PUBLIC_INTAKE_APP_URL=https://intake.teachmeai.in
```

---

### **Intake App → Cloud Run**

```bash
# 1. Navigate to intake app
cd /Users/khalidirfan/projects/teachmeai-intake-app

# 2. Create env.yaml (copy from PRODUCTION_DEPLOYMENT_GUIDE.md)

# 3. Deploy
gcloud run deploy teachmeai-intake-app \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --env-vars-file env.yaml

# 4. Get URL
gcloud run services describe teachmeai-intake-app \
  --region us-central1 \
  --format 'value(status.url)'

# 5. Map custom domain
gcloud run domain-mappings create \
  --service teachmeai-intake-app \
  --region us-central1 \
  --domain intake.teachmeai.in
```

---

## DNS Configuration

### **For Root Domain (teachmeai.in)**

**Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21
```

### **For Subdomain (intake.teachmeai.in)**

**Cloud Run:**
```
Type: CNAME
Name: intake
Value: ghs.googlehosted.com
```

**OR Vercel (if using Vercel for both):**
```
Type: CNAME
Name: intake
Value: cname.vercel-dns.com
```

---

## Testing Checklist

```bash
# Test home site
curl -I https://teachmeai.in
# Should return: 200 OK

# Test intake app
curl -I https://intake.teachmeai.in
# Should return: 200 OK

# Test end-to-end
# 1. Complete ChatQuiz on teachmeai.in
# 2. Check email
# 3. Click link → Opens intake.teachmeai.in?token=xxx
# 4. Verify form pre-filled
```

---

## Common Commands

### **View Vercel Logs**
```bash
vercel logs teachmeai-home-site --follow
```

### **View Cloud Run Logs**
```bash
gcloud run services logs read teachmeai-intake-app \
  --region us-central1 \
  --limit 100 \
  --follow
```

### **Update Environment Variable**

**Vercel:**
- Dashboard → Settings → Environment Variables

**Cloud Run:**
```bash
gcloud run services update teachmeai-intake-app \
  --region us-central1 \
  --update-env-vars JWT_SECRET=new-value
```

### **Redeploy**

**Vercel:**
- Dashboard → Deployments → Redeploy

**Cloud Run:**
```bash
gcloud run services update teachmeai-intake-app \
  --region us-central1
```

---

## Monitoring URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Cloud Run Console:** https://console.cloud.google.com/run
- **Resend Dashboard:** https://resend.com/emails
- **Google AI Studio:** https://makersuite.google.com

---

## Emergency Rollback

**Vercel:**
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → Promote to Production

**Cloud Run:**
```bash
# List revisions
gcloud run revisions list --service teachmeai-intake-app --region us-central1

# Rollback to specific revision
gcloud run services update-traffic teachmeai-intake-app \
  --region us-central1 \
  --to-revisions REVISION_NAME=100
```

---

## Support

**Deployment Issues:**
- Read: `./PRODUCTION_DEPLOYMENT_GUIDE.md`
- Check logs in respective dashboards

**JWT Issues:**
- Verify JWT_SECRET is identical in both apps
- Check token expiration (7 days)
- Test at https://jwt.io

**Email Issues:**
- Verify domain in Resend
- Check DNS records (SPF, DKIM, DMARC)
- Review delivery logs

---

**Estimated Total Deployment Time:** 30-45 minutes  
**Cost:** $0-2/month (mostly free tier)

✅ **Ready to deploy!**
