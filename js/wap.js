let hits=0,checked_element,referrer,visitedPATH,host,visitedTime,agent,leaveMouse=[],w=window,n=w.navigator,l=w.location;d=document;
let loadPath=()=>{visitedPATH=l.pathname;host=l.hostname;visitedTime=loadTime(),agent=n.userAgent;referrer=d.referrer;};
let loadTime=()=>{return new Date();};let s={"hits":hits,"hit_element":checked_element,"referrer":referrer,"url":visitedPATH,"host":host,"time_in":visitedTime,"agent":agent};
let war=()=>{let request = new XMLHttpRequest();request.open("POST", api, true);request.send(s);}
window.onload=()=>{loadPath();war();};document.addEventListener("click",function(evt){hits+=1;checked_element=evt.target;});