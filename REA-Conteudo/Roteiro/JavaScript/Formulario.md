# Introdução da aula

Nesta aula vamos implementar o JavaScript da página de cadastro de produtos. É o script mais enxuto do projeto, mas introduz conceitos novos importantes: captura de dados de formulário, o operador spread e geração de IDs automáticos.

---

# Atualizando o contador do carrinho

O arquivo começa com:

```js
const atualizarValorCarrinho = (() => {
  document.querySelector(".cart-count").textContent = (
    JSON.parse(localStorage.getItem("carrinho")) || []
  ).length;
})();
```

Esse padrão é chamado de **IIFE** — Immediately Invoked Function Expression. É uma função que se chama sozinha no momento em que é definida. O `(() => { ... })()` significa: "defina essa função e execute imediatamente".

O objetivo aqui é simples: assim que a página carrega, atualizar o número exibido no ícone do carrinho com a quantidade de itens que já estão salvos no localStorage.

O `|| []` garante que, se não houver carrinho salvo ainda, o código use um array vazio em vez de dar erro.

---

# Salvando o produto

A função principal da página é:

```js
const salvarProduto = (event) => {
  event.preventDefault();
  ...
}
```

Ela é chamada pelo `onsubmit` do formulário HTML. O parâmetro `event` é o objeto do evento de envio — ele carrega informações sobre o que aconteceu, incluindo uma referência ao formulário.

**`event.preventDefault()`**: impede o comportamento padrão do formulário, que seria recarregar a página ao ser enviado. Sem essa linha, a página recarregaria e perderíamos os dados antes de salvá-los.

---

# Lendo os produtos existentes

```js
const produtos = JSON.parse(localStorage.getItem("produtos") || "{}");
```

Lê os produtos já salvos no localStorage. O `|| "{}"` garante que, se não houver nada salvo, o `JSON.parse` receba um objeto vazio em vez de `null` — o que causaria um erro.

---

# Capturando os dados do formulário

```js
const dados = Object.fromEntries(new FormData(event.target));
```

Essa linha captura todos os campos do formulário de uma vez. Vamos entender cada parte:

**`event.target`**: referência ao elemento que disparou o evento — nesse caso, o próprio formulário.

**`new FormData(event.target)`**: cria um objeto FormData com todos os campos do formulário. Ele lê automaticamente o atributo `name` de cada input para montar os pares de chave e valor.

**`Object.fromEntries()`**: converte esse objeto FormData em um objeto JavaScript simples. O resultado é algo como:

```js
{
  nome: 'Teclado Mecânico',
  preco: '155.99',
  foto: 'https://...',
  descricao: 'Alto desempenho...'
}
```

Essa combinação substitui a necessidade de capturar cada campo individualmente com `querySelector`.

---

# Gerando o ID do produto

```js
const id = getId();
```

```js
const getId = () => {
  const id = parseInt(localStorage.nextId || "0");
  localStorage.setItem("nextId", `${id + 1}`);
  return id;
};
```

Essa função gera um ID numérico único e crescente para cada produto cadastrado.

**`localStorage.nextId`**: uma forma alternativa de ler do localStorage — em vez de `localStorage.getItem('nextId')`, podemos acessar diretamente como propriedade. As duas formas funcionam.

**`parseInt()`**: converte a string lida do localStorage em número inteiro. O localStorage sempre armazena strings, então essa conversão é necessária antes de fazer cálculos.

A lógica é: lê o último ID usado, salva o próximo (`id + 1`) para a próxima vez, e retorna o atual.

---

# Montando o objeto do produto

```js
produtos[id] = { id: id, ...dados };
```

Aqui adicionamos o novo produto ao objeto de produtos usando o ID como chave.

**`...dados`**: o operador spread copia todas as propriedades do objeto `dados` para dentro do novo objeto. O resultado é equivalente a escrever manualmente:

```js
produtos[id] = {
  id: id,
  nome: dados.nome,
  preco: dados.preco,
  foto: dados.foto,
  descricao: dados.descricao,
};
```

O spread é mais prático porque não precisa listar cada campo — qualquer campo que existir no formulário será incluído automaticamente.

---

# Salvando e limpando

```js
localStorage.setItem("produtos", JSON.stringify(produtos));
event.target.reset();
window.scrollTo({ top: 0, behavior: "smooth" });
notificar();
```

**`localStorage.setItem`**: salva o objeto atualizado de produtos no localStorage como JSON.

**`event.target.reset()`**: limpa todos os campos do formulário após o envio. O `.reset()` é um método nativo dos formulários HTML.

**`window.scrollTo`**: rola a página de volta ao topo de forma suave. O `behavior: 'smooth'` é responsável pela animação.

**`notificar()`**: exibe o toast de confirmação.

---

# Notificação Toast

```js
const notificar = () => {
  const toast = document.querySelector(".toast");
  toast.classList.add("mostrar");
  setTimeout(() => {
    toast.classList.remove("mostrar");
  }, 3000);
};
```

Adiciona a classe `mostrar` ao toast, que o CSS usa para torná-lo visível com animação. Após 3000 milissegundos (3 segundos), o `setTimeout` remove a classe e o toast desaparece.

Repare que essa versão do `notificar` é mais simples que a da vitrine — não precisa lidar com cliques rápidos e repetidos, então não tem a lógica de reiniciar o timeout.

---

# Conclusão da aula

Nesta aula aprendemos:

- o padrão IIFE para executar código imediatamente
- `event.preventDefault()` para controlar o comportamento do formulário
- `FormData` e `Object.fromEntries` para capturar dados do formulário de uma vez
- o operador spread `...` para copiar propriedades de objetos
- `parseInt()` para converter strings em números
- `event.target` para referenciar o elemento que disparou o evento
- `element.reset()` para limpar formulários
- `window.scrollTo` para rolar a página programaticamente

---

# Exercícios

1. Impedir que um produto seja salvo com preço negativo ou zerado.
2. Adicionar um `console.log` antes de salvar e observar os dados capturados no console do navegador.
3. Exibir um resumo do produto cadastrado na tela logo após salvar.
4. Adicionar uma confirmação antes de limpar o formulário.
