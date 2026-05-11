# Introdução da aula

Agora que já conhecemos o HTML e construímos a estrutura das nossas páginas, chegou a hora de falar sobre CSS. Nessa aula vamos entender o que é CSS, como ele funciona, e apresentar os conceitos que vamos usar ao longo do curso para estilizar o e-commerce.

Assim como a introdução ao HTML, essa aula é uma apresentação — sem código para escrever ainda. O objetivo é que você chegue na próxima aula sabendo o que esperar.

---

# O que é CSS?

CSS significa **Cascading Style Sheets** — em português, Folhas de Estilo em Cascata.

Se o HTML define a estrutura da página, o CSS define a aparência. É o CSS que controla cores, tamanhos, espaçamentos, fontes, posicionamento e animações.

Voltando à analogia da casa: se o HTML é a estrutura — paredes, portas e janelas — o CSS é a pintura, o revestimento e a decoração. O mesmo HTML pode ter aparências completamente diferentes dependendo do CSS aplicado.

---

# Como o CSS se conecta ao HTML

Existem três formas de aplicar CSS em uma página, mas a mais organizada e usada profissionalmente é através de um arquivo externo:

```html
<link rel="stylesheet" href="style.css" />
```

Essa linha fica dentro do `<head>` do HTML e conecta o arquivo CSS à página. É exatamente o que fazemos no nosso projeto.

As outras duas formas — CSS dentro de uma tag `<style>` no HTML ou diretamente no atributo `style` de um elemento — existem mas não são recomendadas para projetos reais, pois misturam estrutura com aparência.

---

# Sintaxe do CSS

O CSS é escrito em blocos de regras. Cada bloco tem:

```css
seletor {
  propriedade: valor;
  propriedade: valor;
}
```

**Seletor**: indica qual elemento HTML será estilizado.

**Propriedade**: o que será alterado (cor, tamanho, espaçamento...).

**Valor**: o que será aplicado àquela propriedade.

Exemplo:

```css
h1 {
  color: blue;
  font-size: 2rem;
}
```

Isso diz ao navegador: "todo `<h1>` deve ter cor azul e tamanho de fonte 2rem".

---

# Seletores

Os seletores definem quais elementos do HTML o CSS vai atingir. Os mais usados são:

**Tag**: aplica o estilo a todos os elementos daquele tipo.

```css
p {
  color: gray;
}
```

**Classe**: aplica o estilo a todos os elementos com aquela classe. Classes são definidas no HTML com o atributo `class` e no CSS com um ponto antes do nome.

```css
.product-card {
  background: white;
}
```

**ID**: aplica o estilo a um elemento específico. IDs são únicos por página e no CSS usam `#`.

```css
#search-bar {
  width: 100%;
}
```

No nosso projeto vamos usar principalmente seletores de classe, que é a prática mais comum no desenvolvimento profissional.

---

# Box Model

Todo elemento HTML é tratado pelo CSS como uma caixa. Essa caixa tem quatro camadas, de dentro para fora:

```
┌────────────────────────────┐
│          margin            │
│  ┌──────────────────────┐  │
│  │       border         │  │
│  │  ┌────────────────┐  │  │
│  │  │    padding     │  │  │
│  │  │  ┌──────────┐  │  │  │
│  │  │  │ conteúdo │  │  │  │
│  │  │  └──────────┘  │  │  │
│  │  └────────────────┘  │  │
│  └──────────────────────┘  │
└────────────────────────────┘
```

**Conteúdo**: o texto, imagem ou elemento em si.

**Padding**: espaçamento interno entre o conteúdo e a borda.

**Border**: a borda ao redor do elemento.

**Margin**: espaçamento externo entre esse elemento e os elementos ao redor.

Exemplo:

```css
.product-card {
  padding: 18px; /* espaço interno */
  margin: 10px; /* espaço externo */
}
```

Entender o box model é fundamental porque `padding` e `margin` aparecem em praticamente todo arquivo CSS do projeto.

---

# Variáveis CSS

