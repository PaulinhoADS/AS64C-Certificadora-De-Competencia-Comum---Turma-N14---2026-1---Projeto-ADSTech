# Introdução da aula

Nesta aula vamos estilizar a página de cadastro de produtos. O CSS do formulário é o mais enxuto do projeto — poucos seletores, mas com alguns detalhes importantes sobre como estilizar campos de entrada de dados de forma consistente e acessível.

---

# Container do Formulário

```css
.form-container {
  max-width: 500px;
  margin: 0 auto;
  background-color: var(--surface);
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
}
```

O padrão é o mesmo do carrinho: container centralizado com largura máxima, fundo `--surface`, bordas arredondadas e sombra. A largura aqui é 500px — ainda menor que o carrinho — porque um formulário é uma estrutura vertical e estreita por natureza.

```css
.form-container h1 {
  margin-bottom: 1.5rem;
  color: var(--accent);
  text-align: center;
}
```

O título é centralizado, diferente do carrinho onde ficava alinhado à esquerda. Em formulários curtos o título centralizado equilibra melhor visualmente.

---

# Grupo de Input

```css
.input-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}
```

Cada par de label e campo é agrupado em um `.input-group`. O Flexbox com direção de coluna empilha o label acima do campo, com espaçamento entre os grupos via `margin-bottom`.

```css
.input-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text);
}
```

O label recebe `margin-bottom` para criar espaço entre ele e o campo abaixo. O `font-weight: 600` o destaca levemente do texto comum, deixando claro que é um rótulo.

---

# Estilizando Input e Textarea juntos

```css
.input-group input,
.input-group textarea {
  padding: 0.8rem;
  background-color: var(--bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color var(--transition);
}
```

Aqui o CSS usa dois seletores separados por vírgula para aplicar o mesmo estilo ao `input` e ao `textarea` ao mesmo tempo. Isso evita repetição — se precisar mudar o visual dos campos, altera em um lugar só.

**`font-family: inherit`**: navegadores aplicam uma fonte diferente ao `textarea` por padrão. O `inherit` força ele a usar a mesma fonte do restante do projeto.

**`transition: border-color`**: diferente do carrinho onde animamos `all`, aqui animamos apenas a `border-color`. Isso é mais eficiente — animar só a propriedade que vai mudar em vez de monitorar todas.

```css
.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: var(--accent);
}
```

O mesmo padrão de `:focus` do carrinho: remove o outline padrão e troca a cor da borda pelo amarelo de destaque. Como declaramos `transition: border-color` acima, essa mudança acontece de forma animada.

---

# Botão de Envio

```css
.btn-submit {
  width: 100%;
  padding: 1rem;
  background-color: var(--accent);
  color: #111;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  transition:
    all var(--transition),
    box-shadow var(--transition);
  margin-top: 1rem;
}
```

**`width: 100%`**: o botão ocupa toda a largura do container. É uma escolha comum em formulários — o botão de envio se destaca por ser mais largo que os campos acima.

**`transition: all var(--transition), box-shadow var(--transition)`**: duas transições declaradas separadas por vírgula. O `all` cobre a maioria das propriedades animáveis e o `box-shadow` é adicionado explicitamente porque alguns navegadores não o incluem no `all`.

```css
.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 204, 0, 0.12);
}

.btn-submit:active {
  transform: scale(0.96);
}
```

O hover eleva o botão com `translateY` e adiciona a sombra amarelada — o mesmo padrão do botão de compra da vitrine e do botão voltar do carrinho, mantendo consistência visual no projeto.

**`:active`**: pseudo-classe que aplica estilo no momento em que o botão é clicado. O `scale(0.96)` encolhe levemente o botão, simulando o efeito de pressionar fisicamente. É um detalhe pequeno mas que melhora a sensação de interação.

---

# Conclusão da aula

Nesta aula aprendemos:

- como aplicar o mesmo estilo a múltiplos seletores usando vírgula
- por que `font-family: inherit` é necessário no textarea
- a diferença entre animar `all` e animar uma propriedade específica no `transition`
- a pseudo-classe `:active` para feedback no clique
- como `width: 100%` em botões de formulário melhora a hierarquia visual

---

# Exercícios

1. Adicionar um efeito no botão de envio que reduza levemente seu tamanho ao clique.
2. Trocar a mudança de `border-color` no foco por uma borda lateral.
3. Adicionar um ícone do Font Awesome dentro do botão de envio.
4. Criar um segundo botão de limpar o formulário estilizado de forma diferente do botão de envio.
