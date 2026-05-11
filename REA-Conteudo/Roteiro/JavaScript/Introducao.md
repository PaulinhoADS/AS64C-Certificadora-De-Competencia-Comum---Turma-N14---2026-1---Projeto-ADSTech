# Introdução da aula

Agora que já temos a estrutura HTML e a estilização CSS do projeto, chegou a hora de adicionar interatividade com JavaScript. Essa aula é uma apresentação — o objetivo é mostrar como o JavaScript funciona para quem já tem experiência com programação em outra linguagem.

Vamos ver a sintaxe do JavaScript moderno e os conceitos que vão aparecer ao longo das próximas aulas.

---

# O que é JavaScript?

JavaScript é a linguagem de programação da web. Enquanto o HTML estrutura o conteúdo e o CSS define a aparência, o JavaScript controla o comportamento — o que acontece quando o usuário clica em um botão, digita em um campo ou adiciona um produto ao carrinho.

Voltando à analogia da casa: se o HTML é a estrutura e o CSS é a decoração, o JavaScript é a parte elétrica e hidráulica — o que faz as coisas funcionarem.

---

# Variáveis

JavaScript tem três formas de declarar variáveis:

```js
var nome = "João"; // forma antiga, evite usar
let idade = 25; // valor pode mudar
const pi = 3.14; // valor não pode ser reatribuído
```

No desenvolvimento moderno usamos quase sempre `const` e `let`. A regra prática é: comece sempre com `const` e só troque para `let` se precisar reatribuir o valor mais tarde. O `var` tem comportamentos inesperados em alguns contextos e foi substituído pelos dois anteriores.

---

# Tipos de dados

Os tipos principais que vamos usar no projeto:

```js
const nome = "Teclado Mecânico"; // string
const preco = 155.99; // number
const disponivel = true; // boolean
const produto = null; // null (ausência intencional de valor)
```

JavaScript é dinamicamente tipado — você não declara o tipo, ele é inferido pelo valor.

---

# Operadores

## Aritméticos

```js
10 + 2; // 12
10 - 2; // 8
10 * 2; // 20
10 / 2; // 5
10 % 3; // 1 (resto da divisão)
```

## Comparação

```js
10 === 10; // true  (igual em valor e tipo)
10 !== 5; // true  (diferente)
10 > 5; // true
10 < 5; // false
10 >= 10; // true
```

Prefira sempre `===` ao `==`. O `==` faz conversão de tipo automática e pode gerar resultados inesperados:

```js
"1" == 1; // true  (perigoso)
"1" === 1; // false (correto)
```

## Lógicos

```js
true && false; // false (E — ambos precisam ser verdadeiros)
true || false; // true  (OU — basta um ser verdadeiro)
!true; // false (NÃO — inverte o valor)
```

---

# Condicionais

```js
if (preco > 1000) {
  console.log("Produto caro");
} else if (preco > 500) {
  console.log("Preço médio");
} else {
  console.log("Acessível");
}
```

## Operador ternário

Uma forma compacta de escrever um `if/else` simples:

```js
const mensagem = preco > 1000 ? "Produto caro" : "Acessível";
```

A estrutura é: `condição ? valor_se_verdadeiro : valor_se_falso`. Vamos usar bastante isso no projeto para exibir ou esconder elementos.

---

# Funções

## Declaração tradicional

```js
function somar(a, b) {
  return a + b;
}
```

## Arrow function

A forma mais comum no JavaScript moderno:

```js
const somar = (a, b) => {
  return a + b;
};
```

Quando o corpo da função tem apenas uma expressão, pode ser ainda mais compacto:

```js
const somar = (a, b) => a + b;
```

As duas formas fazem a mesma coisa na maioria dos casos. No projeto vamos usar principalmente arrow functions.

---

# Arrays

Arrays armazenam listas de valores:

```js
const produtos = ["Teclado", "Mouse", "Headset"];

produtos[0]; // 'Teclado'
produtos.length; // 3
produtos.push("SSD"); // adiciona ao final
```

## Métodos que vamos usar no projeto

**`forEach`**: percorre todos os itens do array.

```js
produtos.forEach((produto) => {
  console.log(produto);
});
```

**`find`**: retorna o primeiro item que satisfaz a condição.

```js
const item = carrinho.find((item) => item.id === 3);
```

**`filter`**: retorna um novo array com os itens que satisfazem a condição.

```js
const caros = produtos.filter((p) => p.preco > 1000);
```

---

# Objetos

