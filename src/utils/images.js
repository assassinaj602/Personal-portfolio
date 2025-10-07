const WIDTHS = [400, 800, 1200]

export function buildSrcSet(src) {
  if (!src) return undefined
  try {
    const url = new URL(src, 'http://example.com')
    const path = url.pathname + url.search
    // Netlify on-the-fly image transforms
    const parts = WIDTHS.map((w) => `${path}?nf_resize=fit&w=${w} ${w}w`)
    return parts.join(', ')
  } catch {
    // fallback for relative paths
    return WIDTHS.map((w) => `${src}?nf_resize=fit&w=${w} ${w}w`).join(', ')
  }
}

export function sizesAttr() {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
}
