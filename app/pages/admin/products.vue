<template>
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Sản phẩm</p>
          <h1 class="mt-2 text-3xl font-bold text-slate-900">Quản lý sản phẩm</h1>
          <p class="mt-2 text-sm text-slate-600">Module riêng cho tạo, sửa, lọc và phân trang sản phẩm.</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            @click="clearForm"
          >
            Làm mới form
          </button>
          <button
            type="button"
            class="rounded-full border border-red-300 bg-white px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            @click="onReset"
          >
            Khôi phục dữ liệu
          </button>
        </div>
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Tổng sản phẩm</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ products.length }}</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Nhóm công nghệ</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ allTags.length }}</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Ảnh hợp lệ</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ productsWithImage }}</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Đang hiển thị</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ filteredProducts.length }}</p>
        </article>
      </div>
    </section>

    <section class="mt-8 grid gap-6 xl:grid-cols-8">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-5">
        <h2 class="text-xl font-bold text-slate-900">{{ editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm" }}</h2>

        <form class="mt-5 grid gap-4" @submit.prevent="onSubmit">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="text-sm">
              <span class="mb-2 block text-slate-600">Tên sản phẩm</span>
              <input
                v-model.trim="form.name"
                required
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                type="text"
                placeholder="Ví dụ: Vỏ cơ khí tùy chỉnh"
              >
            </label>

            <label class="text-sm">
              <span class="mb-2 block text-slate-600">Tag công nghệ</span>
              <input
                v-model.trim="form.tag"
                required
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                type="text"
                placeholder="FDM"
              >
            </label>
          </div>

          <label class="text-sm">
            <span class="mb-2 block text-slate-600">Mô tả</span>
            <textarea
              v-model.trim="form.description"
              required
              rows="3"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              placeholder="Mô tả ngắn về sản phẩm..."
            ></textarea>
          </label>

          <label class="text-sm">
            <span class="mb-2 block text-slate-600">Link ảnh</span>
            <input
              v-model.trim="form.image"
              required
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              type="url"
              placeholder="https://placehold.co/800x560/..."
            >
          </label>

          <div class="flex flex-wrap gap-2">
            <button
              type="submit"
              class="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              {{ editingId ? "Lưu cập nhật" : "Thêm sản phẩm" }}
            </button>
            <button
              v-if="editingId"
              type="button"
              class="rounded-full border border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              @click="clearForm"
            >
              Hủy chỉnh sửa
            </button>
          </div>
        </form>
      </article>

      <aside class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-3">
        <h2 class="text-xl font-bold text-slate-900">Thống kê nhanh</h2>

        <div class="mt-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Theo công nghệ</p>
          <div class="mt-3 grid gap-2">
            <div
              v-for="item in tagStats"
              :key="item.tag"
              class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              <span class="font-semibold text-slate-700">{{ item.tag }}</span>
              <span class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">{{ item.count }}</span>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Sản phẩm mới thêm</p>
          <div class="mt-3 grid gap-2">
            <div
              v-for="item in recentProducts"
              :key="item.id"
              class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
            >
              <p class="text-sm font-semibold text-slate-800">{{ item.name }}</p>
              <p class="text-xs text-slate-500">{{ item.tag }}</p>
            </div>
          </div>
        </div>
      </aside>
    </section>

    <section class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
        <h2 class="text-xl font-bold text-slate-900">Danh sách sản phẩm</h2>

        <div class="flex flex-wrap gap-2">
          <input
            v-model.trim="search"
            type="text"
            placeholder="Tìm theo tên hoặc mô tả..."
            class="w-64 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500"
          >
          <select
            v-model="selectedTag"
            class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500"
          >
            <option value="All">Tất cả công nghệ</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
        Không tìm thấy sản phẩm phù hợp.
      </div>

      <div v-else class="space-y-4">
        <div class="grid gap-3 md:hidden">
          <article v-for="item in paginatedProducts" :key="item.id" class="rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex gap-3">
              <img :src="item.image" :alt="item.name" class="h-16 w-24 rounded-lg border border-slate-200 object-cover">
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-slate-900">{{ item.name }}</p>
                <div class="mt-1">
                  <span class="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">{{ item.tag }}</span>
                </div>
              </div>
            </div>
            <p class="mt-3 text-sm text-slate-600">{{ item.description }}</p>
            <div class="mt-3 flex gap-2">
              <button
                type="button"
                class="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
                @click="onEdit(item)"
              >
                Sửa
              </button>
              <button
                type="button"
                class="rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                @click="onDelete(item.id)"
              >
                Xóa
              </button>
            </div>
          </article>
        </div>

        <div class="hidden overflow-x-auto rounded-2xl border border-slate-200 md:block">
          <table class="min-w-full divide-y divide-slate-200 text-sm">
            <thead class="bg-slate-50 text-left">
              <tr>
                <th scope="col" class="px-4 py-3 font-semibold text-slate-700">Ảnh</th>
                <th scope="col" class="px-4 py-3 font-semibold text-slate-700">Tên sản phẩm</th>
                <th scope="col" class="px-4 py-3 font-semibold text-slate-700">Công nghệ</th>
                <th scope="col" class="px-4 py-3 font-semibold text-slate-700">Mô tả</th>
                <th scope="col" class="px-4 py-3 text-right font-semibold text-slate-700">Thao tác</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-200 bg-white">
              <tr v-for="item in paginatedProducts" :key="item.id" class="align-top">
                <td class="px-4 py-3">
                  <img :src="item.image" :alt="item.name" class="h-14 w-20 rounded-lg border border-slate-200 object-cover">
                </td>
                <td class="px-4 py-3 font-semibold text-slate-900">{{ item.name }}</td>
                <td class="px-4 py-3">
                  <span class="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{{ item.tag }}</span>
                </td>
                <td class="px-4 py-3 text-slate-600">{{ item.description }}</td>
                <td class="px-4 py-3">
                  <div class="flex justify-end gap-2">
                    <button
                      type="button"
                      class="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
                      @click="onEdit(item)"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      class="rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      @click="onDelete(item.id)"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p class="text-sm text-slate-600">Trang {{ currentPage }} / {{ totalPages }} - {{ filteredProducts.length }} sản phẩm</p>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="currentPage === 1"
              @click="goToPrevPage"
            >
              Trước
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              type="button"
              class="h-9 w-9 rounded-full border text-xs font-semibold transition"
              :class="page === currentPage ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-700'"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>

            <button
              type="button"
              class="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="currentPage === totalPages"
              @click="goToNextPage"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import type { Product } from "~/composables/useProducts"

useHead({
  title: "Quản lý sản phẩm - bintech 3D",
  meta: [{ name: "description", content: "Trang quản trị sản phẩm bintech 3D" }]
})

definePageMeta({
  layout: "admin",
  middleware: "admin-auth"
})

const { products, fetchProducts, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts()

const editingId = ref<string | null>(null)
const search = ref("")
const selectedTag = ref("Tất cả")
const currentPage = ref(1)
const pageSize = 6

const form = reactive({
  name: "",
  tag: "",
  description: "",
  image: ""
})

onMounted(() => {
  fetchProducts(true)
})

const productsWithImage = computed(() => products.value.filter((item) => item.image.startsWith("http")).length)

const allTags = computed(() => {
  return Array.from(new Set(products.value.map((item) => item.tag))).sort((a, b) => a.localeCompare(b))
})

const filteredProducts = computed(() => {
  const keyword = search.value.toLowerCase()
  return products.value.filter((item) => {
    const matchTag = selectedTag.value === "Tất cả" || item.tag === selectedTag.value
    const matchSearch = !keyword || item.name.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword)
    return matchTag && matchSearch
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / pageSize)))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})

const tagStats = computed(() => {
  const counter = new Map<string, number>()
  for (const item of products.value) {
    counter.set(item.tag, (counter.get(item.tag) || 0) + 1)
  }
  return Array.from(counter.entries()).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count)
})

