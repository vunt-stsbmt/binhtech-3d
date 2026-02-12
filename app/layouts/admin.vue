<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <main v-if="isLoginPage">
      <slot />
    </main>

    <div v-else class="min-h-screen">
      <aside
        class="fixed inset-y-0 left-0 z-30 hidden w-64 overflow-y-auto border-r border-slate-800 bg-slate-900 text-slate-100 lg:flex lg:flex-col">
        <div class="border-b border-slate-700 px-5 py-5">
          <NuxtLink to="/admin" class="inline-flex items-center gap-2">
            <span class="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-900">QUẢN TRỊ</span>
            <span class="text-sm font-semibold tracking-wide">bintech 3D</span>
          </NuxtLink>
        </div>

        <nav class="flex-1 space-y-2 px-4 py-5 text-sm">
          <NuxtLink to="/admin" class="block rounded-xl px-4 py-3 font-semibold transition"
            :class="isDashboardPage ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-slate-800 hover:text-white'">
            <span class="inline-flex items-center gap-2">
              <LayoutDashboard class="h-4 w-4" />
              <span>Tổng quan</span>
            </span>
          </NuxtLink>
          <NuxtLink to="/admin/products" class="block rounded-xl px-4 py-3 font-semibold transition"
            :class="isProductsPage ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-slate-800 hover:text-white'">
            <span class="inline-flex items-center gap-2">
              <Package class="h-4 w-4" />
              <span>Sản phẩm</span>
            </span>
          </NuxtLink>
          <NuxtLink to="/admin/social-channels" class="block rounded-xl px-4 py-3 font-semibold transition"
            :class="isSocialChannelsPage ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-slate-800 hover:text-white'">
            <span class="inline-flex items-center gap-2">
              <Share2 class="h-4 w-4" />
              <span>Kênh liên hệ</span>
            </span>
          </NuxtLink>
        </nav>

        <div class="border-t border-slate-700 px-4 py-4">
          <NuxtLink to="/"
            class="mb-2 block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white">
            <span class="inline-flex items-center gap-2">
              <Globe class="h-4 w-4" />
              <span>Xem website</span>
            </span>
          </NuxtLink>
          <button type="button"
            class="w-full rounded-xl border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            @click="onLogout">
            <span class="inline-flex items-center gap-2">
              <LogOut class="h-4 w-4" />
              <span>Đăng xuất</span>
            </span>
          </button>
        </div>
      </aside>

      <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-slate-900/45 lg:hidden" aria-hidden="true"
          @click="closeMobileMenu" />
      </Transition>

      <Transition enter-active-class="transform transition duration-200" enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0" leave-active-class="transform transition duration-200"
        leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
        <aside v-if="mobileMenuOpen"
          class="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto border-r border-slate-800 bg-slate-900 text-slate-100 lg:hidden"
          role="dialog" aria-modal="true" aria-label="Menu quản trị">
          <div class="flex items-center justify-between border-b border-slate-700 px-4 py-4">
            <NuxtLink to="/admin" class="inline-flex items-center gap-2" @click="closeMobileMenu">
              <span class="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-900">QUẢN TRỊ</span>
              <span class="text-sm font-semibold tracking-wide">bintech 3D</span>
            </NuxtLink>

            <button type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600 text-slate-200 transition hover:bg-slate-800"
              aria-label="Đóng menu" @click="closeMobileMenu">
              <X class="h-5 w-5" />
            </button>
          </div>

          <nav class="space-y-2 px-4 py-5 text-sm">
            <NuxtLink to="/admin" class="block rounded-xl px-4 py-3 font-semibold transition"
              :class="isDashboardPage ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
              @click="closeMobileMenu">
              <span class="inline-flex items-center gap-2">
                <LayoutDashboard class="h-4 w-4" />
                <span>Tổng quan</span>
              </span>
            </NuxtLink>
            <NuxtLink to="/admin/products" class="block rounded-xl px-4 py-3 font-semibold transition"
              :class="isProductsPage ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
              @click="closeMobileMenu">
              <span class="inline-flex items-center gap-2">
                <Package class="h-4 w-4" />
                <span>Sản phẩm</span>
              </span>
            </NuxtLink>
            <NuxtLink to="/admin/social-channels" class="block rounded-xl px-4 py-3 font-semibold transition"
              :class="isSocialChannelsPage ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
              @click="closeMobileMenu">
              <span class="inline-flex items-center gap-2">
                <Share2 class="h-4 w-4" />
                <span>Kênh liên hệ</span>
              </span>
            </NuxtLink>
          </nav>

          <div class="border-t border-slate-700 px-4 py-4">
            <NuxtLink to="/"
              class="mb-2 block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              @click="closeMobileMenu">
              <span class="inline-flex items-center gap-2">
                <Globe class="h-4 w-4" />
                <span>Xem website</span>
              </span>
            </NuxtLink>
            <button type="button"
              class="w-full rounded-xl border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
              @click="onMobileLogout">
              <span class="inline-flex items-center gap-2">
                <LogOut class="h-4 w-4" />
                <span>Đăng xuất</span>
              </span>
            </button>
          </div>
        </aside>
      </Transition>

      <div class="min-w-0 lg:pl-64">
        <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur lg:hidden">
          <div class="flex items-center justify-between px-4 py-3 sm:px-6">
            <button type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:bg-slate-100"
              aria-label="Mở menu" @click="openMobileMenu">
              <Menu class="h-5 w-5" />
            </button>

            <NuxtLink to="/admin" class="inline-flex items-center gap-2 text-slate-900">
              <span class="rounded-md bg-slate-900 px-2 py-1 text-xs font-bold text-white">QUẢN TRỊ</span>
              <span class="text-sm font-semibold tracking-wide">bintech 3D</span>
            </NuxtLink>

            <div class="h-10 w-10" />
          </div>
        </header>

        <div class="relative">
          <div
            class="pointer-events-none absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-blue-100/70 to-transparent" />
          <main class="relative">
            <slot />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Globe, LayoutDashboard, LogOut, Menu, Package, Share2, X } from "lucide-vue-next"

const route = useRoute()
const mobileMenuOpen = ref(false)

const normalizePath = (path: string) => path.replace(/\/$/, "")

const isLoginPage = computed(() => normalizePath(route.path) === "/admin/login")
const isDashboardPage = computed(() => normalizePath(route.path) === "/admin")
const isProductsPage = computed(() => normalizePath(route.path) === "/admin/products")
const isSocialChannelsPage = computed(() => normalizePath(route.path) === "/admin/social-channels")

const openMobileMenu = () => {
  mobileMenuOpen.value = true
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

watch(() => route.fullPath, () => {
  closeMobileMenu()
})

watch(mobileMenuOpen, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? "hidden" : ""
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ""
  }
})

const onLogout = async () => {
  await $fetch("/api/admin/logout", { method: "POST" })
  if (import.meta.client) {
    window.localStorage.removeItem("admin_auth_status")
  }
  await navigateTo("/admin/login")
}

const onMobileLogout = async () => {
  closeMobileMenu()
  await onLogout()
}
</script>
