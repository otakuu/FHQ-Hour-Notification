chrome.alarms.onAlarm.addListener(function() {
	
  var d = new Date();
   
  chrome.browserAction.setBadgeText({text: ''+getTime(d).replace(':','')});
   
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  getIcon(),
      title:    getTime(new Date()),
      message:  formatDate(new Date()) //requireInteraction: True
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
		return mins.toString().charAt(0)+'.png'; //first char
}

function getTime(date){
	
	var minsDate = date.getMinutes();
	
	var mins = '0'+minsDate; 
	var hrs = '0'+date.getHours();
	
	if(minsDate.toString().charAt(0)=='0' || minsDate.toString().charAt(0)=='3'){
		mins = minsDate.toString().charAt(0)+'0';
	}
	
	if(minsDate.toString().charAt(0)=='1' || minsDate.toString().charAt(0)=='4'){
		mins = minsDate.toString().charAt(0)+'5';
	}

	return hrs.slice(-2) + ':' + mins.slice(-2);
}

	
function formatDate(date) {
  var monthNames = [
    "Januar", "Februar", "März",
    "April", "Mai", "Juni", "Juli",
    "August", "September", "Oktober",
    "November", "Dezember"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + '. ' + monthNames[monthIndex] + ' ' + year;
}