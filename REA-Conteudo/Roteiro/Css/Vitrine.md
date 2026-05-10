# Introdução

Nesta aula iremos estilizar uma página de e-commerce utilizando CSS moderno. O objetivo é transformar a estrutura HTML em uma interface organizada, bonita e responsiva.

Durante a aula veremos:
- Grid Layout
- Flexbox
- Variáveis CSS
- Responsividade
- Hover e animações
- Media Queries

---

# Container Principal

```css
.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 20px;
}
```

O container limita a largura da página e centraliza o conteúdo.

- `max-width` → largura máxima
- `margin: 0 auto` → centraliza
- `padding` → espaçamento interno

---

# Seção de Produtos

```css
.featured-products {
  padding: 70px 0;
}
```

Adiciona espaçamento vertical na seção dos produtos.

---

# Título da Página

```css
.section-title {
  text-align: center;
  font-size: 2rem;
  color: var(--accent);
}
```

- `text-align` → centraliza texto
- `font-size` → tamanho da fonte
- `color` → cor do título

---

# Grid de Produtos

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap);
}
```

Utilizamos CSS Grid para organizar os produtos em colunas.

- `display: grid`
- `repeat(3, 1fr)` → 3 colunas iguais
- `gap` → espaçamento entre cards

---

# Card de Produto

```css
.product-card {
  background: var(--surface);
  padding: 18px;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
}
```

O card contém:
- imagem
- título
- descrição
- preço
- botão

---

# Imagens

```css
.product-card img {
  max-width: 100%;
  height: 160px;
  object-fit: contain;
}
```

- `max-width` → impede overflow
- `height` → padroniza tamanho
- `object-fit` → mantém proporção

---

# Textos

```css
.product-card h3 {
  color: var(--accent);
}
```

Define a aparência do título do produto.

```css
.product-card p {
  color: var(--muted);
}
```

Define o estilo da descrição.

---

# Preço do Produto

```css
.product-price {
  font-weight: 700;
  margin-top: auto;
}
```

- `font-weight` → negrito
- `margin-top: auto` → empurra o preço para baixo

---

# Botão de Compra

```css
.btn-buy {
  padding: 10px 14px;
  background: var(--accent);
  border-radius: 8px;
  transition: all var(--transition);
}
```

Estiliza o botão principal da aplicação.

---

# Efeito Hover

```css
.btn-buy:hover {
  transform: translateY(-3px);
}
```

Cria animação ao passar o mouse no botão.

---

# Responsividade

## Tablet

```css
@media (max-width: 1100px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

A grid passa a ter 2 colunas.

---

## Mobile

```css
@media (max-width: 700px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
```

Os produtos ficam em apenas 1 coluna no celular.

---

# Conclusão

Nesta aula aprendemos:
- Grid Layout
- Flexbox
- Responsividade
- Hover
- Media Queries
- Organização visual com CSS

Também construímos uma interface moderna para uma vitrine de produtos.

---

# Exercícios

1. Alterar cores da aplicação.
2. Criar novo efeito hover.
3. Adicionar animação nos cards.
4. Criar modo escuro.
5. Alterar quantidade de colunas.