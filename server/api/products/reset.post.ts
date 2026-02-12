import { assertSupabaseOk, getSupabaseAdmin } from "../../utils/supabase"

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseAdmin(event)
  const { error } = await supabase.from("products").delete().not("id", "is", null)

  assertSupabaseOk(error, "Xóa dữ liệu sản phẩm thất bại")

  return { ok: true, count: 0 }
})
