<template>
  <section class="relative overflow-hidden border-b border-slate-200 bg-white" id="bo-suu-tap">
    <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-sky-100 blur-3xl" />

    <div class="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 class="mt-5 max-w-2xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-6xl">
          Biến ý tưởng thành <span class="text-blue-600">sản phẩm in 3D</span> thực tế
        </h1>
        <p class="mt-5 max-w-2xl text-lg text-slate-600">
          Từ linh kiện kỹ thuật đến mô hình trưng bày, binhtech 3d hỗ trợ in nhanh, đúng vật liệu và tối ưu chi phí theo đúng mục đích sử dụng.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#lien-he"
            class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
            Nhận tư vấn ngay
          </a>
          <a href="#cong-nghe"
            class="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700">
            Xem sản phẩm
          </a>
        </div>

        <div class="mt-8 grid gap-3 sm:grid-cols-3">
          <div v-for="item in stats" :key="item.label"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p class="text-2xl font-bold text-slate-900">{{ item.value }}</p>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ item.label }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
        <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">Quy trình nhanh</p>
        <h3 class="mt-2 text-2xl font-bold text-slate-900">Từ file 3D đến sản phẩm</h3>
        <p class="mt-2 text-sm text-slate-600">Nhận file, kiểm tra kỹ thuật, in mẫu và giao hàng toàn quốc.</p>

        <div class="mt-6 grid gap-3">
          <div v-for="step in steps" :key="step.title"
            class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div
              class="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {{ step.id }}
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ step.title }}</p>
              <p class="text-xs text-slate-600">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const stats = [
  { value: "500+", label: "Đơn đã xử lý" },
  { value: "24h", label: "Phản hồi báo giá" },
  { value: "10+", label: "Chất liệu phổ biến" }
]

const steps = [
  { id: "1", title: "Gửi file và yêu cầu", description: "Nhận STL, STEP, OBJ và thông số sử dụng." },
  { id: "2", title: "Tư vấn chất liệu", description: "Đề xuất FDM, SLA hoặc SLS theo nhu cầu." },
  { id: "3", title: "In, kiểm tra, giao hàng", description: "Sản phẩm được đóng gói và gửi tận nơi." }
]
</script>
