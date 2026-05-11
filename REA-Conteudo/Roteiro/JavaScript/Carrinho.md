# Introdução da aula

Nesta aula vamos implementar o JavaScript da página do carrinho de compras. É aqui que a mágica acontece: juntamos as informações estáticas dos produtos com as escolhas dinâmicas que o usuário fez e salvou no `localStorage`.

Além de reforçar a manipulação do DOM e o uso de template strings, vamos introduzir conceitos avançados e muito utilizados no dia a dia, como **Delegação de Eventos** e métodos poderosos de manipulação de arrays: `map`, `filter` e `reduce`. Por fim, vamos integrar nosso carrinho com o WhatsApp.

---

# Delegação de Eventos

Logo no início do arquivo, não adicionamos eventos diretamente aos botões de excluir ou inputs de quantidade. Fazemos isso:

```js
document.querySelector(".itens-carrinho").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-remover")) {
    const id = e.target.closest(".item").getAttribute("data-id");
    removerProduto(id);
  }
});
```

Como os itens do carrinho são criados dinamicamente pelo JavaScript, um botão "Excluir" pode não existir no momento em que a página carrega. Se tentássemos usar um `querySelectorAll('.btn-remover')` logo no começo, ele não encontraria nada.

A solução é a **Delegação de Eventos**. Adicionamos o ouvinte de eventos ao container pai (`.itens-carrinho`), que sempre existe na página. Quando clicamos no botão de excluir, o clique "sobe" (borbulha) até o container pai.

O `e.target` nos diz exatamente em qual elemento o clique aconteceu. Usamos `classList.contains('btn-remover')` para ter certeza de que o clique foi no botão. Se sim, usamos o `closest('.item')` para subir no HTML até a caixa daquele produto e pegar o seu `data-id`.

O mesmo padrão é repetido para o evento `change` dos inputs numéricos.

---

# Controlando a exibição da tela

```js
const verificarCarrinhoVazio = () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
  // ... seleção de elementos

  if (carrinho.length == 0) {
    resumoCarrinho.classList.add("oculto");
  } else {
    carrinhoVazio.classList.add("oculto");
    carregarCarrinho(carrinho);
  }
};
```

Essa função é o "cérebro" da página. Ela sempre é chamada quando a página carrega ou quando fazemos alguma alteração no carrinho.

Ela confere o tamanho do array (`length`). Se o carrinho estiver vazio, esconde o resumo da compra e os itens, mostrando apenas a mensagem de carrinho vazio (através da adição da classe `.oculto`). Caso tenha itens, esconde o aviso de vazio e chama a função para renderizar os produtos.

**Atenção ao `limparTela()**`: Antes de redesenhar os itens na tela com o `carregarCarrinho()`, sempre limpamos a lista atual para não duplicar o HTML.

---

# Cruzando dados: O poder do Map e Reduce

No `localStorage`, nosso carrinho guarda apenas duas informações por item: `id_produto` e `quantidade`. Para mostrar na tela, precisamos da foto, nome e preço. É aí que entra a função `obterCarrinhoDetalhado`:

```js
carrinho = carrinho.map((e) => {
  const produto = produtosTotal[e.id_produto];
  const preco = parseFloat(produto.preco);
  const valor_total = e.quantidade * preco;
  return {
    ...produto,
    quantidade: e.quantidade,
    preco: formatarPreco(preco),
    valor_total: valor_total,
    valor_total_string: formatarPreco(valor_total),
  };
});
```

**`map()`**: É um método de array que percorre cada item e cria um _novo array_ modificado com o que você retornar. Aqui, ele busca os detalhes completos daquele ID no objeto de `produtosTotal`, calcula o subtotal daquele item específico e devolve um objeto "turbinado" (usando o spread operator `...produto`) que mescla os dados do produto com as quantidades do carrinho.

Logo em seguida, precisamos calcular o valor final da compra inteira:

```js
const valor_total_string = formatarPreco(
  carrinho.reduce((total, e) => total + e.valor_total, 0),
);
```

