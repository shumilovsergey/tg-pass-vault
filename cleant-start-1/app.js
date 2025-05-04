let data = [
    {
      id: 1,
      site: "http://0.0.0.0:4000",
      username: "sh",
      password: "mypassword123",
      note: ""
    },
    {
      id: 2,
      site: "http://192.168.0.1",
      username: "admin",
      password: "admin123",
      note: "Router login"
    }
  ];
  
  const listView = document.getElementById('listView');
  const detailView = document.getElementById('detailView');
  
  function renderList() {
    listView.innerHTML = '';
    detailView.style.display = 'none';
    listView.style.display = 'block';
  
    // Add "Add New" card first
    const addCard = document.createElement('div');
    addCard.className = 'card';
    addCard.textContent = "➕ Add New";
    addCard.onclick = () => showAddForm();
    listView.appendChild(addCard);
  
    data.forEach(entry => {
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = entry.site;
      card.onclick = () => showDetail(entry.id);
      listView.appendChild(card);
    });
  }
  
  function showDetail(id) {
    const entry = data.find(item => item.id === id);
    if (!entry) return;
    listView.style.display = 'none';
    detailView.style.display = 'block';
  
    detailView.innerHTML = `
      <h2>${entry.site}</h2>
      <p><strong>Username:</strong> ${entry.username}</p>
      <p><strong>Password:</strong> ${entry.password}</p>
      <p><strong>Note:</strong> ${entry.note || 'No note added'}</p>
      <div class="button-row">
        <button onclick="renderList()">← Back</button>
        <button onclick="editEntry(${id})">Edit</button>
        <button onclick="deleteEntry(${id})">Delete</button>
      </div>
    `;
  }
  
  function showAddForm() {
    listView.style.display = 'none';
    detailView.style.display = 'block';
  
    detailView.innerHTML = `
      <h2>Add New Entry</h2>
      <label>Site:</label>
      <input id="newSite">
      <label>Username:</label>
      <input id="newUsername">
      <label>Password:</label>
      <input id="newPassword">
      <label>Note:</label>
      <textarea id="newNote"></textarea>
      <div class="button-row">
        <button onclick="saveNewEntry()">💾 Save</button>
        <button onclick="renderList()">Cancel</button>
      </div>
    `;
  }
  
  function saveNewEntry() {
    const site = document.getElementById('newSite').value.trim();
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const note = document.getElementById('newNote').value.trim();
  
    if (!site || !username || !password) {
      alert("Site, Username, and Password are required.");
      return;
    }
  
    const newEntry = {
      id: Date.now(),
      site,
      username,
      password,
      note
    };
  
    data.push(newEntry);
    renderList();
  }
  
  function deleteEntry(id) {
    data = data.filter(item => item.id !== id);
    renderList();
  }
  
  function editEntry(id) {
    const entry = data.find(item => item.id === id);
    if (!entry) return;
  
    detailView.innerHTML = `
      <h2>Edit: ${entry.site}</h2>
      <label>Username:</label>
      <input id="editUsername" value="${entry.username}">
      <label>Password:</label>
      <input id="editPassword" value="${entry.password}">
      <label>Note:</label>
      <textarea id="editNote">${entry.note}</textarea>
  
      <div class="button-row">
        <button onclick="saveEdit(${id})">💾 Save</button>
        <button onclick="showDetail(${id})">Cancel</button>
      </div>
    `;
  }
  
  function saveEdit(id) {
    const username = document.getElementById('editUsername').value;
    const password = document.getElementById('editPassword').value;
    const note = document.getElementById('editNote').value;
  
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index].username = username;
      data[index].password = password;
      data[index].note = note;
    }
  
    showDetail(id);
  }
  
  renderList();
  