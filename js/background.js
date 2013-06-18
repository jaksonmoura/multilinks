chrome.browserAction.onClicked.addListener(function(tab) {
  var links = {}
  chrome.storage.sync.get('links', function(result){
    links = result.links;
    for (name in links){
      chrome.tabs.create({url:links[name]});
    };
    
  });
});