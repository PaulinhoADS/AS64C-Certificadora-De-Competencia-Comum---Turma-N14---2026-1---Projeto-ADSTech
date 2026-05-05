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
let baseDeAulas; 

(async()=>{
    baseDeAulas =  await (await fetch('./aulas.json')).json();
})();

/**
 * FUNÇÃO ATUALIZADA: Agora exibe a lista de aulas para o usuário escolher
 */
function carregarAula(moduloEscolhido) {
    const dados = baseDeAulas[moduloEscolhido];
    const containerConteudo = document.getElementById('conteudo-aula');

    // Passamos o 'index' para saber exatamente qual vídeo da lista foi clicado
    let htmlListaVideos = '';

        dados.aulas.forEach((aula, index) => {
            // 1. O link vem assim: https://www.youtube.com/embed/wcW8SvbnJYE
            // 2. O split recorta e pega só o ID: wcW8SvbnJYE
            const videoId = aula.url.split('/embed/')[1].split('?')[0]; 
            
            // 3. Montamos a URL oficial da thumbnail em alta qualidade (hqdefault)
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            htmlListaVideos += `
                <div class="video-box" onclick="assistirVideo('${moduloEscolhido}', ${index})" style="cursor: pointer; transition: transform 0.2s;">
                    <h3>${aula.titulo}</h3>
                    
                    <!-- Nova estrutura da capa do vídeo -->
                    <div style="position: relative; margin-bottom: 15px;">
                        <img src="${thumbUrl}" alt="Capa do vídeo ${aula.titulo}" style="width: 100%; border-radius: 8px; object-fit: cover; aspect-ratio: 16/9;">
                        
                        <!-- Ícone de Play centralizado por cima da imagem -->
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 0, 0, 0.8); border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5V19L19 12L8 5Z" />
                            </svg>
                        </div>
                    </div>
                    
                    <p class="texto-educativo">${aula.desc}</p>
                </div>
            `;
        });

    containerConteudo.innerHTML = `
        <h2>${dados.titulo}</h2>
        <div class="intro-aula">
            ${dados.intro}
        </div>
        <div class="grid-videos">
            ${htmlListaVideos}
        </div>
    `;
    
    mostrarSecao('sala-aula');
}

/**
 * NOVA FUNÇÃO: Renderiza o vídeo maximizado e a descrição estilo YouTube
 */
function assistirVideo(modulo, indexVideo) {
    const aula = baseDeAulas[modulo].aulas[indexVideo];
    const playerContainer = document.getElementById('player-container');

    playerContainer.innerHTML = `
        <div class="video-maximized">
            <div class="video-wrapper" style="margin-bottom: 0;">
                <iframe src="${aula.url}?autoplay=1" title="${aula.titulo}" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>
            
            <div class="info-video" style="padding: 20px 0;">
                <h2 style="color: var(--cor-destaque-titulos); font-size: 2rem;">${aula.titulo}</h2>
                <div class="intro-aula" style="margin-top: 20px;">
                    <p>${aula.desc}</p>
                </div>
            </div>
        </div>
    `;

    // Muda a página para exibir o player
    mostrarSecao('tela-player');
}
