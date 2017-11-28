'use strict';

function setAlarm(event) {
	
  let minutes = parseFloat(event.target.id);
  chrome.browserAction.setBadgeText({text: ''+minutes});
  
  //get time to desired alarm
  var d = new Date();
  var mins = d.getMinutes();
  var secs = d.getSeconds();
  
  var diff = minutes - (mins % minutes);
  var miniDiff = (secs * 100) / 6000;
  
  //alert('delay:' + (diff-miniDiff));
  //alert('periodInMinutes: ' + minutes);
  
  chrome.alarms.create({delayInMinutes: diff-miniDiff, periodInMinutes:minutes});
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('30min').addEventListener('click', setAlarm);
document.getElementById('60min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);