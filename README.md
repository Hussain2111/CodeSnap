# CodeSnap 📸

> Instantly extract code from lecture screens to your device with a single photo

**Hackathon:** Gemini Vibe Code Hackathon London  
**Problem Statement:** Rapid Prototyping (Statement One)  
**Team:** Hussain + Shayaan  
**Build Time:** 7 hours (10 AM - 5 PM)

---

## 🎯 The Problem

CS students waste hours typing code from lecture screens. You make typos, miss explanations, and the professor moves on before you finish.

## 💡 The Solution

**CodeSnap:** Snap a photo → Gemini Vision extracts code → Get formatted, copy-ready code in 15 seconds.

---

## 👥 Team Split

### **Hussain: Vision + Frontend** 🎨
**What you're building:**
- Mobile web app with camera interface
- Gemini 2.0 Flash Vision API integration
- Display extracted code with syntax highlighting
- Copy to clipboard functionality

**Tech Stack:**
- React (Vite)
- Gemini 2.0 Flash Vision API
- Prism.js (syntax highlighting)
- Tailwind CSS

**Your Tasks:**
1. Build mobile-first UI with camera capture
2. Integrate Gemini Vision API (call directly from frontend)
3. Display formatted code with syntax highlighting
4. Add copy button and loading states
5. Handle errors (blurry image, no code detected)

**Time:** 5-6 hours

---

### **Shayaan: Backend + Infrastructure** ⚙️
**What you're building:**
- Backend API for history storage (optional)
- Image preprocessing and optimization
- Deployment and infrastructure
- Demo prep and video recording

**Tech Stack:**
- Node.js + Express (optional - for history feature)
- Sharp (image processing)
- Firebase or Railway (hosting)
- Vercel (frontend hosting)

**Your Tasks:**
1. Help Hussain with Gemini API setup and testing
2. Build optional backend for history storage
3. Image preprocessing (if needed for better accuracy)
4. Deploy both frontend and backend
5. Record demo video by 4:30 PM
6. Prepare pitch and presentation

**Time:** 4-5 hours

---

## 🏗️ Simple Architecture

### **Option A: Frontend Only (Simpler)**
```
React App (Hussain)
    ↓
Camera → Capture photo
    ↓
Call Gemini Vision API directly
    ↓
Display extracted code
    ↓
Copy to clipboard

No backend needed!
Shayaan helps with deployment + demo
```

### **Option B: With Backend (More Features)**
```
React App (Hussain)
    ↓
Camera → Capture photo
    ↓
Upload to Backend (Shayaan)
    ↓
Backend calls Gemini Vision
    ↓
Store in history
    ↓
Return to frontend
    ↓
Display + Copy
```

**Recommendation:** Start with Option A. Add backend only if time allows.

---

## 📅 Hour-by-Hour Plan

### **10:00 AM - 11:00 AM: Setup**

**Both:**
- Apply for Gemini API credits
- Create GitHub repo
- Get API key

**Hussain:**
- Set up React project with Vite
- Test phone camera API
- Make first Gemini Vision API call

**Shayaan:**
- Research image preprocessing
- Set up deployment accounts (Vercel, Railway)
- Test Gemini API with sample images

**Checkpoint:** Hussain can capture photo, Gemini API responds

---

### **11:00 AM - 2:00 PM: Core Development**

**Hussain:**
- ✅ Build camera capture UI
- ✅ Upload image to Gemini Vision
- ✅ Parse response and extract code
- ✅ Display code in text area
- ✅ Basic syntax highlighting
- ✅ Copy to clipboard button

**Shayaan:**
- ✅ Test Gemini with various code images (Python, Java, JS)
- ✅ Optimize prompts for accuracy
- ✅ Build simple backend API (if needed)
- ✅ Image preprocessing helpers
- ✅ Start deployment setup

**Checkpoint at 1 PM:** Can take photo and see extracted code

---

### **2:00 PM - 3:30 PM: Integration + Polish**

**Both:**
- Test end-to-end flow on multiple phones
- Fix bugs and improve accuracy
- Add error handling (blurry image, no code detected)

**Hussain:**
- Polish UI (make it beautiful)
- Add loading animations
- Improve syntax highlighting
- Test with 10+ different code samples
- Mobile responsiveness

**Shayaan:**
- Deploy backend (if built)
- Deploy frontend to Vercel
- Test on live URLs
- Add history feature (if time)
- Prepare demo samples

**Checkpoint at 3 PM:** Deployed and working on live URL

---

### **3:30 PM - 4:30 PM: Demo Prep**

**Shayaan leads this:**
- Record 1-minute demo video (must finish by 4:30 PM!)
- Prepare demo code samples (intentionally good examples)
- Test demo flow 3 times
- Write pitch script

**Hussain:**
- Fix any critical bugs
- Final UI polish
- Make sure copy button works perfectly
- Test on venue WiFi

**Checkpoint at 4:30 PM:** Video recorded and uploaded

---

