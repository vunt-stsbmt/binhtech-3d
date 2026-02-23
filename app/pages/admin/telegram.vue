<template>
  <main class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Telegram</p>
          <h1 class="mt-2 text-3xl font-bold text-slate-900">Cấu hình nhận liên hệ qua bot</h1>
          <p class="mt-2 text-sm text-slate-600">
            Form liên hệ tại `ContactSection` sẽ gửi tin nhắn vào Telegram theo cấu hình này.
          </p>
        </div>
        <button
          type="button"
          class="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          @click="fetchSettings"
        >
          Tải lại
        </button>
      </div>

      <form class="mt-6 grid gap-4" @submit.prevent="saveSettings">
        <label class="text-sm">
          <span class="mb-2 block text-slate-600">Telegram Bot Token</span>
          <input
            v-model.trim="form.botToken"
            type="password"
            autocomplete="off"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            placeholder="123456789:AA...."
          >
        </label>

        <label class="text-sm">
          <span class="mb-2 block text-slate-600">Telegram Chat ID</span>
          <input
            v-model.trim="form.chatId"
            type="text"
            autocomplete="off"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            placeholder="-1001234567890 hoặc 123456789"
          >
        </label>

        <div class="flex flex-wrap gap-2">
          <button
            type="submit"
            :disabled="saving"
            class="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ saving ? "Đang lưu..." : "Lưu cấu hình" }}
          </button>
        </div>

        <p v-if="statusMessage" class="text-sm" :class="statusType === 'error' ? 'text-red-600' : 'text-emerald-600'">
          {{ statusMessage }}
        </p>
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: "Cấu hình Telegram - bintech 3D",
  meta: [{ name: "description", content: "Trang quản trị Telegram bot bintech 3D" }]
})

definePageMeta({
  layout: "admin",
  middleware: "admin-auth"
})

const form = reactive({
  botToken: "",
  chatId: ""
})
const saving = ref(false)
const statusMessage = ref("")
const statusType = ref<"success" | "error">("success")

const fetchSettings = async () => {
  statusMessage.value = ""
  try {
    const data = await $fetch<{ botToken: string; chatId: string }>("/api/admin/telegram-settings")
    form.botToken = data.botToken || ""
    form.chatId = data.chatId || ""
  } catch (error: any) {
    statusType.value = "error"
    statusMessage.value = error?.data?.statusMessage || error?.message || "Không tải được cấu hình Telegram"
  }
}

const saveSettings = async () => {
  if (!form.botToken.trim() || !form.chatId.trim()) {
    statusType.value = "error"
    statusMessage.value = "Vui lòng nhập Telegram Bot Token và Chat ID"
    return
  }

  statusMessage.value = ""
  saving.value = true
  try {
    await $fetch("/api/admin/telegram-settings", {
      method: "PUT",
      body: {
        botToken: form.botToken,
        chatId: form.chatId
      }
    })
    statusType.value = "success"
    statusMessage.value = "Đã lưu cấu hình Telegram"
  } catch (error: any) {
    statusType.value = "error"
    statusMessage.value = error?.data?.statusMessage || error?.message || "Lưu cấu hình Telegram thất bại"
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchSettings()
})
</script>
