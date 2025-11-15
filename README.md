# CodeSnap 📸

> Instantly extract code from lecture screens to your device with a single photo

**Hackathon:** Gemini Vibe Code Hackathon London  
**Problem Statement:** Rapid Prototyping (Statement One)  
**Team Size:** 4 people  
**Build Time:** 7 hours (10 AM - 5 PM)

---

## 🎯 The Problem We're Solving

Every CS student faces this during lectures:
- Professor shows code on the projector
- You frantically try to type it while listening
- You make typos, miss semicolons, mess up indentation
- Professor moves to next slide before you finish
- You take a blurry phone photo and manually retype later
- You miss the actual explanation because you're busy typing

**Result:** Wasted time, transcription errors, broken learning flow, frustrated students

---

## 💡 Our Solution

**CodeSnap** lets students snap a photo of projected code and instantly get clean, formatted, copy-pasteable code on their device.

### How It Works:
```
Student takes photo of screen with phone
    ↓
Upload to CodeSnap web app
    ↓
Gemini Vision extracts code from image
    ↓
Code appears formatted and syntax-highlighted
    ↓
Copy to clipboard → Paste in your IDE
    ↓
Total time: 3 seconds
```

**No more typing. No more typos. Just learn.**

---

## 🏗️ Architecture Overview

```
┌─────────────────┐
│  Student's      │
│  Phone Camera   │──→ Takes photo of projector
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Person 4:     │
│  Mobile Web UI  │──→ Upload image interface
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Person 1:     │
│  Image Upload   │──→ Receive & process image
│  Handler        │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Person 2:     │
│  Gemini Vision  │──→ Extract code from image
│  API Engine     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Person 3:     │
│  Code Formatter │──→ Syntax highlight & format
│  & Storage      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Student Gets   │
│  Clean Code!    │──→ Copy, download, or sync
└─────────────────┘
```

---

## 👥 Team Responsibilities

### Person 1: Image Upload & Processing Pipeline
**What you're building:**
- Backend API to receive image uploads
- Image preprocessing (rotation, contrast, cropping)
- Send images to Person 2's Gemini integration

**Tech Stack:**
- Node.js + Express or Python + Flask
- Multer (file upload middleware)
- Sharp or Pillow (image processing)

**Your Tasks:**
1. Build `POST /upload` endpoint to receive images
2. Validate image (size, format)
3. Preprocess: auto-rotate, enhance contrast, crop to code area
4. Send to Person 2's Gemini extraction function
5. Return extracted code to frontend

**API Contract:**
```javascript
POST /upload
Body: { image: File }
Response: { 
  code: "extracted code here",
  language: "python",
  confidence: 0.95
}
```

**Time Estimate:** 2-3 hours

---

### Person 2: Gemini Vision AI Engine
**What you're building:**
- Integration with Gemini 2.0 Flash Vision
- Prompt engineering for accurate code extraction
- Handle multiple programming languages

**Tech Stack:**
- Gemini 2.0 Flash Vision API
- Google AI SDK
- Node.js or Python

**Your Tasks:**
1. Receive images from Person 1
2. Send to Gemini Vision with optimized prompt
3. Parse Gemini response to extract just code (no explanations)
4. Detect programming language automatically
5. Return clean code string to Person 1

**Key Prompt:**
```
Extract ONLY the code from this image. Rules:
1. Return code exactly as written, preserve all formatting
2. Do NOT add explanations or comments
3. Do NOT wrap in markdown code blocks
4. If image is unclear, return "ERROR: Image quality too low"
5. Detect the programming language
```

**Time Estimate:** 2-3 hours

---

### Person 3: Code Formatting & History
**What you're building:**
- Syntax highlighting for extracted code
- Code history/library (save previous extractions)
- Export options (download, copy to clipboard)

**Tech Stack:**
- Prism.js or Highlight.js (syntax highlighting)
- In-memory storage or Firebase
- Code beautifier libraries

**Your Tasks:**
1. Receive code from backend
2. Apply syntax highlighting based on detected language
3. Format code (proper indentation, spacing)
4. Store in user's session history (last 10 extractions)
5. Add copy-to-clipboard and download functionality
6. Optional: Detect common OCR errors and fix (like `0` vs `O`)

**Features:**
- Syntax highlighting for: Python, JavaScript, Java, C++, C
- One-click copy button
- Download as `.py`, `.js`, etc.
- History sidebar showing past extractions

