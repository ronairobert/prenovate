import { useBlogPosts } from '../hooks/useBlogPosts'

function Blog() {
  const { posts, loading, error } = useBlogPosts()

  if (loading) {
    return (
      <div className="page-hero">
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Bejegyzesek betoltese...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-hero">
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Nem sikerult betolteni a bejegyzeseket.
        </p>
      </div>
    )
  }

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
          <div key={post.sys.id} className="blog-card info-card">
            {post.fields.coverImage && (
              <img
                src={post.fields.coverImage.fields.file.url}
                alt={post.fields.title}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}
              />
            )}
            <span className="tag">{post.fields.category}</span>
            <h3>{post.fields.title}</h3>
            <p>{post.fields.excerpt}</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '8px'
              }}
            >
              <span>
                {new Date(post.fields.publishDate).toLocaleDateString('hu-HU')}
              </span>
              <span>{post.fields.readTime}</span>
            </div>
            <a
              href={`/blog/${post.fields.slug}`}
              className="btn ghost"
              style={{ marginTop: '12px' }}
            >
              Elolvasom →
            </a>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Blog
