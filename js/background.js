function open_links(){
  var links = {};
  chrome.storage.sync.get('links', function(result){
  links = result.links;
  for (name in links){
    chrome.tabs.create({url:links[name]});
  };

  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  open_links();
});

chrome.commands.onCommand.addListener(function(command) {
  open_links();
});