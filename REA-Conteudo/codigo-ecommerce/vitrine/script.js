/*
  produtos.js
  - Gerencia filtros e busca de produtos
*/
document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.querySelector('#search-bar');
  const searchButton = document.querySelector('.search-icon');
  if(!localStorage.getItem('produtos')){
    popularProdutos();
  }

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

const popularProdutos = () => {
  localStorage.setItem('produtos',`{"0":{"id":0,"nome":"Teclado Mecânico Redragon Kumara","preco":"155.99","foto":"https://cdn.awsli.com.br/1318/1318167/produto/51119129/878d55ddb8.jpg","descricao":"Alto desempenho e precisão com switches Outemu Brown e iluminação RGB."},"1":{"id":1,"nome":"Teclado Mecânico Makr 75 DIY","preco":"1599.99","foto":"../vitrine/Imagens/Teclado/teclado-makr.png","descricao":"Alto desempenho para seus jogos, teclado customizável."},"2":{"id":2,"nome":"Mouse Gamer G PRO","preco":"569.99","foto":"../vitrine/imagens/Mouse/mouse-gamer-sem-fio-logitech-g-pro.png","descricao":"Elegância e precisão trabalham juntos com o G PRO X."},"3":{"id":3,"nome":"Mouse Gamer SABRE","preco":"499.99","foto":"../vitrine/imagens/Mouse/mouse.png","descricao":"Design ergonômico, leve e com sensor de alta precisão."},"4":{"id":4,"nome":"Mousepad Pulsefire HyperX","preco":"114.99","foto":"../vitrine/imagens/MousePad/mousepad-hyperx-pulsefire.webp","descricao":"Superfície têxtil de alta precisão e base de borracha antiderrapante."},"5":{"id":5,"nome":"Headset Gamer Havit","preco":"131.99","foto":"../vitrine/imagens/HeadSet/headset-gamer-havit.webp","descricao":"Áudio de alta fidelidade com alto-falantes de 53mm e microfone de alta qualidade."},"6":{"id":6,"nome":"Placa de Vídeo MSI 5070 16GB","preco":"4999.99","foto":"../vitrine/imagens/Placa%20de%20V%C3%ADdeo/5070.png","descricao":"Arquitetura NVIDIA RTX 5070. 12 GB GDDR7 a 28 Gbps e resolução 7680 x 4320."},"7":{"id":7,"nome":"SSD SKC3000S 1TB","preco":"1870.99","foto":"../vitrine/imagens/SSD/KC30001T1.webp","descricao":"O SSD Kingston KC3000 PCIe 4.0 NVMe M.2 oferece velocidades formidáveis de até 7000MB/s."},"8":{"id":8,"nome":"SSD ADATA Legend 2TB","preco":"1499.99","foto":"../vitrine/imagens/SSD/adata.jpg","descricao":"O LEGEND 970 PRO adota a interface de transmissão PCIe Gen5 x4."},"9":{"id":9,"nome":"Memória VENGEANCE","preco":"1199.99","foto":"../vitrine/imagens/Mem%C3%B3ria%20RAM/memoria-vengeance.png","descricao":"Forneça as frequências mais altas e as maiores capacidades da tecnologia RAM DDR5."},"10":{"id":10,"nome":"Memória Fury","preco":"259.99","foto":"../vitrine/imagens/Mem%C3%B3ria%20RAM/memoria-fury.png","descricao":"Estilo limpo e refinado com uma estrutura superior de alumínio forjado."},"11":{"id":11,"nome":"Monitor Gamer Curvo ASUS TUF 34\\"\\"","preco":"2099.90","foto":"https://images1.kabum.com.br/produtos/fotos/952751/monitor-gamer-curvo-asus-tuf-34-wqhd-250hz-0-5ms-fast-va-freesync-premium-altura-ajustavel-som-integrado-preto-vg34wqml5a_1772549128_gg.jpg","descricao":"Monitor Gamer Curvo ASUS TUF 34\\"\\", WQHD, 250Hz, 0.5ms, Fast VA, FreeSync Premium, Altura Ajustável, Som Integrado, Preto - VG34WQML5A"},"12":{"id":12,"nome":"Processador AMD Ryzen 5 5600GT, 3.6 GHz","preco":"879.00","foto":"https://images8.kabum.com.br/produtos/fotos/520368/processador-amd-ryzen-5-5600gt-3-6-ghz-4-6ghz-max-turbo-cache-4mb-6-nucleos-12-threads-am4-100-100001488box_1708024586_gg.jpg","descricao":"Processador AMD Ryzen 5 5600GT, 3.6 GHz, (4.6GHz Max Turbo), Cache 4MB, 6 Núcleos, 12 Threads, AM4 - 100-100001488BOX"}}`);
  localStorage.setItem('nextId','13');
}