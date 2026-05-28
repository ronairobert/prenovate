import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

const plans = [
  {
    name: 'Online konzultáció',
    priceValue: 15000,
    priceSuffix: '/ 60 perc',
    features: [
      'Videóhíváson keresztül',
      'Felújítási terv áttekintése',
      'Kérdés-válasz 60 percben'
    ]
  },
  {
    name: 'Komplex tanácsadás',
    priceValue: 45000,
    priceSuffix: '/ helyszíni',
    badge: 'Legnépszerűbb',
    features: [
      'Helyszíni felmérés',
      'Részletes költségvetés',
      'Energetikai javaslatok',
      '1 hónap utánkövetés'
    ]
  },
  {
    name: 'Projektmenedzsment',
    priceValue: null,
    priceLabel: 'Egyedi áron',
    priceSuffix: '/ projekt',
    features: [
      'Teljes körű koordináció',
      'Kivitelező menedzsment',
      'Heti státuszjelentés'
    ]
  }
]

const formatPrice = (value) => `${value.toLocaleString('hu-HU')} Ft`

function Payment() {
  const [selectedIndex, setSelectedIndex] = useState(1)
  const selectedPlan = plans[selectedIndex]
  const { bookingData, confirmPayment } = useBooking()
  const navigate = useNavigate()

  const bookingSummary = bookingData
    ? `Foglalás: ${bookingData.date || '—'} — ${bookingData.type || '—'}`
    : 'Foglalás: —'

  const summary = useMemo(() => {
    if (!selectedPlan.priceValue) {
      return { vat: '—', total: 'Egyedi' }
    }

    const vatValue = Math.round(selectedPlan.priceValue * 0.27)
    const totalValue = selectedPlan.priceValue + vatValue

    return {
      vat: formatPrice(vatValue),
      total: formatPrice(totalValue)
    }
  }, [selectedPlan])

  return (
    <div className="page payment-page">
      <section className="payment-hero">
        <div className="payment-hero-badge">
          <span className="payment-hero-dot" aria-hidden="true" />
          Biztonságos fizetés
        </div>
        <h1>Válasszon csomagot</h1>
        <p className="payment-subtitle">
          Rugalmas csomagok, átlátható díjak. A fizetés Barionon keresztül,
          bankkártyával történik.
        </p>
        <p className="payment-booking">{bookingSummary}</p>
      </section>

      <section className="payment-steps" aria-label="Fizetési lépések">
        <div className="step">
          <span className="step-circle step-done" aria-hidden="true">
            ✓
          </span>
          <span className="step-label step-label-active">Időpont</span>
        </div>
        <span className="step-line" aria-hidden="true" />
        <div className="step">
          <span className="step-circle step-active">2</span>
          <span className="step-label step-label-active">Csomag &amp; fizetés</span>
        </div>
        <span className="step-line" aria-hidden="true" />
        <div className="step">
          <span className="step-circle step-inactive">3</span>
          <span className="step-label">Visszaigazolás</span>
        </div>
      </section>

      <section className="payment-layout">
        <div className="plan-selector">
          {plans.map((plan, index) => (
            <button
              key={plan.name}
              type="button"
              className={`plan-option${index === selectedIndex ? ' selected' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="plan-header">
                <h2>{plan.name}</h2>
                {plan.badge && <span className="plan-badge">{plan.badge}</span>}
              </div>
              <div className="plan-price">
                {plan.priceValue ? formatPrice(plan.priceValue) : plan.priceLabel}
                <span className="plan-suffix">{plan.priceSuffix}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature} className="plan-feature">
                    <span className="plan-dot" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="payment-side">
          <div className="payment-card">
            <div className="payment-card-title">
              <span className="payment-card-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              Bankkártyaadatok
            </div>
            <div className="payment-card-box">
              <label className="payment-field">
                Kártyaszám
                <input type="text" placeholder="•••• •••• •••• ••••" />
              </label>
              <div className="payment-row">
                <label className="payment-field">
                  Lejárat
                  <input type="text" placeholder="HH / ÉÉ" />
                </label>
                <label className="payment-field">
                  CVC
                  <input type="text" placeholder="•••" />
                </label>
              </div>
            </div>
            <div className="payment-trust">
              <span className="barion-badge">barion</span>
              <span>
                A fizetés biztonságosan, Barionon keresztül történik
              </span>
            </div>
          </div>

          <div className="order-card">
            <div className="order-summary">
              <div className="order-row">
                <span className="order-label">Csomag</span>
                <span className="order-value">{selectedPlan.name}</span>
              </div>
              <div className="order-row">
                <span className="order-label">ÁFA (27%)</span>
                <span className="order-value">{summary.vat}</span>
              </div>
              <div className="order-divider" />
              <div className="order-row order-total">
                <span>Összesen</span>
                <span className="order-total-value">{summary.total}</span>
              </div>
            </div>
            <button
              type="button"
              className="pay-button"
              onClick={() => {
                confirmPayment()
                navigate('/idopont')
              }}
            >
              Fizetés indítása
            </button>
            <div className="trust-row">
              <div className="trust-item">
                <span className="trust-dot" aria-hidden="true" />
                SSL titkosítás
              </div>
              <div className="trust-item">
                <span className="trust-dot" aria-hidden="true" />
                PCI DSS megfelelő
              </div>
              <div className="trust-item">
                <span className="trust-dot" aria-hidden="true" />
                Visszatérítési garancia
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Payment
