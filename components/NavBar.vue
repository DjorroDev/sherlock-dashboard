<script setup>
const route = useRoute();

const links = [
  {
    label: "home",
    icon: "i-heroicons-home",
    to: "/dashboard",
  },
  {
    label: "Location Histories",
    icon: "i-heroicons-map-pin",
    to: `/location-histories`,
  },
  {
    label: "Contracts",
    icon: "i-heroicons-newspaper",
    to: "/contracts",
  },
];
</script>

<template>
  <header>
    <nav class="relative mb-16 z-10">
      <UHorizontalNavigation
        :links="links"
        class="flex justify-center fixed top-0 left-0 right-0 border-b border-gray-200 dark:border-gray-800 bg-gray-950"
      />
    </nav>
  </header>
</template>
