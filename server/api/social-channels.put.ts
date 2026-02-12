import { assertSupabaseOk, getSupabaseAdmin } from "../utils/supabase"

type SocialChannelInput = {
  name?: string
  description?: string
  url?: string
  icon?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ channels?: SocialChannelInput[] }>(event)

  if (!Array.isArray(body?.channels) || body.channels.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Danh sách kênh liên hệ không hợp lệ"
    })
  }

  const payload = body.channels.map((item, index) => ({
    name: item.name?.trim() || "",
    description: item.description?.trim() || "",
    url: item.url?.trim() || "",
    icon: item.icon?.trim() || "",
    order_index: index + 1
  }))

  const invalid = payload.some((item) => !item.name || !item.description || !item.url || !item.icon)
  if (invalid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Vui lòng nhập đầy đủ thông tin cho từng kênh liên hệ"
    })
  }

  const supabase = getSupabaseAdmin(event)

  const { error: deleteError } = await supabase.from("social_channels").delete().not("id", "is", null)
  assertSupabaseOk(deleteError, "Xóa dữ liệu kênh liên hệ cũ thất bại")

  const { data, error } = await supabase
    .from("social_channels")
    .insert(payload)
    .select("id,name,description,url,icon,order_index")
    .order("order_index", { ascending: true })

  assertSupabaseOk(error, "Cập nhật kênh liên hệ thất bại")

  return (data || []).map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    url: item.url,
    icon: item.icon
  }))
})
