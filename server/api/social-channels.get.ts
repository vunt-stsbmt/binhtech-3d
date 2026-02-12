import { assertSupabaseOk, getSupabaseAdmin } from "../utils/supabase"

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseAdmin(event)

  const { data, error } = await supabase
    .from("social_channels")
    .select("id,name,description,url,icon,order_index")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: true })

  assertSupabaseOk(error, "Không lấy được danh sách kênh liên hệ")

  return (data || []).map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    url: item.url,
    icon: item.icon
  }))
})
