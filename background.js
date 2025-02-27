let tabHistory = [];

// Track tab changes
chrome.tabs.onActivated.addListener(activeInfo => {
  tabHistory = [...new Set([...tabHistory, activeInfo.tabId])].slice(-2);
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "toggle-recent-tabs":
      if (tabHistory.length >= 2) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentTab = tabs[0].id;
          const targetTab = tabHistory.find(tabId => tabId !== currentTab);
          if (targetTab) chrome.tabs.update(targetTab, { active: true });
        });
      }
      break;

    case "open-password-manager":
      chrome.tabs.create({ url: "chrome://password-manager/passwords" });
      break;

    case "open-google-lens":
      chrome.tabs.create({ url: "https://lens.google.com" });
      break;

    case "open-custom-url":
      chrome.storage.sync.get(["customUrl"], (data) => {
        if (data.customUrl) {
          chrome.tabs.create({ url: data.customUrl });
        } else {
          console.log("No custom URL set.");
        }
      });
      break;
  }
});

// Clean up closed tabs
chrome.tabs.onRemoved.addListener(tabId => {
  tabHistory = tabHistory.filter(id => id !== tabId);
});