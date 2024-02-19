<script setup>
const toast = useToast();
const config = useRuntimeConfig();

const isSubmitting = ref(false);
const isUploading = ref(false);

const state = reactive({
  application_id: undefined,
  address: {
    kecamatan: undefined,
    kelurahan: undefined,
  },
  customer: {
    name: undefined,
    age: 0,
  },
  assets: "Motor",
  status: undefined,
  data: undefined,
  created_by: {
    id: "944671939348529153",
    name: "",
  },
});

const validate = (states) => {
  const errors = [];
  if (!states.application_id) errors.push({ path: "application_id", message: "Required" });
  if (!states.address.kecamatan) errors.push({ path: "kecamatan", message: "Required" });
  if (!states.address.kelurahan) errors.push({ path: "kelurahan", message: "Required" });
  if (!states.customer.name) errors.push({ path: "name", message: "Required" });
  // if (!states.data) errors.push({ path: "data", message: "Required" });
  return errors;
};

const data = ref(undefined);

async function handleFileChange(event) {
  isUploading.value = true;
  data.value = event.target.files[0];
  const formData = new FormData();
  // console.log(data.value);

  formData.append("file", data.value);
  // formData.append("public_id", state.data);
  formData.append("upload_preset", "xn47o6po");
  formData.append("api_key", config.public.cloudinaryApiSecret);

  toast.add({
    title: "wait, uploading..",
    icon: "i-heroicons-clock",
    color: "yellow",
  });

  await $fetch(
    `https://api.cloudinary.com/v1_1/${config.public.cloudinaryCloudName}/image/upload`,
    {
      method: "POST",
      // mode: "cors",
      body: formData,
    }
  )
    .then((result) => {
      isUploading.value = false;
      console.log(result.public_id, +" " + result.secure_url);
      state.data = result.secure_url;
      toast.add({ title: "Success upload img", icon: "i-heroicons-check-circle" });
    })
    .catch((err) => {
      isUploading.value = false;
      toast.add({
        title: "fail upload" + err,
        icon: "i-heroicons-exclamation-circle",
        color: "rose",
      });
      console.log(err);
    });
}

// async function onSubmit() {

// }

async function onSubmit(event) {
  isSubmitting.value = true;
  // console.log(state);
  await $fetch(`${config.public.serverLink}/api/contracts/`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(state),
  })
    .then((result) => {
      toast.add({ title: "Success make new contract" });
      isSubmitting.value = false;
      navigateTo("/contracts");
    })
    .catch((err) => {
      isSubmitting.value = false;
      toast.add({
        title: "error:" + err,
        icon: "i-heroicons-exclamation-circle",
        color: "rose",
      });
    });
}
</script>

<template>
  <UModal v-model="isSubmitting" prevent-close>
    <div class="flex flex-col justify-center items-center min-h-24 px-3 gap-2">
      <div class="text-4xl text-primary">LOADING..</div>
      <UProgress animation="carousel" />
    </div>
  </UModal>
  <h1 class="text-4xl mb-10">Create New Contract</h1>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="ID Application" name="application_id">
      <UInput v-model="state.application_id" />
    </UFormGroup>

    <UFormGroup label="Assets" name="assets">
      <UInput v-model="state.assets" />
    </UFormGroup>

    <UFormGroup label="Status" name="status">
      <UInput v-model="state.status" />
    </UFormGroup>

    <UFormGroup label="data (poto tabel)" name="data" @change="handleFileChange($event)">
      <UInput type="file" :required="true" />
    </UFormGroup>
    <UProgress v-if="isUploading" animation="carousel" color="yellow" />

    <p class="text-green-400" v-if="state.data">
      Upload Done <UIcon name="i-heroicons-check-circle" />
    </p>

    <h2 class="text-2xl">Alamat</h2>
    <UFormGroup label="Kecamatan" name="kecamatan">
      <UInput v-model="state.address.kecamatan" />
    </UFormGroup>
    <UFormGroup label="Kelurahan" name="kelurahan">
      <UInput v-model="state.address.kelurahan" />
    </UFormGroup>

    <h2 class="text-2xl">Detail customer</h2>
    <UFormGroup label="Nama" name="name">
      <UInput v-model="state.customer.name" />
    </UFormGroup>
    <UFormGroup label="Umur" name="age">
      <UInput v-model="state.customer.age" type="number" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
