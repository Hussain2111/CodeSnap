import './App.css'

function App() {
  return (
    <div className="homepage">
      <header className="hero">
        <div className="hero-content">
          <h1 className="title">CodeSnap — Photo to Code</h1>
          <p className="subtitle">
            Snap a photo of lecture code and get clean, copy-ready source instantly.
          </p>
          <div className="actions">
            <a className="btn primary" href="#get-started">Get Started</a>
            <a className="btn" href="#demo">Try Demo</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="phone-mock">📸</div>
        </div>
      </header>

      <main className="features">
        <section className="feature-list">
          <article>
            <h3>Fast</h3>
            <p>Extract code in seconds using Gemini Vision.</p>
          </article>
          <article>
            <h3>Accurate</h3>
            <p>Preserves indentation and formatting for easy copy/paste.</p>
          </article>
          <article>
            <h3>Mobile First</h3>
            <p>Built for phones and desktops — capture or upload images.</p>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <small>Made for the Gemini Vibe Code Hackathon — Team CodeSnap</small>
      </footer>
    </div>
  )
}

export default App
