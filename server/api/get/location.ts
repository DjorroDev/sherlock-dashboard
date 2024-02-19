export default defineEventHandler(async () => {
  const url = process.env.NUXT_PUBLIC_SERVER_LINK;
  const result = await $fetch(`${url}/api/location-histories/`);

  return result;
});
