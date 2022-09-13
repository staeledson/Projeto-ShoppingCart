const fetchItem = async (ItemID) => {
  const endPoint = `https://api.mercadolibre.com/items/$${ItemID}`;
  const resposta = await fetch(endPoint);
  const data = await resposta.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
