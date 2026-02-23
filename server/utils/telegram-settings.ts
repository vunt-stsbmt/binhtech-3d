import type { H3Event } from "h3"
import { assertSupabaseOk, getSupabaseAdmin } from "./supabase"

export type TelegramSettings = {
  botToken: string
  chatId: string
}

const TELEGRAM_TOKEN_KEY = "telegram_bot_token"
const TELEGRAM_CHAT_ID_KEY = "telegram_chat_id"

export async function getTelegramSettings(event: H3Event): Promise<TelegramSettings> {
  const runtimeConfig = useRuntimeConfig(event)
  const supabase = getSupabaseAdmin(event)

  const { data, error } = await supabase
    .from("site_settings")
    .select("setting_key,setting_value")
    .in("setting_key", [TELEGRAM_TOKEN_KEY, TELEGRAM_CHAT_ID_KEY])

  assertSupabaseOk(error, "Không lấy được cấu hình Telegram")

  const tokenFromDb = data?.find((item) => item.setting_key === TELEGRAM_TOKEN_KEY)?.setting_value?.trim() || ""
  const chatIdFromDb = data?.find((item) => item.setting_key === TELEGRAM_CHAT_ID_KEY)?.setting_value?.trim() || ""

  return {
    botToken: tokenFromDb || ((runtimeConfig.telegramBotToken as string) || "").trim(),
    chatId: chatIdFromDb || ((runtimeConfig.telegramChatId as string) || "").trim()
  }
}

export async function upsertTelegramSettings(event: H3Event, settings: TelegramSettings) {
  const supabase = getSupabaseAdmin(event)
  const nowIso = new Date().toISOString()

  const payload = [
    { setting_key: TELEGRAM_TOKEN_KEY, setting_value: settings.botToken.trim(), updated_at: nowIso },
    { setting_key: TELEGRAM_CHAT_ID_KEY, setting_value: settings.chatId.trim(), updated_at: nowIso }
  ]

  const { error } = await supabase
    .from("site_settings")
    .upsert(payload, { onConflict: "setting_key" })

  assertSupabaseOk(error, "Không lưu được cấu hình Telegram")
}