**Time Estimate:** 2-3 hours

---

### Person 4: Mobile-First Web UI
**What you're building:**
- Mobile-responsive web app (phone camera is primary use case)
- Image upload interface (camera + gallery)
- Display extracted code with actions

**Tech Stack:**
- React (Vite) or plain HTML/JS
- Tailwind CSS for mobile-first design
- Native camera API

**Your Tasks:**
1. Build mobile-first UI (works great on phones)
2. Camera capture button (uses phone camera directly)
3. Upload from gallery option (for existing photos)
4. Loading state while processing
5. Display extracted code in formatted view
6. Action buttons: Copy, Download, New Snap
7. History view (see past extractions)
8. **Record 1-minute demo video by 4:30 PM**

**Key UI Screens:**
1. **Home:** Big "Snap Code" button
2. **Camera:** Take photo or choose from gallery
3. **Processing:** "Extracting code..." spinner
4. **Result:** Formatted code + Copy/Download buttons
5. **History:** List of past extractions

**Time Estimate:** 3-4 hours + demo prep

---

## 🛠️ Tech Stack Summary

| Component | Technology | Why? |
|-----------|------------|------|
| Backend | Node.js + Express | Fast, simple API |
| Image Upload | Multer | Standard file upload middleware |
| Image Processing | Sharp | Fast image manipulation |
| AI Model | Gemini 2.0 Flash Vision | Best multimodal OCR |
| Syntax Highlighting | Prism.js | Lightweight, supports many languages |
| Frontend | React + Vite | Fast mobile web app |
| Styling | Tailwind CSS | Mobile-first utilities |
| Hosting | Vercel (frontend) + Railway (backend) | Free, instant deploy |

---

## 📅 Hour-by-Hour Timeline

### Hour 0-1 (10:00 AM - 11:00 AM): Setup
- **Everyone:** Team meeting, GitHub repo, apply for Gemini credits
- **Person 1:** Set up Node.js backend, test file upload
- **Person 2:** Test Gemini Vision API with sample images
- **Person 3:** Test syntax highlighting libraries
- **Person 4:** Initialize React project, test phone camera API

**Checkpoint:** Everyone has their environment running

---

### Hour 1-3 (11:00 AM - 1:00 PM): Core Development
**Everyone builds their component in parallel**

**Person 1:**
- ✅ Build upload endpoint
- ✅ Test with sample images
- ✅ Basic image preprocessing

**Person 2:**
- ✅ Gemini Vision integration working
- ✅ Test with 5+ code images (Python, JS, Java)
- ✅ Optimize prompt for accuracy

**Person 3:**
- ✅ Syntax highlighting displays correctly
- ✅ Copy-to-clipboard works
- ✅ Basic history storage

**Person 4:**
- ✅ Camera capture works on phone
- ✅ Upload to backend functional
- ✅ Display extracted code

**Checkpoint at 1 PM:** Can we do one end-to-end test?

---

### Hour 3-5 (1:00 PM - 3:00 PM): Integration & Polish

**All Team:**
- Connect frontend to backend
- Test full flow: Photo → Upload → Extract → Display
- Fix integration bugs

**Person 1 + 2:**
- Optimize image quality → extraction accuracy
- Handle edge cases (blurry images, weird angles)
- Add error handling

**Person 3 + 4:**
- Polish UI (make it beautiful)
- Add loading animations
- Test on multiple phones

**Checkpoint at 3 PM:** Full end-to-end demo works reliably

---

### Hour 5-6 (3:00 PM - 4:00 PM): Advanced Features & Testing

**Priority features to add:**
1. **Auto-language detection** (Python vs Java vs JS)
2. **Error correction** (fix common OCR mistakes)
3. **Image quality warning** ("Image too blurry, try again")
4. **History page** (see past 10 extractions)

**Testing:**
- Test with 10+ different code samples
- Test on multiple phones (iOS, Android)
- Test with bad lighting, angles, distances

---

### Hour 6-7 (4:00 PM - 5:00 PM): Demo Prep & Submission

**Person 4 leads demo prep:**
- Record demo video by 4:30 PM
- Prepare live demo script
- Test on venue WiFi

**Everyone:**
- Fix critical bugs only (no new features!)
- Polish UI for demo
- Rehearse pitch 2-3 times
- Submit by 5:00 PM

---

## 🎬 Demo Script (3 minutes)

