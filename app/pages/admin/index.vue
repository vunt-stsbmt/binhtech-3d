<template>
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Tổng quan</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Bảng điều khiển - bintech 3D</h1>
      <p class="mt-2 text-sm text-slate-600">Tổng quan nhanh và lối tắt đến từng module quản trị.</p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Sản phẩm</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ products.length }}</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Nhóm công nghệ</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ allTags.length }}</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Kênh liên hệ</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ channels.length }}</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Ảnh hợp lệ</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ productsWithImage }}</p>
        </article>
      </div>
    </section>

    <section class="mt-8 grid gap-6 xl:grid-cols-2">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-xl font-bold text-slate-900">Sản phẩm mới</h2>
          <NuxtLink
            to="/admin/products"
            class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
          >
            Mở Sản phẩm
          </NuxtLink>
        </div>

        <div class="mt-4 space-y-2">
          <div
            v-for="item in recentProducts"
            :key="item.id"
            class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <p class="text-sm font-semibold text-slate-800">{{ item.name }}</p>
            <p class="text-xs text-slate-500">{{ item.tag }}</p>
          </div>
          <p v-if="recentProducts.length === 0" class="text-sm text-slate-500">Chưa có sản phẩm.</p>
        </div>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-xl font-bold text-slate-900">Kênh liên hệ</h2>
          <NuxtLink
            to="/admin/social-channels"
            class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
          >
            Mở Kênh liên hệ
          </NuxtLink>
        </div>

        <div class="mt-4 space-y-2">
          <div
            v-for="item in channels"
            :key="item.id"
            class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <p class="text-sm font-semibold text-slate-800">{{ item.name }}</p>
            <p class="truncate text-xs text-slate-500">{{ item.url }}</p>
          </div>
          <p v-if="channels.length === 0" class="text-sm text-slate-500">Chưa có kênh liên hệ.</p>
        </div>
      </article>
    </section>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: "Trang quản trị - bintech 3D",
  meta: [{ name: "description", content: "Trang tổng quan quản trị bintech 3D" }]
})

definePageMeta({
  layout: "admin",
  middleware: "admin-auth"
})

const { products, fetchProducts } = useProducts()
const { channels, fetchSocialChannels } = useSocialChannels()

onMounted(() => {
  fetchProducts(true)
  fetchSocialChannels(true)
})

const allTags = computed(() => {
  return Array.from(new Set(products.value.map((item) => item.tag))).sort((a, b) => a.localeCompare(b))
})

const recentProducts = computed(() => products.value.slice(0, 5))
const productsWithImage = computed(() => products.value.filter((item) => item.image.startsWith("http")).length)
</script>