**`reduce()`**: Como o nome sugere, ele "reduz" o array a um único valor. O primeiro argumento `total` funciona como um acumulador, e o `0` no final indica o valor inicial dele. Ele passa por cada produto `e` e soma o `valor_total` ao acumulador. Em uma única linha, calculamos a soma de todos os itens!

---

# Atualizando itens: Filter e Find

Quando o usuário quer remover ou alterar a quantidade, manipulamos o `localStorage` usando métodos eficientes de busca e filtro:

### Removendo um produto

```js
const removerProduto = (id) => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  localStorage.setItem(
    "carrinho",
    JSON.stringify(carrinho.filter((e) => e.id_produto != id)),
  );
  verificarCarrinhoVazio();
};
```

**`filter()`**: Retorna um novo array contendo _apenas_ os elementos que passaram em uma condição. Nossa condição é: "mantenha todos os produtos onde o `id_produto` for diferente (`!=`) do ID que quero excluir". O item indesejado é filtrado para fora, e nós salvamos o array limpo novamente.

### Alterando a quantidade

```js
const alterarQuantidade = (id, quantidade) => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  carrinho.find((e) => e.id_produto == id).quantidade = quantidade;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  verificarCarrinhoVazio();
};
```

Usamos o **`find()`** que vimos em aulas anteriores. Ele acha o objeto específico na memória, altera o atributo `quantidade` e depois sobrescrevemos o `localStorage`.

---

# Finalizando compra pelo WhatsApp

```js
const finalizarCompra = () => {
  const [produtos, valor_total] = obterCarrinhoDetalhado(...);
  let url = 'https://wa.me/5544999410088?text=Olá,%20fiz%20a%20compra%20dos%20seguintes%20itens:%0A';

  produtos.forEach((e) => {
    url += `-%20${e.quantidade}x%20${e.nome}%20(${e.valor_total_string})%0A`;
  });

  url += `%0A*Total:%20${valor_total}*`;
  window.open(url, '_blank');
  localStorage.setItem('carrinho', '[]')
  verificarCarrinhoVazio();
}

```

Aqui transformamos nosso carrinho em uma mensagem para o lojista. Utilizamos a API de links do WhatsApp (`wa.me`).

Como URLs não aceitam espaços ou quebras de linha normais, usamos a codificação de URL (URL Encoding):

- **`%20`** representa um **espaço** em branco.
- **`%0A`** representa um **Enter** (quebra de linha).

O código faz um loop (`forEach`) por todos os produtos do carrinho e concatena (`+=`) na variável da URL cada item formatado como uma lista. Por fim, o `window.open` força a abertura do link em uma nova guia, levando o usuário direto para o aplicativo ou WhatsApp Web. Em seguida, limpamos o carrinho local definindo ele como um array vazio `'[]'`.

---

# Conclusão da aula

Nesta aula subimos bastante o nível do nosso JavaScript! Aprendemos:

- **Delegação de Eventos** para lidar com elementos HTML gerados dinamicamente.
- O trio de ouro da manipulação de arrays: `map` para transformar, `filter` para remover e `reduce` para totalizar dados.
- Como sincronizar perfeitamente o armazenamento local (`localStorage`) com a interface do usuário.
- Como montar parâmetros e codificações em URLs para integração externa com o WhatsApp.

---

# Exercícios

1. Adicionar uma janela de confirmação (usando `confirm()`) antes de excluir um produto no `removerProduto`.
2. Criar um botão "Esvaziar Carrinho" na tela de resumo que zere o array do carrinho sem precisar finalizar a compra.
3. Modificar o evento de `change` da quantidade: se o usuário tentar digitar "0" ou um número negativo no input numérico, forçar a exclusão do produto ou restaurar o valor para "1".
4. Substituir a montagem manual com `%20` no link do WhatsApp usando a função nativa `encodeURIComponent()` do JavaScript para limpar a escrita do código.
