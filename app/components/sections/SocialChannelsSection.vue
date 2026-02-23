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

      <div v-if="shouldUseSlider" class="relative mt-8">
        <div
          ref="sliderContainer"
          class="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 md:gap-4"
          @scroll="updateSliderControls"
        >
          <a
            v-for="channel in channels"
            :key="channel.name"
            :href="channel.url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-[47%] min-w-[47%] snap-start flex-none rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md md:w-[48%] md:min-w-[48%] md:p-5 lg:w-[31.8%] lg:min-w-[31.8%]"
          >
            <img :src="channel.icon" :alt="channel.name" class="w-12 rounded-xl sm:w-14" loading="lazy">
            <h3 class="mt-2 text-xl font-bold text-slate-900">{{ channel.name }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ channel.description }}</p>
            <p class="mt-4 text-sm font-semibold text-blue-700">Truy cập kênh</p>
          </a>
        </div>

        <button
          class="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 md:block"
          type="button"
          :disabled="!canSlidePrev"
          @click="slideChannels('prev')"
        >
          ‹
        </button>
        <button
          class="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 md:block"
          type="button"
          :disabled="!canSlideNext"
          @click="slideChannels('next')"
        >
          ›
        </button>
      </div>

      <div v-else class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="channel in channels"
          :key="channel.name"
          :href="channel.url"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
        >
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
const { channels, fetchSocialChannels } = useSocialChannels()
const sliderContainer = ref<HTMLElement | null>(null)
const canSlidePrev = ref(false)
const canSlideNext = ref(false)

const shouldUseSlider = computed(() => {
  return channels.value.length >= 3
})

const updateSliderControls = () => {
  if (!sliderContainer.value || !shouldUseSlider.value) {
    canSlidePrev.value = false
    canSlideNext.value = false
    return
  }

  const { scrollLeft, clientWidth, scrollWidth } = sliderContainer.value
  canSlidePrev.value = scrollLeft > 4
  canSlideNext.value = scrollLeft + clientWidth < scrollWidth - 4
}

const slideChannels = (direction: 'prev' | 'next') => {
  if (!sliderContainer.value) return

  const step = sliderContainer.value.clientWidth * 0.9
  const offset = direction === 'next' ? step : -step
  sliderContainer.value.scrollBy({ left: offset, behavior: 'smooth' })
}

onMounted(() => {
  fetchSocialChannels()
  window.addEventListener('resize', updateSliderControls)
})

watch(channels, async () => {
  await nextTick()
  updateSliderControls()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSliderControls)
})
</script>
