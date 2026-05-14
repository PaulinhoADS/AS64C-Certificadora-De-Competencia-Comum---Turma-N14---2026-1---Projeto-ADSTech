# Introdução da aula

Hoje iremos desenvolver a estrutura da página de carrinho do e-commerce. Essa é a terceira página do projeto e, como as anteriores, compartilha o mesmo cabeçalho e rodapé — o foco aqui será entender como estruturar uma seção de listagem dinâmica e um resumo de compra.

Também veremos dois conceitos novos: a classe `oculto` para esconder elementos via CSS, e um bloco de exemplo comentado que será substituído por JavaScript em uma aula futura.

---

# Conteúdo principal da página

Todo o conteúdo do carrinho fica dentro de:

```html
<main>
  <div class="carrinho-container">
    <h1>Seu Carrinho</h1>
    ...
  </div>
</main>
```

O `<div class="carrinho-container">` agrupa tudo que compõe o carrinho: a listagem de itens e o resumo com o total.

---

# Área de itens do carrinho

Dentro do container temos:

```html
<div class="itens-carrinho">...</div>
```

Essa `<div>` será preenchida dinamicamente pelo JavaScript com os produtos que o usuário adicionou. Por enquanto ela contém dois elementos fixos.

---

# Estado de carrinho vazio

O primeiro elemento dentro de `itens-carrinho` é:

```html
<div class="carrinho-vazio oculto">
  <p>🛒 Seu carrinho está vazio.</p>
  <a href="../vitrine/" class="btn-voltar">Ir para a Vitrine</a>
</div>
```

Dois pontos importantes aqui:

**`oculto`**: essa classe CSS esconde o elemento por padrão. O JavaScript vai removê-la quando precisar exibir a mensagem — por exemplo, quando o carrinho estiver de fato vazio.

**`<a href="../vitrine/">`**: um link que leva o usuário de volta à vitrine. Mesmo parecendo um botão visualmente, é um elemento `<a>` porque navega para outra página.

---

# Bloco de exemplo comentado

Logo abaixo temos um bloco comentado:

```html
<!-- <div class="item">
  <img src="..." alt="...">
  <div class="item-detalhes">
    <h3>Nome do produto</h3>
    <p class="preco-unitario">R$ 707,85</p>
    <div class="item-acoes">
      <input type="number" value='1' min="1" class="qtd-input">
      <button class="btn-remover">Excluir</button>
    </div>
  </div>
  <div class="item-total">
    <p class="preco-subtotal">R$ 707,85</p>
  </div>
</div> -->
```

Esse bloco serve de referência visual para a aula de HTML e CSS: ele mostra como um item do carrinho deve ser estruturado antes de o JavaScript assumir a responsabilidade de criá-los dinamicamente.

Dentro dele temos três partes:

**Imagem do produto**: igual aos cards da vitrine, com `src` e `alt`.

**Detalhes do item**: nome com `<h3>`, preço unitário com `<p>`, e uma área de ações com dois elementos:

- `<input type="number">` para controlar a quantidade. O atributo `min="1"` impede que o usuário coloque zero ou valor negativo
- `<button class="btn-remover">` para excluir o item do carrinho

**Total do item**: uma `<div>` separada exibindo o subtotal daquele produto, que muda conforme a quantidade.

---

# Resumo do carrinho

Fora da área de itens temos:

```html
<div class="resumo-carrinho oculto">
  <h2>Total: <span class="valor-total">R$ 0,00</span></h2>
  <button onclick="finalizarCompra()" class="btn-finalizar">
    Finalizar Compra
  </button>
</div>
```

Assim como o estado de carrinho vazio, esse bloco também começa com a classe `oculto`. O JavaScript o exibirá apenas quando houver pelo menos um produto no carrinho.

**`<span class="valor-total">`**: o `<span>` é um elemento inline sem significado semântico próprio. Aqui ele isola o valor numérico dentro do `<h2>` para que o JavaScript possa atualizá-lo sem precisar reescrever o texto "Total:" ao redor.

**`onclick="finalizarCompra()"`**: evento diretamente no botão que chama uma função JavaScript ao ser clicado. Diferente do formulário da aula anterior que usava `onsubmit` na tag `<form>`, aqui o evento fica no próprio `<button>`.

---

# Conclusão da aula

Nesta aula aprendemos:

- como estruturar uma listagem com estado vazio e estado preenchido
- uso da classe `oculto` para controlar visibilidade via CSS
- estrutura de um item de carrinho: imagem, detalhes, ações e subtotal
- uso do `<input type="number">` com validação mínima via `min`
- diferença entre `<span>` e `<div>` para isolar conteúdo inline
- como o `onclick` no botão difere do `onsubmit` no formulário

---

# Exercício para os alunos

1. Criar um campo de cupom de desconto com um input de texto e um botão "Aplicar".
2. Adicionar uma linha no resumo exibindo o valor do frete.
3. Trocar o emoji do carrinho vazio por um ícone do Font Awesome.
4. Adicionar uma mensagem de aviso no resumo informando o valor mínimo para frete grátis.
