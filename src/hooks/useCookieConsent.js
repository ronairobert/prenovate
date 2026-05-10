import { useEffect, useState } from 'react'

export function useCookieConsent() {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const readConsent = () => {
      try {
        const consent = localStorage.getItem('prenovate_cookie_consent')
        setAccepted(consent === 'accepted')
      } catch {
        setAccepted(false)
      }
    }

    readConsent()

    const handleStorage = (event) => {
      if (event.key === 'prenovate_cookie_consent') {
        setAccepted(event.newValue === 'accepted')
      }
    }

    const handleCustomEvent = () => {
      readConsent()
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('cookie-consent-changed', handleCustomEvent)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('cookie-consent-changed', handleCustomEvent)
    }
  }, [])

  return { accepted }
}
