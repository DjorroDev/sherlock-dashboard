<script setup>
const { data, pending, error } = await useFetch("/api/get/location");
// console.log(data.value.data);
</script>

<template>
  <h1 class="text-3xl mb-2">All Location Detected</h1>
  <div>
    <UPopover class="w-min mb-3" :ui="{ background: 'dark:bg-gray-950' }">
      <UButton color="white" label="Info" trailing-icon="i-heroicons-information-circle-20-solid" />
      <template #panel>
        <div class="p-4 w-80">
          <p>
            <span class="text-primary">Accuracy</span>, Semakin rendah angkanya semakin tinggi
            akurasinya.
          </p>
          <p><span class="text-rose-400">Infinity</span>, Gagal mendapatkan lokasi target.</p>
        </div>
      </template>
    </UPopover>
  </div>
  <div v-if="pending">loding</div>
  <div class="flex flex-col gap-5">
    <div v-if="!data">Kosong lurr</div>
    <pre v-else-if="error">could not load data {{ error.data }} </pre>
    <UCard v-else as="div" v-for="location in data.data">
      <template #header>
        <NuxtLink :to="`/contracts/${location.contract_id}`" class="text-2xl text-primary">{{
          location.customer_name
        }}</NuxtLink>
        <p>
          Pada:
          {{
            new Date(location.created_at).toLocaleTimeString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <p>{{ useTimeAgo(new Date(location.created_at)) }}</p>
      </template>
      <p>
        Accuracy:
        <span v-if="location.accuracy == 0" class="text-rose-400">error</span>
        <span v-else class="text-primary">{{ location.accuracy }}</span>
      </p>
      <p>Latitude, Longitude:</p>
      <p class="text-rose-400" v-if="location.latitude === 'Infinity'">
        {{ location.latitude }}, {{ location.longitude }}
      </p>
      <p v-else class="text-primary">{{ location.latitude }}, {{ location.longitude }}</p>
      <template #footer>
        <UButton
          target="_blank"
          :to="`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`"
          >Buka GMAPS</UButton
        >
      </template>
    </UCard>
  </div>
</template>
