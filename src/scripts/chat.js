/**
 * Innerlight Chat Page Script
 */

import '../styles/main.css';
import { initAuth, getCurrentUser } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initYear();
  initChat();
});

function initYear() {
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

function initChat() {
  const messagesContainer = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  
  if (!messagesContainer || !chatInput || !sendBtn) return;
  
  // Check for initial message from landing page
  const initialMessage = sessionStorage.getItem('innerlight_one_line');
  if (initialMessage) {
    sessionStorage.removeItem('innerlight_one_line');
    addMessage(initialMessage, 'user');
    
    // Simulate assistant response
    setTimeout(() => {
      addMessage(getInitialResponse(initialMessage), 'assistant');
    }, 1000);
  } else {
    // Welcome message
    addMessage("Welcome. I'm here to listen, whenever you're ready to share.", 'assistant');
  }
  
  // Send message handler
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatInput.value = '';
    
    // TODO: Integrate with your n8n webhook or Supabase Edge Function
    // For now, show a placeholder response
    setTimeout(() => {
      addMessage(getPlaceholderResponse(), 'assistant');
    }, 1000);
  }
  
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Focus input on load
  chatInput.focus();
}

function addMessage(text, role) {
  const messagesContainer = document.getElementById('chatMessages');
  if (!messagesContainer) return;
  
  const messageEl = document.createElement('div');
  messageEl.className = `message ${role}`;
  messageEl.textContent = text;
  
  messagesContainer.appendChild(messageEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getInitialResponse(userMessage) {
  if (!userMessage) {
    return "Sometimes silence speaks its own truth. I'm here whenever you need.";
  }
  
  // Simple response based on sentiment (replace with actual AI integration)
  const message = userMessage.toLowerCase();
  
  if (message.includes('sad') || message.includes('hurt') || message.includes('pain')) {
    return "I hear you. Pain has a way of making everything feel heavy. Would you like to tell me more about what you're experiencing?";
  }
  
  if (message.includes('anxious') || message.includes('worried') || message.includes('scared')) {
    return "Anxiety can feel overwhelming. You're safe here. What's weighing on your heart?";
  }
  
  if (message.includes('happy') || message.includes('grateful') || message.includes('blessed')) {
    return "It's beautiful that you can recognize these moments of light. What's bringing you joy today?";
  }
  
  return "Thank you for sharing that with me. I'm listening. Would you like to explore this feeling together?";
}

function getPlaceholderResponse() {
  const responses = [
    "I'm here with you. Take your time.",
    "That sounds meaningful. Would you like to share more?",
    "Sometimes the hardest part is just being present with our feelings.",
    "You're not alone in this journey.",
    "Every step forward, no matter how small, is still progress.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Export for potential use elsewhere
export { addMessage };
