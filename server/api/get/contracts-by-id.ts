export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = process.env.NUXT_PUBLIC_SERVER_LINK;
  const result = await $fetch(`${url}/api/contracts/${query.id}`);

  return result;
});
