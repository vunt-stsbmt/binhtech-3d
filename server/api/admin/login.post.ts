import { getSupabaseAuthClient } from "../../utils/supabase"

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)

  const email = (body?.email || "").trim()
  const password = body?.password || ""

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Thiếu email hoặc mật khẩu"
    })
  }

  const supabase = getSupabaseAuthClient(event)
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
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
