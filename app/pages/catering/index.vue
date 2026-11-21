<script setup lang="ts">
useHead({ title: 'Catering — Dapur Onty' })

const catalog = getCatalog()
const packages = computed(() => catalog.packages)
const dishes = computed(() => catalog.dishes)
const dishGroups = [
  { type: 'savory', label: 'Gurih' },
  { type: 'sweet', label: 'Manis' },
  { type: 'drink', label: 'Minuman' }
] as const
</script>

<template>
  <section class="bg-brand-ink text-white">
    <div class="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Catering</p>
      <h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Paket catering event</h1>
      <p class="mt-4 max-w-xl text-base leading-7 text-white/70">Pilih paket, tentukan jumlah tamu, pilih lauk pauknya. Tim kami konfirmasi via WhatsApp.</p>

      <div class="mt-10 grid gap-5 lg:grid-cols-3">
        <article
          v-for="pkg in packages"
          :key="pkg.id"
          :class="pkg.featured ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/10 bg-white/5 text-white'"
          class="relative flex flex-col overflow-hidden rounded-2xl border"
        >
          <img :src="pkg.image" :alt="pkg.name" class="h-40 w-full object-cover">
          <div class="flex flex-1 flex-col p-7">
            <span v-if="pkg.featured" class="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-orange">Paling populer</span>
            <p :class="pkg.featured ? 'text-orange-100' : 'text-orange-300'" class="text-sm font-bold uppercase tracking-wider">{{ pkg.minGuests }}–{{ pkg.maxGuests }} tamu</p>
            <h2 class="mt-3 font-display text-2xl font-bold">{{ pkg.name }}</h2>
            <p :class="pkg.featured ? 'text-orange-100' : 'text-white/60'" class="mt-2 text-sm leading-6">{{ pkg.description }}</p>
            <p class="mt-6 text-4xl font-bold">{{ formatIDR(pkg.pricePerPax) }} <span class="text-sm font-normal opacity-70">/ pax</span></p>
            <div class="my-7 h-px bg-current opacity-15"></div>
            <ul class="flex-1 space-y-3 text-sm opacity-85">
              <li v-for="item in pkg.includes" :key="item"><span class="mr-2 text-orange-300">✓</span>{{ item }}</li>
              <li><span class="mr-2 text-orange-300">✓</span>Pilih {{ pkg.dishSlots }} menu</li>
            </ul>
            <NuxtLink
              :to="`/catering/${pkg.slug}`"
              :class="pkg.featured ? 'bg-white text-brand-orange' : 'border border-white/25 text-white hover:bg-white hover:text-brand-ink'"
              class="mt-8 inline-flex w-full justify-center rounded-xl px-5 py-3 text-sm font-bold transition"
            >
              Pilih paket
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
    <SectionHeading eyebrow="Menu catering" title="Lauk pauk & hidangan" description="Semua menu di bawah bisa dipilih sesuai paket. Jumlah pilihan mengikuti paket yang kamu ambil." />
    <div class="mt-10 grid gap-5 sm:grid-cols-3">
      <div v-for="group in dishGroups" :key="group.type" class="rounded-2xl border border-black/5 p-6">
        <h3 class="text-sm font-bold uppercase tracking-wider text-brand-orange">{{ group.label }}</h3>
        <ul class="mt-4 space-y-3">
          <li v-for="dish in dishes.filter((d) => d.type === group.type)" :key="dish.id" class="flex items-center gap-3 text-sm">
            <img :src="dish.image" :alt="dish.name" class="h-12 w-12 shrink-0 rounded-lg object-cover">
            <span>
              <span class="block font-medium">{{ dish.name }}</span>
              <span class="block text-xs text-brand-muted">{{ dish.description }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