### **4:30 PM - 5:00 PM: Submit + Rehearse**

**Both:**
- Fill out submission form
- Submit project
- Rehearse pitch 2-3 times
- Prepare for Q&A
- Relax, grab coffee ☕

---

## 💻 Tech Implementation

### **Hussain's Frontend Code Structure**

```javascript
// App.jsx
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [image, setImage] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  const captureImage = async () => {
    // Use phone camera
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    });
    // Capture frame and convert to base64
  };
  
  const extractCode = async (imageBase64) => {
    setLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const prompt = `Extract ONLY the code from this image. 
    Rules:
    1. Return code exactly as written
    2. Do NOT add explanations
    3. Do NOT wrap in markdown
    4. If unclear, return "ERROR: Image quality too low"`;
    
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: imageBase64, mimeType: "image/jpeg" } }
    ]);
    
    setCode(result.response.text());
    setLoading(false);
  };
  
  return (
    <div className="app">
      <button onClick={captureImage}>Snap Code</button>
      {loading && <p>Extracting code...</p>}
      {code && <CodeDisplay code={code} />}
    </div>
  );
}
```

### **Shayaan's Backend (Optional)**

```javascript
// server.js
const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post('/extract', upload.single('image'), async (req, res) => {
  const imageBase64 = req.file.buffer.toString('base64');
  
  // Call Gemini Vision
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  
  const result = await model.generateContent([
    "Extract code from image...",
    { inlineData: { data: imageBase64, mimeType: req.file.mimetype } }
  ]);
  
  res.json({ code: result.response.text() });
});

app.listen(3000);
```

---

## 🎬 Demo Script (3 minutes)

### **Minute 1: The Problem (30 sec)**
**Shayaan speaks:**
> "Every CS student wastes time typing code from lectures. You make typos, miss explanations, the professor moves on. We've all been there."

### **Minute 2: Live Demo (90 sec)**
**Hussain demonstrates on phone:**

1. Show projector with Python code:
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

2. Open CodeSnap on phone
3. Tap "Snap Code" → Camera opens
4. Take photo of screen
5. Shows "Extracting code..." (2 seconds)
6. Code appears perfectly formatted with syntax highlighting
7. Tap "Copy" → "Copied to clipboard!"
8. Switch to VS Code → Paste → Perfect code!

**Total time: 15 seconds from photo to IDE**

### **Minute 3: Impact (30 sec)**
**Hussain speaks:**
> "Uses Gemini 2.0 Flash Vision for 95%+ accuracy. Works with any language, any lighting. Students save 30+ minutes per lecture. Every CS student needs this."

**Show stats:**
- ⏱️ 15 seconds vs 5 minutes
- ✅ Zero typos
- 📚 Works with Python, Java, JS, C++
- 🌍 500,000+ CS students need this

---

## 🎯 Why This Wins

### **Judging Criteria:**

| Criteria | Score | Why |
|----------|-------|-----|
| **Impact (25%)** | 🔥🔥🔥 | Every CS student worldwide needs this |
| **Demo (50%)** | 🔥🔥🔥 | Photo to code in 15 seconds = magic |
| **Creativity (15%)** | 🔥🔥 | Mobile-first, uses Gemini Vision uniquely |
| **Pitch (10%)** | 🔥🔥🔥 | Crystal clear problem everyone relates to |

### **Why It's Strong:**
✅ Universal problem (every lecture, every student)  
✅ Instant wow factor (15-second demo)  
✅ Simple but powerful (easy to understand)  
✅ Mobile-first (phone demos impress)  
✅ Uses Gemini Vision creatively  
✅ Clear market (500K+ students)  
✅ Doable in 7 hours with 2 people  

---

## 🚧 Challenges & Solutions

### **Challenge 1: Camera API on Different Phones**
**Solution:**
- Test on both phones early (11 AM)
- Fallback: Upload from gallery
- Works on any modern browser

### **Challenge 2: Gemini Accuracy Issues**
**Solution:**
- Optimize prompt in first hour
- Add "Image too blurry, try again" warning
- Guide user: "Hold steady, good lighting"

### **Challenge 3: Demo Fails Live**
**Solution:**
- Pre-record video demo by 4:30 PM
- Test on venue WiFi before judging
- Have backup phone ready

### **Challenge 4: Running Out of Time**
**Solution:**
- Skip backend (call Gemini directly from frontend)
- Skip history feature
- Focus: Photo → Code → Copy (core flow only)

---

## ✂️ What to Cut If Behind Schedule

### **Must Have (Core Demo):**
- ✅ Camera capture
- ✅ Gemini Vision extraction
- ✅ Display formatted code
- ✅ Copy to clipboard

### **Nice to Have (Cut if needed):**
- ❌ Backend/history storage
- ❌ Multiple language support (just Python)
- ❌ Download as file
- ❌ Advanced error handling

### **Don't Even Try:**
- ❌ User accounts
- ❌ Sharing features
- ❌ IDE integrations
- ❌ Offline mode

**Priority:** Working photo-to-code flow > everything else

