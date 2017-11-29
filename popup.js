function setAlarm() {
	
  var minutes = 15; 
    
  chrome.browserAction.setBadgeText({text: getTime(new Date())});
  
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
  d.setSeconds(0);  //very important
  
  //clear old ones
  chrome.alarms.clearAll();
  
  //set new
  chrome.alarms.create({when: d.getTime()});
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}


function getTime(date){
	
	var mins = '0'+date.getMinutes(); //with nice preceding zero, if needed
	var hrs = '0'+date.getHours();

	return hrs.slice(-2) + mins.slice(-2);
}

document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
