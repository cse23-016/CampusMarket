import supabase from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reset-form');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;

    if (newPassword.length < 8) {
      message.textContent = 'Password must be at least 8 characters.';
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      message.textContent = 'Error: ' + error.message;
    } else {
      message.style.color = 'green';
      message.textContent = 'Password updated successfully. Redirecting...';
      setTimeout(() => {
        window.location.href = 'browse.html'; // redirect to a protected page
      }, 2000);
    }
  });
});
