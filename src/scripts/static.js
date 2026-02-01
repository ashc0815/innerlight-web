/**
 * Innerlight Static Pages Script
 */

import '../styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  initYear();
});

function initYear() {
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}
