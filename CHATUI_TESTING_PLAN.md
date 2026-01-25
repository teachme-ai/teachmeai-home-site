# ChatQuiz Testing Plan

**Created:** January 25, 2026  
**Status:** Ready for Testing  
**Prerequisites:** JWT_SECRET and RESEND_API_KEY configured ✅

---

## 🎯 What to Test

### **Test 1: ChatQuiz Loads Correctly**

**Steps:**
1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Scroll down to "Get Your Free AI Analysis" section
4. Verify ChatQuiz component loads

**Expected Result:**
- ✅ ChatQuiz appears with gradient header
- ✅ Initial message: "Hi there! 👋 I'm TeachMeAI's AI assistant..."
- ✅ Two quick reply buttons visible:
  - "Yes, let's go! 🚀"
  - "I have questions first"
- ✅ Input field is enabled and functional

**If it fails:**
- Check browser console for errors
- Verify all imports are correct
- Check that component file exists

---

### **Test 2: AI Conversation Flow**

**Steps:**
1. Click "Yes, let's go! 🚀" button
2. Wait for AI response (5-10 seconds)
3. AI should ask for your name
4. Type: "John Smith"
5. Press Enter or click Send
6. AI should acknowledge and ask for email
7. Type: "john@example.com"
8. Press Enter
9. AI should ask for your role
10. Type: "Software Developer"
11. Press Enter
12. AI should ask for your goal
13. Type: "Career Growth"
14. Press Enter
15. AI should congratulate and mention checking email

**Expected Results:**
- ✅ Each AI response takes 2-5 seconds
- ✅ Typing indicator shows while AI is thinking
- ✅ Messages scroll automatically to bottom
- ✅ Each message has timestamp
- ✅ User messages appear on right (blue)
- ✅ AI messages appear on left (white)
- ✅ After final message, green completion box appears

**Sample Conversation:**

```
AI: Hi there! 👋 I'm TeachMeAI's AI assistant...
You: [Click "Yes, let's go! 🚀"]

AI: Awesome! Let's start with the basics. What's your name?
You: John Smith

AI: Nice to meet you, John! 👋 What's your email address? 
    I'll send you the next step there.
You: john@example.com

AI: Got it! What do you do professionally?
You: Software Developer

AI: Perfect! What's your main goal with AI learning?
You: Career Growth

AI: Excellent! ✅ I've just sent you a personalized link to 
    john@example.com. Check your inbox (and spam folder) 
    in the next minute!
```

**If AI doesn't respond:**
- Check GEMINI_API_KEY in .env.local
- Check browser Network tab for failed API calls
- Check terminal logs for errors

---

### **Test 3: Email Delivery**

**Steps:**
1. Complete the conversation above
2. Wait 1-2 minutes
3. Check the email inbox for john@example.com
4. Also check spam folder

**Expected Result:**
✅ Email received with:
- **From:** Khalid at TeachMeAI <khalid@teachmeai.in>
- **Subject:** Complete Your AI Learning Profile - John Smith
- **Content:**
  - Personalized greeting: "Hi John! 👋"
  - Mentions role: "Software Developer"
  - Mentions goal: "Career Growth"
  - Big blue button: "Complete Your Profile →"
  - Professional HTML styling
  - Footer with links and security notes

**If email not received:**
- Check Resend dashboard: https://resend.com/emails
- Verify domain is verified in Resend
- Check RESEND_API_KEY is correct
- Check server logs for email errors
- Try with a different email (e.g., your personal email)

---

### **Test 4: JWT Token in Email Link**

**Steps:**
1. Open the email from Test 3
2. Click "Complete Your Profile →" button
3. Check the URL in browser address bar

