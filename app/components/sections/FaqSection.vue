<template>
  <section class="bg-slate-100 py-14" id="hoi-dap">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Q&A</p>
      <h2 class="mt-2 text-3xl font-bold text-slate-900">Hỏi đáp nhanh</h2>
      <p class="mt-2 text-sm text-slate-600">Bấm vào từng câu hỏi để mở rộng nội dung trả lời.</p>

      <div class="mt-8 grid gap-4">
        <details v-for="(qa, index) in qas" :key="qa.question" :open="index === 0"
          class="group rounded-2xl border border-slate-200 bg-white p-5 open:border-blue-300">
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-slate-900">
            <span>{{ qa.question }}</span>
            <span
              class="text-xl leading-none text-slate-400 transition group-open:rotate-45 group-open:text-blue-600">+</span>
          </summary>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            {{ qa.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const qas = [
  {
    question: "Thời gian in 3D mất bao lâu?",
    answer: "Đơn đơn giản thường hoàn thành trong 1-3 ngày. Đơn phức tạp hoặc số lượng lớn sẽ được báo thời gian cụ thể sau khi xem file."
  },
  {
    question: "Tôi cần gửi gì để nhận báo giá?",
    answer: "Bạn gửi file 3D (STL/STEP/OBJ), số lượng, chất liệu dự kiến và mục đích sử dụng. Chúng tôi sẽ báo giá chi tiết theo từng lựa chọn."
  },
  {
    question: "bintech 3D có hỗ trợ giao hàng toàn quốc không?",
    answer: "Có. Chúng tôi nhận giao hàng toàn quốc qua các đơn vị vận chuyển và có chính sách đóng gói an toàn cho sản phẩm in."
  }
]
</script>
