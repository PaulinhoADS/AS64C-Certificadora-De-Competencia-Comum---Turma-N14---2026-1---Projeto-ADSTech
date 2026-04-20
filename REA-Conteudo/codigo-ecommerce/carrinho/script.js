document.addEventListener('DOMContentLoaded',(e)=>{
    verificarCarrinhoVazio();
});

document.querySelector('.itens-carrinho').addEventListener('click',(e)=>{
    if(e.target.className === 'btn-remover' || e.target.className === 'qtd-input'){
        const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
        if(e.target.className === 'btn-remover'){
            removerProduto(id);
        }
    
        if(e.target.className === 'qtd-input'){
            alterarQuantidade(id, parseInt(e.target.value))
        }
    }
});

document.querySelector('.itens-carrinho').addEventListener('change',(e)=>{
    if(e.target.className === 'qtd-input'){
        const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
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
    const produtos = obterCarrinhoDetalhado();

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

const obterCarrinhoDetalhado = () => {
    const produtosTotal = JSON.parse(localStorage.getItem('produtos'));
    return carrinho.map(e => {
        const produto = produtosTotal[e.id_produto];
        const preco = parseFloat(produto.preco);
        return {
            ...produto,
            quantidade: e.quantidade,
            preco: preco,
            valor_total: e.quantidade * produto.preco
        };
    });
}

const limparTela = () => {
    const itensCarrinho = document.querySelector('.itens-carrinho')
    const itens = document.querySelectorAll('.item');
    itens.forEach((e)=>itensCarrinho.removeChild(e));
}

const removerProduto = (id) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    localStorage.setItem('carrinho',JSON.stringify(carrinho.filter((e)=>e.id_produto!=id)));
    verificarCarrinhoVazio();
}

const alterarQuantidade = (id, quantidade) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const item = carrinho.find((e)=>e.id_produto==id);
    if(item.quantidade!=quantidade){
        carrinho.find((e)=>e.id_produto==id).quantidade = quantidade;
        localStorage.setItem('carrinho',JSON.stringify(carrinho));
        verificarCarrinhoVazio();
    }
}