**Expected Result:**
✅ URL format: `http://localhost:3001?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Verify Token:**
1. Copy the full token (everything after `?token=`)
2. Go to https://jwt.io
3. Paste token in "Encoded" section
4. In "Decoded" section, verify payload contains:
   ```json
   {
     "name": "John Smith",
     "email": "john@example.com",
     "role": "Software Developer",
     "goal": "Career Growth",
     "challenge": null,
     "timestamp": 1737838800000,
     "iat": 1737838800,
     "exp": 1738443600
   }
   ```
5. Signature should say "Invalid Signature" (because jwt.io doesn't have your JWT_SECRET)

**If token is missing:**
- Check send-intake-link API route is working
- Check browser console for errors during completion

---

### **Test 5: Analytics Tracking**

**Steps:**
1. Open browser DevTools → Console
2. Start a new conversation
3. Watch for analytics events

**Expected Events:**
```
✅ chatquiz_started (when ChatQuiz loads)
✅ chatquiz_message_sent (each time you send a message)
✅ chatquiz_completed (when conversation finishes)
```

**Verify:**
- Check Vercel Analytics dashboard (if configured)
- Events should appear within a few minutes

---

### **Test 6: Error Handling**

**Test 6A: Invalid Email**
1. Start conversation
2. When asked for email, type: "not-an-email"
3. AI should still accept it (validation happens server-side)
4. Email send will fail gracefully

**Test 6B: Empty Messages**
1. Try to send empty message
2. Send button should be disabled

**Test 6C: Network Error**
1. Turn off WiFi
2. Try to send a message
3. Should show error message in chat

---

### **Test 7: Mobile Responsiveness**

**Steps:**
1. Open DevTools → Toggle device toolbar (Cmd+Shift+M)
2. Select "iPhone 12 Pro"
3. Test conversation flow

**Expected Result:**
- ✅ ChatQuiz fits screen width
- ✅ Messages are readable
- ✅ Input field is accessible
- ✅ Buttons are tappable
- ✅ Scrolling works smoothly

---

### **Test 8: Multiple Conversations**

**Steps:**
1. Complete one conversation: "John Smith"
2. Refresh page
3. Start new conversation with different name: "Jane Doe"
4. Complete conversation

**Expected Result:**
- ✅ Each conversation is independent
- ✅ Both emails sent successfully
- ✅ Different JWT tokens generated
- ✅ No data mixing between conversations

---

## 🐛 Common Issues & Solutions

### **Issue: "build error TS2307: Cannot find module"**
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules .next
npm install
npm run dev
```

### **Issue: "GEMINI_API_KEY not found"**
**Solution:**
```bash
# Verify .env.local exists and has the key
cat .env.local | grep GEMINI_API_KEY

# Should show: GEMINI_API_KEY=AIza...
```

### **Issue: Email sends but never arrives**
**Solution:**
1. Check Resend dashboard for delivery status
2. Verify sender domain (khalid@teachmeai.in) is verified
3. Try sending to a different email provider
4. Check spam folder thoroughly

### **Issue: Port 3000 already in use**
**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3002
```

---

## ✅ Success Criteria

You've successfully completed Phase 1 if:

- [x] ChatQuiz loads on homepage
- [x] AI conversation flows naturally
- [x] Name, email, role, goal collected
- [x] Completion message appears
- [x] Email arrives within 2 minutes
- [x] Email contains JWT token
- [x] Token decodes correctly
- [x] Analytics events fire
- [x] Works on mobile

---

## 📊 Performance Benchmarks

**Target Metrics:**
- **ChatQuiz Load:** < 2 seconds
- **AI Response Time:** 2-5 seconds per message
- **Total Conversation:** 2-3 minutes
- **Email Delivery:** 30-120 seconds
- **Completion Rate:** 70%+ (projected)

---

## 🎯 Next Phase: Intake App Integration

Once all tests pass, hand off to the other agent:

**Deliverables:**
1. ✅ Working ChatQuiz on home site
2. ✅ Sample JWT token (from test email)
3. ✅ JWT_SECRET value (shared securely)
4. ✅ JWT_TOKEN_SPECIFICATION.md

**Other Agent Tasks:**
- [ ] Decode token from URL in intake app
- [ ] Pre-fill form fields
- [ ] Show "Welcome back" message
- [ ] Submit combined data to orchestration

---

## 📝 Test Results Log

**Date:** _____________________  
**Tester:** _____________________

| Test | Status | Notes |
|------|--------|-------|
| 1. ChatQuiz Loads | ⬜ Pass / ⬜ Fail | |
| 2. AI Conversation | ⬜ Pass / ⬜ Fail | |
| 3. Email Delivery | ⬜ Pass / ⬜ Fail | |
| 4. JWT Token | ⬜ Pass / ⬜ Fail | |
| 5. Analytics | ⬜ Pass / ⬜ Fail | |
| 6. Error Handling | ⬜ Pass / ⬜ Fail | |
| 7. Mobile | ⬜ Pass / ⬜ Fail | |
| 8. Multiple Conversations | ⬜ Pass / ⬜ Fail | |

**Overall Result:** ⬜ Ready for Production / ⬜ Needs Fixes

---

**Good luck with testing!** 🚀

If you encounter any issues not covered here, check:
- `/CHATUI_SETUP_GUIDE.md` - Detailed setup instructions
- `/LOCAL_DEVELOPMENT_GUIDE.md` - Running both apps locally
- `/JWT_TOKEN_SPECIFICATION.md` - Token format details