---

## 📋 Saturday Morning Checklist

### **Before You Start (9:00 AM):**
- [ ] Both phones fully charged
- [ ] Laptops charged
- [ ] Gemini API credits applied for
- [ ] GitHub repo created
- [ ] WiFi password: SXguest!
- [ ] Roles confirmed (Hussain = Frontend, Shayaan = Support)

### **Setup Phase (10:00 AM):**
- [ ] Gemini API key obtained
- [ ] React project initialized
- [ ] First API call successful
- [ ] Camera API tested on phone

---

## 🏆 Success Checkpoints

### **12:00 PM (Lunch):**
- [ ] Camera capture works
- [ ] Gemini API extracts text
- [ ] Code displays on screen

### **2:00 PM:**
- [ ] End-to-end flow works
- [ ] Tested on 3+ code samples
- [ ] Copy button works

### **4:30 PM:**
- [ ] Demo video recorded
- [ ] Submission form filled
- [ ] Live demo tested 3 times

### **5:00 PM:**
- [ ] SUBMITTED ✅
- [ ] Ready for judging

---

## 🎓 Why Students Need This

### **Problems We Solve:**
1. ⏰ Time: 15 sec vs 5 min
2. ✍️ Typos: Zero errors
3. 🎯 Focus: Listen, don't type
4. 📸 Blurry photos: Get clean code
5. 🔄 Retyping: Never again

### **Use Cases:**
- University lectures
- Conference talks  
- YouTube coding tutorials
- Textbook code examples
- Whiteboard code in meetings

**Market Size:**
- 500,000+ CS students per year (US/UK)
- 20M+ worldwide
- $5/month = $100M+ potential

---

## 💬 Q&A Prep

**Q: What if handwritten on whiteboard?**  
A: Gemini Vision handles it! We tested - works well.

**Q: Why not just use Google Lens?**  
A: Lens extracts text, but doesn't format code properly. We optimize for code specifically with syntax highlighting.

**Q: Does it work offline?**  
A: Not yet - needs Gemini API. Could add offline OCR as fallback.

**Q: What languages do you support?**  
A: Gemini auto-detects. We've tested Python, Java, JavaScript, C++, C.

**Q: Business model?**  
A: Freemium - 5 free snaps/day, $4.99/month unlimited. Premium adds IDE integrations.

**Q: Why is this better than typing?**  
A: 15 seconds vs 5 minutes. Zero typos. Students can focus on learning instead of transcribing.

---

## 🚀 Post-Hackathon (If We Win)

### **Week 1:**
- Polish UI
- Add more languages
- Chrome extension
- Share on Reddit/Twitter

### **Month 1:**
- University pilot (5 professors)
- VS Code integration
- Beta waitlist

### **Month 6:**
- Launch freemium ($4.99/mo)
- YC application with $50K credits as traction
- Integrate with Coursera/Udemy

---

## 🔗 Important Links

- **Hackathon Discord:** https://discord.gg/94mP3c7uSJ
- **Gemini API Credits:** https://docs.google.com/forms/d/e/1FAIpQLSdOhB7G8EdwGYxqcLdbgcpqP4qIgXk7z5UX_3L1Xx9XPQWuXA/viewform
- **Submission Form:** https://cerebralvalley.ai/e/vibe-code-gemini-london/hackathon/submit
- **Gemini Docs:** https://ai.google.dev/docs
- **React Camera API:** https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

---

## 📞 Emergency Contacts

- **Organizer:** wania@cerebralvalley.ai
- **Discord:** Gemini Vibe Code Hackathon London
- **WiFi Issues:** Venue staff
- **API Issues:** Check Google AI status

---

## 💪 Final Pep Talk

**Why you'll win:**

1. **Everyone relates** - Judges were students, they've felt this pain
2. **Instant magic** - Photo to code in 15 seconds
3. **Simple concept** - Easy to understand, hard to build without Gemini
4. **Mobile-first** - Phone demos always wow
5. **Clear market** - Every CS student needs this
6. **Two-person advantage** - Less coordination, faster execution

**Your strengths:**
- Hussain knows frontend + vision → perfect for this
- Shayaan handles infrastructure + demo → critical for winning
- Small team = faster decisions, less overhead
- You can build this in 5-6 hours, leaving time for polish

**Remember:**
- Test camera early (11 AM)
- Record demo video by 4:30 PM (NON-NEGOTIABLE)
- Working demo > perfect code
- Smile during pitch - enthusiasm wins

**You got this! 📸🏆**

---

## 📄 License

MIT License - Fully open source

---

## ⏰ Final Timeline Summary

| Time | What |
|------|------|
| 10:00-11:00 | Setup, test Gemini API |
| 11:00-14:00 | Build core features |
| 14:00-15:30 | Integration + testing |
| 15:30-16:30 | Demo prep + video |
| 16:30-17:00 | Submit + rehearse |
| 17:15 | JUDGING STARTS |

**Let's win this thing! 🚀📸**
