export function setMeta({ title, description }) {
  if (title) document.title = title
  const d = document.querySelector('meta[name="description"]')
  if (d) d.setAttribute('content', description || '')
}
