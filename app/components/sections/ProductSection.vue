<template>
  <section class="border-y border-slate-200 bg-slate-100">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <h2 class="text-3xl font-bold text-slate-900">Sản phẩm nổi bật</h2>
          <span class="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">{{ products.length }}
            dự án</span>
        </div>
        <div class="flex gap-2">
          <button
            class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
            type="button">
            Công nghệ
          </button>
          <button
            class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
            type="button">
            Mới nhất
          </button>
        </div>
      </div>

      <div v-if="loading" class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Đang tải sản phẩm...
      </div>

      <div v-else-if="products.length === 0" class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
        Chưa có sản phẩm để hiển thị.
      </div>

      <div v-else class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="cong-nghe">
        <article v-for="item in products" :key="item.id"
          class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div class="relative h-56 overflow-hidden">
            <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" loading="lazy">
            <span
              class="absolute right-3 top-3 rounded-full border border-blue-200 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
              {{ item.tag }} công nghệ
            </span>
          </div>
          <div class="space-y-4 p-5">
            <h3 class="text-2xl font-semibold leading-tight text-slate-900">{{ item.name }}</h3>
            <p class="text-sm text-slate-600">{{ item.description }}</p>
            <div class="flex gap-2">
              <button
                class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                type="button">
                Báo giá
              </button>
              <button
                class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                type="button">
                Xem thêm
              </button>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-10 flex justify-center">
        <button
          class="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-700"
          type="button">
          Xem toàn bộ bộ sưu tập
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { products, loading, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})
</script>