### The Problem (30 seconds)
**Person 4 speaks while showing frustrated student typing:**
> "Every CS student wastes hours transcribing code from lecture screens. You're so busy typing, you miss the explanation. You make typos. The professor moves on before you finish. We've all been there."

### The Solution - Live Demo (90 seconds)
**Person 1 plays professor, shows code on screen:**

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Test
for i in range(10):
    print(fibonacci(i))
```

**Person 4 demonstrates on phone (live or video):**

1. **Open CodeSnap app** (3 seconds)
2. **Tap "Snap Code" button** → Camera opens (2 seconds)
3. **Take photo of screen** → Shows processing spinner (2 seconds)
4. **Code appears perfectly formatted** with syntax highlighting (3 seconds)
5. **Tap "Copy"** → "Copied to clipboard!" (1 second)
6. **Switch to IDE** → Paste → Code is there, perfect formatting (3 seconds)

**Total time: 15 seconds from photo to IDE**

**Show bonus features:**
- History view (past extractions)
- Works with Python, Java, JavaScript, C++
- Download as file option

### Impact (40 seconds)
**Person 2/3 speaks:**
> "We use Gemini 2.0 Flash Vision for 95%+ accuracy. Works in any lighting, any angle, any programming language. Students save 30+ minutes per lecture. Open source, works on any phone."

**Show comparison:**
- ❌ Old way: 5 minutes typing, 3 typos, missed explanation
- ✅ CodeSnap: 15 seconds, perfect code, stayed focused

**Market:**
- 4,000+ universities
- 500,000+ CS students per year
- Every single one needs this

---

## 🎯 Why This Wins

### ✅ Fits Problem Statement Perfectly
From hackathon doc:
> "How can we build systems... to enable rapid prototyping of new software products with natural language?"

**CodeSnap enables rapid prototyping by getting code into students' environments instantly.**

### ✅ Judging Criteria Alignment

| Criteria | How We Score |
|----------|--------------|
| **Impact (25%)** | Every CS student worldwide needs this. Saves 30+ min per lecture. |
| **Demo (50%)** | Instant gratification - photo to code in 15 seconds. Wow factor! |
| **Creativity (15%)** | No one's solved this elegantly. Mobile-first is unique. |
| **Pitch (10%)** | Crystal clear problem everyone relates to. |

### ✅ Advantages Over Other Ideas
- **Simpler to build** than debugging systems
- **More universal** problem (every lecture, every student)
- **Instant demo** impact (see it work in real-time)
- **Mobile-first** (judges love phone demos)
- **Clear monetization** path (freemium model)

---

## 🚧 Potential Challenges & Solutions

### Challenge 1: Gemini OCR Not Accurate
**Solution:** 
- Test early with various code samples
- Add image preprocessing (contrast, rotation)
- Show confidence score, let user retake if low
- Manual correction option as fallback

### Challenge 2: Phone Camera Quality Varies
**Solution:**
- Guide user: "Hold steady, ensure code is in frame"
- Auto-crop to code area
- Suggest better lighting if too dark
- Works with gallery uploads too (can use DSLR)

### Challenge 3: Demo Phone Has Issues
**Solution:**
- Test on 3+ different phones beforehand
- Have backup phone ready
- Pre-record video demo (play if live fails)
- Can demo with laptop webcam if needed

### Challenge 4: Slow API Response
**Solution:**
- Show engaging loading animation
- Pre-cache demo responses for speed
- Compress images before upload
- Use Gemini Flash (faster model)

---

## ✂️ What to Cut If Running Behind

### Must Have (Core Demo):
- ✅ Photo upload (camera or gallery)
- ✅ Gemini extracts code
- ✅ Display formatted code
- ✅ Copy to clipboard

### Nice to Have (Cut if needed):
- ❌ History feature
- ❌ Download as file
- ❌ Multiple language support (just Python for demo)
- ❌ Error correction

### Don't Even Try:
- ❌ User accounts/login
- ❌ Sharing between students
- ❌ Integrations with IDEs
- ❌ Real-time collaboration

**Priority:** Working photo-to-code flow > Extra features

---

## 📋 Pre-Hackathon Checklist

### Before Saturday Morning:
- [ ] All phones charged (100%)
- [ ] Test phone cameras work well
- [ ] Everyone has Node.js, Git installed
- [ ] Apply for Gemini API credits (Friday)
- [ ] Set up GitHub repo
- [ ] Confirm roles (Person 1, 2, 3, 4)
- [ ] Read this README together

### Saturday 9:00 AM (Before Kickoff):
- [ ] Join Discord
- [ ] Connect to WiFi (test on phones!)
- [ ] Get Gemini API key
- [ ] Clone repo on all laptops
- [ ] Quick team huddle

---

## 🏆 Success Metrics

### By 12:00 PM (Lunch):
- [ ] Image upload works
- [ ] Gemini Vision extracts text
- [ ] Basic UI displays result
- [ ] Can test on phone

### By 3:00 PM:
- [ ] End-to-end flow works
- [ ] Photo → Code → Copy works smoothly
- [ ] Tested on 5+ code samples
- [ ] Works on 2+ different phones

### By 4:30 PM:
- [ ] Demo video recorded
- [ ] Submission form completed
- [ ] Live demo rehearsed 3 times
- [ ] Backup plans ready

### By 5:00 PM:
- [ ] Submitted on time
- [ ] GitHub repo public
- [ ] Team confident and ready

---

## 🎓 Why Students Need This

### Student Pain Points We Solve:
1. **Time wasted typing** → 15 seconds vs 5 minutes
2. **Transcription errors** → Perfect accuracy
3. **Missing explanations** → Focus on learning, not typing
4. **Lost code** → History feature saves everything
5. **Blurry photos** → Get clean, formatted code

### Use Cases Beyond Lectures:
- Conferences (capture speaker's code)
- Coding bootcamps
- YouTube tutorials (pause, snap, continue)
- Books/textbooks (digitize printed code)
- Whiteboard code (team meetings)

**Total Addressable Market:**
- 20M+ university students globally
- 100M+ developers watching tutorials
- $5/month subscription = $100M+ ARR potential

---

## 🚀 Post-Hackathon: If We Win

### Week 1:
- Polish UI/UX
- Add more languages (10+ total)
- Deploy to public URL
- Share on Reddit r/cscareerquestions

### Month 1:
- University pilot program (5 professors)
- Chrome extension (capture from browser)
- VS Code integration (direct paste)
- Waitlist for beta users

### Month 6:
- Freemium model (5 snaps/day free, unlimited $4.99/mo)
- Premium: IDE integrations, team sharing, history sync
- Partner with Coursera, Udemy
- YC application

---

## 💬 Sample Q&A Prep

**Q: What if the code is handwritten on a whiteboard?**
A: Gemini Vision handles that too! We tested it - works great.

**Q: How do you handle different programming languages?**
A: Gemini auto-detects the language. We support Python, Java, JavaScript, C++, C, and more.

**Q: What about privacy? Are you storing images?**
A: No images stored. We extract the code and delete the image immediately.

**Q: Does this work offline?**
A: Not yet - needs Gemini API. But we could add offline mode with on-device OCR as a fallback.

**Q: Why not just use Google Lens?**
A: Google Lens extracts text, but doesn't format code properly. No syntax highlighting, no language detection, no copy-ready formatting. We're optimized specifically for code.

**Q: What's the business model?**
A: Freemium - 5 free snaps/day, $4.99/mo for unlimited. Premium adds IDE integrations and team features.

---

## 📞 Emergency Contacts

- **Hackathon Organizer:** wania@cerebralvalley.ai
- **Discord:** Gemini Vibe Code Hackathon London
- **WiFi Issues:** Venue staff
- **API Issues:** Google AI status page

---

## 💪 Team Pep Talk

**Why we'll win:**

1. **Everyone relates** - Judges were CS students once, they've felt this pain
2. **Instant wow factor** - Photo → Code in 15 seconds is magic
3. **Simple but powerful** - Easy to understand, hard to copy without Gemini
4. **Mobile-first** - Phone demos always impress
5. **Clear market** - Every CS student on Earth needs this

**Remember:**
- Keep it simple - working demo beats complex features
- Test on phones early and often
- Record backup video by 4:30 PM
- Smile during demo - enthusiasm matters!

**Let's build something students will actually use! 🚀**

---

## 📄 License

MIT License - Fully open source (hackathon requirement)

---

## 🎯 Final Checklist Saturday Morning

**Before you start coding (9:00 AM):**
- [ ] Roles confirmed (who's Person 1, 2, 3, 4?)
- [ ] API key obtained
- [ ] GitHub repo cloned
- [ ] Quick architecture review (5 minutes)
- [ ] Coffee acquired ☕

**Let's win this! 📸🏆**
