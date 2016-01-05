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