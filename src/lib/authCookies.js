const COOKIE_PATH = "/"

function setCookie(name, value, maxAgeSeconds) {
  if (typeof document === "undefined") return

  const encodedValue = encodeURIComponent(value ?? "")
  const secure = window.location.protocol === "https:" ? "; Secure" : ""

  document.cookie = `${name}=${encodedValue}; path=${COOKIE_PATH}; max-age=${Math.floor(
    maxAgeSeconds
  )}; SameSite=Lax${secure}`
}

export function setSupabaseCookies(session) {
  if (!session) return

  // Access token expires relatively soon, so use session.expires_at when available.
  const now = Math.floor(Date.now() / 1000)
  const expiresAt = session.expires_at ?? (now + 60 * 60)
  const maxAge = Math.max(0, expiresAt - now)

  setCookie("sb-access-token", session.access_token, maxAge)
  setCookie("sb-refresh-token", session.refresh_token, 60 * 60 * 24 * 30)
}

export function clearSupabaseCookies() {
  // Delete both tokens to keep middleware happy.
  setCookie("sb-access-token", "", 0)
  setCookie("sb-refresh-token", "", 0)
}
