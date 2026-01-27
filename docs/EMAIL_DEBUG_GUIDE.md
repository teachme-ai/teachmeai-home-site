# Email Debugging Guide

**Issue:** Completed ChatUI but didn't receive email

---

## ✅ **Quick Checks:**

### **1. Check Resend Dashboard**
**Go to:** https://resend.com/emails

**Look for:**
- Recent sent emails
- Status: Delivered ✅ / Bounced ❌ / Failed ❌
- Error messages if any

**Common issues:**
- Domain not verified
- API key invalid
- Rate limit exceeded (free tier: 100 emails/day)

---

### **2. Check Browser Console**

**Open DevTools** (F12 or Cmd+Option+I)

**Network Tab:**
1. Filter by: `send-intake-link`
2. Check status: Should be `200 OK`
3. Click on request → Response tab
4. Look for: `{"success":true,"emailId":"..."}` ✅
5. Or error: `{"error":"..."}` ❌

**Console Tab:**
- Look for red errors
- Search for: "email" or "resend"

---

### **3. Check Vercel Logs**

**Go to:** Vercel Dashboard → Your Project → Logs

**Search for:**
```
send-intake-link
Error sending email
Resend
```

**Common errors:**
```
Missing API key
Invalid API key  
Domain not verified
From address not allowed
```

---

### **4. Email Address Issues**

**Check:**
- ✅ Valid email format (name@domain.com)
- ✅ No typos
- ✅ Check spam/junk folder
- ✅ Wait 1-2 minutes (sometimes delayed)

**Try different email:**
- Gmail
- Outlook
- Yahoo
- Personal domain

---

### **5. Resend Configuration**

**Verify these settings in Resend:**

**Domain Verification:**
1. Go to: Resend → Domains
2. Check: `teachmeai.in` is verified ✅
3. If not, add DNS records:
   ```
   TXT  @  v=spf1 include:_spf.resend.com ~all
   ```

**From Address:**
- Must use verified domain
- Current: `khalid@teachmeai.in`
- Must match domain in Resend

---

## 🔧 **Manual Test:**

**Test email sending directly:**

```bash
# In your terminal (with .env.local values)
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Khalid at TeachMeAI <khalid@teachmeai.in>",
    "to": ["your-test@email.com"],
    "subject": "Test Email",
    "html": "<p>Test from Resend API</p>"
  }'
```

**Expected response:**
```json
{
  "id": "re_...",
  "from": "khalid@teachmeai.in",
  "to": ["your-test@email.com"],
  "created_at": "..."
}
```

---

## 📊 **Common Issues & Solutions:**

### **Issue: Domain Not Verified**
**Solution:**
1. Go to Resend → Domains
2. Add `teachmeai.in`
3. Add DNS records they provide
4. Wait 5-30 minutes
5. Click "Verify"

### **Issue: "From address not allowed"**
**Solution:**
- From address MUST be on verified domain
- Use: `khalid@teachmeai.in` (your domain)
- NOT: `noreply@resend.dev` (not verified)

### **Issue: API Key Invalid**
**Solution:**
1. Go to Resend → API Keys
2. Create new key
3. Copy immediately (shown once!)
4. Update in Vercel: Environment Variables
5. Redeploy

### **Issue: Rate Limit Exceeded**
**Solution:**
- Free tier: 100 emails/day, 10/hour
- Wait for limit to reset
- Or upgrade plan

---

## ✅ **Test Flow:**

**1. LocalHost Test:**
```bash
# Start dev server
cd /Users/khalidirfan/projects/teachmeai-home-site
npm run dev

# Open browser
http://localhost:3000

# Complete ChatUI conversation
# Check terminal for logs
```

**2. Production Test:**
- Go to Vercel URL
- Complete conversation
- Check Resend dashboard immediately
- Check email within 2 minutes

---

## 🎯 **Expected Email:**

**From:** Khalid at TeachMeAI <khalid@teachmeai.in>  
**Subject:** Complete Your AI Learning Profile - [Your Name]  
**Content:**
- Personalized greeting
- Mentions your role and goal
- Big blue button: "Complete Your Profile →"
- Link format: `https://intake.teachmeai.in?token=eyJ...`

**If you got completion message but no email:**
1. ✅ ChatUI worked
2. ✅ AI conversation worked
3. ✅ JWT token generated
4. ❌ Email sending failed

**Check in this order:**
1. Resend dashboard (did it try to send?)
2. Vercel logs (any errors?)
3. Browser console (API call succeeded?)
4. Spam folder (email arrived but filtered?)

---

## 🐛 **Debug Environment Variables:**

**Check Vercel has these:**
```bash
RESEND_API_KEY=re_...
NEXT_PUBLIC_INTAKE_APP_URL=https://intake.teachmeai.in
```

**Verify locally:**
```bash
# Check .env.local
cat .env.local | grep RESEND
```

---

## 📞 **Still Not Working?**

**Get detailed logs:**

1. **In chat-quiz component**, add console.log before email call
2. **In send-intake-link API**, add console.log
3. **Check response** from Resend API
4. **Share error** message for help

---

**Most common cause:** Domain not verified in Resend!  
**Quick fix:** Verify domain or use Resend's test domain temporarily.
