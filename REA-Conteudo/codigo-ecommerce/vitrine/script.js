/*
  produtos.js
  - Gerencia filtros e busca de produtos
*/
document.addEventListener('DOMContentLoaded', () => {
  const filterCategory = document.getElementById('filter-category');
  const searchBar = document.getElementById('search-bar');
  const searchButton = document.querySelector('.header-actions .search-icon'); 
  const productCards = document.querySelectorAll('.product-grid .product-card');

  function filterProducts() {
    // Se não houver seletor de categoria, nada a filtrar
    if (!filterCategory) return; 

    // Valores atuais dos filtros/consulta
    const categoryValue = filterCategory.value;
    const searchValue = searchBar.value.toLowerCase();

    // Para cada card de produto: determina se deve ser exibido
    productCards.forEach(card => {
      // categoria e texto para busca
      const cardCategory = card.dataset.category || 'all';
      const cardPrice = parseFloat(card.dataset.price) || 0; // mantido por compatibilidade
      const cardText = (card.querySelector('h3').textContent + ' ' + card.querySelector('p').textContent).toLowerCase();
      
      // verifica se a categoria selecionada corresponde ao card (ou 'all')
      const categoryMatch = (categoryValue === 'all') || (categoryValue === cardCategory);

      // filtro de preço foi removido: mantemos como true para não bloquear
      const priceMatch = true; 
      
      // busca por texto: vazio = corresponde a todos
      const searchMatch = (searchValue === '') || cardText.includes(searchValue);

      // Exibe ou esconde o card conforme os critérios
      card.style.display = (categoryMatch && priceMatch && searchMatch) ? 'flex' : 'none';
    });
  }

  if(filterCategory) filterCategory.addEventListener('change', filterProducts);
  if(searchButton) searchButton.addEventListener('click', filterProducts);
  if(searchBar) searchBar.addEventListener('keyup', (e) => { if (e.key === 'Enter') filterProducts(); });

  // Restaura busca salva (caso venha de outra página) e aplica filtro
  const savedSearch = localStorage.getItem('sprintSearch');
  if (savedSearch && searchBar) {
    searchBar.value = savedSearch;
    filterProducts();
    localStorage.removeItem('sprintSearch');
  }

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

const formatarPreco = (preco) => {
    return parseFloat(preco).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
}

const atualizarValorCarrinho = () => {
    document.querySelector('.cart-count').textContent = (JSON.parse(localStorage.getItem('carrinho')||[])).length
}

let toastTimeout;
let blinkTimeout;

const notificar = () => {
    const toast = document.querySelector('.toast');

    clearTimeout(toastTimeout);
    clearTimeout(blinkTimeout);
    
    if(toast.classList.contains('mostrar')) {
      toast.classList.remove('mostrar');
      blinkTimeout = setTimeout(() => {
        toast.classList.add('mostrar')
      }, 150);
    }else{
      toast.classList.add('mostrar')
    }

    toastTimeout = setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 3000);
}