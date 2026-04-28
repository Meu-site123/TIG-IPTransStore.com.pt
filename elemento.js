document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Scroll Suave para links da Navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Animação de Números (Contadores) na seção Sobre
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText;
            const speed = 2000 / target; // Tempo total 2s

            if (count < target) {
                stat.innerText = Math.ceil(count + 1);
                setTimeout(animateStats, speed);
            } else {
                stat.innerText = target + (target === 100 ? 'k+' : '+');
            }
        });
    };

    // Trigger da animação quando chegar na seção
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aboutSection = document.querySelector('.about-section');
    if(aboutSection) observer.observe(aboutSection);

    // 3. Simulação de Busca
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.search-input');
    
    if(searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value;
            if(query) {
                alert(`Buscando por: ${query}... (Funcionalidade de backend aqui)`);
            }
        });
    }

    // 4. Efeito de Adicionar ao Carrinho
    const cartButtons = document.querySelectorAll('.btn-add-cart');
    cartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = '#4caf50';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i>';
                this.style.background = '';
            }, 2000);
        });
    });

    // 5. Troca de cor da Navbar no Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar-custom');
        if (window.scrollY > 50) {
            navbar.style.padding = "0.2rem 0";
            navbar.style.background = "rgba(12, 180, 247, 0.95)";
        } else {
            navbar.style.padding = "0.5rem 0";
            navbar.style.background = "linear-gradient(135deg, var(--primary-color) 0%, #0a9fd4 100%)";
        }
    });
});

// Validação simples de força de senha
const passInput = document.getElementById('passwordInput');
if (passInput) {
    passInput.addEventListener('input', function() {
        const bar = document.querySelector('.strength-bar');
        const val = this.value;
        if (val.length > 8) {
            bar.style.width = "100%";
            bar.style.background = "#4caf50"; // Sucesso
        } else if (val.length > 5) {
            bar.style.width = "66%";
            bar.style.background = "#ff9800"; // Aviso
        } else {
            bar.style.width = "33%";
            bar.style.background = "#f44336"; // Erro
        }
    });
}

// Feedback de envio do formulário de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        this.innerHTML = `
            <div class="form-feedback">
                <i class="fas fa-check-circle fa-2x"></i>
                <div class="feedback-content">
                    <h3>Mensagem Enviada!</h3>
                    <p>Obrigado pelo contacto. Responderemos em breve.</p>
                </div>
            </div>
        `;
    });
}