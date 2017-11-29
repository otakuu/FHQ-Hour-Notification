chrome.alarms.onAlarm.addListener(function() {
	
  var d = new Date();
   
  chrome.browserAction.setBadgeText({text: ''+getTime(d).replace(':','')});
   
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  getIcon(),
      title:    getTime(new Date()),
      message:  '' //requireInteraction: True
  });
  
  //setup next notif
  var hrs = d.getHours();
  var mins = d.getMinutes();
  
  var firstScheduled = (Math.floor((mins + 15) / 15)) * 15;
  
  if(firstScheduled==60){
	firstScheduled=0;  
  }
  
  if(firstScheduled==0){
	d.setHours(hrs+1);  
  }
  
  d.setMinutes(firstScheduled);
  d.setSeconds(0); // very important
  
  //set new
  chrome.alarms.create({when: d.getTime()});
  
});

function getIcon(){
		var mins = new Date().getMinutes();	
		return mins.charAt(0)+'.png'; //first char
}

function getTime(date){
	
	var mins = '0'+date.getMinutes(); //with nice preceding zero, if needed
	var hrs = '0'+date.getHours();

	return hrs.slice(-2) + ':' + mins.slice(-2);
}