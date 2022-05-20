var cacheName = '';

chrome.runtime.onInstalled.addListener(() => {
    console.log('Checking Existing Cache...')
    console.log(chrome.runtime.id)
    chrome.storage.session.get().then(res => console.log('storage.session.get():', res))
    chrome.tabs.getCurrent().then(res => console.log('chrome.tabs.getCurrent():', res))
});

