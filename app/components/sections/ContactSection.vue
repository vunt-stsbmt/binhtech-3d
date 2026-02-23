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
        <form class="grid gap-4" @submit.prevent="onSubmitContact">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="text-sm">
              <span class="mb-2 block text-slate-600">Họ và tên</span>
              <input
                v-model.trim="contactForm.fullName"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                type="text" placeholder="Nguyễn Văn A" required>
            </label>
            <label class="text-sm">
              <span class="mb-2 block text-slate-600">Email</span>
              <input
                v-model.trim="contactForm.email"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                type="email" placeholder="ban@congty.com" required>
            </label>
          </div>

          <label class="text-sm">
            <span class="mb-2 block text-slate-600">Số điện thoại</span>
            <input
              v-model.trim="contactForm.phone"
              type="text"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              placeholder="0909 xxx xxx">
          </label>

          <label class="text-sm">
            <span class="mb-2 block text-slate-600">Nội dung</span>
            <textarea rows="5"
              v-model.trim="contactForm.message"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              placeholder="Mô tả yêu cầu in 3D của bạn..." required></textarea>
          </label>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="mt-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSubmitting ? "Đang gửi..." : "Gửi yêu cầu" }}
          </button>
          <p v-if="submitMessage" class="text-sm" :class="submitStatus === 'error' ? 'text-red-600' : 'text-emerald-600'">
            {{ submitMessage }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const contactForm = reactive({
  fullName: "",
  email: "",
  phone: "",
  message: ""
})
const isSubmitting = ref(false)
const submitMessage = ref("")
const submitStatus = ref<"success" | "error">("success")

const resetContactForm = () => {
  contactForm.fullName = ""
  contactForm.email = ""
  contactForm.phone = ""
  contactForm.message = ""
}

const onSubmitContact = async () => {
  submitMessage.value = ""
  isSubmitting.value = true

  try {
    await $fetch("/api/contact/telegram", {
      method: "POST",
      body: {
        fullName: contactForm.fullName,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message
      }
    })
    submitStatus.value = "success"
    submitMessage.value = "Đã gửi yêu cầu. Chúng tôi sẽ phản hồi sớm."
    resetContactForm()
  } catch (error: any) {
    submitStatus.value = "error"
    submitMessage.value = error?.data?.statusMessage || error?.message || "Gửi yêu cầu thất bại"
  } finally {
    isSubmitting.value = false
  }
}
</script>
