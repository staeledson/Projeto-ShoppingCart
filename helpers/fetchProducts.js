const fetchProducts = async (QUERY) => {
  if (QUERY) {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const receber = await fetch(endpoint);
    const data = await receber.json();
    console.log(data.query);
    return data;
  }
  // console.log(QUERY);
  return new Error('You must provide an url');
};
fetchProducts('computador');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
