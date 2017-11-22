chrome.omnibox.setDefaultSuggestion({
  description: "Type a subreddit"
});


const baseURL = "https://reddit.com/r/";

function getMatchingProperties(input) {
  var result = [];
      let suggestion = {
        content: baseURL + input,
        description: "Sub Reddit: r/" + input
      }
      result.push(suggestion);
  return result;
}

chrome.omnibox.onInputChanged.addListener((input, suggest) => {
  suggest(getMatchingProperties(input));
});

chrome.omnibox.onInputEntered.addListener((url, disposition) => {
  switch (disposition) {
    case "currentTab":
      chrome.tabs.update({url});
      break;
    case "newForegroundTab":
      chrome.tabs.create({url});
      break;
    case "newBackgroundTab":
      chrome.tabs.create({url, active: false});
      break;
  }
});
