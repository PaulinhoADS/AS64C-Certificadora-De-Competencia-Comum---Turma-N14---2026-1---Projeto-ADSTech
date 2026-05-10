# Introdução da aula

Hoje iremos desenvolver a estrutura de uma página de produtos de um e-commerce utilizando HTML. O objetivo principal é compreender como organizar corretamente os elementos de uma aplicação web moderna utilizando tags semânticas, menus de navegação, seções de conteúdo e cards de produtos.

Durante a aula, também veremos como conectar arquivos CSS externos, utilizar bibliotecas prontas de ícones e preparar a página para futuras funcionalidades em JavaScript.

Essa aula é importante porque praticamente toda aplicação web começa pela estrutura HTML. Antes de estilizar ou adicionar interatividade, precisamos entender como organizar corretamente o conteúdo da página.

---

# Início do documento HTML

Primeiramente, iniciamos o documento utilizando a declaração:

```html
<!DOCTYPE html>
```

Essa linha informa ao navegador que estamos utilizando HTML5.

Logo abaixo temos:

```html
<html lang="pt-br">
```

A tag `<html>` representa o elemento raiz da página. O atributo `lang="pt-br"` define que o idioma principal da aplicação é português do Brasil, ajudando em acessibilidade e mecanismos de busca.

---

# Trabalhando com a tag Head

A próxima parte do código é a tag `<head>`, responsável pelas configurações da página.

```html
<head>
```

Dentro dela temos algumas configurações importantes.

---

## Charset UTF-8

```html
<meta charset="UTF-8" />
```

Essa linha permite que caracteres especiais sejam exibidos corretamente, como:

- ç
- á
- ã
- ê

Sem essa configuração alguns textos poderiam aparecer quebrados.

---

## Responsividade

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Essa configuração torna a página responsiva em celulares e tablets.

Ela faz com que o conteúdo se adapte ao tamanho da tela do dispositivo.

---

## Título da página

```html
<title>Produtos</title>
```

Define o nome que aparecerá na aba do navegador.

---

# Importando arquivos CSS

Depois disso conectamos os arquivos de estilização.

```html
<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" href="../global.css" />
```

Aqui estamos separando:
- estrutura → HTML
- aparência → CSS

Essa separação é uma das principais boas práticas do desenvolvimento web.

---

# Utilizando bibliotecas externas

A aplicação também utiliza bibliotecas externas.

---

## Font Awesome

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

Essa biblioteca fornece ícones prontos.

Por exemplo:
- lupa
- carrinho
- menu hamburguer

Exemplo de uso:

```html
<i class="fa-solid fa-cart-shopping"></i>
```

---

