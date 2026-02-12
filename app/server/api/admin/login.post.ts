export default defineEventHandler(async (event) => {
  const body = await readBody<{ username?: string; password?: string }>(event)
  const config = useRuntimeConfig(event)

  const username = (body?.username || "").trim()
  const password = body?.password || ""

  if (username !== config.adminUser || password !== config.adminPass) {
    throw createError({
      statusCode: 401,
      statusMessage: "Sai tài khoản hoặc mật khẩu"
    })
  }

  setCookie(event, "admin_session", "1", {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8
  })

  return { ok: true }
})
