const fetchItem = async (ItemID) => {
  const endPoint = `https://api.mercadolibre.com/items/${ItemID}`;
  const response = await fetch(endPoint);
  const data = await response.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
