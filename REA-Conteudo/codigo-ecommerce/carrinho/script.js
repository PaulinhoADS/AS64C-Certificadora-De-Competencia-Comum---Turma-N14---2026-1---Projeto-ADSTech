document.addEventListener('DOMContentLoaded',(e)=>{
    verificarCarrinhoVazio();
});

const verificarCarrinhoVazio = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

    const carrinhoVazio = document.querySelector('.carrinho-vazio');
    const resumoCarrinho = document.querySelector('.resumo-carrinho');

    resumoCarrinho.classList.remove('oculto');
    carrinhoVazio.classList.remove('oculto');
    if (carrinho.length == 0) {
        resumoCarrinho.classList.add('oculto');
    } else {
        carrinhoVazio.classList.add('oculto');
        carregarCarrinho(carrinho);
    }
}

const carregarCarrinho = (carrinho) => {
    const produtosTotal = JSON.parse(localStorage.getItem('produtos'));
    const produtos = carrinho.map(e => {
        const produto = produtosTotal[e.id_produto];
        produto['quantidade'] = e.quantidade
        produto['preco'] = parseFloat(produto.preco)
        produto['valor_total'] = e.quantidade * produto.preco
        return produto;
    });

    const itensCarrinho = document.querySelector('.itens-carrinho')
    const fragment = document.createDocumentFragment();
    let valorTotal = 0;
    produtos.forEach((e) => {
        const item = document.createElement('div');
        item.classList.add('item')
        const string = `
            <img src="${e.foto}" alt="${e.nome}">

            <div class="item-detalhes">
                <h3>${e.nome}</h3>
                <p class="preco-unitario">R$ ${e.preco.toFixed(2)}</p>

                <div class="item-acoes">
                    <input type="number" value="${e.quantidade}" min="1" class="qtd-input">
                    <button class="btn-remover">Excluir</button>
                 </div>
             </div>

            <div class="item-total">
                <p class="preco-subtotal">R$ ${e.valor_total.toFixed(2)}</p>
             </div>
        `;
        item.innerHTML=string;
        fragment.appendChild(item);
        valorTotal += e.valor_total;
    });
    itensCarrinho.appendChild(fragment);
    document.querySelector('.valor-total').textContent = `R$ ${valorTotal.toFixed(2)}`;
}