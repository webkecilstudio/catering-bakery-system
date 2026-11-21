<script setup lang="ts">
const catalog = getCatalog()
const packages = computed(() => catalog.packages)
</script>

<template>
  <section class="bg-brand-ink">
    <div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <SectionHeading eyebrow="Catering · Mudah direncanakan" title="Paket catering" description="Paket fleksibel yang disesuaikan dengan jumlah tamu." />
      <div class="mt-10 grid gap-5 lg:grid-cols-3">
        <article v-for="pkg in packages" :key="pkg.id" :class="pkg.featured ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/10 bg-white/5 text-white'" class="relative rounded-2xl border p-7">
          <span v-if="pkg.featured" class="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-orange">Paling populer</span>
          <p :class="pkg.featured ? 'text-orange-100' : 'text-orange-300'" class="text-sm font-bold uppercase tracking-wider">{{ pkg.minGuests }}–{{ pkg.maxGuests }} tamu</p>
          <h3 class="mt-3 font-display text-2xl font-bold">{{ pkg.name }}</h3>
          <p class="mt-6 text-4xl font-bold">{{ formatIDR(pkg.pricePerPax) }} <span class="text-sm font-normal opacity-70">/ pax</span></p>
          <div class="my-7 h-px bg-current opacity-15"></div>
          <ul class="space-y-3 text-sm opacity-85">
            <li v-for="item in pkg.includes" :key="item"><span class="mr-2 text-orange-300">✓</span>{{ item }}</li>
          </ul>
          <NuxtLink :to="`/catering/${pkg.slug}`" :class="pkg.featured ? 'bg-white text-brand-orange' : 'border border-white/25 text-white hover:bg-white hover:text-brand-ink'" class="mt-8 inline-flex w-full justify-center rounded-xl px-5 py-3 text-sm font-bold transition">Pilih paket</NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
