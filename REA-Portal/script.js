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
