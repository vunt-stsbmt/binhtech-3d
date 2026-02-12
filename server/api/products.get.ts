import { assertSupabaseOk, getSupabaseAdmin } from "../utils/supabase"

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseAdmin(event)

  const { data, error } = await supabase
    .from("products")
    .select("id,name,tag,description,image,created_at")
    .order("created_at", { ascending: false })

  assertSupabaseOk(error, "Không lấy được danh sách sản phẩm")

  return (data || []).map((item) => ({
    id: item.id,
    name: item.name,
    tag: item.tag,
    description: item.description,
    image: item.image
  }))
})
