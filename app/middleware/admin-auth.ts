export default defineNuxtRouteMiddleware((to) => {
  // Chỉ chạy trên trình duyệt (vì localStorage không tồn tại trên server)
  if (import.meta.server) return

  const isAdminAuthed = window.localStorage.getItem("admin_auth_status") === "true"
  const normalizedPath = to.path.replace(/\/$/, "")
  const isLoginPage = normalizedPath === "/admin/login"

  // 1. Nếu CHƯA login mà vào trang quản trị -> Chuyển sang login
  if (!isAdminAuthed && !isLoginPage) {
    return navigateTo(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  // 2. Nếu ĐÃ login mà vào trang login -> Chuyển về dashboard
  if (isAdminAuthed && isLoginPage) {
    return navigateTo("/admin")
  }
})
