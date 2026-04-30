/*
  produtos.js
  - Gerencia filtros e busca de produtos
*/
document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.querySelector('#search-bar');
  const searchButton = document.querySelector('.search-icon');

  function filterProducts() {
    const productCards = document.querySelectorAll('.product-card');
    const searchValue = searchBar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Para cada card de produto: determina se deve ser exibido
    productCards.forEach(card => {
      const cardText = (card.querySelector('h3').textContent + ' ' + card.querySelector('p').textContent).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // busca por texto: vazio = corresponde a todos
      const searchMatch = (searchValue === '') || cardText.includes(searchValue);
      // Exibe ou esconde o card conforme os critérios
      card.style.display = searchMatch === true ? 'flex' : 'none';
    });
  }

  if (searchButton) searchButton.addEventListener('click', filterProducts);
  if (searchBar) searchBar.addEventListener('keyup', filterProducts);

  const render = (() => {
    const grid = document.querySelector('.product-grid');
    const produtos = Object.entries(JSON.parse(localStorage.getItem('produtos')));
    const cards = document.querySelectorAll('.product-card');
    const fragment = document.createDocumentFragment();
    cards.forEach((e) => e.remove());
    produtos.forEach((e) => {
      e = e[1]
      const div = document.createElement('div');
      div.classList.add('product-card');
      div.setAttribute('data-id', e.id);

      div.innerHTML = `<img src="${e.foto}" alt="${e.nome}">
      <h3>${e.nome}</h3>
      <p>${e.descricao}</p>
      <p class="product-price">${formatarPreco(e.preco)}</p>
      <div class="product-buy-buttons"><button class="btn-buy" onclick="adicionarNoCarrinho(event)">Adicionar ao Carrinho</button></div>`

      fragment.appendChild(div);
    });
    grid.appendChild(fragment);
    atualizarValorCarrinho();
  })();
});

const adicionarNoCarrinho = (e) => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const id = e.target.closest('.product-card').getAttribute('data-id');
  const item = carrinho.find((e) => e.id_produto == id);

  if (item) {
    item.quantidade += 1;
  } else {
    carrinho.push({ id_produto: id, quantidade: 1 })
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarValorCarrinho();
  notificar();
}

const formatarPreco = (preco) => {
  return parseFloat(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const atualizarValorCarrinho = () => {
  document.querySelector('.cart-count').textContent = (JSON.parse(localStorage.getItem('carrinho')) || []).length
}

let toastTimeout;
let blinkTimeout;

const notificar = () => {
  const toast = document.querySelector('.toast');

  clearTimeout(toastTimeout);
  clearTimeout(blinkTimeout);

  if (toast.classList.contains('mostrar')) {
    toast.classList.remove('mostrar');
    blinkTimeout = setTimeout(() => {
      toast.classList.add('mostrar')
    }, 150);
  } else {
    toast.classList.add('mostrar')
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove('mostrar');
  }, 3000);
}