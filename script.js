// Efeito Parallax nas imagens de fundo
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    if (parallax) {
      const scrollPosition = window.pageYOffset;
      parallax.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
  });
  
  // Validação e Submissão de Formulário
  document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company')?.value || '';
    const message = document.getElementById('message').value;
    const status = document.getElementById('form-status');
  
    if (name === '' || email === '' || message === '') {
      status.textContent = 'Por favor, preencha todos os campos obrigatórios.';
      status.style.color = 'red';
    } else {
      status.textContent = 'Solicitação enviada com sucesso! Entraremos em contato em breve.';
      status.style.color = 'green';
  
      // Limpar os campos após o envio
      document.getElementById('contact-form').reset();
    }
  });
  
  // Animações de entrada de seções
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.75) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  });
  
  // Função de Navegação Suave (Scroll)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
  
      const targetID = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetID);
  
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Ajusta para o header fixo
        behavior: 'smooth' // Efeito de rolagem suave
      });
    });
  });
  
  // Animação de fundo de botão ao passar o mouse (Hover)
  const buttons = document.querySelectorAll('.btn-main');
  buttons.forEach((button) => {
    button.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
    });
  });
  