/**
 * Innerlight Main Entry Point
 */

import '../styles/main.css';
import { initAuth, signIn, signUp, signOut, getCurrentUser, isValidEmail, validatePassword } from './auth.js';

// Initialize auth on load
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initYear();
  initMainPage();
});

/**
 * Set current year in footer
 */
function initYear() {
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/**
 * Initialize main page interactions
 */
function initMainPage() {
  const input = document.getElementById('oneLine');
  const btn = document.getElementById('continueBtn');
  
  if (!input || !btn) return;
  
  function go() {
    const text = (input.value || '').trim();
    
    // Store in sessionStorage (more appropriate than localStorage for temporary data)
    sessionStorage.setItem('innerlight_one_line', text);
    
    // Navigate to chat
    window.location.href = '/pages/chat.html';
  }
  
  btn.addEventListener('click', go);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') go();
  });
}

// Export for use in other scripts
export { initYear, initMainPage };
