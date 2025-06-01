import supabase from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    // User is not logged in — redirect to login page
    window.location.href = 'logIn.html';
  }
});

async function showLoggedInUser() {
  const { data: { user } } = await supabase.auth.getUser();

  const userInfoDiv = document.getElementById('user-info');
  if (user) {
    const email = user.email || 'User';
    userInfoDiv.innerHTML = `
      <span>Hello, ${email}</span>
      <button onclick="logout()">Log Out</button>
    `;
  } else {
    userInfoDiv.innerHTML = `<a href="logIn.html">Log In</a>`;
  }
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html'; // Or wherever you want to redirect
}

showLoggedInUser();
