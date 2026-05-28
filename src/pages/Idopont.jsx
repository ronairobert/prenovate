import { InlineWidget, useCalendlyEventListener } from 'react-calendly'
import { useNavigate } from 'react-router-dom'
import { useCookieConsent } from '../hooks/useCookieConsent'

function Idopont() {
  const navigate = useNavigate()
  const { accepted } = useCookieConsent()

  useCalendlyEventListener({
    onEventScheduled: () => {
      navigate('/koszonjuk')
    }
  })

  return (
    <div className="page">
      <div className="page-hero">
        <span className="hero-badge">3. lépés / 3</span>
        <h1>Időpont választás</h1>
        <p>Válasszon egy Önnek megfelelő időpontot a naptárból.</p>
      </div>

      {accepted ? (
        <div
          style={{
            borderRadius: '14px',
            border: '0.5px solid rgba(65,229,228,0.2)',
            overflow: 'hidden'
          }}
        >
          <InlineWidget
            url="https://calendly.com/MEGRENDELO_NEVE/online-konzultacio"
            styles={{ height: '700px', minWidth: '320px' }}
            pageSettings={{
              backgroundColor: '0d1f24',
              primaryColor: '41e5e4',
              textColor: 'e8f5f5'
            }}
          />
        </div>
      ) : (
        <div className="cookie-blocked">
          <div className="cookie-blocked-icon">🍪</div>
          <div className="cookie-blocked-title">
            Sütik szükségesek az időpontfoglaláshoz
          </div>
          <button
            className="btn primary"
            onClick={() => {
              localStorage.removeItem('prenovate_cookie_consent')
              window.location.reload()
            }}
          >
            Sütik kezelése
          </button>
        </div>
      )}
    </div>
  )
}

export default Idopont
