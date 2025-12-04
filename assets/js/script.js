// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  console.log('Clicou');
  navLinks.classList.toggle('active');
  console.log(navLinks.classList);
});

// Scroll suave para todos os links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Fecha menu mobile
    navLinks.classList.remove('active');
  });
});

// Formulário de contato
const form = document.getElementById('form-contato');
const sucessoMsg = document.getElementById('mensagem-sucesso');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        sucessoMsg.style.display = 'block';
        sucessoMsg.textContent = '✅ Mensagem enviada com sucesso!';
        form.reset();
        setTimeout(() => {
          sucessoMsg.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      sucessoMsg.style.display = 'block';
      sucessoMsg.textContent = '❌ Erro ao enviar. Tente novamente.';
      sucessoMsg.style.color = '#ff6ec4';
      setTimeout(() => {
        sucessoMsg.style.display = 'none';
      }, 5000);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Botão voltar ao topo
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// Animações ao scroll (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observa todos os cards
document.querySelectorAll('.servico-card, .projeto-card, .skill-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

function openWhatsApp() {
    window.open('https://wa.me/5521964863905?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20seus%20serviços.', '_blank');
}

function openInstagram() {
  window.open('https://www.instagram.com/devtatianeoliveira/', '_blank');
}