## Google Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet">
```

Permite importar fontes personalizadas para deixar a interface mais moderna.

---

# Estrutura principal da página

Após finalizar o `<head>`, começamos o conteúdo visível dentro do `<body>`.

---

# Cabeçalho da aplicação

A página começa com:

```html
<header>
```

O `<header>` representa o cabeçalho da aplicação.

Nele temos:
- menu de navegação
- barra de busca
- carrinho
- botão mobile

---

# Menu de navegação

Dentro do header encontramos:

```html
<nav>
```

A tag `<nav>` é utilizada para menus de navegação.

Depois temos:

```html
<ul class="nav-menu">
```

A tag `<ul>` representa uma lista não ordenada.

Cada item do menu é criado com:

```html
<li class="nav-item">
```

E os links são feitos com:

```html
<a href="#" class="nav-link">
```

Esses links permitem navegar entre páginas da aplicação:
- produtos
- cadastro
- carrinho

---

# Barra de pesquisa

A aplicação possui um campo de busca:

```html
<input type="text" id="search-bar" placeholder="Buscar...">
```

O elemento `input` permite que o usuário digite informações.

O atributo `placeholder` mostra um texto de ajuda dentro do campo.

---

# Botões com ícones

Os ícones são adicionados usando Font Awesome:

```html
<i class="fa-solid fa-magnifying-glass"></i>
```

e

```html
<i class="fa-solid fa-cart-shopping"></i>
```

Isso melhora a experiência visual da aplicação.

---

# Carrinho de compras

O botão do carrinho possui também um contador:

```html
<span class="cart-count">0</span>
```

Esse número pode ser atualizado futuramente usando JavaScript para mostrar quantos produtos existem no carrinho.

---

# Botão Mobile

Temos também:

```html
<button class="mobile-menu-btn">
```

Esse botão será utilizado futuramente para abrir o menu em telas menores.

---

# Conteúdo principal da página

A parte principal do site começa com:

```html
<main>
```

Essa tag representa o conteúdo central da aplicação.

---

# Seção de produtos

Dentro do main temos:

```html
<section class="featured-products">
```

Essa seção agrupa todos os produtos exibidos na página.

---

# Título da seção

```html
<h2 class="section-title">Nossos Produtos</h2>
```

As tags de título servem para criar hierarquia no conteúdo.

Por exemplo:
- h1 → título principal
- h2 → seções
- h3 → subtítulos

---

# Grid de produtos

Os produtos ficam organizados dentro de:

```html
<div class="product-grid">
```

Esse container será estilizado posteriormente com CSS Grid ou Flexbox para organizar os cards.

---

# Estrutura dos cards

Cada produto é criado usando:

```html
<div class="product-card">
```

O card representa um bloco visual contendo:
- imagem
- nome
- descrição
- preço
- botão

---

# Imagem do produto

```html
<img src="..." alt="...">
```

O atributo `src` define o caminho da imagem.

O atributo `alt` é importante para acessibilidade e descreve a imagem caso ela não carregue.

---

# Nome do produto

```html
<h3>Teclado Mecânico Redragon Kumara</h3>
```

Representa o título do produto.

---

# Descrição do produto

```html
<p>
Alto desempenho e precisão...
</p>
```

A tag `<p>` é usada para parágrafos e descrições.

---

# Preço do produto

```html
<p class="product-price">R$ 155,99</p>
```

Aqui exibimos o valor do produto.

---

# Botão de compra

```html
<a href="#" class="btn-buy">COMPRAR</a>
```

Esse botão futuramente poderá:
- adicionar ao carrinho
- abrir detalhes
- finalizar compra

---

# Comentários HTML

Grande parte dos produtos está comentada:

```html
<!-- código -->
```

Comentários servem para:
- documentar
- testar
- ocultar partes temporariamente

Eles não aparecem para o usuário.

---

# Toast de notificação

A aplicação possui uma mensagem chamada Toast:

```html
<div class="toast">
  Produto adicionado ao carrinho!
</div>
```

Esse componente é muito utilizado para exibir notificações rápidas ao usuário.

---

# Rodapé da aplicação

No final temos:

```html
<footer>
```

O footer representa o rodapé da página.

Normalmente contém:
- direitos autorais
- contatos
- links adicionais

---

# Importação do JavaScript

Por último conectamos o arquivo JavaScript:

```html
<script src="script.js" defer></script>
```

O atributo `defer` faz com que o JavaScript seja carregado somente após o HTML terminar de carregar.

Isso melhora desempenho e evita erros.

---

# Conclusão da aula

Nesta aula aprendemos:
- estrutura básica do HTML
- organização semântica
- criação de menus
- estruturação de cards
- utilização de bibliotecas externas
- preparação da aplicação para CSS e JavaScript

Também vimos boas práticas importantes utilizadas no desenvolvimento profissional de aplicações web.

---

# Exercício para os alunos

1. Adicionar dois novos produtos.
2. Criar uma nova categoria de produtos.
3. Adicionar um novo item no menu.
4. Trocar os ícones da aplicação.
5. Inserir uma nova seção chamada “Promoções”.
