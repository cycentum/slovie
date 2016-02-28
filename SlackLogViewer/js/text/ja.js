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

var lang="ja";

var selectChannelText="チャネルを選択";
var reverseText="&uarr;&darr;";
var notAZipFileText="zip形式のファイルですか？";
var notASlackLogFileText="Slackのログファイルですか？";
var setFilenameError="ファイル名を入力してください。";
var selectChannelError="チャネルを選択してください。";

function timeString(date)
{
	var mo=date.toLocaleString("ja-jp", { month: "short" });
	var hr=('0'+date.getHours()).slice(-2);
	var mi=('0'+date.getMinutes()).slice(-2);
	return date.getFullYear()+"年"+mo+date.getDate()+"日 "+hr+":"+mi;
}