Objetos armazenam dados em pares de chave e valor:

```js
const produto = {
  id: 1,
  nome: "Teclado Mecânico",
  preco: 155.99,
  disponivel: true,
};

produto.nome; // 'Teclado Mecânico'
produto["preco"]; // 155.99
```

## Object.entries

Transforma um objeto em um array de pares `[chave, valor]`:

```js
Object.entries(produto);
// [['id', 1], ['nome', 'Teclado Mecânico'], ...]
```

Vamos usar isso para percorrer os produtos armazenados no localStorage.

---

# JSON

JSON é um formato de texto para transportar e armazenar dados. Parece com um objeto JavaScript mas é uma string:

```js
// Objeto JavaScript → texto JSON
const texto = JSON.stringify({ nome: "Teclado", preco: 155.99 });
// '{"nome":"Teclado","preco":155.99}'

// Texto JSON → objeto JavaScript
const objeto = JSON.parse(texto);
// { nome: 'Teclado', preco: 155.99 }
```

O localStorage só armazena strings, então toda vez que salvarmos ou lermos dados dele vamos usar `JSON.stringify` e `JSON.parse`.

---

# localStorage

O localStorage permite salvar dados no navegador que persistem mesmo após recarregar a página:

```js
// Salvar
localStorage.setItem("chave", "valor");

// Ler
localStorage.getItem("chave");

// Remover
localStorage.removeItem("chave");
```

Para salvar objetos e arrays, combinamos com JSON:

```js
// Salvando
localStorage.setItem("carrinho", JSON.stringify(carrinho));

// Lendo
const carrinho = JSON.parse(localStorage.getItem("carrinho"));
```

---

# DOM

DOM significa **Document Object Model**. É a representação do HTML como uma árvore de objetos que o JavaScript pode acessar e modificar.

Quando o JavaScript seleciona um elemento e muda seu conteúdo, está manipulando o DOM.

## Selecionando elementos

```js
// Seleciona o primeiro elemento que corresponde ao seletor
document.querySelector("#search-bar"); // por ID
document.querySelector(".product-card"); // por classe
document.querySelector("h1"); // por tag

// Seleciona todos os elementos que correspondem ao seletor
document.querySelectorAll(".product-card");
```

## Lendo e alterando conteúdo

```js
const titulo = document.querySelector("h1");

titulo.textContent; // lê o texto
titulo.textContent = "Novo título"; // altera o texto
titulo.innerHTML = "<span>Novo</span> título"; // altera o HTML interno
```

## Alterando estilos

```js
const card = document.querySelector(".product-card");
card.style.display = "none"; // esconde o elemento
card.style.color = "red";
```

## Manipulando classes

```js
elemento.classList.add("oculto"); // adiciona classe
elemento.classList.remove("oculto"); // remove classe
elemento.classList.contains("oculto"); // verifica se tem a classe
```

## Criando elementos

```js
const div = document.createElement("div");
div.classList.add("product-card");
div.innerHTML = `<h3>Produto</h3>`;

document.querySelector(".product-grid").appendChild(div);
```

---

# Eventos

Eventos são ações do usuário que o JavaScript pode detectar e reagir:

```js
const botao = document.querySelector(".btn-buy");

botao.addEventListener("click", () => {
  console.log("Botão clicado");
});
```

O primeiro argumento é o tipo do evento, o segundo é a função que será executada.

Eventos comuns que vamos usar no projeto:

```js
"click"; // clique do mouse
"keyup"; // tecla solta (usado na busca em tempo real)
"submit"; // envio de formulário
"DOMContentLoaded"; // HTML terminou de carregar
```

## DOMContentLoaded

Um evento especial que garante que o JavaScript só execute depois que o HTML estiver completamente carregado:

```js
document.addEventListener("DOMContentLoaded", () => {
  // código aqui só roda após o HTML carregar
});
```

Sem isso, o JavaScript pode tentar acessar elementos que ainda não existem na página.

---

# O que vem a seguir

Nas próximas aulas vamos aplicar todos esses conceitos para tornar as páginas do e-commerce dinâmicas: renderizar produtos automaticamente, implementar a busca em tempo real, gerenciar o carrinho e salvar tudo no localStorage.

---

# Antes da próxima aula

Não é obrigatório, mas se quiser chegar com mais contexto: abra o `script.js` da vitrine e tente identificar as arrow functions, os métodos de array e as chamadas ao localStorage. Não precisa entender o código completo — só reconhecer os padrões que vimos aqui já vai ajudar.
