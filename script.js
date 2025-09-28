const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let valid = true;
  status.textContent = '';

  form.querySelectorAll('.form-group').forEach(group => {
    const input = group.querySelector('input, textarea');
    const error = group.querySelector('.error');
    if (!input.value.trim()) {
      error.textContent = 'This field is required.';
      valid = false;
    } else if (input.type === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(input.value)) {
      error.textContent = 'Please enter a valid email.';
      valid = false;
    } else {
      error.textContent = '';
    }
  });

  if (!valid) return;

  try {
    // Mock submit
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      status.textContent = 'Thanks! Your message has been sent.';
      form.reset();
    } else {
      throw new Error('Network error');
    }
  } catch (err) {
    status.textContent = 'Something went wrong. Please try again.';
  }
});
