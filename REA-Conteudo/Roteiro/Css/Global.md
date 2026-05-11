# Introdução da aula

Antes de estilizar qualquer página específica do projeto, precisamos entender o `global.css` — o arquivo de estilos compartilhado por todas as páginas do e-commerce. Tudo que é comum entre a vitrine, o formulário e o carrinho está aqui: as variáveis de cor, o reset, a estrutura do cabeçalho, do rodapé e dos componentes reutilizáveis.

Essa aula é importante porque sem entender o global, você vai encontrar propriedades nas próximas aulas sem saber de onde vieram.

---

# Variáveis CSS

O arquivo começa declarando todas as variáveis do projeto dentro de `:root`:

```css
:root {
  --bg: #0f1113;
  --surface: #17181a;
  --accent: #ffcc00;
  --muted: #9aa0a6;
  --text: #e6e7e8;
  --radius: 10px;
  --container: 1100px;
  --gap: 24px;
  --transition: 200ms ease;
  --font:
    "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial;
}
```

Como vimos na introdução, variáveis CSS evitam repetição e centralizam as decisões visuais do projeto. Aqui temos:

**Cores**: `--bg` é a cor de fundo da página, `--surface` é a cor de fundo dos cards e componentes, `--accent` é o amarelo usado em títulos e botões, `--muted` é o cinza para textos secundários e `--text` é a cor principal do texto.

**Tamanhos**: `--radius` é o arredondamento padrão das bordas, `--container` é a largura máxima do conteúdo e `--gap` é o espaçamento padrão entre elementos.

**Outros**: `--transition` define a velocidade padrão das animações e `--font` define a família de fontes do projeto. Repare que `--font` lista várias fontes em sequência — se a primeira não estiver disponível, o navegador tenta a próxima. Isso é chamado de font stack.

---

# Reset CSS

Logo após as variáveis temos o reset:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

O seletor `*` aplica o estilo a **todos** os elementos da página. O reset resolve um problema clássico: cada navegador tem seus próprios estilos padrão — margens, espaçamentos e tamanhos que variam entre Chrome, Firefox e Safari. O reset zera esses valores para que o projeto se comporte de forma consistente em qualquer navegador.

**`margin: 0` e `padding: 0`**: removem todo espaçamento padrão dos elementos.

**`box-sizing: border-box`**: muda como o navegador calcula o tamanho dos elementos. Por padrão, quando você define `width: 200px` em um elemento e adiciona `padding: 20px`, o elemento fica com 240px no total — o padding é somado por fora. Com `border-box`, o padding é contado por dentro: o elemento continua com 200px no total. Isso torna o layout muito mais previsível.

---

# HTML e Body

```css
html,
body {
  height: 100%;
}
```

Garante que o `html` e o `body` ocupem 100% da altura da tela. Isso é necessário para que o rodapé fique no final da página mesmo quando o conteúdo é curto.

```css
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
}
```

**`background` e `color`**: definem as cores padrão da página usando as variáveis que declaramos.

**`font-family`**: aplica a fonte do projeto a todos os elementos via herança — elementos filhos herdam a fonte do body automaticamente.

**`-webkit-font-smoothing` e `-moz-osx-font-smoothing`**: melhoram a renderização das fontes em sistemas macOS e iOS, deixando o texto mais nítido.

**`line-height: 1.4`**: define o espaçamento entre linhas de texto. O valor `1.4` significa 1.4 vezes o tamanho da fonte — sem unidade, é relativo.

**`display: flex` e `flex-direction: column`**: aqui encontramos o Flexbox pela primeira vez. Flexbox é um sistema de layout que organiza elementos em um eixo — horizontal ou vertical. Quando aplicamos `display: flex` no body e definimos `flex-direction: column`, os filhos diretos do body (header, main e footer) se empilham verticalmente. Isso permite que o main ocupe todo o espaço disponível entre o header e o footer, mantendo o rodapé sempre no final da tela.

---

# Reset de links e botões

```css
a {
  color: inherit;
  text-decoration: none;
  font-family: inherit;
}

button {
  font-family: inherit;
  cursor: pointer;
}
```

Por padrão, links têm cor azul e sublinhado. Aqui removemos isso: `color: inherit` faz o link herdar a cor do elemento pai e `text-decoration: none` remove o sublinhado.

O valor `inherit` significa "use o mesmo valor do elemento pai". É útil para sobrescrever comportamentos padrão do navegador sem definir um valor fixo.

Em botões, `cursor: pointer` faz o cursor virar uma mãozinha ao passar por cima — sinalizando ao usuário que o elemento é clicável.

---

# Main e Header

```css
main {
  flex: 1;
  padding: 2rem;
}
```

**`flex: 1`**: como o body é um container flex com direção de coluna, o `flex: 1` no main faz com que ele ocupe todo o espaço vertical disponível entre o header e o footer. É isso que mantém o rodapé colado na base da tela.

```css
header {
  background: transparent;
  padding: 18px 0;
}
```

O header tem fundo transparente — o fundo escuro que vemos vem do body. O `padding: 18px 0` adiciona espaçamento vertical: 18px em cima e em baixo, zero nas laterais.

---

# Header Container

```css
.header-container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
```

O `.header-container` centraliza e organiza o conteúdo do cabeçalho. Vamos por partes:

**`max-width` e `margin: 0 auto`**: limitam a largura e centralizam o container horizontalmente na tela — o mesmo padrão que vimos na introdução.

**`display: flex`**: transforma o container em um flex container. Os filhos diretos — nav, header-actions e mobile-menu-btn — ficam lado a lado horizontalmente.

**`align-items: center`**: alinha os filhos verticalmente ao centro do container. Sem isso, elementos de alturas diferentes ficariam desalinhados.

