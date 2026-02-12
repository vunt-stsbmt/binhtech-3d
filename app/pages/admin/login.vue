<template>
  <main class="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
    <section class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">Admin Login</p>
      <h1 class="mt-2 text-2xl font-bold text-slate-900">Đăng nhập quản trị</h1>
      <p class="mt-2 text-sm text-slate-600">Chỉ quản trị viên mới có quyền truy cập trang dashboard.</p>

      <form class="mt-6 grid gap-4" @submit.prevent="onLogin">
        <label class="text-sm">
          <span class="mb-2 block text-slate-600">Email</span>
          <input v-model.trim="email" type="email"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            placeholder="admin@domain.com">
        </label>

        <label class="text-sm">
          <span class="mb-2 block text-slate-600">Mật khẩu</span>
          <input v-model="password" type="password"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            placeholder="******">
        </label>

        <p v-if="errorMessage" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {{ errorMessage }}
        </p>

        <button type="submit" :disabled="loading"
          class="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60">
          {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
        </button>
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: "admin-auth"
})

useHead({
  title: "Đăng nhập Admin - bintech 3D",
  meta: [{ name: "description", content: "Đăng nhập khu vực quản trị bintech 3D" }]
})

const route = useRoute()
const session = useCookie("admin_session")

const email = ref("")
const password = ref("")
const loading = ref(false)
const errorMessage = ref("")

const onLogin = async () => {
  loading.value = true
  errorMessage.value = ""

  try {
    await $fetch("/api/admin/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value
      }
    })

    // Lưu vào localStorage
    if (import.meta.client) {
      window.localStorage.setItem("admin_auth_status", "true")
    }

    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/admin"
    if (import.meta.client) {
      window.location.assign(redirect)
      return
    }
    await navigateTo(redirect)
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || "Đăng nhập thất bại"
  } finally {
    loading.value = false
  }
}
</script>
