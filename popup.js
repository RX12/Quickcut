document.getElementById('changeShortcut').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  });
  
  document.getElementById('setCustomUrl').addEventListener('click', () => {
    const customUrl = document.getElementById('customUrlInput').value;
    if (customUrl) {
      chrome.storage.sync.set({ customUrl }, () => {
        alert("Custom URL saved!");
      });
    } else {
      alert("Please enter a valid URL.");
    }
  });
  
  // Display current shortcuts and custom URL
  chrome.commands.getAll(commands => {
    const toggleTabsCommand = commands.find(c => c.name === 'toggle-recent-tabs');
    const passwordManagerCommand = commands.find(c => c.name === 'open-password-manager');
    const googleLensCommand = commands.find(c => c.name === 'open-google-lens');
    const customUrlCommand = commands.find(c => c.name === 'open-custom-url');
  
    document.getElementById('toggleTabsShortcut').textContent = toggleTabsCommand.shortcut || 'Not set';
    document.getElementById('passwordManagerShortcut').textContent = passwordManagerCommand.shortcut || 'Not set';
    document.getElementById('googleLensShortcut').textContent = googleLensCommand.shortcut || 'Not set';
    document.getElementById('customUrlShortcut').textContent = customUrlCommand.shortcut || 'Not set';
  });
  
  // Load saved custom URL
  chrome.storage.sync.get(["customUrl"], (data) => {
    if (data.customUrl) {
      document.getElementById('customUrlInput').value = data.customUrl;
    }
  });