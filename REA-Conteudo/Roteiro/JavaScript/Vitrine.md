
# Introdução da aula

Nesta aula iremos trabalhar com JavaScript para adicionar interatividade em uma aplicação de e-commerce.

Até agora a aplicação possuía apenas estrutura HTML e estilização CSS. Agora iremos transformar a página em uma aplicação dinâmica, permitindo:

- renderização automática de produtos
- busca em tempo real
- adição de produtos ao carrinho
- armazenamento de dados no navegador
- notificações visuais
- atualização automática do carrinho

Também iremos aprender conceitos fundamentais do JavaScript moderno como:
- manipulação do DOM
- eventos
- funções
- arrays
- objetos
- localStorage
- template strings

---

# Estrutura inicial do JavaScript

O arquivo começa com um comentário:

```js
/*
  produtos.js
  - Gerencia filtros e busca de produtos
*/
```

Comentários servem para documentar o código e explicar sua finalidade.

---

# DOMContentLoaded

Logo no início temos:

```js
document.addEventListener('DOMContentLoaded', () => {
```

Esse evento garante que o JavaScript só será executado após o HTML terminar de carregar.

Isso evita erros ao tentar acessar elementos que ainda não existem na página.

---

# Selecionando elementos HTML

Dentro do evento temos:

```js
const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('.search-icon');
```

## Explicação

### `querySelector()`

Permite selecionar elementos do HTML usando:
- id
- classes
- tags

Exemplos:
- `#search-bar` → seleciona por ID
- `.search-icon` → seleciona por classe

---

# Trabalhando com localStorage

Em seguida temos:

```js
if(!localStorage.getItem('produtos')){
  popularProdutos();
}
```

## Explicação

O `localStorage` é um armazenamento interno do navegador.

Ele permite salvar dados mesmo após atualizar a página.

---

## Métodos utilizados

### Buscar dados

```js
localStorage.getItem('produtos')
```

### Salvar dados

```js
localStorage.setItem()
```

---

# Função de filtro de produtos

A função principal de busca é:

```js
function filterProducts() {
```

Ela será responsável por pesquisar produtos dinamicamente.

---

# Selecionando todos os cards

```js
const productCards = document.querySelectorAll('.product-card');
```

## Explicação

### `querySelectorAll()`

Retorna vários elementos ao mesmo tempo.

Nesse caso:
- todos os cards de produtos

---

# Capturando o texto digitado

```js
const searchValue = searchBar.value.toLowerCase()
```

## Explicação

### `.value`
Captura o texto digitado.

### `.toLowerCase()`
Transforma tudo em minúsculo para evitar problemas na busca.

---

# Removendo acentos

```js
.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
```

## Objetivo

Permitir buscas mesmo com diferenças de acentuação.

Exemplo:
- "memoria"
- "memória"

Os dois funcionarão.

---

# Percorrendo os produtos

```js
productCards.forEach(card => {
```

## Explicação

O `forEach()` percorre todos os elementos do array.

Nesse caso:
- todos os cards da tela

---

# Pegando informações do card

```js
const cardText = (
  card.querySelector('h3').textContent +
  ' ' +
  card.querySelector('p').textContent
)
```

## Explicação

Aqui estamos juntando:
- nome do produto
- descrição

Para que ambos possam ser pesquisados.

---

# Verificando se o produto corresponde à busca

```js
const searchMatch =
(searchValue === '') || cardText.includes(searchValue);
```

## Explicação

### `.includes()`

Verifica se um texto contém outro.

Exemplo:

```js
"mouse gamer".includes("mouse")
```

Resultado:
```js
true
```

---

# Exibindo ou escondendo produtos

```js
card.style.display = searchMatch === true ? 'flex' : 'none';
```

## Explicação

### Operador ternário

Estrutura:

```js
condição ? valor1 : valor2
```

Se encontrar:
- exibe o card

Se não encontrar:
- esconde o card

---

# Eventos da busca

```js
searchButton.addEventListener('click', filterProducts);
```

Executa a busca ao clicar no botão.

---

```js
searchBar.addEventListener('keyup', filterProducts);
```

Executa a busca enquanto o usuário digita.

---

# Renderização dinâmica de produtos

A aplicação utiliza renderização dinâmica:

```js
const render = (() => {
```

