import { useCallback, useEffect, useState } from 'react'

// Tiny data-fetching helper: runs `fn` on mount (and when deps change),
// tracking loading/error/data and exposing a manual `reload`.
export function useAsync(fn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nonce, setNonce] = useState(0)

  // `reload` bumps a nonce to re-trigger the effect; the loading flag is set
  // here (in an event-handler context) rather than synchronously in the effect.
  const reload = useCallback(() => {
    setLoading(true)
    setError(null)
    setNonce((n) => n + 1)
  }, [])

  useEffect(() => {
    let active = true
    fn()
      .then((res) => {
        if (active) {
          setData(res)
          setError(null)
        }
      })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce])

  return { data, loading, error, reload, setData }
}
