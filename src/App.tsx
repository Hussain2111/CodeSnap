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

import { useState, useEffect } from 'react'
import Camera from './Camera'

const TYPING_CODE = `function extractCode(image) {
  const code = analyze(image);
  return format(code);
}`

type CodeAnimationProps = {
  skipAnimation?: boolean
}

function CodeAnimation({ skipAnimation = false }: CodeAnimationProps) {
  const [displayedCode, setDisplayedCode] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (skipAnimation) {
      setShowContent(true)
      return
    }
    
    setShouldShow(true)
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < TYPING_CODE.length) {
        setDisplayedCode(TYPING_CODE.slice(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setShowContent(true)
        }, 500)
      }
    }, 20)

    return () => clearInterval(typingInterval)
  }, [skipAnimation])

  if (showContent || !shouldShow) return null

  return (
    <div className="code-animation-overlay">
      <div className="code-animation-container">
        <div className="code-animation-header">
          <span className="code-animation-dot"></span>
          <span className="code-animation-dot"></span>
          <span className="code-animation-dot"></span>
        </div>
        <pre className="code-animation-code">
          <code>{displayedCode}</code>
          <span className="code-cursor">|</span>
        </pre>
      </div>
    </div>
  )
}

function App() {
  const [view, setView] = useState<'home' | 'camera'>('home')
  const [fromCamera, setFromCamera] = useState(false)

  useEffect(() => {
    if (fromCamera) {
      setFromCamera(false)
    }
  }, [fromCamera])

  if (view === 'camera') {
    return <Camera onClose={() => {
      setFromCamera(true)
      setView('home')
    }} />
  }

  return (
    <>
      <CodeAnimation skipAnimation={fromCamera} />
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
    </>
  )
}

export default App
