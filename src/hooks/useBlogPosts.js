import { useEffect, useState } from 'react'
import client from '../lib/contentful'

export function useBlogPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .getEntries({
        content_type: 'blogPost',
        order: '-fields.publishDate'
      })
      .then((res) => {
        setPosts(res.items)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { posts, loading, error }
}

export function useBlogPost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1
      })
      .then((res) => {
        setPost(res.items[0] || null)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [slug])

  return { post, loading, error }
}
