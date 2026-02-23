import { getTelegramSettings } from "../../utils/telegram-settings"

type ContactBody = {
  fullName?: string
  email?: string
  phone?: string
  message?: string
}

const sanitize = (value: string, maxLength: number) => value.replace(/\s+/g, " ").trim().slice(0, maxLength)

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  const fullName = sanitize(body?.fullName || "", 120)
  const email = sanitize(body?.email || "", 150)
  const phone = sanitize(body?.phone || "", 50)
  const message = sanitize(body?.message || "", 2000)

  if (!fullName || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Vui lòng nhập họ tên, email và nội dung"
    })
  }

  const { botToken, chatId } = await getTelegramSettings(event)
  if (!botToken || !chatId) {
    throw createError({
      statusCode: 500,
      statusMessage: "Chưa cấu hình Telegram Bot Token hoặc Chat ID"
    })
  }

  const text = [
    "Yêu cầu liên hệ mới từ website bintech 3D",
    `Họ tên: ${fullName}`,
    `Email: ${email}`,
    `Số điện thoại: ${phone || "(không cung cấp)"}`,
    `Nội dung: ${message}`
  ].join("\n")

  try {
    await $fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      body: {
        chat_id: chatId,
        text
      }
    })
  } catch (error: any) {
    throw createError({
      statusCode: 502,
      statusMessage: error?.data?.description || "Gửi Telegram thất bại"
    })
  }

  return { ok: true }
})
