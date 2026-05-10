import { useEffect, useState } from 'react'

function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const consent = localStorage.getItem('prenovate_cookie_consent')
      setVisible(consent !== 'accepted')
    } catch {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      localStorage.setItem('prenovate_cookie_consent', 'accepted')
      window.dispatchEvent(new Event('cookie-consent-changed'))
      setVisible(false)
    } catch {
      setVisible(false)
    }
  }

  if (!visible) {
    return null
  }

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <div className="cookie-banner-title">Sütikezelés</div>
        <p className="cookie-banner-text">
          A weboldal megfelelő működéséhez és időpontfoglaláshoz sütiket
          használunk.
        </p>
        <button type="button" className="btn primary" onClick={handleAccept}>
          Elfogadom
        </button>
      </div>
    </div>
  )
}

export default ConsentBanner