const posts = [
  {
    title: 'Hogyan állítsunk össze reális költségvetést?'
  },
  {
    title: 'A leggyakoribb hibák a felújítás első hetében'
  },
  {
    title: 'Mit kérdezzünk a kivitelezőtől ajánlatkéréskor?'
  }
]

function Blog() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Blog</h1>
          <p className="lead">
            Friss tippek, ellenőrzőlisták és valódi tapasztalatok.
          </p>
        </div>
        <div className="hero-badge">Új cikk minden héten</div>
      </section>

      <section className="card-grid blog-grid">
        {posts.map((post) => (
          <article key={post.title} className="info-card">
            <div className="tag">Útmutató</div>
            <h3>{post.title}</h3>
            <p>
              Rövid, gyakorlati összefoglaló, hogy magabiztosabban döntsön.
            </p>
            <button type="button" className="btn ghost">
              Elolvasom
            </button>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Blog
