<template>
  <div class="flex min-h-screen flex-col bg-slate-100 text-slate-900">
    <AppHeader />
    <div class="flex-1">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
