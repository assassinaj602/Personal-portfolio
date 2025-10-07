export function formatDate(val) {
  if (val == null) return ''
  // gray-matter can parse YAML dates into Date objects
  if (val instanceof Date && !isNaN(val)) {
    try {
      return val.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    } catch {
      return String(val)
    }
  }
  // Sometimes dates come as strings; keep as-is or normalize briefly
  return String(val)
}

// Recursively convert any Date values to ISO strings to ensure React doesn't receive Date as children.
export function normalizeDates(value) {
  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) return value.map((v) => normalizeDates(v))
  if (value && typeof value === 'object') {
    const out = {}
    for (const k in value) out[k] = normalizeDates(value[k])
    return out
  }
  return value
}

// Recursively convert any Date instances in an object/array into ISO strings
export function normalizeFrontmatterDates(input) {
  if (input == null) return input
  if (input instanceof Date && !isNaN(input)) return input.toISOString()
  if (Array.isArray(input)) return input.map((v) => normalizeFrontmatterDates(v))
  if (typeof input === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(input)) {
      out[k] = normalizeFrontmatterDates(v)
    }
    return out
  }
  return input
}
