const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  test('Testando se getSavedCartItems é uma função', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });

  test('Testa se a função localStorage.getItem é chamada ', async () => {
    await getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  test('Testa se a função localStorage.getItem é chamada corretamente com "cartItems"', async () => {
    await getSavedCartItems()
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems');
  });

});
