var searchHist = {};
var triggerURLHead = /youtube.com\/results\?search_query/i;
var triggerRE = /search_query=(.*)/;

chrome.runtime.onInstalled.addListener(() => {
    // chrome.storage.sync.set({ searchHist:searchHist });
    // chrome.storage.sync.get(['searchHist'], function(result) {
    //     console.log('Value currently is ' + result.searchHist);
    //   });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      // read changeInfo data and do something with it (like read the url)
      if (changeInfo.url) {
          if (triggerURLHead.test(changeInfo.url)) {
              let newSearchQuery = {}
              newSearchQuery[`tabId${tabId}`] = decodeURI(triggerRE.exec(changeInfo.url)[1]).replace( /\+/g, ' ' )
              console.log(newSearchQuery)
              chrome.storage.session.set(newSearchQuery);
              chrome.storage.session.get([`tabId${tabId}`], function(result) {
                  console.log(tabId + result[`tabId${tabId}`])
              });
              console.log(chrome.storage.session)
          }
      }
    }
  );

chrome.tabs.onRemoved.addListener(function(tabId, removed) {
    let searchQuery = '';
    chrome.storage.session.get([`tabId${tabId}`], function(result) {
        searchQuery = result[`tabId${tabId}`]
    });
    chrome.storage.session.remove([`tabId${tabId}`], function(result) {
        console.log('removed '+tabId+', ', searchQuery)
    })
})