---

# Selecionando o grid

```js
const grid = document.querySelector('.product-grid');
```

Aqui selecionamos o container onde os produtos serão exibidos.

---

# Pegando produtos do localStorage

```js
const produtos =
Object.entries(JSON.parse(localStorage.getItem('produtos')));
```

## Explicação

### `JSON.parse()`

Transforma texto JSON em objeto JavaScript.

### `Object.entries()`

Transforma objeto em array.

---

# Criando elementos dinamicamente

```js
const div = document.createElement('div');
```

## Explicação

Cria elementos HTML diretamente pelo JavaScript.

---

# Adicionando classes

```js
div.classList.add('product-card');
```

Adiciona classes CSS ao elemento criado.

---

# Criando atributos

```js
div.setAttribute('data-id', e.id);
```

## Explicação

Cria atributos personalizados no HTML.

Exemplo:
```html
data-id="1"
```

---

# Inserindo HTML dinamicamente

```js
div.innerHTML = `
`
```

## Explicação

Permite inserir HTML usando template strings.

---

# Template Strings

As crases:

```js
`texto`
```

Permitem inserir variáveis:

```js
${e.nome}
```

---

# Fragmentos HTML

```js
const fragment = document.createDocumentFragment();
```

## Objetivo

Melhorar desempenho ao adicionar vários elementos.

---

# Adicionando produtos ao carrinho

A função responsável é:

```js
const adicionarNoCarrinho = (e) => {
```

---

# Pegando o carrinho

```js
const carrinho =
JSON.parse(localStorage.getItem('carrinho')) || [];
```

Se não existir:
- cria array vazio

---

# Pegando o ID do produto

```js
const id =
e.target.closest('.product-card')
.getAttribute('data-id');
```

## Explicação

### `closest()`

Busca o elemento pai mais próximo.

---

# Procurando produto no carrinho

```js
const item = carrinho.find((e) =>
e.id_produto == id);
```

## Explicação

### `.find()`

Procura um item específico dentro do array.

---

# Incrementando quantidade

```js
item.quantidade += 1;
```

Se o produto já existir:
- aumenta quantidade

---

# Adicionando novo item

```js
carrinho.push({
  id_produto: id,
  quantidade: 1
})
```

Caso não exista:
- adiciona novo produto

---

# Salvando no localStorage

```js
localStorage.setItem(
'carrinho',
JSON.stringify(carrinho)
);
```

## Explicação

### `JSON.stringify()`

Transforma objeto em texto JSON.

---

# Formatando preços

A função:

```js
const formatarPreco = (preco) => {
```

Utiliza:

```js
toLocaleString()
```

Para converter:

```js
155.99
```

em:

```js
R$ 155,99
```

---

# Atualizando quantidade do carrinho

```js
document.querySelector('.cart-count')
.textContent =
(JSON.parse(localStorage.getItem('carrinho')) || []).length
```

Atualiza o número exibido no ícone do carrinho.

---

# Sistema de notificações Toast

A função:

```js
const notificar = () => {
```

Mostra notificações temporárias.

---

# Trabalhando com timeout

```js
setTimeout(() => {
```

Executa algo após determinado tempo.

---

# Removendo notificação

```js
toast.classList.remove('mostrar');
```

Após 3 segundos a notificação desaparece.

---

# Popular produtos automaticamente

A função:

```js
const popularProdutos = () => {
```

Cria produtos automaticamente no localStorage.

---

# Estrutura JSON

Os produtos estão armazenados em formato JSON:

```js
{
  "0": {
    "id": 0,
    "nome": "Teclado",
    "preco": "155.99"
  }
}
```

---

# Conclusão da aula

Nesta aula aprendemos:
- manipulação do DOM
- eventos
- renderização dinâmica
- localStorage
- arrays e objetos
- busca dinâmica
- carrinho de compras
- notificações Toast
- template strings
- criação dinâmica de elementos

Também vimos conceitos fundamentais utilizados em aplicações modernas de JavaScript.

---

# Exercícios para os alunos

1. Criar filtro por preço.
2. Adicionar botão de remover do carrinho.
3. Criar categorias de produtos.
4. Adicionar ordenação:
   - menor preço
   - maior preço
5. Criar sistema de favoritos.
6. Exibir valor total do carrinho.
