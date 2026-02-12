<template>
  <main v-if="!isAuthed" class="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
    <section class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Admin Login</p>
      <h1 class="mt-2 text-2xl font-bold text-slate-900">Đăng nhập quản trị</h1>
      <p class="mt-2 text-sm text-slate-600">Đăng nhập để truy cập dashboard quản lý sản phẩm.</p>

      <form class="mt-6 grid gap-4" @submit.prevent="onLogin">
        <label class="text-sm">
          <span class="mb-2 block text-slate-600">Email</span>
          <input
            v-model.trim="loginEmail"
            required
            type="email"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            placeholder="admin@domain.com"
          >
        </label>

        <label class="text-sm">
          <span class="mb-2 block text-slate-600">Mật khẩu</span>
          <input
            v-model="loginPass"
            required
            type="password"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            placeholder="******"
          >
        </label>

        <p v-if="loginError" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {{ loginError }}
        </p>

        <button
          type="submit"
          :disabled="loginLoading"
          class="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ loginLoading ? "Đang đăng nhập..." : "Đăng nhập" }}
        </button>

        <p class="text-xs text-slate-500">
          Dùng tài khoản email/password đã tạo trong Supabase Auth.
        </p>
      </form>
    </section>
  </main>

  <main v-else class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Dashboard</p>
          <h1 class="mt-2 text-3xl font-bold text-slate-900">Quản lý sản phẩm Binhtech 3D</h1>
          <p class="mt-2 text-sm text-slate-600">
            Dữ liệu đang lưu trên trình duyệt hiện tại (`localStorage`).
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            @click="onLogout"
          >
            Đăng xuất
          </button>
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
            Khôi phục mặc định
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
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Có ảnh hợp lệ</p>
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
        <h2 class="text-xl font-bold text-slate-900">
          {{ editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới" }}
        </h2>

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
                placeholder="Ví dụ: FDM"
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
        <h2 class="text-xl font-bold text-slate-900">Tổng quan nhanh</h2>

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
            <option value="Tất cả">Tất cả công nghệ</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
        Không tìm thấy sản phẩm phù hợp.
      </div>

      <div v-else class="grid gap-4">
        <article
          v-for="item in filteredProducts"
          :key="item.id"
          class="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[160px_1fr_auto]"
        >
          <img :src="item.image" :alt="item.name" class="h-28 w-full rounded-xl border border-slate-200 object-cover">

          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">{{ item.tag }}</p>
            <h3 class="mt-1 text-lg font-semibold text-slate-900">{{ item.name }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ item.description }}</p>
          </div>

          <div class="flex items-start gap-2 md:flex-col">
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
    </section>
  </main>
</template>

<script lang="ts" setup>
import type { Product } from "~/composables/useProducts"

useHead({
  title: "Admin Dashboard - Binhtech 3D",
  meta: [{ name: "description", content: "Dashboard quản trị sản phẩm Binhtech 3D" }]
})

const session = useCookie<string | null>("admin_session")
const isAuthed = computed(() => session.value === "1")

const loginEmail = ref("")
const loginPass = ref("")
const loginLoading = ref(false)
const loginError = ref("")

const { products, fetchProducts, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts()

const editingId = ref<string | null>(null)
const search = ref("")
const selectedTag = ref("Tất cả")

const form = reactive({
  name: "",
  tag: "",
  description: "",
  image: ""
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

const tagStats = computed(() => {
  const counter = new Map<string, number>()

  for (const item of products.value) {
    counter.set(item.tag, (counter.get(item.tag) || 0) + 1)
  }

  return Array.from(counter.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
})

const recentProducts = computed(() => products.value.slice(0, 5))

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
  } catch (error: any) {
    alert(error?.data?.statusMessage || error?.message || "Khôi phục dữ liệu thất bại")
  }
}

const onLogin = async () => {
  loginLoading.value = true
  loginError.value = ""

  try {
    await $fetch("/api/admin/login", {
      method: "POST",
      body: {
        email: loginEmail.value,
        password: loginPass.value
      }
    })
    session.value = "1"
    if (import.meta.client) {
      window.location.assign("/admin")
      return
    }
    await fetchProducts(true)
    await navigateTo("/admin", { replace: true })
  } catch (error: any) {
    loginError.value = error?.data?.statusMessage || "Đăng nhập thất bại"
  } finally {
    loginLoading.value = false
  }
}

const onLogout = async () => {
  await $fetch("/api/admin/logout", { method: "POST" })
  session.value = null
  await navigateTo("/")
}

onMounted(() => {
  if (isAuthed.value) {
    fetchProducts(true)
  }
})
</script>



