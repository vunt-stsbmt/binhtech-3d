import { upsertTelegramSettings } from "../../utils/telegram-settings"

export default defineEventHandler(async (event) => {
  const body = await readBody<{ botToken?: string; chatId?: string }>(event)
  const botToken = (body?.botToken || "").trim()
  const chatId = (body?.chatId || "").trim()

  if (!botToken || !chatId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Vui lòng nhập Telegram Bot Token và Chat ID"
    })
  }

  await upsertTelegramSettings(event, { botToken, chatId })
  return { ok: true }
})
