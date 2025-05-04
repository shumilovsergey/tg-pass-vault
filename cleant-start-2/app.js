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
  
  function showDetail(id, editing = false) {
    const entry = data.find(item => item.id === id);
    if (!entry) return;
  
    listView.style.display = 'none';
    detailView.style.display = 'block';
  
    const readonly = editing ? '' : 'readonly';
  
    detailView.innerHTML = `
      <h2>${entry.site}</h2>
      <label>Username:</label>
      <input id="username" value="${entry.username}" ${readonly}>
      <label>Password:</label>
      <input id="password" value="${entry.password}" ${readonly}>
      <label>Note:</label>
      <textarea id="note" ${readonly}>${entry.note}</textarea>
  
      <div class="button-row">
        <button onclick="renderList()">← Back</button>
        ${editing
          ? `<button onclick="saveEdit(${id})">💾 Save</button>
             <button onclick="showDetail(${id})">Cancel</button>`
          : `<button onclick="showDetail(${id}, true)">Edit</button>
             <button onclick="deleteEntry(${id})">Delete</button>`
        }
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
        <button onclick="renderList()">← Back</button>
        <button onclick="saveNewEntry()">💾 Save</button>
        
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
  
  function saveEdit(id) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const note = document.getElementById('note').value;
  
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index].username = username;
      data[index].password = password;
      data[index].note = note;
    }
  
    showDetail(id);
  }
  
  function deleteEntry(id) {
    data = data.filter(item => item.id !== id);
    renderList();
  }
  
  renderList();
  