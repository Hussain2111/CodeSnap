import './App.css'

function GoogleLogo() {
  const letters: [string, string][] = [
    ['C', 'g-blue'],
    ['o', 'g-red'],
    ['d', 'g-yellow'],
    ['e', 'g-blue'],
    ['S', 'g-green'],
    ['n', 'g-red'],
    ['a', 'g-blue'],
    ['p', 'g-green']
  ]

  return (
    <div className="google-logo" aria-hidden>
      {letters.map(([ch, cls], i) => (
        <span key={i} className={cls}>
          {ch}
        </span>
      ))}
    </div>
  )
}

function App() {
  return (
    <div className="gs-hero">
      <div className="gs-card">
        <GoogleLogo />
        <h1 className="gs-title">CodeSnap</h1>
        <p className="gs-desc">Instantly extract code from lecture screens — snap, extract, paste.</p>

        <div className="gs-cta">
          <a className="btn-glow" href="#get-started">Get Started</a>
        </div>
      </div>
    </div>
  )
}

export default App
