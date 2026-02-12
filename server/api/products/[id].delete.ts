import { assertSupabaseOk, getSupabaseAdmin } from "../../utils/supabase"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Thiếu id sản phẩm" })
  }

  const supabase = getSupabaseAdmin(event)
  const { error } = await supabase.from("products").delete().eq("id", id)

  assertSupabaseOk(error, "Xóa sản phẩm thất bại")

  return { ok: true }
})
