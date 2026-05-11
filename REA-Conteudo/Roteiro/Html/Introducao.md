# Introdução da aula

Antes de começarmos a construir as páginas do nosso e-commerce, precisamos entender a base de tudo: o HTML. Essa aula é uma apresentação — não vamos escrever código ainda, mas ao final dela você vai entender o que é HTML, para que serve, como ele se organiza e quais são as tags que vamos usar ao longo do curso.

---

# O que é HTML?

HTML significa **HyperText Markup Language** — em português, Linguagem de Marcação de Hipertexto.

Ele não é uma linguagem de programação. Você não vai escrever lógica, condições ou loops em HTML. O que o HTML faz é **estruturar o conteúdo** de uma página web: diz ao navegador o que é um título, o que é um parágrafo, o que é uma imagem, o que é um link.

Pense assim: se uma página web fosse uma casa, o HTML seria a planta e a estrutura — paredes, portas, janelas. O CSS seria a pintura e a decoração. O JavaScript seria a parte elétrica e hidráulica, o que faz as coisas funcionarem.

Neste curso, vamos trabalhar com os três. Mas tudo começa pelo HTML.

---

# Para que serve o HTML?

Todo site que você acessa no navegador é construído sobre HTML. Quando você abre uma página, o navegador lê o arquivo HTML e renderiza o conteúdo na tela.

O HTML define:

- o que é texto e como ele está organizado
- onde ficam as imagens
- quais palavras são links
- como o conteúdo está agrupado e hierarquizado

Sem HTML, não existe página web.

---

# Ferramentas que vamos usar

Antes de avançar, é importante que você tenha o ambiente configurado para as próximas aulas.

**VS Code**: é o editor de código que vamos utilizar ao longo do curso. É gratuito e amplamente usado no mercado.
Download: https://code.visualstudio.com

**Live Server**: é uma extensão do VS Code que abre o seu arquivo HTML no navegador e atualiza automaticamente toda vez que você salva uma alteração. Isso evita ter que recarregar a página manualmente durante o desenvolvimento.

Para instalar: abra o VS Code, vá até a aba de extensões (ícone de quadradinhos na barra lateral), pesquise por "Live Server" e instale a extensão de Ritwick Dey.

---

# Como o HTML é estruturado

Um arquivo HTML é composto por **tags**. Uma tag é um elemento entre sinais de maior e menor:

```html
<p>Isso é um parágrafo.</p>
```

A maioria das tags tem uma abertura e um fechamento. A tag de fechamento é igual à de abertura, mas com uma barra antes do nome:

```html
<h1>Título principal</h1>
```

Algumas tags não precisam de fechamento porque não envolvem conteúdo:

```html
<img src="foto.jpg" alt="Descrição da imagem" /> <input type="text" />
```

---

# Atributos

As tags podem ter **atributos** — informações adicionais que configuram o comportamento ou aparência do elemento.

```html
<a href="https://google.com">Acessar o Google</a>
```

Nesse exemplo, `href` é um atributo da tag `<a>` que define para onde o link aponta. Os atributos sempre ficam dentro da tag de abertura, no formato `nome="valor"`.

---

# Estrutura básica de um documento HTML

Todo arquivo HTML segue uma estrutura padrão:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Título da página</title>
  </head>

  <body>
    <!-- Conteúdo visível da página -->
  </body>
</html>
```

Cada parte tem uma função:

**`<!DOCTYPE html>`**: informa ao navegador que o documento usa HTML5. Sempre a primeira linha.

**`<html>`**: elemento raiz que envolve todo o documento. O atributo `lang` define o idioma da página.

**`<head>`**: cabeçalho do documento. Não aparece na tela — contém configurações, título da aba e conexões com arquivos externos como CSS.

**`<meta charset="UTF-8">`**: garante que caracteres especiais como ç, á e ã apareçam corretamente.

**`<meta name="viewport">`**: torna a página responsiva em celulares e tablets.

**`<title>`**: define o texto que aparece na aba do navegador.

**`<body>`**: tudo que fica aqui aparece na tela para o usuário.

---

# Tags de texto

As tags de texto mais comuns são as de título e parágrafo.

## Títulos

O HTML possui seis níveis de título:

```html
<h1>Título principal</h1>
<h2>Seção</h2>
<h3>Subseção</h3>
<h4>Nível 4</h4>
<h5>Nível 5</h5>
<h6>Nível 6</h6>
```

Na prática, `h1` a `h3` são os mais usados. Uma página deve ter apenas um `<h1>` — ele representa o tema central do conteúdo.

## Parágrafos

```html
<p>Esse é um parágrafo de texto.</p>
```

A tag `<p>` é usada para qualquer bloco de texto corrido.

---

# Links

Links são criados com a tag `<a>`:

```html
<a href="https://google.com">Ir para o Google</a>
```

O atributo `href` define o destino. Links podem apontar para páginas externas, outras páginas do próprio site ou seções dentro da mesma página.

---

# Imagens

Imagens são inseridas com a tag `<img>`:

```html
<img src="foto.jpg" alt="Descrição da imagem" />
```

**`src`**: caminho ou URL da imagem.

**`alt`**: texto alternativo exibido quando a imagem não carrega e lido por leitores de tela. É importante para acessibilidade e nunca deve ser ignorado.

---

# Listas

O HTML tem dois tipos de lista.

## Lista não ordenada

```html
<ul>
  <li>Item um</li>
  <li>Item dois</li>
  <li>Item três</li>
