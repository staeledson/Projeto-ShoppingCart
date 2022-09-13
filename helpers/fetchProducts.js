const fetchProducts = async (param) => {
  try {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
    const receber = await fetch(endpoint);
    const data = await receber.json();
    // console.log(data);
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

// console.log(fetchProducts('computador'));
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
