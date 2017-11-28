//https://developer.chrome.com/apps/notifications

'use strict';

chrome.alarms.onAlarm.addListener(function() {
   
  chrome.browserAction.setBadgeText({text: ''+getTime()});
   
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  getIcon(),
      title:    getTime(),
      message:  '' //requireInteraction: True
  });
  
});

function getIcon(){
		var mins = new Date().getMinutes();	
		return mins+'.png'; 
}

function getTime(){
	
	var currentTime = new Date();
	var mins = '0'+currentTime.getMinutes(); //with nice preceding zero, if needed

	return ''+currentTime.getHours() + ':'+mins.slice(-2);
}