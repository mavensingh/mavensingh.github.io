var wh,ww,sh,sw,lang,title,ip,hits=0,checked,referrer,visitedPATH,host,visitedTime,agent,leaveMouse=[],w=window,n=w.navigator,l=w.location;d=document;
let loadPath=()=>{visitedPATH=l.pathname;host=l.hostname;visitedTime=loadTime();agent=n.userAgent;referrer=d.referrer;wh=w.innerHeight,ww=w.innerWidth,
sh=screen.height,sw=screen.width,title=d.title,lang=navigator.language||navigator.userLanguage;};let loadTime=()=>{return new Date();};var get=()=>{
let r=new XMLHttpRequest();r.open("GET","http://192.168.43.4:3021/api/getip",true);r.send();return r;};var post=(s)=>{let r=new XMLHttpRequest();
r.open("POST", "http://localhost:3000/load_analytics", true);r.send(JSON.stringify(s));return r;};w.onload=()=>{loadPath();get().onload = function()
{ip=JSON.parse(this.response);};let s={"hits":hits,"hit_element":checked,"referrer":referrer,"url":visitedPATH,"host":host,"time_in":visitedTime,
"time_out":loadTime(),"agent":agent,ip,"window_size":wh.toString()+"X"+ww.toString(),"screen_size":sh.toString()+"X"+sw.toString(),"title":title,
"language":lang};post(s);};document.addEventListener("click",function(evt){hits+=1;checked=+(evt.target.tagName);});
// w.addEventListener("unload", function() {
//     // get().onload = function() {ip = JSON.parse(this.response);};
//     let s={"hits":hits,"hit_element":checked,"referrer":referrer,"url":visitedPATH,"host":host,"time_in":visitedTime,"time_out":loadTime(),"agent":agent,ip,"window_size":wh.toString()+"X"+ww.toString(),"screen_size":sh.toString()+"X"+sw.toString(),"title":title,"language":lang};
//     navigator.sendBeacon("http://localhost:3000/load_analytics", JSON.stringify(s));
// });
// w.onbeforeunload = function() {
//     let ip ="";req().onload = function() {var ip = JSON.parse(this.response);};
//     let s={"hits":hits,"hit_element":checked,"referrer":referrer,"url":visitedPATH,"host":host,"time_in":visitedTime,"time_out":loadTime(),"agent":agent,ip};
//     navigator.sendBeacon("http://localhost:3000/load_analytics", JSON.stringify(s));
//     return "There are unsaved changes. Leave now?";
// };
