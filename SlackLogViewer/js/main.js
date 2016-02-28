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
var exportRemaining=0;
var usedUrlList=[];

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
	
	$("#exportButton").css("visibility", "visible");
	for(ci in channels){
		var ch=channels[ci];
		$("#exportChannel").append($("<option>").val(ch.id).text(ch.name));
	}
}

function channelSelected(){
	var channelId=$("#channels").val();
	if(channelId.length==0) return;
	channel=channels[channelId];
	contents=[];
	attachedFiles={};
//	$("#loadingMsg").css("visibility", "visible");
	$.blockUI({
		message: $("#loadingBlockDialog"),
		onBlock: function() { 
			loadContent(channel, setContentTable, contents, attachedFiles);
			$.unblockUI();
		}
	});
}

function addContent(contentList, conts, attaFiles){
	contentList.forEach(function(obj){
		addNewContent(obj, conts, attaFiles);
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
			newText=newText.replace(m[0], "<span class=\"contentUser\">"+mUser[2]+"</span>");
			continue;
		}
		
		var mUrl=regUrl.exec(m[1]);
		if(mUrl!=null){
			newText=newText.replace(m[0], "<a target=\"_blank\" href=\""+mUrl[1]+"\">"+mUrl[2]+"</a>");
			continue;
		}

		newText=newText.replace(m[0], "<a target=\"_blank\" href=\""+m[1]+"\">"+m[1]+"</a>");
	}
	return newText;
}

function convUserRegexForExport(text){
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
			newText=newText.replace(m[0], mUrl[2]+"("+mUrl[1]+")");
			continue;
		}

		newText=newText.replace(m[0], m[1]);
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
//	$("#loadingMsg").css("visibility", "hidden");
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
//	$("#loadingMsg").css("visibility", "visible");
	$.blockUI({
		message: $("#loadingBlockDialog"),
		onBlock: function() { 
			setContentTable();
			$.unblockUI();
		}
	});
}

function sortTime(list, descending){
	if(descending==undefined){descending=timeDescending;}
	list.sort(function(c0, c1){
		if(c0.ts<c1.ts) return -1*(descending?-1:1);
		if(c0.ts>c1.ts) return 1*(descending?-1:1);
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

function userName(userId){
	var u="";
	if(userId in users){
		u=users[userId].name;
	}
	return u;
}

function contentPre(text){
	return "<pre class=\"wrap\">"+convUserRegex(text)+"</pre>";
}

$(function(){
	$('#exportDialog').dialog({
		modal: true,
		autoOpen: false,
		height: "auto",
		width: "auto"
	});
});

function openExportDialog(){
	var d=new Date();
	var yr=""+d.getFullYear();
	var mo=""+d.getMonth();
	var da=('0'+d.getDate()).slice(-2);
	var hr=('0'+d.getHours()).slice(-2);
	var mi=('0'+d.getMinutes()).slice(-2);
	var sc=('0'+d.getSeconds()).slice(-2);
	var ms=('0'+d.getMilliseconds()).slice(-3);
	$("#exportFilename").val("Slovie_export_"+yr+mo+da+hr+mi+sc+ms);
	$("#exportMsg").empty();
	$("#exportDialog").dialog("open");
}

function execExport(){
	usedUrlList.forEach(function(obj){
		URL.revokeObjectURL(obj);
	});
	usedUrlList=[];
	$("#exportMsg").empty();
	
	var channelId=$("#exportChannel").val();
	var filename=$("#exportFilename").val();
	if(channelId==null || filename.length==0){
		if(filename.length==0) $("#exportMsg").append(setFilenameError+"<br/>");
		if(channelId==null) $("#exportMsg").append(selectChannelError+"<br/>");
		$("#exportDialog").effect("shake");
		return;
	}
	
	var descending=$('input[name=exportDescending]:checked').val()=="1";
	exportRemaining=channelId.length;
	
	$.blockUI({
		message: $("#exportingBlockDialog"),
		onBlock: function() { 
			channelId.forEach(function(ci){
				var conts=[];
				var attaFiles={};
				loadContent(channels[ci], function(){
					exportChannel(conts, attaFiles, descending, filename+"_"+channels[ci].name+".txt");
				}, conts, attaFiles);
			});
		}
	});	
}

function exportChannel(conts, attaFiles, descending, filename){
	sortTime(conts, descending);
	text="";
	conts.forEach(function(cont){
		var t=timeString(new Date(cont.ts*1000));
		var u=userName(cont.user);
		var contentMain="", contentName="", comments="";
		if(cont.file!=null){
			var f=cont.file;
			var mt=f.mimetype;
			if(mt.startsWith("image")&&mt!="image/tiff"){
				contentName="Image";
				contentMain=f.name+"\r\n"+f.url;
			}
			else{
				contentName="File";
				contentMain=f.name+"\r\n"+f.url;
			}
			
			if(f.comment0!=null){
				comments+="\r\n["+u+"] "+t+" (Comment)\r\n"+convUserRegexForExport(f.comment0.comment)+"\r\n";
			}
			
			sortTime(f.comments, descending);
			f.comments.forEach(function(com){
				var cu=userName(com.user);
				var ct=timeString(new Date(com.ts*1000));
				var cc=convUserRegex(com.comment);
				comments+="\r\n["+cu+"] "+ct+" (Comment)\r\n"+cc+"\r\n";
			});
		}
		else{
			contentName="Text";
			contentMain=convUserRegexForExport(cont.text);
		}
		text+="["+u+"] "+t+" ("+contentName+")\r\n"+contentMain+"\r\n"+comments+"\r\n--------------------\r\n\r\n";
	});
	saveToLocal(text, filename);
	--exportRemaining;
	if(exportRemaining==0){
		var links=$("#exportLink")[0].childNodes;
		for(li=0; li<links.length; ++li){
			links[li].click();
			usedUrlList.push(links[li].href);
		}
		$("#exportLink").empty();
		$("#exportDialog").dialog("close");
		$.unblockUI();
	}
}
