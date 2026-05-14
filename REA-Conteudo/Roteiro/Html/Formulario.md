# Introdução da aula

Hoje iremos desenvolver a estrutura de uma página de cadastro de produtos utilizando HTML. O objetivo principal é entender como criar formulários funcionais, organizar campos de entrada de dados e preparar a página para integração com JavaScript.

Durante a aula, veremos como utilizar a tag `<form>`, diferentes tipos de `<input>`, a tag `<textarea>`, além de boas práticas como o uso de `<label>` e atributos de validação nativos do HTML.

Essa aula é importante porque formulários são a principal forma de coletar dados do usuário em aplicações web. Entender como estruturá-los corretamente é essencial antes de qualquer lógica em JavaScript.

---

# Início do documento HTML

Assim como na aula anterior, iniciamos o documento com:

```html
<!DOCTYPE html>
```

Essa linha informa ao navegador que estamos utilizando HTML5.

Em seguida temos:

```html
<html lang="pt-BR"></html>
```

O atributo `lang="pt-BR"` define o idioma da página como português do Brasil.

---

# Trabalhando com a tag Head

Dentro da tag `<head>` configuramos a página antes do conteúdo visível.

---

## Charset e Viewport

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Essas duas linhas já foram vistas na aula anterior:

- `charset="UTF-8"` garante que caracteres especiais sejam exibidos corretamente
- `viewport` torna a página responsiva em dispositivos móveis

---

## Título da página

```html
<title>Cadastro de Produto</title>
```

Aqui o título muda para refletir a finalidade desta página: cadastrar produtos.

---

# Importando arquivos CSS e bibliotecas

```html
<link rel="stylesheet" href="../global.css" />
<link rel="stylesheet" href="style.css" />
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Repare que aqui a ordem dos arquivos CSS foi invertida em relação à vitrine:

- `global.css` vem antes do `style.css`

Isso significa que os estilos globais são aplicados primeiro e o `style.css` pode sobrescrevê-los quando necessário. Essa ordem importa.

As bibliotecas Font Awesome e Google Fonts são as mesmas da aula anterior, mantendo a consistência visual do projeto.

---

# Cabeçalho da aplicação

O `<header>` desta página é praticamente igual ao da vitrine:

```html
<header>
  <div class="header-container">
    <nav>
      <ul class="nav-menu">
        <li class="nav-item">
          <a href="../vitrine/" class="nav-link">Produtos</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Cadastrar Produtos</a>
        </li>
        <li class="nav-item">
          <a href="../carrinho/" class="nav-link">Carrinho</a>
        </li>
      </ul>
    </nav>
    ...
  </div>
</header>
```

Repare em dois detalhes importantes:

1. O link "Cadastrar Produtos" aponta para `#` — isso indica que estamos na página atual
2. Esta página não possui a barra de pesquisa, apenas o ícone do carrinho

Isso faz sentido: em uma página de cadastro, a busca não é necessária.

---

# Conteúdo principal da página

O conteúdo fica dentro da tag `<main>`:

```html
<main>
  <div class="form-container">
    <h1>Cadastrar Novo Produto</h1>
    ...
  </div>
</main>
```

Diferente da vitrine que usava `<section>`, aqui usamos uma `<div>` com a classe `form-container`. Ela serve para centralizar e estilizar o formulário via CSS.

O `<h1>` define o título principal da página — toda página deve ter exatamente um `<h1>`.

---

# A tag Form

O formulário começa com:

```html
<form onsubmit="salvarProduto(event)" class="form-produto"></form>
```

Dois pontos importantes aqui:

**`onsubmit`**: é um evento que dispara quando o usuário tenta enviar o formulário. Aqui ele chama a função `salvarProduto(event)` que será implementada no JavaScript.

**`event`**: é passado como argumento para que o JavaScript possa controlar o comportamento padrão do formulário, como impedir o recarregamento da página.

---

