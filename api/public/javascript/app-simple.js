// Simple, reliable JavaScript for Social App
console.log('🚀 Social App JavaScript loaded');

// Theme Management - Simple and reliable
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('light-theme', savedTheme === 'light');
  
  // Update theme toggle button if it exists
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light-theme');
  const newTheme = isLight ? 'dark' : 'light';
  
  document.body.classList.toggle('light-theme', newTheme === 'light');
  localStorage.setItem('theme', newTheme);
  
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = newTheme === 'light' ? '☀️' : '🌙';
  }
  
  console.log(`🎨 Theme changed to: ${newTheme}`);
}

// Form Enhancement - Non-intrusive
function enhanceForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Add loading state on submit
    form.addEventListener('submit', function(e) {
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        console.log('📝 Form submitted, showing loading state');
      }
    });
    
    // Add basic validation feedback
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
          this.style.borderColor = '#f85149';
        } else {
          this.style.borderColor = '';
        }
      });
      
      input.addEventListener('input', function() {
        this.style.borderColor = '';
      });
    });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('📱 Initializing Social App...');
  
  // Initialize theme
  initTheme();
  
  // Enhance forms
  enhanceForms();
  
  console.log('✅ Social App initialized successfully');
});

// Make functions globally available
window.toggleTheme = toggleTheme;