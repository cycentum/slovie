/*  
 * Copyright (c) 2016 Takuya KOUMURA.
 * http://slovie.cycentum.com/
 * 
 * This file is part of Slovie.
 * 
 * Slovie is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at 
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 */

function AttachedFile(obj){
	this.url=url(obj);
	this.name=obj.name;
	this.mimetype=obj.mimetype;
	this.comments=[];
	if(obj.initial_comment!=null){
		this.comment0=new FileComment(obj.initial_comment);
	}
}

function addFileIfAbsent(obj, attachedFiles){
	if(!(url(obj) in attachedFiles)){
		var f=new AttachedFile(obj);
		attachedFiles[f.url]=f;	
	}
}

function url(fileObj){
	return fileObj.url_private;
}

function FileComment(obj){
	this.user=obj.user;
	this.comment=obj.comment;
	this.ts=obj.timestamp;
}
