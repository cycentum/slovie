/* 
Copyright (c) 2016 Takuya KOUMURA.
http://slovie.cycentum.com/

This file is part of Slovie.

Slovie is licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
*/

var users;
var channels;
var channel;
var contents;
var timeDescending=true;
var attachedFiles;

function setUsers(userList){
	users={};
	userList.forEach(function(obj){
		var u=new User(obj);
		users[u.id]=u;
	});
}

function setChannels(channelList){
	channels={};
	channelList.forEach(function(obj){
		var c=new Channel(obj);
		channels[c.id]=c;
	});
}

function setChannelSelect(){
	$("#channels").empty();
	$("#channels").append($("<option>").val(null).text(selectChannelText).prop("selected", true));
	for(ci in channels){
		var ch=channels[ci];
		$("#channels").append($("<option>").val(ch.id).text(ch.name));
	}
	$("#channels").css("visibility", "visible");
}

function channelSelected(){
	var channelId=$("#channels").val();
	if(channelId.length==0) return;
	channel=channels[channelId];
	contents=[];
	attachedFiles={};
	$("#loadingMsg").css("visibility", "visible");
	loadContent(channel);
}

function addContent(contentList){
	contentList.forEach(function(obj){
		addNewContent(obj, contents, attachedFiles);
	});
}

function convUserRegex(text){
	var regUser=/@(.+?)\|(.+?)$/;
	var regUrl=/(.+?)\|(.+?)$/;
	
	var reg=new RegExp(/<(.*)>/g);
	var m;
	var newText=text;
	while(m=reg.exec(text)){
		var mUser=regUser.exec(m[1]);
		if(mUser!=null){
			newText=newText.replace(m[0], mUser[2]);
			continue;
		}
		
		var mUrl=regUrl.exec(m[1]);
		if(mUrl!=null){
			newText=newText.replace(m[0], "<a href=\""+mUrl[1]+"\">"+mUrl[2]+"</a>");
			continue;
		}

		newText=newText.replace(m[0], "<a href=\""+m[1]+"\">"+m[1]+"</a>");
	}
	return newText;
}

function setContentTable(){
	sortTime(contents);
	var revButton="<input type=\"button\" value=\""+reverseText+"\" onclick=\"timeRev()\" id=\"timeRev\"/>";
	$("#contentAll").html(revButton+"<br/><div id=\"contents\"></div>");
	var imgSrc=[];
	contents.forEach(function(cont){
		var t=timeString(new Date(cont.ts*1000));
		var u=userImgName(cont.user);
		var contentMain;
		if(cont.file!=null){
			var f=cont.file;
			var mt=f.mimetype;
			if(mt.startsWith("image")&&mt!="image/tiff"){
				var imgId=imgSrc.length;
				contentMain="<a href=\""+f.url+"\" target=\"_blank\"><div class=\"contentMain\"><pre>"+f.name+"</pre>"+
					"<div class=\"contentImg\" id=\"contentImg"+imgId+"\"></div></div></a>";
				imgSrc[imgId]=f.url;
			}
			else{
				contentMain="<a href=\""+f.url+"\" target=\"_blank\"><div class=\"contentMain\"><pre>"+f.name+"</pre></div></a>";
			}
			
			if(f.comment0!=null){
				contentMain+="<div class=\"contentMain\">"+contentPre(f.comment0.comment)+"</div>";
			}
			
			sortTime(f.comments);
			f.comments.forEach(function(com){
				var u=userImgName(com.user);
				var ut="<div class=\"contentHeader\">"+u+"<span class=\"ts\">"+t+"</span></div>";
				var cm="<div class=\"comment\">"+ut+
					"<div class=\"contentMain\">"+contentPre(com.comment)+"</div></div>";
				contentMain+=cm;
			});
		}
		else{
			contentMain="<div class=\"contentMain\">"+contentPre(cont.text)+"</div>";
		}
		var ut=$("<div class=\"contentHeader\">"+u+"<span class=\"ts\">"+t+"</span></div>");
		c=$("<div class=\"content\"></div>")
			.append(ut)
			.append(contentMain);
		$("#contents").append(c);
	});
	$("#loadingMsg").css("visibility", "hidden");
	$("#contentAll").css("visibility", "visible");
	setTimeout(function(){
		var i;
		for(i=0; i<imgSrc.length; ++i){
			console.log();
			$("#contentImg"+i).append("<img src=\""+imgSrc[i]+"\" class=\"attachedImage\"/>");
		}
	}, 10);
}

function timeRev(){
	timeDescending=!timeDescending;
	$("#loadingMsg").css("visibility", "visible");
	setTimeout(function(){
		setContentTable();
	}, 0);
}

function sortTime(list){
	list.sort(function(c0, c1){
		if(c0.ts<c1.ts) return -1*(timeDescending?-1:1);
		if(c0.ts>c1.ts) return 1*(timeDescending?-1:1);
		return 0;
	});
}

function userImgName(userId){
	var u="";
	if(userId in users){
		var un="<span class=\"userName\">"+users[userId].name+"</span>";
		var im="<img class=\"userImg\" src=\""+users[userId].image_24+"\"/>";
		u=im+un;
	}
	return u;
}

function contentPre(text){
	return "<pre class=\"wrap\">"+convUserRegex(text)+"</pre>";
}

