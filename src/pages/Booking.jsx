import { useNavigate } from 'react-router-dom'
import { InlineWidget, useCalendlyEventListener } from 'react-calendly'
import { useBooking } from '../context/BookingContext'

function Booking() {
  const { confirmBooking } = useBooking()
  const navigate = useNavigate()

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
        <div
          style={{
            background: '#0d1f24',
            borderRadius: '14px',
            border: '0.5px solid rgba(65, 229, 228, 0.12)',
            overflow: 'hidden'
          }}
        >
          <InlineWidget
            url="https://calendly.com/ronairobi031/online-konzultacio"
            styles={{
              height: '700px',
              minWidth: '320px'
            }}
            pageSettings={{
              backgroundColor: '0d1f24',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: '41e5e4',
              textColor: 'e8f5f5'
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default Booking
