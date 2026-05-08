import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-surface">
          <div className="pill">HÁZFELÚJÍTÁSI KONZULTÁCIÓ</div>
          <h1>
            Felújítás <span className="highlight">okosan</span>, szakértővel.
          </h1>
          <p className="lead">
            Személyre szabott tanácsadás, amely segít elkerülni a leggyakoribb
            hibákat, és spórolni a felújítás minden lépésén.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/idopont">
              Időpontot foglalok
            </Link>
            <a className="btn ghost" href="#szolgaltatasok">
              Szolgáltatásaink
            </a>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-card">
          <h3>150+</h3>
          <p>elégedett ügyfél</p>
        </div>
        <div className="stat-card">
          <h3>8 év</h3>
          <p>szakmai tapasztalat</p>
        </div>
        <div className="stat-card">
          <h3>30%</h3>
          <p>átlagos megtakarítás</p>
        </div>
      </section>

      <section id="szolgaltatasok" className="services">
        <div className="section-title">
          <h2>Mit nyer velünk?</h2>
          <p>Átlátható folyamat, biztonságos döntések, gyorsabb haladás.</p>
        </div>
        <div className="card-grid">
          <article className="info-card">
            <div className="icon-pill">01</div>
            <h3>Felmérés &amp; terv</h3>
            <p>
              Felmérjük az igényeket és reális tervet készítünk a felújításhoz.
            </p>
          </article>
          <article className="info-card">
            <div className="icon-pill">02</div>
            <h3>Kivitelező ajánlás</h3>
            <p>
              Megbízható szakembereket ajánlunk, akikkel már dolgoztunk.
            </p>
          </article>
          <article className="info-card">
            <div className="icon-pill">03</div>
            <h3>Költségvetés</h3>
            <p>
              Pontos becslés, hogy ne érjenek meglepetések a felújítás közben.
            </p>
          </article>
        </div>
      </section>

      <section className="why">
        <div>
          <h2>Miért minket válasszon?</h2>
          <p>
            Tapasztalat, gyors reagálás, és őszinte kommunikáció a teljes
            folyamatban.
          </p>
        </div>
        <div className="why-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="cta">
        <div>
          <h2>Kezdjük el együtt!</h2>
          <p>Első konzultáció - kérdezzen, mi válaszolunk.</p>
        </div>
        <Link className="btn primary" to="/idopont">
          Időpontot foglalok
        </Link>
      </section>
    </div>
  )
}

export default Home