# Estrutura dos campos

Cada campo do formulário segue este padrão:

```html
<div class="input-group">
  <label for="nome">Nome do Produto</label>
  <input type="text" id="nome" name="nome" required />
</div>
```

Essa estrutura tem três elementos:

**`<div class="input-group">`**: agrupa o label e o input para facilitar a estilização

**`<label>`**: descreve o campo para o usuário. O atributo `for` deve ser igual ao `id` do input correspondente — isso vincula os dois elementos e melhora a acessibilidade

**`<input>`**: o campo onde o usuário digita

---

# Tipos de input

O formulário utiliza três tipos diferentes de input.

---

## Texto

```html
<input type="text" id="nome" name="nome" required />
```

Usado para o nome do produto. Aceita qualquer texto.

---

## Número

```html
<input type="number" id="preco" name="preco" step="0.01" required />
```

Usado para o preço. Aceita apenas valores numéricos.

O atributo `step="0.01"` permite duas casas decimais, ideal para valores monetários.

---

## URL

```html
<input type="url" id="foto" name="foto" required />
```

Usado para o endereço da imagem do produto. O navegador valida automaticamente se o valor digitado tem formato de URL.

---

# O atributo required

```html
<input type="text" id="nome" name="nome" required />
```

O atributo `required` é uma validação nativa do HTML. Se o usuário tentar enviar o formulário com esse campo vazio, o navegador exibe uma mensagem de erro automaticamente — sem precisar de JavaScript.

Todos os campos deste formulário são obrigatórios.

---

# O atributo name

```html
<input type="text" id="nome" name="nome" required />
```

O atributo `name` identifica o campo quando os dados são enviados. É diferente do `id`:

- `id` serve para o CSS e o JavaScript acessarem o elemento
- `name` serve para identificar o dado no envio do formulário

---

# Textarea

```html
<div class="input-group">
  <label for="descricao">Descrição</label>
  <textarea id="descricao" name="descricao" rows="4" required></textarea>
</div>
```

A tag `<textarea>` é usada quando o usuário precisa digitar textos mais longos, como uma descrição.

O atributo `rows="4"` define a altura inicial da área de texto em linhas.

Diferente do `<input>`, o `<textarea>` precisa de uma tag de fechamento.

---

# Botão de envio

```html
<button type="submit" class="btn-submit">Salvar Produto</button>
```

O `type="submit"` faz com que ao clicar no botão o formulário seja enviado — disparando o evento `onsubmit` definido na tag `<form>`.

---

# Toast de notificação

```html
<div class="toast">Produto salvo com sucesso!</div>
```

Assim como na vitrine, temos um componente toast. Aqui ele confirma que o produto foi salvo. Ele será controlado via JavaScript para aparecer e desaparecer após a ação do usuário.

---

# Rodapé e JavaScript

```html
<footer>
  <p>&copy; 2026 | E-commerce</p>
</footer>
<script src="script.js"></script>
```

O rodapé é o mesmo da vitrine.

Repare que nesta página o `<script>` não possui o atributo `defer`. Isso significa que o JavaScript será carregado no momento em que o navegador encontrar a tag — mas como ela está no final do `<body>`, o HTML já estará todo carregado, o que evita o problema mesmo sem o `defer`.

---

# Conclusão da aula

Nesta aula aprendemos:

- estrutura de formulários com a tag `<form>`
- uso correto de `<label>` e sua ligação com inputs via `for` e `id`
- diferentes tipos de `<input>`: text, number e url
- uso da tag `<textarea>` para textos longos
- validação nativa com o atributo `required`
- como o evento `onsubmit` conecta o formulário ao JavaScript

---

# Exercício para os alunos

1. Adicionar um campo "Categoria" do tipo texto.
2. Adicionar um campo "Quantidade em estoque" do tipo número.
3. Torne o campo de URL opcional.
4. Adicionar um botão que limpa todos os campos do formulário.
