// JavaScript Document
video_count =1;
videoPlayer = document.getElementById("homevideo");
document.querySelector("#myBtnmyBtn")
var clicks=0
function run(){
	    video_count++;
		if (video_count == 7) video_count = 1;
        var nextVideo = "videos/sample"+video_count+".mp4";
		console.log("nextvideoplaying"  +nextVideo)
	document.getElementById("homevideo").setAttribute("src", "videos/sample"+video_count+".mp4");
       };
function nextFun(){	
	 video_count++;	 
	 if (video_count == 7)
	  video_count = 1;
      var nextVideo = "videos/sample"+video_count+".mp4";	  
     document.getElementById("homevideo").setAttribute("src", "videos/sample"+video_count+".mp4");
	}
function prevFun(){
	 video_count--;
	 if (video_count == 0)
	  //prevbtnDisbaled()	
	 video_count = 1;
	
	   var nextVideo = "videos/sample"+video_count+".mp4";
     document.getElementById("homevideo").setAttribute("src", "videos/sample"+video_count+".mp4");
	 	}
function prevbtnDisbaled(){
	var e2=document.getElementById("prevBtn")
	 e2.setAttribute('disabled', true)
	  	
}
function prevbtnEnabled(){
	var e2=document.getElementById("prevBtn")
	 e2.setAttribute('disabled', false)
	  	
}
function getCurTime() {
	var myvideo=document.getElementById("homevideo")
	var m=Math.floor(myvideo.currentTime/(60))
	var s=Math.floor(myvideo.currentTime%(60))
	if(m.toString().length<2){m='0'+m;}
	if(s.toString().length<2){s='0'+s;}
	 alert(' : '+m+' : '+s);
	
         
}

function load(){
	   nxtfun()
	  // prevbtnDisbaled()
	  
	   }

function nxtfun()
{
	 var e1=document.getElementById("nxtBtn")
	 e1.addEventListener('click', nextFun)
	 var e2=document.getElementById("prevBtn")
	 e2.addEventListener('click', prevFun)
	}


	function buttonclick(dis){
  console.log(dis.id)
 var url = dis.dataset.url
  document.getElementById("homevideo").setAttribute("src", url );
  }