**`justify-content: space-between`**: distribui os filhos empurrando o primeiro para a esquerda e o último para a direita, com os demais distribuídos entre eles.

**`gap: 16px`**: espaçamento entre os filhos flex.

---

# Navegação

```css
nav {
  flex: 1;
  margin-left: 24px;
}
```

O `flex: 1` faz a nav ocupar todo o espaço horizontal disponível entre o logo e as ações do header. O `margin-left` afasta a nav da borda esquerda.

```css
.nav-menu {
  list-style: none;
  display: flex;
  gap: 18px;
  align-items: center;
}
```

**`list-style: none`**: remove os marcadores padrão da lista.

**`display: flex`**: coloca os itens do menu lado a lado horizontalmente.

```css
.nav-link {
  font-weight: 600;
  transition: color var(--transition);
}

.nav-link:hover {
  color: var(--accent);
}
```

**`transition: color var(--transition)`**: faz a mudança de cor ao hover acontecer de forma animada, usando a duração definida na variável `--transition`. Sem transition, a cor mudaria instantaneamente.

---

# Header Actions e Search Bar

```css
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

Agrupa os elementos do lado direito do header — barra de busca e ícone do carrinho — lado a lado com Flexbox.

```css
.search-bar {
  display: flex;
  align-items: center;
  background: var(--surface);
  padding: 6px 8px;
  border-radius: 8px;
}

.search-bar input {
  border: 0;
  background: transparent;
  color: var(--text);
  outline: none;
  width: 180px;
}
```

A search bar é um container flex que alinha o input e o botão de lupa lado a lado.

**`border: 0` e `outline: none`** no input: removem a borda padrão e o contorno azul que os navegadores adicionam ao focar em campos de texto.

**`background: transparent`**: o input herda o fundo do container, criando a aparência de um campo integrado.

---

# Botões de ícone

```css
.icon-btn {
  background: transparent;
  border: 0;
  padding: 8px;
  border-radius: 8px;
  transition: background var(--transition);
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.03);
}
```

O botão do carrinho tem fundo transparente por padrão e ao hover recebe um fundo levemente claro — quase imperceptível, mas suficiente para dar feedback visual ao usuário.

**`rgba(255,255,255,0.03)`**: branco com 3% de opacidade. É um efeito sutil intencional.

---

# Botão Mobile

```css
.mobile-menu-btn {
  display: none;
  background: transparent;
  border: 0;
  color: var(--text);
  font-size: 1.5rem;
}
```

O botão hamburguer começa com `display: none` — oculto por padrão. Ele só aparece em telas menores, controlado pela media query que veremos ao final da aula.

---

# Footer

```css
footer {
  padding: 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  margin-top: auto;
  text-align: center;
}
```

**`border-top`**: adiciona uma linha sutil separando o footer do conteúdo acima.

**`margin-top: auto`**: em conjunto com o `display: flex` do body, empurra o footer para o final da página, mesmo quando o conteúdo acima é curto.

---

# Toast

```css
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #27ae60;
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--radius);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  font-weight: bold;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  pointer-events: none;
  z-index: 9999;
}

.toast.mostrar {
  opacity: 1;
  transform: translateY(0);
}
```

O toast é a notificação que aparece quando o usuário adiciona um produto ao carrinho ou salva um formulário.

**`position: fixed`**: fixa o elemento na tela — ele não se move com o scroll. As propriedades `bottom` e `right` definem a posição em relação à janela.

**`opacity: 0` e `transform: translateY(20px)`**: o toast começa invisível e levemente deslocado para baixo.

**`transition`**: quando o JavaScript adiciona a classe `mostrar`, a transição anima a mudança de opacidade e posição simultaneamente, criando o efeito de entrada.

**`pointer-events: none`**: enquanto invisível, o toast não interfere com cliques do usuário.

**`z-index: 9999`**: garante que o toast apareça por cima de todos os outros elementos da página.

---

# Classe oculto

```css
.oculto {
  display: none !important;
}
```

Uma classe utilitária simples que esconde qualquer elemento. O `!important` garante que essa regra sempre prevaleça sobre qualquer outro estilo que o elemento possa ter.

O JavaScript vai adicionar e remover essa classe para mostrar ou esconder elementos dinamicamente — como o estado de carrinho vazio e o resumo do carrinho.

---

# Media Query

```css
@media (max-width: 700px) {
  .search-bar input {
    width: 100px;
  }
  .nav-menu {
    display: none;
  }
  .mobile-menu-btn {
    display: inline-block;
  }
}
```

Em telas com até 700px de largura três coisas acontecem:

- A barra de busca encolhe para ocupar menos espaço
- O menu de navegação é ocultado
- O botão hamburguer aparece — era `display: none` e passa a `display: inline-block`

O menu mobile em si será implementado com JavaScript em uma aula futura.

---

# Conclusão da aula

Nesta aula aprendemos:

- como declarar e usar variáveis CSS com `:root` e `var()`
- o que é um reset CSS e por que ele é necessário
- como o `box-sizing: border-box` torna o layout mais previsível
- os fundamentos do Flexbox: `display: flex`, `flex-direction`, `align-items`, `justify-content` e `gap`
- como `position: fixed` e `z-index` funcionam no toast
- como a classe `oculto` e o JavaScript vão trabalhar juntos
- como a media query reorganiza o header em telas menores

---

# Exercícios

1. Trocar a cor de `--accent` e observar onde ela muda na página.
2. Remover o `box-sizing: border-box` do reset e observar o que muda no layout.
3. Alterar o valor de `--transition` para `1s ease` e passar o mouse nos links do menu.
4. Mudar o `bottom` e o `right` do toast para reposicioná-lo na tela.
5. Alterar o breakpoint da media query de `700px` para `900px` e redimensionar a janela do navegador.
