// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const cursor = document.querySelector('.cursor');
  const themeSwitch = document.querySelector('.theme-switch');
  const menuMobile = document.querySelector('.menu-mobile');
  const menu = document.querySelector('.menu');
  const sections = document.querySelectorAll('section');
  const skillBars = document.querySelectorAll('.progress');
  const projectCards = document.querySelectorAll('.project-card');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const form = document.getElementById('form');
  const typingElement = document.querySelector('.typing');
  
  // Variables
  const typingTexts = ['Frontend', 'web', 'Full Stack'];
  let typingIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  // Preloader
  setTimeout(() => {
      const preloader = document.createElement('div');
      preloader.className = 'preloader';
      preloader.innerHTML = '<div class="loader"></div>';
      document.body.appendChild(preloader);
      
      window.addEventListener('load', () => {
          setTimeout(() => {
              preloader.classList.add('hidden');
              setTimeout(() => {
                  preloader.remove();
              }, 500);
          }, 1000);
      });
      
      // If load event already fired
      if (document.readyState === 'complete') {
          setTimeout(() => {
              preloader.classList.add('hidden');
              setTimeout(() => {
                  preloader.remove();
              }, 500);
          }, 2000);
      }
  }, 0);
  
  // Custom cursor
  if (window.innerWidth > 768) {
      document.addEventListener('mousemove', (e) => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
      });
      
      document.addEventListener('mousedown', () => {
          cursor.style.width = '15px';
          cursor.style.height = '15px';
          cursor.style.backgroundColor = 'var(--primary-color)';
      });
      
      document.addEventListener('mouseup', () => {
          cursor.style.width = '20px';
          cursor.style.height = '20px';
          cursor.style.backgroundColor = 'transparent';
      });
      
      document.querySelectorAll('a, button, .menu-mobile, .theme-switch').forEach(item => {
          item.addEventListener('mouseenter', () => {
              cursor.style.width = '40px';
              cursor.style.height = '40px';
              cursor.style.borderWidth = '1px';
          });
          
          item.addEventListener('mouseleave', () => {
              cursor.style.width = '20px';
              cursor.style.height = '20px';
              cursor.style.borderWidth = '2px';
          });
      });
  }
  
  // Theme switch
  themeSwitch.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      
      // Save theme preference to localStorage
      const isDarkTheme = !document.body.classList.contains('light-theme');
      localStorage.setItem('darkTheme', isDarkTheme);
  });
  
  // Check saved theme preference
  const savedTheme = localStorage.getItem('darkTheme');
  if (savedTheme === 'false') {
      document.body.classList.add('light-theme');
  }
  
  // Mobile menu toggle
  menuMobile.addEventListener('click', () => {
      menuMobile.classList.toggle('active');
      menu.classList.toggle('active');
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Close mobile menu if open
          menuMobile.classList.remove('active');
          menu.classList.remove('active');
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Update active menu item
              document.querySelectorAll('.menu a').forEach(link => {
                  link.classList.remove('active');
              });
              this.classList.add('active');
          }
      });
  });
  
  // Scroll spy for active menu
  function updateActiveMenu() {
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              document.querySelectorAll('.menu a').forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === '#' + sectionId) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }
  
  // Animate sections on scroll
  function animateSections() {
      sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (sectionTop < windowHeight * 0.8) {
              section.classList.add('in-view');
              
              // Animate skill bars
              if (section.id === 'sobre') {
                  skillBars.forEach(bar => {
                      const value = bar.getAttribute('data-value');
                      bar.style.width = value + '%';
                  });
              }
              
              // Animate project cards
              if (section.id === 'projetos') {
                  projectCards.forEach((card, index) => {
                      card.style.animationDelay = index * 0.1 + 's';
                      card.style.animation = 'fadeInUp 0.6s ease forwards';
                      card.style.opacity = '1';
                      card.style.transform = 'translateY(0)';
                  });
              }
          }
      });
  }
  
  // Typing animation
  function typingAnimation() {
      const currentText = typingTexts[typingIndex];
      
      if (isDeleting) {
          typingElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 50;
      } else {
          typingElement.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 150;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
          isDeleting = true;
          typingSpeed = 1000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          typingIndex = (typingIndex + 1) % typingTexts.length;
          typingSpeed = 500; // Pause before new word
      }
      
      setTimeout(typingAnimation, typingSpeed);
  }
  
  // Project filtering
  filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          // Update active button
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          const filterValue = btn.getAttribute('data-filter');
          
          projectCards.forEach(card => {
              if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                  card.style.display = 'block';
                  setTimeout(() => {
                      card.style.opacity = '1';
                      card.style.transform = 'translateY(0)';
                  }, 100);
              } else {
                  card.style.opacity = '0';
                  card.style.transform = 'translateY(20px)';
                  setTimeout(() => {
                      card.style.display = 'none';
                  }, 300);
              }
          });
      });
  });
  
  // Form submission
  if (form) {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const formData = new FormData(this);
          const formDataObj = {};
          formData.forEach((value, key) => {
              formDataObj[key] = value;
          });
          
          // Simple validation
          let isValid = true;
          const inputs = form.querySelectorAll('input, textarea');
          
          inputs.forEach(input => {
              if (!input.value.trim()) {
                  isValid = false;
                  input.classList.add('error');
              } else {
                  input.classList.remove('error');
              }
          });
          
          if (!isValid) {
              alert('Por favor, preencha todos os campos.');
              return;
          }
          
          // Simulate form submission (Replace with actual submission)
          alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
          form.reset();
      });
  }
  
  // Sticky header
  function updateHeader() {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
          header.style.padding = '15px 0';
          header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      } else {
          header.style.padding = '20px 0';
          header.style.boxShadow = 'none';
      }
  }
  
  // Initial calls
  updateActiveMenu();
  animateSections();
  typingAnimation();
  updateHeader();
  
  // Event listeners for scrolling
  window.addEventListener('scroll', () => {
      updateActiveMenu();
      animateSections();
      updateHeader();
  });
  
  // Window resize handler
  window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
          menuMobile.classList.remove('active');
          menu.classList.remove('active');
      }
  });
});

