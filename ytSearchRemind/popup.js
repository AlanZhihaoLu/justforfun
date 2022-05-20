var toggleRemind = document.getElementById('toggleRemind');

toggleRemind.addEventListener('click', async () => {
    var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab.url)
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // listen for messages sent from background.js
      if (request.message === 'hello!') {
        console.log(request.url) // new url is now in content scripts!
      }
  });