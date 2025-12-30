# CodeSnap

**Instantly extract code from lecture screens — snap, extract, paste.**

CodeSnap is a powerful tool that allows you to capture code from physical screens (like lecture slides, whiteboards, or monitors) using your mobile device camera and extract the text using AI. The extracted code can then be transferred directly to VS Code via a companion extension.

## 🌟 Features

- **Mobile Web App**: Capture code snippets using your phone's camera
- **AI-Powered Extraction**: Uses Gemini AI to accurately extract code from images
- **VS Code Integration**: Seamlessly transfer extracted code to VS Code via WebSocket connection
- **QR Code Pairing**: Easy device pairing with VS Code using QR codes
- **Multi-Language Support**: Detects and preserves code language syntax
- **PWA Ready**: Install as a Progressive Web App on mobile devices

## 📁 Project Structure

```
codesnap/
├── src/                      # React frontend source
│   ├── App.tsx              # Main app component with landing page
│   ├── Camera.tsx           # Camera capture and code extraction
│   ├── App.css              # Styles
│   └── main.tsx             # Entry point
├── extension/               # VS Code extension
│   ├── src/
│   │   └── extension.ts     # Extension logic
│   └── package.json         # Extension manifest
├── server/                  # Optional local server
│   └── savePicture.js       # Image saving endpoint
└── public/
    ├── manifest.json        # PWA manifest
    └── CodeSnapLogo.PNG     # App logo
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- VS Code 1.85.0 or higher (for extension)
- Modern web browser with camera access
- Backend API deployed (for code extraction)

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API endpoint:**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE=https://your-backend-api.com
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

### VS Code Extension Setup

1. **Navigate to extension directory:**
   ```bash
   cd extension
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile TypeScript:**
   ```bash
   npm run compile
   ```

4. **Development mode:**
   Press `F5` in VS Code to open a new window with the extension loaded

5. **Watch mode:**
   ```bash
   npm run watch
   ```

## 🎯 How It Works

### Mobile App Flow

1. **Landing Page**: User is greeted with an animated code typing effect
2. **Camera Access**: Click "Get Started" to open camera interface
3. **Capture**: Take a photo of code on screen using the capture button
4. **Extract**: Click "Analyze" to send image to AI for code extraction
5. **Results**: View extracted code with language detection
6. **Copy/Save**: Copy to clipboard or save image locally

### VS Code Extension Flow

1. **Start Server**: Extension automatically starts WebSocket server on port 3001
2. **Pair Device**: Use "CodeSnap: Pair Device" command to generate QR code
3. **Scan QR**: Scan QR code with mobile app to establish connection
4. **Receive Code**: Code sent from mobile app opens automatically in new editor tab

## 🔧 Configuration

### Extension Settings

Access via VS Code Settings (`Ctrl+,` or `Cmd+,`):

- `codesnap.port`: WebSocket server port (default: 3001)

### Backend API

The mobile app expects a backend endpoint at `/extract` that:
- Accepts POST requests with JSON body: `{ "imageData": "base64-encoded-image" }`
- Returns JSON response: `{ "code": "extracted code", "language": "detected language" }`

## 🎨 Tech Stack

**Frontend:**
- React 19.2
- TypeScript 5.9
- Vite 7.2
- CSS3 with Google-inspired design

**VS Code Extension:**
- TypeScript 5.1
- WebSocket (ws 8.14)
- QRCode generation (qrcode 1.5)
- VS Code Extension API

**Backend (not included):**
- Expected to use Gemini AI or similar for OCR/code extraction

## 📱 PWA Features

- Installable on mobile devices
- Offline-capable (with service worker)
- Native-like camera access
- Icon and splash screen configured

## 🔐 Security Considerations

- Camera access requires HTTPS in production
- WebSocket connections should be on same local network
- Backend API should implement rate limiting
- Image data is base64-encoded for transmission

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Additional language support
- Improved code extraction accuracy
- Syntax highlighting in preview
- Direct cloud sync options
- Mobile app for iOS/Android

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Gemini AI for code extraction capabilities
- Google's Material Design for UI inspiration
- VS Code Extension API documentation

## 📞 Support

For issues or questions:
- Check existing GitHub issues
- Create new issue with detailed description
- Include screenshots and error messages

---

**Made with ❤️ for developers who learn from lectures**
