import supabase from './supabaseClient.js';

// Show/hide password toggle
document.getElementById('showPassword').addEventListener('change', function () {
  const passwordField = document.getElementById('password');
  passwordField.type = this.checked ? 'text' : 'password';
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('studentEmail').value.trim();
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Login failed: ' + error.message);
    return;
  }

  // Optional: store session or redirect
  alert('Login successful!');
  window.location.href = 'browseListings.html'; // Redirect to main app/dashboard
});

// Optional: Check if user is already logged in
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    console.log('User is already logged in:', session.user);
    window.location.href = 'browseListings.html'; // Redirect to main app/dashboard
  }
});


