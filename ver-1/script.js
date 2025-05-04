async function loadPasswords() {
  const res = await fetch('data.json');
  const passwords = await res.json();
  const list = document.querySelector('.password-list');
  
  list.innerHTML = ''; // Clear old content if any

  passwords.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('glass-card');
    card.innerHTML = `
      <div class="password-title">${item.title}</div>
      <div class="password-details">
        <div class="url-line">
          <span><strong>URL:</strong> ${item.url}</span>
          <button class="icon-btn go-url" title="Go">🔗</button>
        </div>
        <div class="username-line">
          <span><strong>Username:</strong> ${item.username}</span>
          <button class="icon-btn copy-username" title="Copy Username">📋</button>
        </div>
        <div class="password-line">
          <span><strong>Password:</strong> <span class="password hidden-password" data-real-password="${item.password}">•••••••••••</span>

        </div>
        <div class="password-buttons">
          <button class="icon-btn reveal-password" title="Reveal Password">👁️</button>
          <button class="icon-btn copy-password" title="Copy Password">📋</button>
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  initCardEvents(); // After cards are built, setup events
}

function initCardEvents() {
  const items = document.querySelectorAll('.glass-card');
  const revealButtons = document.querySelectorAll('.reveal-password');
  const copyPasswordButtons = document.querySelectorAll('.copy-password');
  const copyUsernameButtons = document.querySelectorAll('.copy-username');
  const goUrlButtons = document.querySelectorAll('.go-url');

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      if (!e.target.classList.contains('icon-btn')) {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        } else {
          items.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      }
    });
  });

  revealButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const passwordSpan = button.closest('.password-details').querySelector('.password');
      if (passwordSpan.textContent.includes('•')) {
        passwordSpan.textContent = passwordSpan.dataset.realPassword; // <- fix here
        button.textContent = '🙈';
      } else {
        passwordSpan.textContent = '•••••••••••';
        button.textContent = '👁️';
      }
      e.stopPropagation();
    });
  });
  

  copyPasswordButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const password = button.closest('.password-details').dataset.realPassword;
      navigator.clipboard.writeText(password);
      alert('Password copied!');
      e.stopPropagation();
    });
  });

  copyUsernameButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const username = button.parentElement.querySelector('span').textContent.replace('Username:', '').trim();
      navigator.clipboard.writeText(username);
      alert('Username copied!');
      e.stopPropagation();
    });
  });

  goUrlButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const url = button.parentElement.querySelector('span').textContent.replace('URL:', '').trim();
      window.open(url, '_blank');
      e.stopPropagation();
    });
  });
}

// Load passwords when page loads
loadPasswords();
