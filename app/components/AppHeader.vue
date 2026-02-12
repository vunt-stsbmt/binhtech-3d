<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <NuxtLink to="/" class="flex items-center text-sm font-extrabold tracking-tight text-slate-900">
        <img src="/logo.png" alt="bintech 3D" class="h-10 w-auto object-contain sm:h-10" />
      </NuxtLink>

      <nav class="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
        <NuxtLink to="/#bo-suu-tap" class="transition hover:text-slate-900">Bộ sưu tập</NuxtLink>
        <NuxtLink to="/#lien-he" class="transition hover:text-slate-900">Liên hệ</NuxtLink>
        <NuxtLink to="/#cong-nghe" class="transition hover:text-slate-900">Công nghệ</NuxtLink>
      </nav>

      <NuxtLink to="/#lien-he"
        class="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        Liên hệ ngay
      </NuxtLink>
    </div>
  </header>
</template>
