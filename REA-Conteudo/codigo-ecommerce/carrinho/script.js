document.addEventListener('DOMContentLoaded',(e)=>{
    verificarCarrinhoVazio();
});

const verificarCarrinhoVazio = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

    const carrinhoVazio = document.querySelector('.carrinho-vazio');
    const resumoCarrinho = document.querySelector('.resumo-carrinho');

    if(carrinho.length==0){
        carrinhoVazio.classList.remove('oculto');
        resumoCarrinho.classList.add('oculto');
    }else{
        carrinhoVazio.classList.add('oculto');
        resumoCarrinho.classList.remove('oculto');
    }
}