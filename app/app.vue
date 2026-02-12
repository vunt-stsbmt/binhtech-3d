<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png?v=2' },
  ]
})
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap');

:root {
  font-family: "SN Pro", sans-serif;
}

body {
  font-family: "SN Pro", sans-serif;
}
</style>
