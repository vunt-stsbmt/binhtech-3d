<template>
  <section class="bg-white py-14" id="kenh-lien-he">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Kênh liên hệ nhanh</p>
          <h2 class="mt-2 text-3xl font-bold text-slate-900">Nhận tư vấn qua mạng xã hội và sàn TMDT</h2>
        </div>
        <p class="max-w-xl text-sm text-slate-600">
          Bạn có thể nhận báo giá nhanh qua Facebook, Zalo hoặc Shopee. Chúng tôi phản hồi trong giờ hành chính.
        </p>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a v-for="channel in channels" :key="channel.name" :href="channel.url" target="_blank" rel="noopener noreferrer"
          class="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
          <img :src="channel.icon" :alt="channel.name" class="w-14 rounded-xl" loading="lazy">
          <h3 class="mt-2 text-xl font-bold text-slate-900">{{ channel.name }}</h3>
          <p class="mt-2 text-sm text-slate-600">{{ channel.description }}</p>
          <p class="mt-4 text-sm font-semibold text-blue-700">Truy cập kênh</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const channels = [
  {
    name: "bintech 3D",
    description: "Nhắn tin fanpage để gửi mẫu, mô tả nhu cầu và nhận tư vấn nhanh.",
    url: "https://facebook.com",
    icon: "/fb.png"
  },
  {
    name: "Zalo OA bintech 3D",
    description: "Trao đổi trực tiếp, gửi file và nhận báo giá theo từng đơn hàng.",
    url: "https://zalo.me",
    icon: "/zalo.png"
  },
  {
    name: "Shopee bintech 3D",
    description: "Đặt các sản phẩm mẫu, theo dõi ưu đãi và đánh giá từ khách hàng.",
    url: "https://shopee.vn",
    icon: "/shoppe.png"
  }
]
</script>
