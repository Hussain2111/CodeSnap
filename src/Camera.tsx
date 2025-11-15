import { useEffect, useRef, useState } from 'react'

type Props = {
  onClose: () => void
}

export default function Camera({ onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [captured, setCaptured] = useState<string | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [extractedCode, setExtractedCode] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        })
        if (!mounted) return
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setError(null)
      } catch (e: any) {
        console.error('Camera error', e)
        setError(e?.message || 'Unable to access camera')
      }
    }

    startCamera()

    return () => {
      mounted = false
      // stop tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
    }
  }, [])

  function capture() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const data = canvas.toDataURL('image/jpeg', 0.92)
    setCaptured(data)
    // stop camera stream to "freeze" frame and release device
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }

  function retake() {
    setCaptured(null)
    // restart camera stream
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false })
      .then((stream) => {
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      })
      .catch((e) => setError(e?.message || 'Unable to access camera'))
  }

  async function analyzeImage() {
    if (!captured) return
    setExtracting(true)
    setExtractedCode(null)
    try {
      const API_BASE = (import.meta as any).env.VITE_API_BASE || 'https://code-snap-backend.vercel.app'
      const url = `${API_BASE}/extract`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: captured }),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Extraction failed')
      }
      const json = await res.json()
      if (json.error) {
        throw new Error(json.error)
      }
      const displayText = json.code ? `Language: ${json.language}\n\n${json.code}` : 'No code extracted'
      setExtractedCode(displayText)
    } catch (err: any) {
      setExtractedCode(`ERROR: ${err?.message || String(err)}`)
    } finally {
      setExtracting(false)
    }
  }

  async function copyToClipboard() {
    if (!extractedCode) return
    try {
      await navigator.clipboard.writeText(extractedCode)
      // You could add a toast notification here if desired
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  function closeModal() {
    setExtractedCode(null)
  }

  return (
    <div className="camera-page">
      <div className="camera-top">
        <button className="btn-ghost" onClick={onClose} aria-label="Close camera">Back</button>
        <div className="camera-title">Camera</div>
        <div />
      </div>

      <div className="video-wrap">
        {error ? (
          <div className="camera-error">{error}</div>
        ) : (
          <>
            {!captured && <video ref={videoRef} className="camera-video" playsInline muted />}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {captured && (
              <div className="capture-preview">
                <img src={captured} alt="capture preview" />
              </div>
            )}
          </>
        )}
      </div>

      <div className="camera-controls">
        {!captured ? (
          <button className="capture-btn" onClick={capture} aria-label="Capture photo">
            <span className="inner" />
          </button>
        ) : (
          <div className="capture-actions">
            <button className="btn" onClick={retake}>Retake</button>
            <a className="btn primary" href={captured} download="codesnap.jpg">Download</a>
            <button className="btn" onClick={analyzeImage} disabled={extracting}>
              {extracting ? 'Analyzing…' : 'Analyze'}
            </button>
          </div>
        )}
      </div>

      {extractedCode !== null && (
        <div className="code-modal-overlay" onClick={closeModal}>
          <div className="code-modal" onClick={(e) => e.stopPropagation()}>
            <div className="code-modal-header">
              <h3>Extracted Code</h3>
              <button className="code-modal-close" onClick={closeModal} aria-label="Close">×</button>
            </div>
            <div className="code-modal-content">
              <pre className="code-modal-text">{extractedCode}</pre>
            </div>
            <div className="code-modal-footer">
              <button className="btn primary" onClick={copyToClipboard}>Copy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
