function Booking() {
  return (
    <div className="page">
      <div className="page-hero">
        <span className="hero-badge">Online konzultáció</span>
        <h1>Időpontfoglalás</h1>
        <p>Személyre szabott házfelújítási tanácsadás, 4 egyszerű lépésben.</p>
      </div>

      <div className="process-steps">
        <div className="process-step">
          <div className="process-step-num">01</div>
          <div className="process-step-content">
            <div className="process-step-title">Ingatlan felmérése</div>
            <div className="process-step-desc">
              Rövid kérdőívet töltesz ki az ingatlanodról, hogy
              felkészülhessünk a konzultációra.
            </div>
          </div>
        </div>

        <div className="process-connector" />

        <div className="process-step">
          <div className="process-step-num">02</div>
          <div className="process-step-content">
            <div className="process-step-title">Fizetés</div>
            <div className="process-step-desc">
              Biztonságos online fizetés Barionon keresztül,
              forintban. Számlát emailben küldünk.
            </div>
          </div>
        </div>

        <div className="process-connector" />

        <div className="process-step">
          <div className="process-step-num">03</div>
          <div className="process-step-content">
            <div className="process-step-title">Időpont választás</div>
            <div className="process-step-desc">
              Sikeres fizetés után kiválasztod a számodra
              megfelelő időpontot a naptárból.
            </div>
          </div>
        </div>

        <div className="process-connector" />

        <div className="process-step">
          <div className="process-step-num">04</div>
          <div className="process-step-content">
            <div className="process-step-title">Konzultáció</div>
            <div className="process-step-desc">
              Online videóhíváson személyre szabott tanácsadás,
              60 percben.
            </div>
          </div>
        </div>
      </div>

      <div className="process-cta">
        <div className="process-cta-info">
          <div className="process-cta-price">45 000 Ft</div>
          <div className="process-cta-desc">Online konzultáció · 60 perc</div>
        </div>
        <a href="/felmeres" className="btn primary">
          Időpontot foglalok →
        </a>
      </div>
    </div>
  )
}

export default Booking
