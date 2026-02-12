export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname

  if (!path.startsWith("/admin")) {
    return
  }

  if (path === "/admin/login") {
    const sessionOnLogin = getCookie(event, "admin_session")
    if (sessionOnLogin === "1") {
      return sendRedirect(event, "/admin", 302)
    }
    return
  }

  const session = getCookie(event, "admin_session")
  if (session === "1") {
    return
  }

  const redirectTarget = `${path}${url.search || ""}`
  const loginUrl = `/admin/login?redirect=${encodeURIComponent(redirectTarget)}`
  return sendRedirect(event, loginUrl, 302)
})
