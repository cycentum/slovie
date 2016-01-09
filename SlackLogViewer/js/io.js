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

var zipFile;

function fileSelected(files){
	$("#err").empty();
	if(files.length==0) return;
	zipFile=files[0];
	loadUserChannel();
}

function loadUserChannel(){
	var reader=new FileReader();
	reader.onload=function(event){
		var zip;
		try{
			zip=new JSZip(this.result);
		}
		catch(e){
			$("#channels").css("visibility", "hidden");
			$("#err").text(notAZipFileText);
			return;
		}
		if(!("users.json" in zip.files) || !("channels.json" in zip.files)){
			$("#channels").css("visibility", "hidden");
			$("#err").text(notASlackLogFileText);
			return;
		}
		var users=zip.file("users.json");
		setUsers(JSON.parse(users.asText()));
		var channels=zip.file("channels.json");
		setChannels(JSON.parse(channels.asText()));
		setChannelSelect();
	};
	reader.readAsArrayBuffer(zipFile);
}

function loadContent(channel){
	var reader=new FileReader();
	reader.onload=function(event){
		var zip=new JSZip(this.result);
		for(fn in zip.files){
			if(!fn.startsWith(channel.name)) continue;
			var f=zip.files[fn];
			if(f.dir) continue;
			var c=zip.file(fn);
			addContent(JSON.parse(c.asText()));
		}
		setContentTable();
	};
	reader.readAsArrayBuffer(zipFile);
}