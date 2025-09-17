// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeToggle();
    this.bindEvents();
  }

  applyTheme(theme) {
    // Instant theme transition - no smooth animations
    document.documentElement.style.transition = 'none';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.updateToggleButton();
  }

  createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = `
      <span class="theme-icon">${this.currentTheme === 'light' ? '🌙' : '☀️'}</span>
    `;
    toggle.addEventListener('click', () => this.toggleTheme());
    document.body.appendChild(toggle);
    this.toggleButton = toggle;
  }

  updateToggleButton() {
    if (this.toggleButton) {
      this.toggleButton.innerHTML = `
        <span class="theme-icon">${this.currentTheme === 'light' ? '🌙' : '☀️'}</span>
      `;
    }
  }

  bindEvents() {
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addListener((e) => {
        if (!localStorage.getItem('theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
          this.updateToggleButton();
        }
      });
    }
  }
}

// Form Enhancement
class FormEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceForms();
    this.enhanceFormInputs();
    this.addLoadingStates();
    this.addValidation();
  }

  enhanceForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.classList.add('fade-in');
      
      // Add form container class if not present
      if (!form.classList.contains('form-container')) {
        form.classList.add('form-container');
      }

      // Enhance inputs
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        if (!input.classList.contains('form-input') && !input.classList.contains('form-textarea')) {
          input.classList.add(input.tagName.toLowerCase() === 'textarea' ? 'form-textarea' : 'form-input');
        }
      });

      // Enhance labels
      const labels = form.querySelectorAll('label');
      labels.forEach(label => {
        if (!label.classList.contains('form-label')) {
          label.classList.add('form-label');
        }
      });

      // Enhance buttons
      const buttons = form.querySelectorAll('button, input[type="submit"]');
      buttons.forEach(button => {
        if (!button.classList.contains('btn')) {
          button.classList.add('btn', 'btn-primary');
        }
      });
    });
  }

  enhanceFormInputs() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
      // Sharp focus effects - no smooth transitions
      input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--accent-primary)';
        input.style.backgroundColor = 'var(--bg-secondary)';
        input.style.fontWeight = '600';
      });
      
      input.addEventListener('blur', () => {
        input.style.borderColor = 'var(--border-color)';
        input.style.backgroundColor = 'var(--bg-primary)';
        input.style.fontWeight = '500';
      });
      
      // Immediate input feedback
      input.addEventListener('input', () => {
        input.style.borderColor = 'var(--accent-primary)';
        input.style.fontWeight = '600';
      });
    });
  }

  addLoadingStates() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
          submitBtn.innerHTML = '⚡ PROCESSING...';
          submitBtn.disabled = true;
          submitBtn.style.backgroundColor = 'var(--accent-warning)';
          submitBtn.style.borderColor = 'var(--accent-warning)';
          submitBtn.style.fontWeight = '800';
        }
      });
    });
  }

  addValidation() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearValidation(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    // Remove existing validation
    this.clearValidation(field);

    // Basic validation rules
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'This field is required';
    } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = 'Please enter a valid email address';
    } else if (field.type === 'password' && value && value.length < 6) {
      isValid = false;
      message = 'Password must be at least 6 characters';
    }

    if (!isValid) {
      this.showValidationError(field, message);
    }

    return isValid;
  }

  clearValidation(field) {
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.validation-error');
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  showValidationError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--accent-danger)';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    field.parentNode.appendChild(errorDiv);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Post Enhancement
class PostEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.enhancePosts();
    this.addPostAnimations();
    this.addLikeAnimation();
    this.addPostAnimation();
  }

  addPostAnimations() {
    const posts = document.querySelectorAll('.post-item');
    
    posts.forEach((post, index) => {
      // Quick stagger animation
      post.style.animationDelay = `${index * 0.05}s`;
      
      // Sharp hover effects - no smooth transitions
      post.addEventListener('mouseenter', () => {
        post.style.borderColor = 'var(--accent-primary)';
        post.style.boxShadow = 'var(--shadow-md)';
      });
      
      post.addEventListener('mouseleave', () => {
        post.style.borderColor = 'var(--border-color)';
        post.style.boxShadow = 'var(--shadow-sm)';
      });
    });
    
    // Immediate like button feedback
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Flash animation for immediate feedback
        btn.style.animation = 'flash 0.2s ease-in-out';
        setTimeout(() => {
          btn.style.animation = '';
          // Navigate to like URL
          window.location.href = btn.href;
        }, 200);
      });
    });
  }

  enhancePosts() {
    const posts = document.querySelectorAll('.post-item');
    posts.forEach((post, index) => {
      post.style.animationDelay = `${index * 0.1}s`;
      post.classList.add('slide-in');
    });
  }

  addLikeAnimation() {
    const likeButtons = document.querySelectorAll('.like-btn, a[href*="/like/"]');
    likeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }

  addPostAnimation() {
    const postForm = document.querySelector('form[action="/post"]');
    if (postForm) {
      postForm.addEventListener('submit', () => {
        const textarea = postForm.querySelector('textarea');
        if (textarea) {
          textarea.style.opacity = '0.6';
        }
      });
    }
  }
}