// baixar pdf
const downloadBtn = document.getElementById('downloadBtn');
        const localFilePath = './src/Reginaldo Nunes.pdf';

        downloadBtn.addEventListener('click', () => {
            // Adiciona estado de carregamento
            downloadBtn.classList.add('downloading');

            // Função para download em diferentes ambientes
            function downloadLocalFile(filePath, fileName) {
                // Para ambiente web/navegador
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    // Para Internet Explorer/Edge
                    fetch(filePath)
                        .then(response => response.blob())
                        .then(blob => {
                            window.navigator.msSaveOrOpenBlob(blob, fileName);
                        });
                } else {
                    // Para outros navegadores modernos
                    const link = document.createElement('a');
                    link.href = filePath;
                    link.download = fileName || 'Reginaldo_Nunes.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }

            // Simula tempo de processamento
            setTimeout(() => {
                try {
                    downloadLocalFile(localFilePath, 'Reginaldo_Nunes.pdf');
                    
                    // Estado de sucesso
                    downloadBtn.classList.remove('downloading');
                    downloadBtn.classList.add('download-success');
                    
                    // Reseta após 2 segundos
                    setTimeout(() => {
                        downloadBtn.classList.remove('download-success');
                    }, 2000);
                } catch (error) {
                    // Estado de erro
                    downloadBtn.classList.remove('downloading');
                    downloadBtn.classList.add('download-error');
                    
                    console.error('Erro no download:', error);
                    
                    // Reseta após 2 segundos
                    setTimeout(() => {
                        downloadBtn.classList.remove('download-error');
                    }, 2000);
                }
            }, 1000);
        });

        