<template>
  <main>
    <HeroSection />
    <ProductSection />
    <SocialChannelsSection />
    <FaqSection />
    <ContactSection />
  </main>
</template>
<script setup>
definePageMeta({
  layout: "default"
})

useHead({
  title: 'bintech3D - Chuyên in ấn 3d linh kiện',
  meta: [
    { name: 'description', content: 'My amazing site.' },
  ],
})
import HeroSection from '~/components/sections/HeroSection.vue';
import ProductSection from '~/components/sections/ProductSection.vue';
import SocialChannelsSection from '~/components/sections/SocialChannelsSection.vue';
import FaqSection from '~/components/sections/FaqSection.vue';
import ContactSection from '~/components/sections/ContactSection.vue';
</script>
