'use strict';

function setAlarm(event) {
	
  let minutes = parseFloat(event.target.id);
  chrome.browserAction.setBadgeText({text: ''+minutes});
  
  //get time to desired alarm
  var d = new Date();
  var hrs = d.getHours();
  var mins = d.getMinutes();
  
  var firstScheduled = (Math.floor((mins + minutes) / minutes)) * minutes;
  
  if(firstScheduled==60){
	firstScheduled=0;  
  }
  
  if(firstScheduled==0){
	d.setHours(hrs+1);  
  }
  
  d.setMinutes(firstScheduled);
  d.setSeconds(0);
  
  chrome.alarms.create({scheduledTime: d.getTime(), periodInMinutes: minutes});
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