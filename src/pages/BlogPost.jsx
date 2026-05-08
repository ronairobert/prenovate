import { useParams } from 'react-router-dom'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useBlogPost } from '../hooks/useBlogPosts'

function BlogPost() {
  const { slug } = useParams()
  const { post, loading } = useBlogPost(slug)

  if (loading) {
    return (
      <div className="page-hero">
        <p>Betoltes...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="page-hero">
        <p>A bejegyzes nem talalhato.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-hero">
        <span className="hero-badge">{post.fields.category}</span>
        <h1>{post.fields.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          {new Date(post.fields.publishDate).toLocaleDateString('hu-HU')} {' · '}
          {post.fields.readTime}
        </p>
      </div>
      {post.fields.coverImage && (
        <img
          src={post.fields.coverImage.fields.file.url}
          alt={post.fields.title}
          style={{
            width: '100%',
            borderRadius: '12px',
            maxHeight: '400px',
            objectFit: 'cover'
          }}
        />
      )}
      <div className="blog-post-body form-card">
        {documentToReactComponents(post.fields.body)}
      </div>
    </div>
  )
}

export default BlogPost
