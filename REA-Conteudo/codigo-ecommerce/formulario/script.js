const salvarProduto = (event) => {
    event.preventDefault();
    const produtos = JSON.parse(localStorage.getItem('produtos') || "{}");
    const dados = Object.fromEntries(new FormData(event.target));
    const id = getId();
    console.log(dados);
    produtos[id] = {id: id, ...dados};
    console.log(produtos[id]);
    localStorage.setItem('produtos',JSON.stringify(produtos));
    event.target.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    notificar();
}

const getId = () => {
    const id = parseInt(localStorage.nextId || '0');
    localStorage.setItem('nextId',`${id+1}`);
    return id;
}

const notificar = () => {
    const toast = document.getElementById('toast');
    toast.classList.add('mostrar');
    setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 3000);
}