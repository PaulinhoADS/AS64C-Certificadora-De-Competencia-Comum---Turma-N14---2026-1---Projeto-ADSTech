/**
 * LÓGICA DE NAVEGAÇÃO SPA (Single Page Application)
 * Esta função recebe o ID da seção que queremos mostrar,
 * oculta todas as outras e exibe apenas a escolhida.
 */
function mostrarSecao(idSecao) {
    // Pega todas as tags que têm a classe "secao"
    const secoes = document.querySelectorAll('.secao');
    
    // Varre a lista de seções e esconde todas
    secoes.forEach(secao => {
        secao.classList.remove('ativa');
        secao.classList.add('oculta');
    });

    // Encontra a seção exata que o usuário clicou e a mostra na tela
    const secaoDesejada = document.getElementById(idSecao);
    secaoDesejada.classList.remove('oculta');
    secaoDesejada.classList.add('ativa');

    // Rola a página para o topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * BANCO DE DADOS DOS MÓDULOS (Conteúdo Didático)
 * Aqui guardamos os textos, títulos e links de vídeo para pessoas leigas.
 */
const baseDeAulas = {
    'html': {
        titulo: "Módulo 1: O Esqueleto (HTML)",
        texto: `
            <p>Imagine que você está construindo uma casa. O <strong>HTML</strong> (HyperText Markup Language) 
            são os tijolos, as paredes e as portas. Na web, ele é usado para estruturar o conteúdo.</p><br>
            <p>Nesta aula, vamos aprender a criar arquivos HTML e usar "tags" (etiquetas) para dizer ao 
            computador: <em>"Ei, isto aqui é um título principal da minha loja, e aquilo ali é a imagem do produto"</em>.</p>
        `,
        // Lembre-se de colocar o link "Embed" do YouTube depois
        videoUrl: "https://www.youtube.com/watch?v=ZnZqB5Z75zI"
    },
    'css': {
        titulo: "Módulo 2: A Maquiagem (CSS)",
        texto: `
            <p>Se o HTML é a parede de tijolos, o <strong>CSS</strong> (Cascading Style Sheets) é a tinta, 
            o papel de parede e a decoração. Ele é totalmente responsável pelo visual!</p><br>
            <p>Neste vídeo, vamos pegar aquele esqueleto sem graça da loja virtual e transformá-lo. 
            Você vai aprender a alterar cores de fundo, mudar os tipos de fontes e alinhar os produtos 
            lado a lado para ficar com cara de e-commerce profissional.</p>
        `,
        videoUrl: "https://www.youtube.com/watch?v=wcW8SvbnJYE"
    },
    'js': {
        titulo: "Módulo 3: O Cérebro (JavaScript)",
        texto: `
            <p>Nossa casa já está construída e pintada, mas as luzes não acendem sozinhas, certo? 
            É aí que entra o <strong>JavaScript</strong>. Ele é a energia e as engrenagens do site.</p><br>
            <p>No e-commerce, o JavaScript é quem faz a mágica acontecer: é ele que entende quando o 
            cliente clica no botão "Comprar", faz o cálculo matemático do frete e faz o carrinho de compras 
            piscar na tela. Vamos dar vida ao nosso projeto!</p>
        `,
        videoUrl: "https://www.youtube.com/watch?v=HX43QiFApWc"
    }
};

/**
 * FUNÇÃO PARA INJETAR A AULA DINAMICAMENTE
 * Pega os dados do objeto acima e constrói a tela da aula.
 */
function carregarAula(moduloEscolhido) {
    const dados = baseDeAulas[moduloEscolhido];
    const containerConteudo = document.getElementById('conteudo-aula');
    
    // Injeta o HTML dentro da div da aula, misturando o layout com os textos
    containerConteudo.innerHTML = `
        <h2>${dados.titulo}</h2>
        
        <div class="video-wrapper">
            <iframe src="${dados.videoUrl}" title="Vídeo Aula" allowfullscreen></iframe>
        </div>
        
        <div class="texto-aula">
            ${dados.texto}
        </div>
        
        <div style="background: #29292e; padding: 15px; border-left: 4px solid #00E676; border-radius: 4px;">
            <strong>Dica Prática:</strong> Assista ao vídeo e pause sempre que precisar digitar o código no seu editor. 
            A melhor forma de aprender é colocando a mão na massa!
        </div>
    `;
    
    // Mostra a seção de aula pronta
    mostrarSecao('sala-aula');
}
