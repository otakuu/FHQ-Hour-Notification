'use strict';

chrome.alarms.onAlarm.addListener(function() {
   
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'dong.png',
      title:    'Es isch: '+new Date().getHours() +':'+new Date().getMinutes(),
      message:  ''
  });
	  
  //delete previous
  chrome.alarms.clearAll();
  
  //set up next alarm
  chrome.storage.sync.get(['minutes'], function(item) {
  chrome.browserAction.setBadgeText({text: ''+item.minutes});
	
  chrome.alarms.create({delayInMinutes: item.minutes});
  });
  
});
