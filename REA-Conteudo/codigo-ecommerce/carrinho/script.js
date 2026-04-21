document.addEventListener('DOMContentLoaded',(e)=>{
    verificarCarrinhoVazio();
});

document.querySelector('.itens-carrinho').addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn-remover')){
        const id = e.target.closest('.item').getAttribute('data-id');
        removerProduto(id);
    }
});

document.querySelector('.itens-carrinho').addEventListener('change',(e)=>{
    if(e.target.classList.contains('qtd-input')){
        const id = e.target.closest('.item').getAttribute('data-id');
        alterarQuantidade(id,parseInt(e.target.value));
    }
});

const verificarCarrinhoVazio = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

    const carrinhoVazio = document.querySelector('.carrinho-vazio');
    const resumoCarrinho = document.querySelector('.resumo-carrinho');

    resumoCarrinho.classList.remove('oculto');
    carrinhoVazio.classList.remove('oculto');
    limparTela();
    if (carrinho.length == 0) {
        resumoCarrinho.classList.add('oculto');
    } else {
        carrinhoVazio.classList.add('oculto');
        carregarCarrinho(carrinho);
    }
}

const carregarCarrinho = (carrinho) => {
    const produtos = obterCarrinhoDetalhado(carrinho);

    const itensCarrinho = document.querySelector('.itens-carrinho')
    const fragment = document.createDocumentFragment();
    let valorTotal = 0;
    produtos.forEach((e) => {
        const item = document.createElement('div');
        item.classList.add('item')
        const string = `
            <img src="${e.foto}" alt="${e.nome}">

            <div class="item-detalhes"">
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
        item.setAttribute('data-id',e.id)
        fragment.appendChild(item);
        valorTotal += e.valor_total;
    });
    itensCarrinho.appendChild(fragment);
    document.querySelector('.valor-total').textContent = `R$ ${valorTotal.toFixed(2)}`;
}

const obterCarrinhoDetalhado = (carrinho) => {
    const produtosTotal = JSON.parse(localStorage.getItem('produtos'));
    return carrinho.map(e => {
        const produto = produtosTotal[e.id_produto];
        const preco = parseFloat(produto.preco);
        return {
            ...produto,
            quantidade: e.quantidade,
            preco: preco,
            valor_total: e.quantidade * preco
        };
    });
}

const limparTela = () => {
    const itens = document.querySelectorAll('.item');
    itens.forEach((e)=>e.remove());
}

const removerProduto = (id) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    localStorage.setItem('carrinho',JSON.stringify(carrinho.filter((e)=>e.id_produto!=id)));
    verificarCarrinhoVazio();
}

const alterarQuantidade = (id, quantidade) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho.find((e)=>e.id_produto==id).quantidade = quantidade;
    localStorage.setItem('carrinho',JSON.stringify(carrinho));
    verificarCarrinhoVazio();
}

const finalizarCompra = () => {
    const produtos = obterCarrinhoDetalhado(JSON.parse(localStorage.getItem('carrinho')));
    let url = 'https://wa.me/5544999410088?text=Olá,%20fiz%20a%20compra%20dos%20seguintes%20itens:%0A';
    let valorTotal = 0;
    produtos.forEach((e) => {
        url += `-%20${e.quantidade}x%20${e.nome}%20(R$%20${e.valor_total.toFixed(2)})%0A`;
        valorTotal += e.valor_total;
    });
    url += `%0A*Total:%20R$%20${valorTotal.toFixed(2)}*`;
    window.open(url, '_blank');
    localStorage.setItem('carrinho','[]')
    verificarCarrinhoVazio();
}