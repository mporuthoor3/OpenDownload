chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  chrome.tabs.sendMessage(tab.id, {txt: "hello"});
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if (message.txt == "bye") {
    chrome.tabs.create({"url": message.url});
  }
}