</ul>
```

Exibe marcadores (bolinhas por padrão). Usada quando a ordem não importa.

## Lista ordenada

```html
<ol>
  <li>Primeiro passo</li>
  <li>Segundo passo</li>
  <li>Terceiro passo</li>
</ol>
```

Exibe números. Usada quando a sequência importa.

Em ambos os casos, cada item da lista é marcado com `<li>`.

---

# Divisões e agrupamentos

Duas tags são usadas para agrupar elementos sem adicionar significado semântico:

**`<div>`**: elemento de bloco. Ocupa a largura toda da linha.

**`<span>`**: elemento inline. Fica dentro do fluxo do texto, sem quebrar linha.

```html
<div class="card">
  <p>Produto: <span class="preco">R$ 99,90</span></p>
</div>
```

Essas tags por si só não fazem nada visualmente — o papel delas é criar estrutura para o CSS e o JavaScript agirem.

---

# Classes e IDs

Dois atributos que aparecem em praticamente todo elemento HTML do projeto são `class` e `id`. Eles não alteram a aparência por si só — servem para que o CSS e o JavaScript consigam identificar e acessar os elementos.

**`class`**: marca um elemento com um nome. Vários elementos podem ter a mesma classe.

```html
<div class="product-card">...</div>
<div class="product-card">...</div>
```

**`id`**: identifica um elemento único na página. Não deve se repetir.

```html
<input type="text" id="search-bar" />
```

A diferença prática: `class` é para grupos de elementos que compartilham o mesmo estilo ou comportamento. `id` é para um elemento específico que precisa ser acessado individualmente.

Você vai ver os dois sendo usados constantemente no projeto — entender a diferença agora evita confusão nas próximas aulas.

---

# Tags semânticas

HTML5 introduziu tags que carregam significado além de apenas agrupar elementos. Em vez de usar `<div>` para tudo, usamos tags que descrevem a função daquele bloco na página.

As principais que vamos usar no curso:

**`<header>`**: cabeçalho da página ou de uma seção. Normalmente contém a navegação e o logo.

**`<nav>`**: menu de navegação. Agrupa os links principais do site.

**`<main>`**: conteúdo principal da página. Deve haver apenas um por página.

**`<section>`**: seção temática do conteúdo. Agrupa elementos que fazem parte do mesmo assunto.

**`<footer>`**: rodapé da página. Normalmente contém informações de copyright e links secundários.

Por que usar tags semânticas em vez de só `<div>`? Três razões:

1. O código fica mais legível — qualquer desenvolvedor entende a estrutura sem precisar ler os nomes das classes
2. Mecanismos de busca entendem melhor o conteúdo da página
3. Leitores de tela para pessoas com deficiência visual navegam melhor pelo conteúdo

---

# Comentários

É possível adicionar anotações no HTML que não aparecem para o usuário:

```html
<!-- Isso é um comentário e não aparece na tela -->
```

Comentários são úteis para documentar o código, deixar lembretes ou desativar temporariamente um trecho.

---

# O que vem a seguir

Nas próximas aulas vamos aplicar tudo isso construindo as três páginas do nosso e-commerce: a vitrine de produtos, o formulário de cadastro e o carrinho de compras.

Você vai ver cada uma dessas tags sendo usada em contexto real, com CSS para estilização e JavaScript para interatividade.

---

# Antes da próxima aula

Isso não é um exercício obrigatório — é só uma sugestão para você chegar na próxima aula com mais confiança.

Abra o VS Code, crie um arquivo chamado `index.html` e tente montar uma página simples com:

- seu nome em um `<h1>`
- uma lista com seus filmes ou séries favoritos
- um link para qualquer site que você acessa com frequência

Não precisa ficar bonito. O objetivo é só ter contato com o ambiente antes de começarmos o projeto.
