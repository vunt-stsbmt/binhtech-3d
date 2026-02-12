import { assertSupabaseOk, getSupabaseAdmin } from "../utils/supabase"

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string
    tag?: string
    description?: string
    image?: string
  }>(event)

  if (!body?.name || !body?.tag || !body?.description || !body?.image) {
    throw createError({
      statusCode: 400,
      statusMessage: "Thiếu dữ liệu sản phẩm"
    })
  }

  const supabase = getSupabaseAdmin(event)

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: body.name,
      tag: body.tag,
      description: body.description,
      image: body.image
    })
    .select("id,name,tag,description,image")
    .single()

  assertSupabaseOk(error, "Tạo sản phẩm thất bại")

  return data
})
