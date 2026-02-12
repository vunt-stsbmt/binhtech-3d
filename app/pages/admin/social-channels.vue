<template>
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Kênh liên hệ</p>
          <h1 class="mt-2 text-3xl font-bold text-slate-900">Quản lý kênh liên hệ nhanh</h1>
          <p class="mt-2 text-sm text-slate-600">Nội dung này được hiển thị tại `SocialChannelsSection` ở trang chủ.</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            @click="onResetSocialDrafts"
          >
            Hoàn tác
          </button>
          <button
            type="button"
            class="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            @click="addSocialChannel"
          >
            Thêm kênh
          </button>
          <button
            type="button"
            class="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            @click="onSaveSocialChannels"
          >
            Lưu kênh liên hệ
          </button>
        </div>
      </div>

      <div class="mt-5 space-y-4">
        <article
          v-for="(channel, index) in socialDrafts"
          :key="`${index}-${channel.url}`"
          class="rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <div class="mb-3 flex items-center justify-between gap-3">
            <p class="text-sm font-semibold text-slate-800">Kênh #{{ index + 1 }}</p>
            <button
              type="button"
              class="rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              :disabled="socialDrafts.length === 1"
              @click="removeSocialChannel(index)"
            >
              Xóa
            </button>
          </div>

          <div class="grid gap-3 md:grid-cols-2">
            <label class="text-sm">
              <span class="mb-2 block text-slate-600">Tên kênh</span>
              <input
                v-model.trim="channel.name"
                type="text"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                placeholder="Ví dụ: Facebook bintech 3D"
              >
            </label>

            <label class="text-sm">
              <span class="mb-2 block text-slate-600">Link kênh</span>
              <input
                v-model.trim="channel.url"
                type="url"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                placeholder="https://facebook.com/..."
              >
            </label>
          </div>

          <label class="mt-3 block text-sm">
            <span class="mb-2 block text-slate-600">Mô tả</span>
            <textarea
              v-model.trim="channel.description"
              rows="2"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              placeholder="Mô tả ngắn về kênh liên hệ"
            ></textarea>
          </label>

          <label class="mt-3 block text-sm">
            <span class="mb-2 block text-slate-600">Đường dẫn icon</span>
            <input
              v-model.trim="channel.icon"
              type="text"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              placeholder="/fb.png hoặc https://..."
            >
          </label>
        </article>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import type { SocialChannelInput } from "~/composables/useSocialChannels"

useHead({
  title: "Quản lý kênh liên hệ - bintech 3D",
  meta: [{ name: "description", content: "Trang quản trị kênh liên hệ nhanh bintech 3D" }]
})

definePageMeta({
  layout: "admin",
  middleware: "admin-auth"
})

const { channels, fetchSocialChannels, saveSocialChannels } = useSocialChannels()
const socialDrafts = ref<SocialChannelInput[]>([])

const syncSocialDrafts = () => {
  socialDrafts.value = channels.value.map((item) => ({
    name: item.name,
    description: item.description,
    url: item.url,
    icon: item.icon
  }))
}

watch(channels, () => {
  syncSocialDrafts()
}, { immediate: true })

onMounted(() => {
  fetchSocialChannels(true)
})

const addSocialChannel = () => {
  socialDrafts.value.push({
    name: "",
    description: "",
    url: "",
    icon: ""
  })
}

const removeSocialChannel = (index: number) => {
  if (socialDrafts.value.length === 1) {
    return
  }
  socialDrafts.value.splice(index, 1)
}

const onSaveSocialChannels = async () => {
  const payload = socialDrafts.value.map((item) => ({
    name: item.name.trim(),
    description: item.description.trim(),
    url: item.url.trim(),
    icon: item.icon.trim()
  }))

  if (payload.some((item) => !item.name || !item.description || !item.url || !item.icon)) {
    alert("Vui lòng nhập đầy đủ thông tin cho từng kênh liên hệ")
    return
  }

  try {
    await saveSocialChannels(payload)
    alert("Đã cập nhật kênh liên hệ")
  } catch (error: any) {
    alert(error?.data?.statusMessage || error?.message || "Lưu kênh liên hệ thất bại")
  }
}

const onResetSocialDrafts = () => {
  syncSocialDrafts()
}
</script>
