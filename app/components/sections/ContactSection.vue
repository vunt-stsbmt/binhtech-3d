<template>
  <section class="bg-slate-100 py-16 text-slate-900" id="lien-he">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-5">
      <div class="lg:col-span-2">
        <h2 class="text-5xl font-bold leading-tight">Cùng tạo nên ý tưởng của bạn</h2>
        <p class="mt-5 max-w-sm text-slate-600">
          Gửi bản vẽ cho chúng tôi để được đánh giá chuyên nghiệp và nhận báo giá cạnh tranh trong 24 giờ.
        </p>

        <div class="mt-10 space-y-6 text-sm">
          <div>
            <p class="text-slate-500">Email</p>
            <p class="font-semibold text-slate-900">solutions@bintech3d.com</p>
          </div>
          <div>
            <p class="text-slate-500">Văn phòng</p>
            <p class="font-semibold text-slate-900">Quận 7, TP.HCM</p>
          </div>
        </div>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 lg:col-span-3">
        <form class="grid gap-4" @submit.prevent>
          <div class="grid gap-4 md:grid-cols-2">
            <label class="text-sm">
              <span class="mb-2 block text-slate-600">Họ và tên</span>
              <input
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                type="text" placeholder="Nguyễn Văn A">
            </label>
            <label class="text-sm">
              <span class="mb-2 block text-slate-600">Email</span>
              <input
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                type="email" placeholder="ban@congty.com">
            </label>
          </div>

          <label class="text-sm">
            <span class="mb-2 block text-slate-600">Loại dự án</span>
            <select
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30">
              <option>Linh kiện công nghiệp</option>
              <option>Mô hình y tế</option>
              <option>Nghệ thuật và điêu khắc</option>
              <option>Mô hình giáo dục</option>
            </select>
          </label>

          <label class="text-sm">
            <span class="mb-2 block text-slate-600">Nội dung</span>
            <textarea rows="5"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              placeholder="Mô tả yêu cầu in 3D của bạn..."></textarea>
          </label>

          <button type="submit"
            class="mt-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
