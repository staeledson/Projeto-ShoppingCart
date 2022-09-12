const fetchProducts = async (QUERY) => {
  if (QUERY !== null && QUERY !== undefined) {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const receber = await fetch(endpoint);
    const data = await receber.json();
    return data;
  }
  console.log(QUERY);
  return new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