CSS permite criar variáveis para armazenar valores que se repetem ao longo do projeto. Isso evita repetição e facilita manutenção — se você quiser mudar a cor principal do site, altera em um lugar só.

Variáveis CSS são declaradas dentro de `:root`, que representa o elemento raiz da página:

```css
:root {
  --accent: #ffcc00;
  --surface: #1e1e1e;
  --muted: #aaaaaa;
  --container: 1200px;
  --gap: 24px;
  --radius: 12px;
  --transition: 0.3s ease;
}
```

Para usar uma variável, utilizamos a função `var()`:

```css
.section-title {
  color: var(--accent);
}

.product-card {
  background: var(--surface);
  border-radius: var(--radius);
}
```

No nosso projeto todas as cores, tamanhos e espaçamentos principais estão definidos como variáveis. Você vai ver `var(--algo)` em praticamente todo arquivo CSS — agora você sabe o que significa.

---

# Unidades de medida

O CSS tem várias unidades de medida. As que mais vamos usar no projeto:

**px (pixels)**: valor fixo, não se adapta ao tamanho da tela ou da fonte do usuário.

```css
height: 160px;
```

**rem**: relativo ao tamanho de fonte do elemento raiz da página (normalmente 16px). É mais flexível que px para textos.

```css
font-size: 2rem; /* = 32px se o root for 16px */
```

**% (porcentagem)**: relativo ao elemento pai.

```css
max-width: 100%;
```

**fr**: unidade do CSS Grid que representa uma fração do espaço disponível. Veremos ela na aula da vitrine.

```css
grid-template-columns: repeat(3, 1fr); /* 3 colunas iguais */
```

---

# Cores

O CSS aceita cores em vários formatos:

**Nome**: cores básicas em inglês.

```css
color: red;
color: blue;
```

**Hexadecimal**: o formato mais comum no desenvolvimento.

```css
color: #ffcc00;
color: #1e1e1e;
```

**RGB e RGBA**: vermelho, verde e azul. O quarto valor no RGBA é a opacidade (0 a 1).

```css
color: rgb(255, 204, 0);
color: rgba(0, 0, 0, 0.45);
```

No nosso projeto vamos usar principalmente hexadecimal e rgba.

---

# Cascata e especificidade

O "C" de CSS significa Cascading — em cascata. Quando duas regras conflitam, o CSS decide qual aplicar com base em duas coisas:

**Ordem**: a regra que vem por último no arquivo prevalece.

**Especificidade**: seletores mais específicos ganham dos menos específicos. ID ganha de classe, classe ganha de tag.

```css
p {
  color: gray;
} /* menos específico */
.destaque {
  color: blue;
} /* mais específico */
```

Um elemento `<p class="destaque">` ficará azul, não cinza.

É por isso que no projeto importamos o `global.css` antes do `style.css` — queremos que os estilos específicos da página possam sobrescrever os globais quando necessário.

---

# Pseudo-classes

Pseudo-classes permitem estilizar elementos em estados específicos. A mais comum é o `:hover`, que aplica estilo quando o usuário passa o mouse sobre o elemento:

```css
.btn-buy:hover {
  transform: translateY(-3px);
}
```

Vamos usar `:hover` nos botões do projeto para criar efeitos de interação.

---

# Responsividade e Media Queries

Responsividade é a capacidade da página de se adaptar a diferentes tamanhos de tela — celular, tablet, desktop.

No CSS isso é feito com **media queries**, que aplicam estilos apenas quando certas condições são verdadeiras:

```css
@media (max-width: 700px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
```

Essa regra diz: "quando a tela tiver no máximo 700px de largura, aplique esse estilo". No nosso projeto vamos usar media queries para reorganizar o grid de produtos em telas menores.

---

# O que vem a seguir

Nas próximas aulas vamos aplicar todos esses conceitos estilizando as três páginas do e-commerce. Você vai ver CSS Grid e Flexbox sendo usados para organizar layouts, variáveis controlando o tema visual do projeto e media queries adaptando tudo para mobile.

---