// Navigation Enhancement
class NavigationEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceNavigation();
    this.addActiveStates();
  }

  enhanceNavigation() {
    // Only create navigation on authenticated pages (not login/signup)
    const pagePath = window.location.pathname;
    const authPages = ['/', '/login'];
    
    if (authPages.includes(pagePath)) {
      return; // Don't create navigation on login/signup pages
    }
    
    // Create navigation if it doesn't exist
    const existingNav = document.querySelector('.nav-container');
    if (!existingNav) {
      this.createNavigation();
    }
    
    const navLinks = document.querySelectorAll('.nav-links .btn');
    
    navLinks.forEach(link => {
      // Sharp, immediate hover effects
      link.addEventListener('mouseenter', () => {
        if (!link.classList.contains('btn-primary')) {
          link.style.borderColor = 'var(--accent-primary)';
          link.style.color = 'var(--accent-primary)';
          link.style.fontWeight = '800';
        }
      });
      
      link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('btn-primary')) {
          link.style.borderColor = '';
          link.style.color = '';
          link.style.fontWeight = '700';
        }
      });
    });
    
    // Bold active page highlighting
    navLinks.forEach(link => {
      if (link.getAttribute('href') === pagePath) {
        link.style.background = 'var(--accent-primary)';
        link.style.color = 'white';
        link.style.borderColor = 'var(--accent-primary)';
        link.style.fontWeight = '800';
      }
    });
  }

  createNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'nav-container';
    
    const navContent = document.createElement('div');
    navContent.className = 'nav-content';
    
    const logo = document.createElement('div');
    logo.innerHTML = '<h3 style="color: var(--text-primary); margin: 0;">📱 Social App</h3>';
    
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    // Add navigation links based on current page
    const currentPath = window.location.pathname;
    const links = [
      { href: '/profile', text: '👤 Profile', show: currentPath !== '/profile' },
      { href: '/post', text: '📝 Posts', show: currentPath !== '/post' },
      { href: '/profile/upload', text: '📷 Upload', show: currentPath !== '/profile/upload' },
      { href: '/logout', text: '🚪 Logout', show: true }
    ];
    
    links.forEach(link => {
      if (link.show) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.className = 'btn btn-outline';
        a.style.textDecoration = 'none';
        navLinks.appendChild(a);
      }
    });
    
    navContent.appendChild(logo);
    navContent.appendChild(navLinks);
    nav.appendChild(navContent);
    
    // Insert navigation at the top of the body
    document.body.insertBefore(nav, document.body.firstChild);
  }

  addActiveStates() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      // Utility function for instant scrolling
      link.scrollTo = function(element) {
        element.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      };
      
      link.addEventListener('mouseenter', () => {
        link.style.fontWeight = '800';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.fontWeight = '';
      });
    });
  }
}

// Utility Functions
class Utils {
  static addFadeInAnimation() {
    const elements = document.querySelectorAll('.card, .form-container, .profile-container');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add('fade-in');
    });
  }

  static enhanceImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      
      // If image is already loaded
      if (img.complete) {
        img.style.opacity = '1';
      }
    });
  }

  static addScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    });

    const elements = document.querySelectorAll('.post-item, .card');
    elements.forEach(el => observer.observe(el));
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new FormEnhancer();
  new PostEnhancer();
  new NavigationEnhancer();
  
  Utils.addFadeInAnimation();
  Utils.enhanceImages();
  Utils.addScrollEffects();
  
  console.log('🎉 App initialized successfully!');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    FormEnhancer,
    PostEnhancer,
    NavigationEnhancer,
    Utils
  };
}