export function asset(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return `${base}${path}`
}
