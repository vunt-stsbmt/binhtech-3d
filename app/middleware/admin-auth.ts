export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/admin/login") {
    return
  }

  const session = useCookie("admin_session")
  if (session.value !== "1") {
    return navigateTo(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
