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
	$("#loadingMsg").css("visibility", "visible");
	loadContent(channel);
}

function addContent(contentList){
	contentList.forEach(function(obj){
		var c=new Content(obj);
		contents.push(c);
	});
}

function convUserRegex(text){
	var reUser=/<@(.+?)\|(.+?)>/g;
	text=text.replace(reUser, "$2");
	
	var reUrl=/<(.+?)\|(.+?)>/g;
	text=text.replace(reUrl, "<a href=\"$1\">$2</a>");
	
//	text=text.replace("<", "&lt;");
//	text=text.replace(">", "&gt;");
	return text;
}

function setContentTable(){
	contents.sort(function(c0, c1){
		if(c0.ts<c1.ts) return -1*(timeDescending?-1:1);
		if(c0.ts>c1.ts) return 1*(timeDescending?-1:1);
		return 0;
	});
	var revButton="<input type=\"button\" value=\""+reverseText+"\" onclick=\"timeRev()\" id=\"timeRev\"/>";
	$("#contents").html("<tr><td></td><td></td><td></td><td>"+revButton+"</td></tr>");
	contents.forEach(function(cont){
		var d=new Date(cont.ts*1000);
		/*var mo=d.toLocaleString("en-us", { month: "short" })+".";
		var hr=('0'+d.getHours()).slice(-2);
		var mi=('0'+d.getMinutes()).slice(-2);
		var da=d.getDate()+ordinal(d.getDate());*/
		var un="";
		var im="";
		if(cont.user in users){
			un=users[cont.user].name;
			im="<img src=\""+users[cont.user].image_24+"\"/>";
		}
		var tr=$("<tr></tr>")
			.append("<td class=\"pad0\">"+im+"</td>")
			.append("<td>"+un+"</td>")
			.append("<td><pre>"+convUserRegex(cont.text)+"</pre></td>")
//			.append("<td>"+hr+":"+mi+" "+da+" "+mo+" "+d.getFullYear()+"</td>")
			.append("<td>"+timeString(d)+"</td>")
		$("#contents").append(tr);
	});
	$("#loadingMsg").css("visibility", "hidden");
	$("#contents").css("visibility", "visible");
}

function timeRev(){
	timeDescending=!timeDescending;
	$("#loadingMsg").css("visibility", "visible");
	setTimeout(function(){
		setContentTable();
	}, 0);
}
