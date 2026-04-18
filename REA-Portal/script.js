/**
 * LÓGICA DE ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
 * Selecionamos o botão por ID e alteramos o atributo do body.
 */
const btnTema = document.getElementById('btn-alternar-tema');
const body = document.body;

btnTema.addEventListener('click', () => {
    // Busca o tema que está ativo no momento
    const temaAtual = body.getAttribute('data-theme');
    
    // Altera o tema e atualiza os textos visuais do botão
    if (temaAtual === 'dark') {
        body.setAttribute('data-theme', 'light');
        document.getElementById('tema-icone').innerText = '☀️';
        document.getElementById('tema-texto').innerText = 'Modo Claro';
    } else {
        body.setAttribute('data-theme', 'dark');
        document.getElementById('tema-icone').innerText = '🌙';
        document.getElementById('tema-texto').innerText = 'Modo Escuro';
    }
});

/**
 * LÓGICA DE NAVEGAÇÃO SPA (Single Page Application)
 * Alterna a visibilidade das seções sem precisar recarregar a página.
 */
function mostrarSecao(idSecao) {
    const secoes = document.querySelectorAll('.secao');
    
    // Esconde todas as seções
    secoes.forEach(s => {
        s.classList.remove('ativa');
        s.classList.add('oculta');
    });

    // Mostra a seção desejada
    const alvo = document.getElementById(idSecao);
    alvo.classList.remove('oculta');
    alvo.classList.add('ativa');

    // Sempre rola a página para o topo ao trocar de tela
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * BANCO DE DADOS DOS MÓDULOS REA
 * Estrutura contendo a introdução didática e o conjunto de 3 vídeos por módulo.
 */
const baseDeAulas = {
    'html': {
        titulo: "Módulo 1: A Estrutura (HTML)",
        intro: "O <strong>HTML</strong> é a base de tudo, o esqueleto e os 'tijolos' que dão forma ao seu site e-commerce. Sem ele, não teríamos onde colocar nossos produtos.",
        aulas: [
            {
                subtitulo: "Aula 1: HTML da Vitrine",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Exemplo: Substituir pelo link real
                texto: "Nesta vídeo-aula, aprendemos a criar os blocos onde os produtos serão exibidos, definindo títulos e imagens."
            },
            {
                subtitulo: "Aula 2: HTML do Formulário",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                texto: "Entenda como estruturar campos de contato e cadastro de clientes para sua loja virtual."
            },
            {
                subtitulo: "Aula 3: HTML do Carrinho",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                texto: "Veja como organizar a lista de itens selecionados para a finalização da compra."
            }
        ]
    },
    'css': {
        titulo: "Módulo 2: O Estilo (CSS)",
        intro: "O <strong>CSS</strong> é a maquiagem e o design, responsável por deixar sua loja atraente, organizada e com aspecto profissional.",
        aulas: [
            {
                subtitulo: "Aula 1: Estilizando a Vitrine",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                texto: "Aplicando cores, sombras e alinhamentos para que seus produtos fiquem irresistíveis ao cliente."
            },
            {
                subtitulo: "Aula 2: Estilizando o Formulário",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                texto: "Aprenda a criar campos modernos e botões de envio chamativos e intuitivos."
            },
            {
                subtitulo: "Aula 3: Estilizando o Carrinho",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                texto: "Como deixar a visualização do total da compra clara e organizada para o usuário."
            }
        ]
    },
    'js': {
        titulo: "Módulo 3: A Interatividade (JavaScript)",
        intro: "O <strong>JavaScript</strong> é o cérebro que processa as ações. É ele quem faz o carrinho somar os valores e validar os dados de compra.",
        aulas: [
            {
                subtitulo: "Aula 1: Lógica da Vitrine",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                texto: "Programando a funcionalidade de clicar no produto e reconhecer a escolha do usuário."
            },
            {
                subtitulo: "Aula 2: Validação de Dados",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                texto: "Garantindo que o cliente preencha as informações corretamente antes de fechar o pedido."
            },
            {
                subtitulo: "Aula 3: Lógica do Carrinho",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                texto: "O vídeo mais importante: calculando valores totais e atualizando o carrinho em tempo real."
            }
        ]
    }
};

/**
 * FUNÇÃO DE GERAÇÃO DA SALA DE AULA
 * Injeta o conteúdo didático e o grid de 3 vídeos dinamicamente.
 */
function carregarAula(moduloEscolhido) {
    const modulo = baseDeAulas[moduloEscolhido];
    const container = document.getElementById('conteudo-aula');

    // 1. Criamos primeiro o topo com a introdução educativa (Tijolos, Maquiagem, etc)
    let layoutHtml = `
        <div class="intro-aula-box">
            <h2>${modulo.titulo}</h2>
            <p>${modulo.intro}</p>
        </div>
        
        <div class="grid-videos">
    `;

    // 2. Criamos o loop para gerar os 3 blocos de vídeo do módulo
    modulo.aulas.forEach(aula => {
        layoutHtml += `
            <div class="video-card-aula">
                <h3>${aula.subtitulo}</h3>
                <div class="video-wrapper">
                    <iframe src="${aula.videoUrl}" title="${aula.subtitulo}" allowfullscreen></iframe>
                </div>
                <p class="texto-educativo-video">${aula.texto}</p>
            </div>
        `;
    });

    // Fechamos a div do grid
    layoutHtml += `</div>`;

    // 3. Injetamos o HTML final no portal
    container.innerHTML = layoutHtml;

    // 4. Exibimos a seção da sala de aula
    mostrarSecao('sala-aula');
}
