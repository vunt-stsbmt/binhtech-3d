import { getTelegramSettings } from "../../utils/telegram-settings"

export default defineEventHandler(async (event) => {
  const settings = await getTelegramSettings(event)
  return settings
})
