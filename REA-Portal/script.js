/**
 * LÓGICA DE NAVEGAÇÃO SPA
 */
function mostrarSecao(idSecao) {
    const secoes = document.querySelectorAll('.secao');
    secoes.forEach(secao => {
        secao.classList.remove('ativa');
        secao.classList.add('oculta');
    });

    const secaoDesejada = document.getElementById(idSecao);
    secaoDesejada.classList.remove('oculta');
    secaoDesejada.classList.add('ativa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * BANCO DE DADOS DOS MÓDULOS 
 * Nota: Lembre-se que links do YouTube precisam ter o formato "/embed/ID_DO_VIDEO"
 */
const baseDeAulas = {
    'html': {
        titulo: "Módulo 1: O Esqueleto (HTML)",
        texto: `<p>Imagine que você está construindo uma casa. O <strong>HTML</strong> são os tijolos...</p>`,
        videoUrl: "https://www.youtube.com/embed/ZnZqB5Z75zI"
    },
    'css': {
        titulo: "Módulo 2: A Maquiagem (CSS)",
        texto: `<p>Se o HTML é a parede de tijolos, o <strong>CSS</strong> é a tinta...</p>`,
        videoUrl: "https://www.youtube.com/embed/HX43QiFApWc"
    },
    'js': {
        titulo: "Módulo 3: O Cérebro (JavaScript)",
        texto: `<p>Nossa casa já está construída, mas as luzes não acendem sozinhas... É aí que entra o <strong>JavaScript</strong>.</p>`,
        videoUrl: "https://www.youtube.com/embed/wcW8SvbnJYE"
    }
};

function carregarAula(moduloEscolhido) {
    const dados = baseDeAulas[moduloEscolhido];
    const containerConteudo = document.getElementById('conteudo-aula');
    
    containerConteudo.innerHTML = `
        <h2>${dados.titulo}</h2>
        <div class="video-wrapper">
            <iframe src="${dados.videoUrl}" title="Vídeo Aula" allowfullscreen></iframe>
        </div>
        <div class="texto-aula">${dados.texto}</div>
        <div style="background: #29292e; padding: 15px; border-left: 4px solid #00E676; border-radius: 4px;">
            <strong>Dica Prática:</strong> Pause o vídeo sempre que precisar e digite o código!
        </div>
    `;
    mostrarSecao('sala-aula');
}
