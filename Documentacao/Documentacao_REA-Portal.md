# 🖥️ Documentação Técnica do Portal REA - ADSTech

## 1. Objetivo da Tarefa
O objetivo desta etapa foi a implementação final da plataforma web (Portal REA) do projeto ADSTech. A interface foi projetada para atuar como um Recurso Educacional Aberto, oferecendo uma trilha de aprendizagem lúdica e simplificada sobre o desenvolvimento de e-commerce para o público leigo, integrando conhecimentos técnicos de Front-End e metodologias ágeis.

## 2. Arquitetura e Tecnologias Escolhidas
Mantendo o compromisso com a performance e a semântica acadêmica, utilizamos a abordagem **Single Page Application (SPA) "Vanilla"**:

* **HTML5 Semântico:** Estruturação organizada em seções independentes, garantindo acessibilidade e clareza no código.
* **CSS3 Moderno:** Uso de **CSS Grid** e **Flexbox** para responsividade. Implementação de um **Dark Theme** profissional, utilizando variáveis nativas para manter a identidade visual (Verde Neon e tons de grafite).
* **JavaScript (DOM Manipulation):** Lógica personalizada para alternância de telas sem carregamento de página e injeção dinâmica de conteúdo educacional (vídeos e textos didáticos).

## 3. Estrutura de Conteúdo e Módulos
O portal foi dividido em módulos progressivos para facilitar a absorção do conhecimento:
1.  **Módulo 1 (HTML):** Foco na estrutura e esqueleto da loja virtual.
2.  **Módulo 2 (CSS):** Foco na estilização, identidade visual e layout.
3.  **Módulo 3 (JavaScript):** Foco na interatividade e lógica funcional do e-commerce.

## 4. Evolução e Refinamentos Implementados

### 4.1 Interface Minimalista e Navegação
Para evitar a sobrecarga de informações, as páginas de **Início** e **Módulos** foram simplificadas, exibindo apenas um rodapé global com direitos autorais. A navegação utiliza transições suaves para melhorar a experiência do usuário (UX).

### 4.2 Centralização Institucional (Página Sobre)
A antiga seção de jornada foi expandida para a página **"Sobre"**, que agora funciona como o fechamento do mini-curso. Ela contém:
* **Resumo Educacional:** Um texto conclusivo que conecta os conceitos de Front-End à prática de mercado.
* **Timeline Acadêmica Detalhada:** Um mapeamento das disciplinas cursadas ao longo dos 4 semestres (Lógica, IHC, Banco de Dados, POO, Redes, Gestão de Projetos e Web), contextualizando a base científica do projeto.
* **Espaço da Equipe:** Uma seção dedicada aos desenvolvedores, com espaços reservados para fotos de perfil e links para redes profissionais (LinkedIn/GitHub/Lattes).

### 4.3 Integração de Vídeo (YouTube Embed)
Implementamos um sistema de carregamento dinâmico de vídeos utilizando a API de incorporação do YouTube. O contêiner de vídeo é 100% responsivo, garantindo que o aluno possa assistir às aulas em qualquer dispositivo.

## 5. Fluxo de Funcionamento
O usuário inicia na **Hero Section**, onde é apresentado ao conceito de Front-End. Ao avançar para os **Módulos**, o JavaScript gerencia a troca de conteúdo na "Sala de Aula", buscando informações em um objeto de dados local (`baseDeAulas`). Por fim, na seção **Sobre**, o usuário compreende a trajetória acadêmica da equipe e os objetivos extensionistas do projeto ADSTech no contexto da universidade.
