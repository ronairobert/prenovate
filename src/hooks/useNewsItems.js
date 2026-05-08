import { useEffect, useState } from 'react'
import client from '../lib/contentful'

export function useNewsItems(limit = 5) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .getEntries({
        content_type: 'newsItem',
        order: '-fields.publishDate',
        limit
      })
      .then((res) => {
        setItems(res.items)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [limit])

  return { items, loading, error }
}
