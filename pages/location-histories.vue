<script setup>
const { data, pending, error } = await useFetch("/api/get/location");
// console.log(data.value.data);
</script>

<template>
  <h1 class="text-3xl mb-2">All Location Detected</h1>
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
      <p>Accuracy: {{ location.accuracy }}</p>
      <p>Latitude, Longitude:</p>
      <p>{{ location.latitude }}, {{ location.longitude }}</p>
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
