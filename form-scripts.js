document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');


  function clearErrors() {
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  }


  function showError(input, message) {
    input.classList.add('input-error');
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#dc2626';
    error.style.fontSize = '0.85rem';
    error.style.marginTop = '-14px';
    error.style.marginBottom = '14px';
    error.textContent = message;
    input.insertAdjacentElement('afterend', error);
  }


  function validateForm() {
    clearErrors();
    let valid = true;
    let firstErrorField = null;


    form.querySelectorAll('[required]').forEach(input => {
      const value = input.value.trim();

      if (value === '') {
        showError(input, 'This field is required.');
        if (valid) {
          firstErrorField = input;
        }
        valid = false;
        return;
      }

      if (input.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          showError(input, 'Please enter a valid email address.');
          if (valid) {
            firstErrorField = input;
          }
          valid = false;
        }
      }

      if (input.pattern) {
        const regex = new RegExp(input.pattern);
        if (!regex.test(value)) {
          showError(input, input.getAttribute('aria-describedby') ?
            document.getElementById(input.getAttribute('aria-describedby')).textContent :
            'Invalid format.');
          if (valid) {
            firstErrorField = input;
          }
          valid = false;
        }
      }

      if (input.type === 'checkbox' && !input.checked) {
        showError(input.parentElement, 'You must agree before continuing.');
        if (valid) {
          firstErrorField = input;
        }
        valid = false;
      }
    });

    if (firstErrorField) {
      firstErrorField.focus();
    }

    addClearErrorListeners();

    return valid;
  }


  form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateForm()) {
      window.location.href = 'login.html'; // redireciona só se válido
    }
  });


  function addClearErrorListeners() {
    form.querySelectorAll('.input-error').forEach(input => {
      const clearError = () => {

        input.classList.remove('input-error');
        const nextElem = input.nextElementSibling;
        if (nextElem && nextElem.classList.contains('error-message')) {
          nextElem.remove();
        }

        input.removeEventListener('input', clearError);
        input.removeEventListener('change', clearError);
      };
      input.addEventListener('input', clearError);
      input.addEventListener('change', clearError);
    });
  }

});
