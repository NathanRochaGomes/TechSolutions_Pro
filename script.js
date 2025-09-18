// Efeito Parallax nas imagens de fundo
window.addEventListener('scroll', function() {
  const parallax = document.querySelector('.parallax');
  if (parallax) {
    const scrollPosition = window.pageYOffset;
    parallax.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }
  
  // Efeito no header ao fazer scroll
  const header = document.querySelector('header');
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Validação e Submissão de Formulário com melhor UX
document.getElementById('contact-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company')?.value.trim() || '';
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');
  const submitButton = this.querySelector('button[type="submit"]');
  
  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Reset classes
  status.className = '';
  
  if (name === '' || email === '' || message === '') {
    status.textContent = 'Por favor, preencha todos os campos obrigatórios.';
    status.className = 'error';
    return;
  }
  
  if (!emailRegex.test(email)) {
    status.textContent = 'Por favor, insira um e-mail válido.';
    status.className = 'error';
    return;
  }
  
  // Simular envio
  submitButton.textContent = 'Enviando...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    status.textContent = 'Solicitação enviada com sucesso! Entraremos em contato em breve.';
    status.className = 'success';
    
    // Limpar os campos após o envio
    document.getElementById('contact-form').reset();
    
    // Restaurar botão
    submitButton.textContent = 'Enviar Solicitação';
    submitButton.disabled = false;
  }, 1500);
});

// Animações de entrada de seções com Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar todas as seções
document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});

// Função de Navegação Suave (Scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);

    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Animação de botões com efeito ripple
document.querySelectorAll('.btn-main').forEach((button) => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Adicionar estilos para o efeito ripple
const rippleStyles = `
  .btn-main {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// Adicionar estilos ao head
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Lazy loading para imagens (se houver)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Prevenção de FOUC (Flash of Unstyled Content)
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');
});

// Melhor performance para scroll
let ticking = false;

function updateScrollEffects() {
  const scrollPosition = window.pageYOffset;
  
  // Parallax effect
  const parallax = document.querySelector('.parallax');
  if (parallax) {
    parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
  
  // Header effect
  const header = document.querySelector('header');
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  ticking = false;
}

window.addEventListener('scroll', function() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});

// Adicionar classe para animações após carregamento
window.addEventListener('load', function() {
  document.body.classList.add('page-loaded');
});