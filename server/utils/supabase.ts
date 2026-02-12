import { createClient } from "@supabase/supabase-js"
import type { H3Event } from "h3"

export function getSupabaseAuthClient(event: H3Event) {
  const config = useRuntimeConfig(event)
  const url = config.supabaseUrl as string
  const anonKey = config.supabaseAnonKey as string

  if (!url || !anonKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Thiếu cấu hình SUPABASE_URL hoặc SUPABASE_KEY"
    })
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}

export function getSupabaseAdmin(event: H3Event) {
  const config = useRuntimeConfig(event)
  const url = config.supabaseUrl as string
  const anonKey = config.supabaseAnonKey as string
  const serviceKey = (config.supabaseServiceKey as string) || anonKey

  if (!url || !anonKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Thiếu cấu hình SUPABASE_URL hoặc SUPABASE_KEY"
    })
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}

export function assertSupabaseOk(error: { message?: string } | null, fallbackMessage: string) {
  if (!error) {
    return
  }

  throw createError({
    statusCode: 500,
    statusMessage: error.message || fallbackMessage
  })
}
