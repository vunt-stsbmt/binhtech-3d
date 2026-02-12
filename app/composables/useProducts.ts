export type Product = {
  id: string
  name: string
  tag: string
  description: string
  image: string
}

type ProductInput = Omit<Product, "id">

export function useProducts() {
  const products = useState<Product[]>("products_state", () => [])
  const loaded = useState<boolean>("products_loaded", () => false)
  const loading = useState<boolean>("products_loading", () => false)
  const error = useState<string | null>("products_error", () => null)

  const fetchProducts = async (force = false) => {
    if (loading.value) {
      return
    }
    if (!force && loaded.value) {
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await $fetch<Product[]>("/api/products")
      products.value = data
      loaded.value = true
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || "Không tải được dữ liệu sản phẩm"
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (input: ProductInput) => {
    const created = await $fetch<Product>("/api/products", {
      method: "POST",
      body: input
    })
    products.value = [created, ...products.value]
  }

  const updateProduct = async (id: string, input: ProductInput) => {
    const updated = await $fetch<Product | null>(`/api/products/${id}`, {
      method: "PUT",
      body: input
    })

    if (!updated) {
      await fetchProducts(true)
      return
    }

    const index = products.value.findIndex((item) => item.id === id)
    if (index === -1) {
      products.value.unshift(updated)
      return
    }

    products.value[index] = updated
  }

  const deleteProduct = async (id: string) => {
    await $fetch(`/api/products/${id}`, { method: "DELETE" })
    products.value = products.value.filter((item) => item.id !== id)
  }

  const resetProducts = async () => {
    await $fetch("/api/products/reset", { method: "POST" })
    await fetchProducts(true)
  }

  return {
    products,
    loaded,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts
  }
}
