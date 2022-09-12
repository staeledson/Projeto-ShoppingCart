require('../mocks/fetchSimulator');
// const { expect } = require('chai');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const { expect } = require('@jest/globals');

describe('1 - Teste a função fetchProducts', () => {
  // expect.assertion(1);
  // implemente seus testes aqui
  // fail('Teste vazio');

  test('Testando se fetchProduts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('Testando fetchProduts() com argumento "computador" e se fetch foi chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    // console.log(await fetchProducts()).toThrowError('You must provide an url');
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
