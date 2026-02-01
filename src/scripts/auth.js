/**
 * Innerlight Authentication Module
 * Uses Supabase for secure authentication
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// These values should come from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;

/**
 * Initialize Supabase client
 */
export function initAuth() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured. Auth features disabled.');
    return null;
  }
  
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
  
  return supabase;
}

/**
 * Get current Supabase client
 */
export function getSupabase() {
  return supabase;
}

/**
 * Sign up with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function signUp(email, password) {
  if (!supabase) {
    return { data: null, error: { message: 'Auth not configured' } };
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
}

/**
 * Sign in with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function signIn(email, password) {
  if (!supabase) {
    return { data: null, error: { message: 'Auth not configured' } };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

/**
 * Sign out current user
 * @returns {Promise<{error: object|null}>}
 */
export async function signOut() {
  if (!supabase) {
    return { error: { message: 'Auth not configured' } };
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current session
 * @returns {Promise<{data: {session: object|null}, error: object|null}>}
 */
export async function getSession() {
  if (!supabase) {
    return { data: { session: null }, error: null };
  }
  
  return await supabase.auth.getSession();
}

/**
 * Get current user
 * @returns {Promise<object|null>}
 */
export async function getCurrentUser() {
  if (!supabase) {
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Listen to auth state changes
 * @param {Function} callback 
 * @returns {Function} Unsubscribe function
 */
export function onAuthStateChange(callback) {
  if (!supabase) {
    return () => {};
  }
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );
  
  return () => subscription.unsubscribe();
}

/**
 * Reset password
 * @param {string} email 
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function resetPassword(email) {
  if (!supabase) {
    return { data: null, error: { message: 'Auth not configured' } };
  }
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  return { data, error };
}

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate password strength
 * @param {string} password 
 * @returns {{valid: boolean, message: string}}
 */
export function validatePassword(password) {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain an uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain a lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain a number' };
  }
  
  return { valid: true, message: 'Password is strong' };
}
