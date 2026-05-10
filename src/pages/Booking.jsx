import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InlineWidget, useCalendlyEventListener } from 'react-calendly'
import { useBooking } from '../context/BookingContext'
import { useCookieConsent } from '../hooks/useCookieConsent'

function Booking() {
  const { confirmBooking } = useBooking()
  const navigate = useNavigate()
  const [consultType, setConsultType] = useState(null)
  const { accepted } = useCookieConsent()

  useEffect(() => {
    if (consultType) {
      setTimeout(() => {
        document
          .querySelector('.consult-selector-wrap')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [consultType])

  useCalendlyEventListener({
    onEventScheduled: (event) => {
      confirmBooking({
        calendlyEvent: event.data.payload,
        bookedAt: new Date().toISOString()
      })
      navigate('/fizetes')
    }
  })

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Időpontfoglalás</h1>
          <p className="lead">
            Mondja el röviden, miben segíthetünk - 24 órán belül visszajelzünk.
          </p>
        </div>
        <div className="hero-badge">Ingyenes első konzultáció</div>
      </section>

      <section>
        <div className="consult-selector-wrap">
          <div className="consult-selector-label">
            Válasszon konzultációs módot
          </div>
          <div className="consult-selector">
            <div
              className={`consult-option ${consultType === 'online' ? 'active' : ''}`}
              onClick={() => setConsultType('online')}
            >
              <div className="consult-option-icon">💻</div>
              <div className="consult-option-title">Online konzultáció</div>
              <div className="consult-option-desc">
                Videóhíváson keresztül, otthonról. Google Meet vagy Zoom.
              </div>
              <span className="consult-option-tag">60 perc</span>
            </div>

            <div
              className={`consult-option ${consultType === 'helyszini' ? 'active' : ''}`}
              onClick={() => setConsultType('helyszini')}
            >
              <div className="consult-option-icon">🏠</div>
              <div className="consult-option-title">Jelenléti konzultáció</div>
              <div className="consult-option-desc">
                Helyszíni felmérés, személyesen az ingatlanban.
              </div>
              <span className="consult-option-tag">90 perc</span>
            </div>
          </div>
        </div>

        {!consultType && (
          <div className="consult-placeholder">
            <div className="consult-placeholder-icon">👆</div>
            <div className="consult-placeholder-text">
              Válasszon konzultációs módot a foglaláshoz
            </div>
          </div>
        )}

        {consultType && accepted && (
          <div
            style={{
              borderRadius: '14px',
              border: '0.5px solid rgba(65, 229, 228, 0.2)',
              overflow: 'hidden'
            }}
          >
            <InlineWidget
              url={
                consultType === 'online'
                  ? 'https://calendly.com/ronainorbert02/30min'
                  : 'https://calendly.com/ronainorbert02/jelenleti-konzultacio'
              }
              styles={{ height: '700px', minWidth: '320px' }}
              pageSettings={{
                backgroundColor: '0d1f24',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: '41e5e4',
                textColor: 'e8f5f5'
              }}
            />
          </div>
        )}

        {consultType && !accepted && (
          <div className="cookie-blocked">
            <div className="cookie-blocked-icon">🍪</div>
            <div className="cookie-blocked-title">
              Sütik szükségesek az időpontfoglaláshoz
            </div>
            <p className="cookie-blocked-text">
              A Calendly naptár betöltéséhez el kell fogadnod a sütiket.
            </p>
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
      </section>
    </div>
  )
}

export default Booking
