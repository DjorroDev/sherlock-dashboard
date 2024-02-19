<script setup>
const route = useRoute();
const { data } = await useFetch(`/api/get/contracts-by-id?id=${route.params.id}`);
// console.log(route.params.id);

const locations = ref([]);

await $fetch(`/api/get/location-by-id?id=${route.params.id}`).then((res) => {
  locations.value = res.data;
  console.log(res.data);
});
// console.log(locations);

// console.log(data);
</script>

<template>
  <h1 class="text-4xl mb-4">Contract konsumens {{ data.data.id }}</h1>
  <UCard class="overflow-auto">
    <h3 class="text-3xl mb-2 text-primary">{{ data.data.customer.name }}</h3>
    <div v-for="(contract, i) in data.data">
      <pre>{{ i }}: {{ contract }}</pre>
    </div>
  </UCard>
  <h1 class="text-2xl text-center my-5">lokasi terakhir Konsumen</h1>
  <div class="text-center">
    <!-- <UButton @click="getLoc">CHECK</UButton> -->
  </div>
  <div v-if="!locations" class="text-center">Belum kepancing lurr</div>
  <UCard as="div" class="mt-6" v-for="location in locations">
    <template #header>
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
</template>
