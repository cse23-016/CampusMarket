import supabase from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const hasBusinessCheckbox = document.getElementById('hasBusiness');
  const businessDetails = document.getElementById('businessDetails');

  hasBusinessCheckbox.addEventListener('change', () => {
    businessDetails.classList.toggle('hidden', !hasBusinessCheckbox.checked);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;
    const dob = document.getElementById('dob').value;
    const university = document.getElementById('university').value;
    const email = document.getElementById('studentEmail').value;
    const password = document.getElementById('password').value;
    const hasBusiness = document.getElementById('hasBusiness').checked;

    const businessName = document.getElementById('businessName').value;
    const businessDesc = document.getElementById('businessDesc').value;
    const businessLocation = document.getElementById('businessLocation').value;
    const businessCategory = document.getElementById('businessCategory').value;

    // 1. Sign up user with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      alert('Sign-up error: ' + signUpError.message);
      return;
    }

    const auth_id = authData.user.id;

    // 2. Insert student into 'students' table
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .insert([{
        first_name: firstName,
        surname,
        student_email: email,
        password, // Consider hashing or storing separately
        university,
        auth_id,
        has_business: hasBusiness
      }])
      .select('student_id'); // Get the ID for later use

    if (studentError) {
      alert('Failed to save student: ' + studentError.message);
      return;
    }

    const studentId = studentData[0].student_id;

    // 3. If hasBusiness, insert into 'businesses' table
    if (hasBusiness) {
      const { error: businessError } = await supabase
        .from('businesses')
        .insert([{
          student_id: studentId,
          business_name: businessName,
          business_description: businessDesc,
          base_location: businessLocation,
          business_category: businessCategory
        }]);

      if (businessError) {
        alert('Business creation error: ' + businessError.message);
        return;
      }
    }

    // 4. Success
    alert('Sign up successful! Check your email to confirm your account.');
    form.reset();
    businessDetails.classList.add('hidden');
    // Optional: wait a bit so user sees the message
    setTimeout(() => {
        window.location.href = './login.html'; // Change this path to your actual login page
    }, 2000); // 2 seconds delay
  });
});

