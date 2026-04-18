/**
 * LÓGICA DE TEMAS (DARK MODE / LIGHT MODE)
 * Esta função captura o clique no botão do cabeçalho e alterna a variável no HTML.
 * O CSS faz o resto do trabalho alterando as cores das variáveis.
 */
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

themeToggleBtn.addEventListener('click', () => {
    // Verifica qual é o tema atual lendo o atributo do HTML
    const temaAtual = bodyElement.getAttribute('data-theme');
    
    // Se for dark, muda pra light. Se for light, muda pra dark.
    if (temaAtual === 'dark') {
        bodyElement.setAttribute('data-theme', 'light');
    } else {
        bodyElement.setAttribute('data-theme', 'dark');
    }
});

/**
 * LÓGICA DE NAVEGAÇÃO SPA (Single Page Application)
 * Esta função recebe o ID da seção que será mostrada,
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
    
    // Rola a página para o topo suavemente para melhorar a experiência
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * BANCO DE DADOS DOS MÓDULOS (Conteúdo Didático)
 * Aqui guardamos os textos, títulos e links de vídeo para aprendizado dos alunos que acessaren nosso portal REA.
 * Criação da estrutura para os 3 VÍDEOS de cada módulo
 */
const baseDeAulas = {
    'html': {
        titulo: "Módulo 1: O Esqueleto (HTML)",
        intro: `<strong>HTML (HyperText Markup Language):</strong> Imagine que você está construindo uma casa. O HTML são os tijolos, as paredes e as portas. Na web, ele é usado para estruturar o conteúdo. Abaixo, separamos a construção da nossa loja em 3 etapas fundamentais:`,
        aulas: [
            {
                titulo: "Vídeo 1: HTML da Vitrine",
                url: "https://www.youtube.com/embed/wcW8SvbnJYE", // Trocar pelo link real depois
                desc: "Neste vídeo, vamos usar tags HTML para criar a área onde os produtos serão exibidos, separando os espaços para imagens, nomes e preços."
            },
            {
                titulo: "Vídeo 2: HTML do Formulário",
                url: "https://www.youtube.com/embed/ZnZqB5Z75zI",
                desc: "Aprenda a estruturar campos de entrada (inputs) para criar uma área de contato e cadastro de clientes para o e-commerce."
            },
            {
                titulo: "Vídeo 3: HTML do Carrinho",
                url: "https://www.youtube.com/embed/HX43QiFApWc",
                desc: "Vamos montar a lista onde os itens selecionados ficarão guardados aguardando a finalização da compra."
            }
        ]
    },
    'css': {
        titulo: "Módulo 2: A Maquiagem (CSS)",
        intro: `<strong>CSS (Cascading Style Sheets):</strong> Se o HTML é a parede de tijolos, o CSS é a tinta, o papel de parede e a decoração. Ele é totalmente responsável pelo visual! Vamos dar vida à nossa estrutura:`,
        aulas: [
            {
                titulo: "Vídeo 1: Estilizando a Vitrine",
                url: "https://www.youtube.com/embed/UyqnRW",
                desc: "Nesta aula, aplicaremos cores, tamanhos e organizaremos os produtos lado a lado utilizando Flexbox e Grid."
            },
            {
                titulo: "Vídeo 2: Estilizando o Formulário",
                url: "https://www.youtube.com/embed/U2zHz5EkG",
                desc: "Vamos deixar os campos de texto com um design moderno, arredondar bordas e dar destaque aos botões de envio."
            },
            {
                titulo: "Vídeo 3: Estilizando o Carrinho",
                url: "https://www.youtube.com/embed/9arUOL3N6Co",
                desc: "Aprenda a criar um visual flutuante para o carrinho, garantindo que o usuário veja claramente o total da compra."
            }
        ]
    },
    'js': {
        titulo: "Módulo 3: O Cérebro (JavaScript)",
        intro: `<strong>JavaScript (JS):</strong> Nossa casa já está construída e pintada, mas as luzes não acendem sozinhas. O JavaScript é a energia e as engrenagens. No e-commerce, é ele quem faz a mágica acontecer:`,
        aulas: [
            {
                titulo: "Vídeo 1: Interação na Vitrine",
                url: "https://www.youtube.com/embed/FM7MFYoylVs",
                desc: "Programando o botão 'Comprar' para reconhecer qual produto foi clicado e emitir um alerta na tela."
            },
            {
                titulo: "Vídeo 2: Validação do Formulário",
                url: "https://www.youtube.com/embed/gKM15TaKLUI",
                desc: "Criando lógicas para garantir que o usuário preencheu o email e os dados corretamente antes de enviar."
            },
            {
                titulo: "Vídeo 3: Lógica do Carrinho",
                url: "https://www.youtube.com/embed/VPRjCeoBqrI",
                desc: "O vídeo mais importante! Vamos aprender a calcular a matemática dos valores, somar o total e atualizar o carrinho dinamicamente."
            }
        ]
    }
};

/**
 * FUNÇÃO PARA INJETAR O CONTEÚDO DINAMICAMENTE
 * Pega os dados dos objetos acima e constrói o grid com os 3 vídeos.
 */
function carregarAula(moduloEscolhido) {
    const dados = baseDeAulas[moduloEscolhido];
    const containerConteudo = document.getElementById('conteudo-aula');

    // Variável para guardar o HTML gerado de todos os 3 vídeos do módulo
    let htmlDosVideos = '';

    // Um "Laço de Repetição" (loop) que passa por cada aula e gera o quadradinho do vídeo
    dados.aulas.forEach(aula => {
        htmlDosVideos += `
            <div class="video-box">
                <h3>${aula.titulo}</h3>
                <div class="video-wrapper">
                    <iframe src="${aula.url}" title="${aula.titulo}" allowfullscreen></iframe>
                </div>
                <p class="texto-educativo">${aula.desc}</p>
            </div>
        `;
    });

    // Injeta a Introdução principal em cima e os vídeos embaixo
    containerConteudo.innerHTML = `
        <h2>${dados.titulo}</h2>
        <div class="intro-aula">
            ${dados.intro}
        </div>
        
        <div class="grid-videos">
            ${htmlDosVideos}
        </div>
    `;
    
    // Muda a página para exibir a sala de aula
    mostrarSecao('sala-aula');
}