const recentProducts = computed(() => products.value.slice(0, 5))

watch([search, selectedTag], () => {
  currentPage.value = 1
})

watch(filteredProducts, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

const clearForm = () => {
  editingId.value = null
  form.name = ""
  form.tag = ""
  form.description = ""
  form.image = ""
}

const onEdit = (item: Product) => {
  editingId.value = item.id
  form.name = item.name
  form.tag = item.tag
  form.description = item.description
  form.image = item.image
}

const onDelete = async (id: string) => {
  try {
    await deleteProduct(id)
    if (editingId.value === id) {
      clearForm()
    }
  } catch (error: any) {
    alert(error?.data?.statusMessage || error?.message || "Xóa sản phẩm thất bại")
  }
}

const onSubmit = async () => {
  const payload = {
    name: form.name,
    tag: form.tag,
    description: form.description,
    image: form.image
  }

  try {
    if (editingId.value) {
      await updateProduct(editingId.value, payload)
    } else {
      await addProduct(payload)
    }
    clearForm()
  } catch (error: any) {
    alert(error?.data?.statusMessage || error?.message || "Lưu sản phẩm thất bại")
  }
}

const onReset = async () => {
  try {
    await resetProducts()
    clearForm()
    search.value = ""
    selectedTag.value = "Tất cả"
    currentPage.value = 1
  } catch (error: any) {
    alert(error?.data?.statusMessage || error?.message || "Khôi phục dữ liệu thất bại")
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

const goToPrevPage = () => {
  if (currentPage.value <= 1) return
  currentPage.value -= 1
}

const goToNextPage = () => {
  if (currentPage.value >= totalPages.value) return
  currentPage.value += 1
}
</script>
