# Local Development Setup Guide

**Last Updated:** January 25, 2026  
**Purpose:** Run both Home Site and Intake App locally for end-to-end testing

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────┐
│  Home Site (teachmeai-home-site)    │
│  Port: 3000                          │
│  URL: http://localhost:3000          │
│                                      │
│  - ChatUI Quiz                       │
│  - JWT Token Generation              │
│  - Email Sending                     │
└────────────┬─────────────────────────┘
             │
             │ Email Link:
             │ http://localhost:3001?token=xxx
             │
             ↓
┌─────────────────────────────────────┐
│  Intake App (teachmeai-intake-app)  │
│  Port: 3001                          │
│  URL: http://localhost:3001          │
│                                      │
│  - Token Decoding                    │
│  - Form Pre-fill                     │
│  - Orchestration Agents              │
└─────────────────────────────────────┘
```

---

## 🛠️ Setup Instructions

### **Step 1: Home Site Setup**

```bash
# Navigate to home site
cd /Users/khalidirfan/projects/teachmeai-home-site

# Install dependencies (already done ✅)
npm install

# Configure environment variables
```

**Edit `.env.local`:**

```bash
# REQUIRED - Already have this
GEMINI_API_KEY=AIzaSyBHm1Wy2c4vH_63fiyz2MY3uZQVqtuuPfo

# REQUIRED - Generate with this command:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-generated-secret-here

# REQUIRED - Get from https://resend.com (or skip for now)
RESEND_API_KEY=re_your-key-here

# Already set correctly
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_INTAKE_APP_URL=http://localhost:3001
```

---

### **Step 2: Intake App Setup**

```bash
# Navigate to intake app
cd /Users/khalidirfan/projects/teachmeai-intake-app

# Install dependencies (if needed)
npm install

# Configure environment variables
```

**Add to `.env.local`:**

```bash
# ADD THIS - MUST BE IDENTICAL to home site
JWT_SECRET=your-generated-secret-here

# Already have these
GEMINI_API_KEY=AIzaSyBHm1Wy2c4vH_63fiyz2MY3uZQVqtuuPfo
GOOGLE_SHEET_ID=1-EGTgJfeAAEVwPodDJyFbtleM5ww7qZZHJ9J-GJ4YzM
# ... other existing variables
```

---

## 🚀 Running Both Apps

### **Option A: Two Terminal Windows (Recommended)**

**Terminal 1 - Home Site:**
```bash
cd /Users/khalidirfan/projects/teachmeai-home-site
npm run dev
# Server runs on http://localhost:3000
```

**Terminal 2 - Intake App:**
```bash
cd /Users/khalidirfan/projects/teachmeai-intake-app
npm run dev -- -p 3001
# Server runs on http://localhost:3001
```

---

### **Option B: Background Process (Advanced)**

```bash
# Start home site in background
cd /Users/khalidirfan/projects/teachmeai-home-site
npm run dev &

