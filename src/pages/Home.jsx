import { Link } from 'react-router-dom'
import { useNewsItems } from '../hooks/useNewsItems'

function Home() {
  const { items, loading } = useNewsItems(5)

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

      <section className="news-feed">
        <div className="section-label">Hirek & frissitesek</div>
        <div className="news-list">
          {loading && (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              Betoltes...
            </p>
          )}
          {items.map((item) => (
            <div key={item.sys.id} className="news-item">
              <div className="news-item-top">
                {item.fields.tag && (
                  <span className="news-tag">{item.fields.tag}</span>
                )}
                <span className="news-date">
                  {new Date(item.fields.publishDate).toLocaleDateString('hu-HU')}
                </span>
              </div>
              <div className="news-title">{item.fields.title}</div>
              <div className="news-text">{item.fields.text}</div>
            </div>
          ))}
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
