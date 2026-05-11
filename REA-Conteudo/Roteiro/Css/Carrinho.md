# Introdução da aula

Nesta aula vamos estilizar a página do carrinho de compras. Assim como nas aulas anteriores, o `global.css` já cuida do header, footer e variáveis — aqui vamos focar exclusivamente no que é específico desta página: o container do carrinho, os itens, as ações e o resumo do pedido.

---

# Container do Carrinho

```css
.carrinho-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--surface);
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
}
```

O container centraliza todo o conteúdo do carrinho na página e tem largura máxima de 800px — menor que o container da vitrine porque o carrinho é uma página mais focada, sem grid de produtos.

**`box-shadow`**: adiciona uma sombra ao redor do container. Os quatro valores são: deslocamento horizontal, deslocamento vertical, desfoque e cor. Aqui a sombra é preta com 45% de opacidade, criando profundidade.

```css
.carrinho-container h1 {
  margin-bottom: 2rem;
  color: var(--accent);
  border-bottom: 2px solid rgba(255, 255, 255, 0.03);
  padding-bottom: 1rem;
}
```

O título recebe uma linha separadora abaixo usando `border-bottom`. O `padding-bottom` garante que o texto não fique colado na linha.

---

# Lista de Itens

```css
.itens-carrinho {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
```

A área de itens usa Flexbox com direção de coluna para empilhar cada produto verticalmente, com espaçamento de `1.5rem` entre eles.

---

# Item Individual

```css
.item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}
```

Cada item do carrinho é um container flex horizontal com três partes: imagem, detalhes e total. O `align-items: center` alinha tudo verticalmente ao meio, independente da altura de cada parte.

O `border-bottom` cria uma linha separadora sutil entre os itens — o mesmo padrão usado no título.

```css
.item img {
  width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
```

A imagem tem tamanho fixo. **`object-fit: cover`** recorta a imagem para preencher o espaço definido mantendo a proporção — diferente do `contain` usado na vitrine, que mostrava a imagem inteira sem recorte. A escolha entre os dois depende do visual desejado.

---

# Detalhes do Item

```css
.item-detalhes {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

**`flex: 1`**: faz a área de detalhes ocupar todo o espaço horizontal disponível entre a imagem e o total. É o mesmo conceito que vimos no `main` do global — o elemento com `flex: 1` expande para preencher o espaço restante.

Internamente também é um container flex de coluna, empilhando nome, preço e ações verticalmente.

```css
.item-detalhes h3 {
  font-size: 1.1rem;
  color: var(--text);
  margin: 0;
}

.preco-unitario {
  color: var(--muted);
  font-size: 0.95rem;
}
```

O nome do produto usa a cor principal do texto e o preço unitário usa `--muted` para criar hierarquia visual — o preço unitário é uma informação secundária em relação ao subtotal.

---

# Ações do Item

```css
.item-acoes {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}
```

Agrupa o input de quantidade e o botão de remover lado a lado.

```css
.qtd-input {
  width: 60px;
  padding: 0.5rem;
  background-color: var(--bg);
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
  font-family: inherit;
}

.qtd-input:focus {
  outline: none;
  border-color: var(--accent);
}
```

O input de quantidade tem largura fixa de 60px e borda sutil. O `:focus` é uma pseudo-classe que aplica estilos quando o elemento está ativo — aqui, quando o usuário clica no campo, a borda muda para a cor de destaque. Isso dá feedback visual de que o campo está selecionado, substituindo o `outline` padrão do navegador que removemos.

```css
.btn-remover {
  background: none;
  color: #e74c3c;
  border: none;
  font-size: 0.9rem;
  font-weight: bold;
}

.btn-remover:hover {
  color: #c0392b;
}
```

O botão de remover usa vermelho fixo em vez de uma variável — é uma cor semântica que indica ação destrutiva, comum em interfaces. No hover escurece levemente para dar feedback sem precisar de animação.

---

# Total do Item

```css
.item-total {
  text-align: right;
  min-width: 120px;
}

.preco-subtotal {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--accent);
}
```

O total fica alinhado à direita com largura mínima definida. O `min-width` garante que a coluna de preços não encolha quando os valores forem pequenos, mantendo o alinhamento visual consistente entre os itens.

O subtotal usa fonte maior e a cor de destaque — é a informação mais importante visualmente nessa área.

---

# Resumo do Carrinho

```css
.resumo-carrinho {
  text-align: right;
  background-color: var(--bg);
  padding: 1.5rem;
  border-radius: var(--radius);
}

.resumo-carrinho h2 {
  margin-bottom: 1rem;
  color: var(--text);
}

.valor-total {
  color: var(--accent);
}
```

O resumo usa `--bg` como fundo — um tom mais escuro que `--surface` — criando contraste visual com o container principal e destacando essa área como diferente.

O `<span class="valor-total">` dentro do `<h2>` recebe a cor de destaque individualmente, sem afetar o texto "Total:" ao redor.

---

# Botão Finalizar

```css
.btn-finalizar {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all var(--transition);
}

.btn-finalizar:hover {
  background-color: #219653;
  transform: translateY(-3px);
}
```

O botão finalizar usa verde — outra cor semântica que indica ação positiva e conclusiva. No hover, além do efeito de elevação com `translateY`, a cor de fundo também muda para um verde mais escuro, reforçando o feedback.

---

# Estado de Carrinho Vazio

```css
.carrinho-vazio {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--muted);
}

.carrinho-vazio p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}
```

O estado vazio é centralizado e usa `--muted` para transmitir que não há conteúdo — visualmente mais apagado que o restante da página.

---

# Botão Voltar para a Vitrine

```css
.btn-voltar {
  display: inline-block;
  background-color: var(--accent);
  color: #111;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  transition: all var(--transition);
}

.btn-voltar:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 204, 0, 0.12);
}
```

O `<a>` que leva de volta à vitrine é estilizado como botão usando `display: inline-block` — necessário porque elementos `<a>` são inline por padrão e não respeitam `padding` vertical sem essa propriedade.

O hover combina elevação com uma sombra amarelada, o mesmo padrão do botão de compra da vitrine — mantendo consistência visual entre as páginas.

---

# Conclusão da aula

Nesta aula aprendemos:

- como usar `box-shadow` para criar profundidade
- a diferença entre `object-fit: cover` e `object-fit: contain`
- como `flex: 1` distribui espaço entre elementos irmãos
- uso de `min-width` para manter alinhamento em colunas de preço
- a pseudo-classe `:focus` para estilizar campos ativos
- uso semântico de cores: vermelho para ações destrutivas, verde para ações positivas
- como transformar um `<a>` em botão com `display: inline-block`

---

# Exercícios

1. Alterar o `object-fit` da imagem do item de `cover` para `contain` e observar a diferença.
2. Remover o `flex: 1` de `.item-detalhes` e observar o que acontece com o layout.
3. Adicionar um `transition` no `.btn-remover` para animar a mudança de cor no hover.
4. Criar uma borda colorida no `.resumo-carrinho` usando `border-left` com a cor `--accent`.
5. Alterar o `min-width` de `.item-total` para `0` e verificar o impacto no alinhamento dos preços.
