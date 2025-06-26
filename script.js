// ===========================================================
// FUNÇÃO PARA ALTERAR TEXTO BASEADO EM data-en e data-pt
// ===========================================================
function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-en][data-pt]');
  elements.forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-pt');
    } else if (el.tagName === 'A') {
      el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-pt');
    } else {
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-pt');
    }
  });
}


// ===========================================================
// FUNÇÃO PARA EXIBIR/ESCONDER .en e .pt NA LISTA DE SOFT SKILLS
// ===========================================================
function toggleSoftSkills(lang) {
  const ptElements = document.querySelectorAll('.soft-skills .pt');
  const enElements = document.querySelectorAll('.soft-skills .en');

  ptElements.forEach(el => {
    el.style.display = lang === 'pt' ? 'inline' : 'none';
  });
  enElements.forEach(el => {
    el.style.display = lang === 'en' ? 'inline' : 'none';
  });
}

// ===========================================================
// DOMContentLoaded
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicialização do idioma
  const userLang = navigator.language || navigator.userLanguage;
  const startingLang = userLang.startsWith('pt') ? 'pt' : 'en';
  setLanguage(startingLang);
  toggleSoftSkills(startingLang);
  document.querySelector('html').lang = startingLang;

  // Botão de troca de linguagem
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = startingLang === 'pt' ? 'EN' : 'PT';
    toggleBtn.addEventListener('click', () => {
      const currentLang = document.querySelector('html').lang || 'pt';
      const newLang = currentLang === 'pt' ? 'en' : 'pt';
      setLanguage(newLang);
      toggleSoftSkills(newLang);
      document.querySelector('html').lang = newLang;

      toggleBtn.textContent = newLang === 'pt' ? 'EN' : 'PT';
    });
  }

  // Menu e Navbar
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    };
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
      });
    });
  }

  // ===========================================================
  // FORMULÁRIO DE CONTATO
  // ===========================================================
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const submitButton = form.querySelector("input[type='submit']");
      submitButton.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });
        if (response.ok) {
          formMessage.textContent = "✅ Sua mensagem foi enviada com sucesso! Obrigado.";
          form.reset();
        } else {
          formMessage.textContent = "❌ Houve um erro no envio. Por favor, tente novamente.";
        }
      } catch (error) {
        formMessage.textContent = "❌ Não foi possível enviar sua mensagem. Verifique sua conexão.";
        console.error(error);
      } finally {
        formMessage.style.display = "block";
        submitButton.disabled = false;

        setTimeout(() => {
          formMessage.textContent = ""; 
          formMessage.style.display = "none"; 
        }, 5000);
      }
    });
  }
});
