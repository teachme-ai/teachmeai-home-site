# 🔐 Security & Environment Variables Guide

**Last Updated:** January 26, 2026  
**Purpose:** Secure management of credentials and environment variables

---

## ⚠️ Security Principles

### **Never Commit Secrets**
- ✅ Use `.env.local` for local development (automatically ignored by Git)
- ✅ Use `.env.example` as a template (safe to commit)
- ✅ Use Vercel environment variables for production
- ❌ **NEVER** commit actual API keys, secrets, or credentials to Git
- ❌ **NEVER** include real credentials in documentation

---

## 📁 File Structure

```
teachmeai-home-site/
├── .env.local           ← Your ACTUAL secrets (NEVER commit)
├── .env.example         ← Template with placeholders (safe to commit)
└── .gitignore           ← Ensures .env.local is ignored

teachmeai-intake-app/
├── .env.local           ← Your ACTUAL secrets (NEVER commit)
├── .env.example         ← Template with placeholders (safe to commit)
├── service-account-key.json  ← Google service account (NEVER commit)
└── .gitignore           ← Ensures .env.local is ignored
```

---

## 🛠️ Local Development Setup

### **Step 1: Copy Example Files**

```bash
# Home Site
cd teachmeai-home-site
cp .env.example .env.local

# Intake App
cd teachmeai-intake-app
cp .env.example .env.local
```

### **Step 2: Fill in Your Credentials**

Edit each `.env.local` file with your actual values:

#### **Home Site** (`.env.local`):
```bash
GEMINI_API_KEY=AIza...your-real-key-here
JWT_SECRET=8fc3db9eca4d2c7c...your-generated-secret
RESEND_API_KEY=re_...your-resend-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_INTAKE_APP_URL=http://localhost:3001
```

#### **Intake App** (`.env.local`):
```bash
GEMINI_API_KEY=AIza...same-as-home-site
JWT_SECRET=8fc3db9eca4d2c7c...MUST-MATCH-home-site
GOOGLE_SHEET_ID=1-EGT...your-sheet-id
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
ADMIN_TOKEN=admin-token-123
```

### **Step 3: Verify Git Ignore**

```bash
# These should NOT appear in git status
git status | grep .env.local
# (no output = good!)

# These SHOULD appear (safe to commit)
git status | grep .env.example
# ?? .env.example (new file, safe to commit)
```

---

## ☁️ Production Setup (Vercel)

### **Home Site Environment Variables**

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `GEMINI_API_KEY` | `AIza...` | Get from Google AI Studio |
| `JWT_SECRET` | `8fc3...` | **MUST match intake app** |
| `RESEND_API_KEY` | `re_...` | Get from Resend.com |
| `NEXT_PUBLIC_BASE_URL` | `https://teachme-ai.vercel.app` | Your production URL |
| `NEXT_PUBLIC_INTAKE_APP_URL` | `https://intake.teachme-ai.vercel.app` | Intake app URL |

### **Intake App Environment Variables**

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `GEMINI_API_KEY` | `AIza...` | Same as home site |
| `JWT_SECRET` | `8fc3...` | **MUST match home site** |
| `GOOGLE_SHEET_ID` | `1-EGT...` | Your Google Sheet ID |
| `GOOGLE_APPLICATION_CREDENTIALS` | `{...json...}` | Paste JSON content (not file path) |
| `ADMIN_TOKEN` | `admin-token-123` | Change to secure value |

---

## 🔑 Getting Your Credentials

### **1. Gemini API Key**

1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza`)
5. Add to both `.env.local` files

### **2. JWT Secret**

Generate a cryptographically secure random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Output example:**
```
a1b2c3d4e5f6...64-character-hex-string...xyz789
```

⚠️ **CRITICAL:** Use the **SAME** JWT_SECRET in both projects!

### **3. Resend API Key**

1. Visit: https://resend.com
2. Sign up / Sign in
3. Create API key
4. Copy key (starts with `re_`)
5. Add to home site `.env.local`

### **4. Google Sheet ID**

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
                                      └── This is your Sheet ID ──┘
```

### **5. Service Account Key**

See: [`HOW_TO_GET_SERVICE_ACCOUNT_KEY.md`](./HOW_TO_GET_SERVICE_ACCOUNT_KEY.md)

---

## 🚨 What to Do if Credentials Are Exposed

### **If you accidentally commit secrets to Git:**

1. **Immediately revoke the exposed credentials:**
   - Gemini API: Delete key in Google AI Studio
   - Resend: Delete API key in Resend dashboard
   - Service Account: Delete in Google Cloud Console

2. **Generate new credentials:**
   - Create new API keys
   - Generate new JWT secret
   - Update all `.env.local` files

3. **Update Vercel:**
   - Update environment variables with new values
   - Redeploy both applications

4. **Remove from Git history:**
   ```bash
   # Use git-filter-repo or BFG Repo-Cleaner
   # Or create a new repository if history is compromised
   ```

---

## ✅ Security Checklist

Before pushing to GitHub:
- [ ] `.env.local` is listed in `.gitignore`
- [ ] No actual credentials in documentation files
- [ ] `.env.example` contains only placeholders
- [ ] `service-account-key.json` is in `.gitignore`
- [ ] Run: `git status` - no sensitive files should appear

Before deploying to production:
- [ ] All environment variables set in Vercel
- [ ] JWT_SECRET matches between both apps
- [ ] Production URLs are correct
- [ ] Service account has correct permissions
- [ ] API keys are active and working

---

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [How to Get Service Account Key](./HOW_TO_GET_SERVICE_ACCOUNT_KEY.md)
- [Local Development Guide](./LOCAL_DEVELOPMENT_GUIDE.md)

---

**Last Updated:** January 26, 2026  
**Status:** Production Ready 🔒
