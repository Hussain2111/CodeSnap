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

import { useState } from 'react'
import Camera from './Camera'

function App() {
  const [view, setView] = useState<'home' | 'camera'>('home')

  if (view === 'camera') {
    return <Camera onClose={() => setView('home')} />
  }

  return (
    <div className="gs-hero">
      <div className="gs-card">
        <img src="/CodeSnapLogo.PNG" alt="CodeSnap" className="gs-logo" />
        <GoogleLogo />
        <p className="gs-desc">Instantly extract code from lecture screens — snap, extract, paste.</p>

        <div className="gs-cta">
          <button className="btn-glow" onClick={() => setView('camera')}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default App
