import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

function Felmeres() {
  const navigate = useNavigate()
  const { setSurveyData } = useBooking()
  const [form, setForm] = useState({
    type: '',
    year: '',
    size: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!form.type.trim()) nextErrors.type = 'Kötelező mező'
    if (!form.year.trim()) nextErrors.year = 'Kötelező mező'
    if (!form.size.trim()) nextErrors.size = 'Kötelező mező'
    if (!form.description.trim()) nextErrors.description = 'Kötelező mező'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSending(true)

    try {
      await fetch('https://script.google.com/macros/s/AKfycbzWwTi2uuXCS1r0hhyL_KNzOCA-BS-9wKKoeTQqFEkjWgOn4t8g8Y_Mg3-YZLvlDgzd6Q/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString('hu-HU'),
          ingatlan_tipus: form.type,
          epites_eve: form.year,
          alapterulet: form.size,
          leiras: form.description
        })
      })
    } catch (err) {
      console.error('Google Sheets error:', err)
    }

    setSurveyData(form)
    setSending(false)
    navigate('/fizetes')
  }

  return (
    <div className="page">
      <div className="page-hero">
        <span className="hero-badge">1. lépés / 3</span>
        <h1>Ingatlan felmérése</h1>
        <p>
          Kérjük, adjon meg néhány alapinformációt ingatlanáról,
          hogy felkészülhessünk a konzultációra.
        </p>
      </div>

      <div className="form-card">
        <div className="form-grid">
          <div className="field field-full">
            <label>Milyen típusú az ingatlan? *</label>
            <input
              type="text"
              placeholder="Pl. panel lakás, családi ház, társasházi lakás"
              value={form.type}
              onChange={(event) =>
                setForm({ ...form, type: event.target.value })
              }
            />
            {errors.type && <span className="field-error">{errors.type}</span>}
          </div>

          <div className="field">
            <label>Mikor épült az ingatlan? *</label>
            <input
              type="text"
              placeholder="Pl. 1980 előtt, 1990-2000 között"
              value={form.year}
              onChange={(event) =>
                setForm({ ...form, year: event.target.value })
              }
            />
            {errors.year && <span className="field-error">{errors.year}</span>}
          </div>

          <div className="field">
            <label>Mekkora az ingatlan alapterülete? *</label>
            <input
              type="text"
              placeholder="Pl. 80 négyzetméter"
              value={form.size}
              onChange={(event) =>
                setForm({ ...form, size: event.target.value })
              }
            />
            {errors.size && <span className="field-error">{errors.size}</span>}
          </div>

          <div className="field field-full">
            <label>
              Kérjük írja le részletesen, hogy miben szeretné a segítségünket! *
            </label>
            <textarea
              placeholder="Pl. a fürdőszobát szeretném felújítani, csempe csere, new burkolat..."
              rows={6}
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
            {errors.description && (
              <span className="field-error">{errors.description}</span>
            )}
          </div>
        </div>

        <button
          className="btn primary"
          style={{ width: '100%', marginTop: '8px', padding: '13px' }}
          onClick={handleSubmit}
          disabled={sending}
        >
          {sending ? 'Küldés...' : 'Tovább a fizetéshez →'}
        </button>
      </div>
    </div>
  )
}

export default Felmeres
