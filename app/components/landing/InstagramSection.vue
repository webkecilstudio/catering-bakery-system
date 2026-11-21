<script setup lang="ts">
const photos = [
  { image: '/images/gallery/1.jpg', alt: 'Kue perayaan' },
  { image: '/images/gallery/2.jpg', alt: 'Croissant segar' },
  { image: '/images/gallery/3.jpg', alt: 'Dessert dengan berry' },
  { image: '/images/gallery/4.jpg', alt: 'Meja catering' },
  { image: '/images/gallery/5.jpg', alt: 'Dessert cokelat' },
  { image: '/images/gallery/6.jpg', alt: 'Roti segar' }
]
</script>

<template>
  <section id="gallery" class="bg-[#fff9f4]"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
    <div class="flex items-end justify-between gap-5">
      <SectionHeading eyebrow="Dari dapur kami" title="Ikuti @dapuronty"></SectionHeading>
      <a href="#" class="hidden rounded-xl border border-black/10 px-4 py-2.5 text-sm font-bold transition hover:border-brand-orange hover:text-brand-orange sm:inline-flex">Instagram ↗</a>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
      <a v-for="photo in photos" :key="photo.image" href="#" class="group relative overflow-hidden rounded-2xl">
        <img :src="photo.image" :alt="photo.alt" class="aspect-square w-full object-cover transition duration-500 group-hover:scale-110">
        <div class="absolute inset-0 flex items-center justify-center bg-brand-orange/70 opacity-0 transition group-hover:opacity-100"><span class="text-2xl text-white">♡</span></div>
      </a>
    </div>
    </div>
  </section>
</template>
