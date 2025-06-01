import supabase from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (!session) {
    // If user is not logged in but has a recovery token, Supabase will auto-login them
    const { error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) {
      alert('Session expired or invalid recovery link.');
      window.location.href = 'logIn.html';
      return;
    }
  }
});

document.getElementById('reset-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newPassword = document.getElementById('newPassword').value;
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    alert('Failed to reset password: ' + error.message);
  } else {
    alert('Password reset successful! Please log in.');
    window.location.href = 'logIn.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reset-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://yourdomain.com/updatePassword.html'
    });

    if (error) {
      alert('Error sending reset email: ' + error.message);
    } else {
      alert('Password reset link sent! Please check your email.');
      form.reset();
    }
  });
});
