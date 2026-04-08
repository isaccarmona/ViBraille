// Efeito do cabeçalho ao rolar
// Adiciona um listener ao evento de rolagem da janela para lidar com o estilo do cabeçalho e visibilidade do botão voltar ao topo
window.addEventListener('scroll', () => {
    // Obtém os elementos do cabeçalho e botão voltar ao topo
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');

    // Se rolou mais de 50px, adiciona classes para estilização
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        // Caso contrário, remove as classes
        header.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});

// Animação de cards e elementos quando aparecem na viewport usando IntersectionObserver
// Seleciona todos os elementos que devem animar ao rolar
const animateOnScroll = document.querySelectorAll('.card, .team-member, .mission-card');

// Opções para o IntersectionObserver: dispara quando 10% visível, com margem
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Cria o observador que adiciona a classe 'animated' quando o elemento entra na viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observa cada elemento selecionado
animateOnScroll.forEach(element => observer.observe(element));

// Menu móvel
// Seleciona o botão do menu móvel, botão fechar, menu, overlay e links
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const mobileLinks = document.querySelectorAll('.mobile-links a');

// Quando o botão do menu móvel é clicado, mostra o menu e overlay, esconde o scroll do corpo
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Função para fechar o menu: remove classes ativas e restaura o scroll
const closeMenu = () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
};

// Adiciona listeners de clique ao botão fechar e overlay para fechar o menu
closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Para cada link móvel, fecha o menu quando clicado
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// Rolagem suave para links internos
// Para cada link âncora que começa com # (links internos)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        // Previne o comportamento padrão de pulo
        e.preventDefault();

        // Obtém o ID alvo do href
        const targetId = anchor.getAttribute('href');
        // Se for apenas #, não faz nada
        if (targetId === '#') return;

        // Encontra o elemento alvo
        const targetElement = document.querySelector(targetId);
        // Obtém a altura do cabeçalho para offset, padrão 0 se não encontrado
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;

        // Rola suavemente para o alvo, considerando a altura do cabeçalho
        window.scrollTo({
            top: targetElement?.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});