# Start intake app on different port
cd /Users/khalidirfan/projects/teachmeai-intake-app
npm run dev -- -p 3001
```

To stop background processes:
```bash
# Find and kill processes
lsof -ti:3000,3001 | xargs kill -9
```

---

## 🧪 Testing End-to-End Flow

### **Test 1: Home Site ChatUI (without email)**

1. Open http://localhost:3000
2. Find the ChatUI component
3. Have a conversation:
   - Name: "Test User"
   - Email: "test@example.com"
   - Role: "Developer"
   - Goal: "Learn AI"
4. Verify completion message appears
5. ✅ ChatUI works!

---

### **Test 2: JWT Token Generation**

1. Complete the ChatUI conversation above
2. Check browser console
3. Look for: `chatquiz_completed` event
4. If email is configured, check inbox
5. If email NOT configured, check server logs for:
   ```
   Error sending email: ...
   ```
   (This is expected without RESEND_API_KEY)

6. **Manual token test:**
   ```bash
   # In home site directory
   node -e "
   const jwt = require('jsonwebtoken');
   const token = jwt.sign(
     {
       name: 'Test User',
       email: 'test@example.com',
       role: 'Developer',
       goal: 'Learn AI'
     },
     'your-jwt-secret-here',
     { expiresIn: '7d' }
   );
   console.log('Token:', token);
   console.log('\\nTest URL:');
   console.log('http://localhost:3001?token=' + token);
   "
   ```

7. Copy the generated URL
8. ✅ Token generation works!

---

### **Test 3: Intake App Token Decoding (Phase 2)**

**Note:** This requires the other agent to implement token decoding first.

Once implemented:
1. Copy the token URL from Test 2
2. Paste in browser
3. Intake app should:
   - Decode token
   - Show "Welcome back, Test User!"
   - Pre-fill name, email, role, goal
   - ✅ Integration complete!

---

## 🔧 Troubleshooting

### **Problem: Port 3000 already in use**

```bash
# Find what's using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use a different port for home site
npm run dev -- -p 3002
```

### **Problem: Both apps trying to use same port**

Always specify different ports:
- Home site: `npm run dev` (default 3000)
- Intake app: `npm run dev -- -p 3001`

### **Problem: Can't generate JWT token**

```bash
# Make sure jsonwebtoken is installed
cd /Users/khalidirfan/projects/teachmeai-home-site
npm list jsonwebtoken

# If missing:
npm install jsonwebtoken
```

### **Problem: JWT_SECRET mismatch**

Both `.env.local` files MUST have **identical** JWT_SECRET:

```bash
# Generate once
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy output to BOTH:
# - teachmeai-home-site/.env.local
# - teachmeai-intake-app/.env.local
```

---

## 📋 Quick Reference

### **Home Site Commands**
```bash
cd /Users/khalidirfan/projects/teachmeai-home-site
npm run dev              # Start on port 3000
npm run build           # Production build
npm run lint            # Check code quality
```

### **Intake App Commands**
```bash
cd /Users/khalidirfan/projects/teachmeai-intake-app
npm run dev -- -p 3001  # Start on port 3001
npm run build           # Production build
```

### **Environment Variables Checklist**

**Home Site:**
- [x] GEMINI_API_KEY (already have it)
- [ ] JWT_SECRET (generate new)
- [ ] RESEND_API_KEY (optional for now)
- [x] NEXT_PUBLIC_BASE_URL=http://localhost:3000
- [x] NEXT_PUBLIC_INTAKE_APP_URL=http://localhost:3001

**Intake App:**
- [x] GEMINI_API_KEY (already have it)
- [ ] JWT_SECRET (MUST match home site)
- [x] GOOGLE_SHEET_ID (already have it)

---

## 🎯 Current Status

**Phase 1 (Home Site) - ✅ COMPLETE:**
- [x] ChatUI component built
- [x] AI conversation working
- [x] JWT token generation
- [x] Email sender (pending RESEND_API_KEY)
- [x] Documentation complete

**Phase 2 (Intake App) - ⏳ PENDING:**
- [ ] JWT token decoder
- [ ] Form pre-fill component
- [ ] Welcome back UI
- [ ] Combined data submission
- **Assigned to:** Other agent

---

## 🔐 Security Reminder

**For Local Development:**
- ✅ Using `http://` is fine (localhost)
- ✅ JWT tokens work the same over HTTP

**For Production:**
- ⚠️ MUST use `https://` 
- ⚠️ Change URLs in .env to production domains
- ⚠️ Verify email domains in Resend
- ⚠️ Use environment variables in Vercel dashboard

---

## 📞 Need Help?

**If something doesn't work:**
1. Check both apps are running on different ports
2. Verify JWT_SECRET matches in both .env.local files
3. Check browser console for errors
4. Review server terminal output
5. Consult `/CHATUI_SETUP_GUIDE.md`

---

**Ready to test!** 🚀

Start both servers and try the ChatUI conversation flow.
