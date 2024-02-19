<script setup>
const { data, pending, error } = await useFetch("/api/get/contracts");
const toast = useToast();

const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

// console.log(data.value.data);
const source = ref("Hello");
const { copy } = useClipboard({ source });
</script>

<template>
  <h1 class="text-4xl mb-10">Contracts para konsumen</h1>
  <UButton to="/contracts/create" class="mb-4">
    <UIcon class="text-xl font-bold" name="i-heroicons-plus" />New Contract</UButton
  >
  <div v-if="!data">Blom ada data</div>
  <div v-else class="flex flex-col gap-5">
    <UCard as="div" v-for="contract in data.data">
      <NuxtLink :to="`/contracts/` + contract.id" class="text-primary font-bold text-2xl">
        <h2 class="mb-2">{{ contract.customer.name }} - {{ contract.application_id }}</h2>
      </NuxtLink>
      <p>Kecamatan: {{ contract.address.kecamatan }}</p>
      <p>Kelurahan: {{ contract.address.kelurahan }}</p>
      <p>asset: motor</p>
      <p class="text-sm mt-2 -mb-3">
        {{ new Date(contract.created_at).toLocaleTimeString("en-GB") }}
        {{ new Date(contract.created_at).toLocaleDateString() }}
      </p>
      <template #footer>
        <UButton
          @click="
            copy('localhost:3001/' + contract.customer.name.replaceAll(' ', '-')),
              toast.add({ title: `Link has been copied!`, icon: `i-heroicons-check` })
          "
          >Copy Generated link</UButton
        >
      </template>
    </UCard>
  </div>
</template>
