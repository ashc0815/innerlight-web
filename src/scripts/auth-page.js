/**
 * Innerlight Auth Page Script
 */

import '../styles/main.css';
import { initAuth, signIn, signUp, isValidEmail, validatePassword } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initYear();
  initAuthForm();
});

function initYear() {
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

function initAuthForm() {
  const form = document.getElementById('authForm');
  const formTitle = document.getElementById('formTitle');
  const formSubtitle = document.getElementById('formSubtitle');
  const submitButton = document.getElementById('submitButton');
  const toggleText = document.getElementById('toggleText');
  const toggleLink = document.getElementById('toggleLink');
  const formMessage = document.getElementById('formMessage');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (!form) return;
  
  let isLoginMode = false;
  
  // Toggle between login and register
  toggleLink?.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    updateFormMode();
    clearMessage();
  });
  
  function updateFormMode() {
    if (isLoginMode) {
      if (formTitle) formTitle.textContent = 'Welcome Back';
      if (formSubtitle) formSubtitle.textContent = 'Sign in to continue your journey';
      if (submitButton) submitButton.textContent = 'Sign In';
      if (toggleText) toggleText.textContent = "Don't have an account? ";
      if (toggleLink) toggleLink.textContent = 'Register';
      passwordInput?.setAttribute('autocomplete', 'current-password');
    } else {
      if (formTitle) formTitle.textContent = 'Create Account';
      if (formSubtitle) formSubtitle.textContent = 'Begin your journey with Innerlight';
      if (submitButton) submitButton.textContent = 'Register';
      if (toggleText) toggleText.textContent = 'Already have an account? ';
      if (toggleLink) toggleLink.textContent = 'Sign In';
      passwordInput?.setAttribute('autocomplete', 'new-password');
    }
  }
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput?.value.trim() || '';
    const password = passwordInput?.value || '';
    
    // Validation
    if (!email || !password) {
      showMessage('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address', 'error');
      return;
    }
    
    if (!isLoginMode) {
      const passwordCheck = validatePassword(password);
      if (!passwordCheck.valid) {
        showMessage(passwordCheck.message, 'error');
        return;
      }
    }
    
    // Disable button during request
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = isLoginMode ? 'Signing in...' : 'Creating account...';
    }
    
    try {
      if (isLoginMode) {
        const { data, error } = await signIn(email, password);
        
        if (error) {
          showMessage(error.message || 'Login failed', 'error');
        } else {
          showMessage('Login successful! Redirecting...', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      } else {
        const { data, error } = await signUp(email, password);
        
        if (error) {
          showMessage(error.message || 'Registration failed', 'error');
        } else {
          showMessage('Account created! Check your email to verify.', 'success');
        }
      }
    } catch (err) {
      showMessage('An unexpected error occurred', 'error');
      console.error(err);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = isLoginMode ? 'Sign In' : 'Register';
      }
    }
  });
  
  function showMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
  }
  
  function clearMessage() {
    if (!formMessage) return;
    formMessage.style.display = 'none';
    formMessage.textContent = '';
  }
}
