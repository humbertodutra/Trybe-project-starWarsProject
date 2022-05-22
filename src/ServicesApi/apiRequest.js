export default function apiRequest(link) {
  const endpoint = link;
  const obj = async () => {
    const { results } = await fetch(endpoint)
      .then((response) => response.json());
    return results;
  };
  return obj;
}
