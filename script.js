// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const cartItems = document.querySelector('.cart__items');
const cartItem = document.querySelector('.cart__items');
const divTotal = document.querySelector('.total-price');
let somaCarrinho = 0;

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const removerTextoDeLoading = async () => {
  document.querySelector('.items').firstChild.remove();
};

const somarProdutosDoCarrinho = async (price) => {
  const soma = parseFloat(somaCarrinho) + parseFloat(price.toFixed(2));
  somaCarrinho = soma;
  localStorage.setItem('total_ammount', soma);
  divTotal.innerText = await localStorage.getItem('total_ammount');
};

const subtratirProdutosDoCarrinho = async (price) => {
  const soma = parseFloat(somaCarrinho) - parseFloat(price.toFixed(2));
  somaCarrinho = soma;
  localStorage.setItem('total_ammount', soma);
  divTotal.innerText = await localStorage.getItem('total_ammount');
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  // li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', (event) => {
    if (event.target.className === 'cart__item') {
      subtratirProdutosDoCarrinho(price);
      event.target.remove();
    }
  });
  
  somarProdutosDoCarrinho(price);
  return li;
};

const adcItemCart = async (event) => {
  const item = event.target.parentNode.firstChild.innerText;
  const objItem = await fetchItem(item);
  const cartEle = createCartItemElement(objItem);
  cartItems.appendChild(cartEle);
  saveCartItems(cartItems.innerHTML);
};

const criarListaDaPesquisa = async () => {
  const saida = await fetchProducts('computador');
  await removerTextoDeLoading();
  const items = document.querySelector('.items');
  saida.results.forEach((p) => {
    const element = createProductItemElement(p);
    element.querySelector('.item__add').addEventListener('click', adcItemCart);
    items.appendChild(element);
  });
};

const recuperarItensDoLS = async () => {
  const totalArmazenado = await localStorage.getItem('total_ammount');
  console.log(typeof totalArmazenado);
  if (totalArmazenado > 0) {
    somaCarrinho = parseFloat(totalArmazenado);
  }

  divTotal.innerText = somaCarrinho;

  cartItems.innerHTML = await getSavedCartItems();
  cartItem.addEventListener('click', (event) => {
    if (event.target.className === 'cart__item') {
      // subtratirProdutosDoCarrinho(price);
      event.target.remove();
    }
  });
};

const inserirTextoDeLoading = () => {
  const itemsSection = document.querySelector('.items');
  const textoDeLoading = document.createElement('p');
  itemsSection.appendChild(textoDeLoading);
  textoDeLoading.className = 'loading';
  textoDeLoading.innerHTML = 'Loading...';
};

const esvaziarCarrinho = () => {
  btnEsvaziarCarrinho = document.querySelector('.empty-cart');
  btnEsvaziarCarrinho.addEventListener('click', () => {
    // console.log('btn esvaziar clicado');
    cartItems.innerText = '';
    localStorage.clear();
    divTotal.innerText = '0';
  });
};

esvaziarCarrinho();

window.onload = async () => {
  inserirTextoDeLoading();
  recuperarItensDoLS();
  criarListaDaPesquisa();
};
