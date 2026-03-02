const chatBox = document.getElementById('chatBox');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

// Load messages from chrome.storage
function loadMessages() {
  chrome.storage.local.get(['messages'], result => {
    chatBox.innerHTML = '';
    const messages = result.messages || [];
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'message';
      div.textContent = msg;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Save new message
function saveMessage(msg) {
  chrome.storage.local.get(['messages'], result => {
    const messages = result.messages || [];
    messages.push(msg);
    chrome.storage.local.set({ messages }, loadMessages);
  });
}

// Send button click
sendBtn.addEventListener('click', () => {
  const msg = msgInput.value.trim();
  if (msg !== '') {
    saveMessage(msg);
    msgInput.value = '';
  }
});

// Press Enter to send
msgInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendBtn.click();
});

// Initial load
loadMessages();
