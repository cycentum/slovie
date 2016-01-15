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

function Content(obj, attachedFiles){
	this.user=obj.user;
	this.text=obj.text;
	this.ts=obj.ts;
	this.subtype=obj.subtype;
	
	if(this.subtype=="file_share"){
		addFileIfAbsent(obj.file, attachedFiles);
		var f=attachedFiles[url(obj.file)];
		this.file=f;
		if(obj.file.initial_comment!=null){
			f.comments.push(new FileComment(obj.file.initial_comment));
		}
	}
}

function addNewContent(obj, contents, attachedFiles){
	if(obj.subtype=="file_comment"){
		addFileIfAbsent(obj.file, attachedFiles);
		var f=attachedFiles[url(obj.file)];
		f.comments.push(new FileComment(obj.comment));
	}
	else{
		var c=new Content(obj, attachedFiles);
		contents.push(c);
	}
}
