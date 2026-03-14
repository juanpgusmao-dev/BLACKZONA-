/**
 * BlackZona - Main JavaScript
 * Centralização de lógica, animações e interatividade premium
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialização do AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // 2. Header Sticky com Glassmorphism
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // 3. Menu Mobile Universal
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const body = document.body;

    if (mobileMenuBtn && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        
        // Fechar menu ao clicar em links
        const navLinks = mobileOverlay.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileOverlay.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    function toggleMenu() {
        mobileOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Animação do ícone burguer (se existir)
        const icon = mobileMenuBtn.querySelector('span');
        if (icon) {
            if (mobileOverlay.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        }
    }

    // 4. Contador Animado (IntersectionObserver)
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    let count = 0;
                    const duration = 2000; // 2 segundos
                    const increment = target / (duration / 16); // 60fps

                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count) + suffix;
                            setTimeout(updateCount, 16);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    updateCount();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // 5. Linha Dourada Animada (IntersectionObserver)
    const goldLines = document.querySelectorAll('.gold-line');
    if (goldLines.length > 0) {
        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    lineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 1.0 });

        goldLines.forEach(line => lineObserver.observe(line));
    }

    // 6. Cursor Personalizado Dourado (Desktop only)
    if (!('ontouchstart' in window) && window.innerWidth > 1024) {
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            const speed = 0.15; // Suavidade do movimento (lerp)

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                cursorX += (mouseX - cursorX) * speed;
                cursorY += (mouseY - cursorY) * speed;
                
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                
                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            // Interação com elementos clicáveis
            const clickables = document.querySelectorAll('a, button, .clickable');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('cursor-hover');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('cursor-hover');
                });
            });
        }
    } else {
        // Remover elemento do cursor em dispositivos touch
        const cursor = document.getElementById('custom-cursor');
        if (cursor) cursor.style.display = 'none';
    }

    // 7. Efeito Ripple em Botões
    document.addEventListener('click', (e) => {
        const rippleTargets = ['BUTTON', 'A'];
        let target = e.target;
        
        while (target && !rippleTargets.includes(target.tagName) && !target.classList.contains('ripple-btn')) {
            target = target.parentElement;
        }

        if (target && (target.tagName === 'BUTTON' || target.getAttribute('href') || target.classList.contains('ripple-btn'))) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            target.appendChild(ripple);

            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Parallax Hero
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const speed = 0.4;
        heroBg.style.backgroundPositionY = `calc(50% + ${scrollY * speed}px)`;
    }, { passive: true });
}
