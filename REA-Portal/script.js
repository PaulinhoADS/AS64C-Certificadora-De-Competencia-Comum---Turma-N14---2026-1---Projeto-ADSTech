// Função simples para esconder todas as seções e mostrar apenas a desejada
function mostrarSecao(idSecao) {
    // 1. Busca todas as seções do site
    const secoes = document.querySelectorAll('.secao');
    
    // 2. Remove a classe 'ativa' e adiciona 'oculta' em todas elas
    secoes.forEach(secao => {
        secao.classList.remove('ativa');
        secao.classList.add('oculta');
    });

    // 3. Pega a seção específica que o usuário clicou e a exibe
    const secaoDesejada = document.getElementById(idSecao);
    secaoDesejada.classList.remove('oculta');
    secaoDesejada.classList.add('ativa');
}

// Objeto que funciona como um "Banco de Dados" simples para os nossos módulos
const baseDeAulas = {
    'html': {
        titulo: "Módulo 1: Estruturando com HTML",
        texto: "O HTML é o esqueleto da nossa loja. É aqui que dizemos onde fica a imagem do produto, o título e o botão de comprar. Assista ao vídeo abaixo para darmos os primeiros passos!",
        // Link de exemplo do YouTube. Basta trocar o final (após o /embed/) depois que gravarem.
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
    },
    'css': {
        titulo: "Módulo 2: Estilizando com CSS",
        texto: "Ninguém gosta de uma loja feia, certo? O CSS é a roupa do nosso site. Vamos aprender a colocar cores, alinhar os produtos e deixar tudo com cara de profissional.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    'js': {
        titulo: "Módulo 3: Interatividade com JavaScript",
        texto: "O JavaScript é o cérebro da operação. Com ele, quando o cliente clica em 'Comprar', nós calculamos o frete, mostramos mensagens e damos vida à página.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
};

// Função para montar a tela de aula baseada no card clicado
function carregarAula(moduloEscolhido) {
    // Busca os dados do módulo no nosso objeto acima
    const dados = baseDeAulas[moduloEscolhido];
    
    // Encontra a div onde vamos injetar o conteúdo
    const containerConteudo = document.getElementById('conteudo-aula');
    
    // Injeta o HTML formatado com os dados específicos do módulo
    containerConteudo.innerHTML = `
        <h2>${dados.titulo}</h2>
        <p style="margin-top: 15px; font-size: 1.1rem; line-height: 1.5;">${dados.texto}</p>
        
        <div class="video-container">
            <iframe src="${dados.videoUrl}" allowfullscreen></iframe>
        </div>
        
        <p><strong>Dica de ouro:</strong> Digite os códigos junto com o vídeo para fixar o aprendizado!</p>
    `;
    
    // Depois de preparar o conteúdo, muda a tela para a "sala de aula"
    mostrarSecao('sala-aula');
}