<!-- 
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
-->

<?php
require "./php/setLanguage.php";
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Slovie -Slack LOg VIEwer-</title>
</head>
<link rel="stylesheet" href="./style/lib/html5reset-1.6.1.css" />
<link rel="stylesheet" href="./style/style.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
<script type="text/javascript" src="./js/lib/jszip.js"></script>
<script type="text/javascript" src="./js/lib/jquery.blockUI.min.js"></script>
<!-- <script type="text/javascript" src="./js/lib/jquery_lazyload_min.js"></script> -->
<script type="text/javascript" src="./js/main.js"></script>
<script type="text/javascript" src="./js/io.js"></script>
<script type="text/javascript" src="./js/user.js"></script>
<script type="text/javascript" src="./js/channel.js"></script>
<script type="text/javascript" src="./js/content.js"></script>
<script type="text/javascript" src="./js/attachedfile.js"></script>
<script type="text/javascript" src="./js/utils.js"></script>
<script type="text/javascript" src="./js/language.js"></script>
<script type="text/javascript" src="./js/text/<?php echo $lang;?>.js"></script>
<body>
<h1><a href="http://slovie.cycentum.com/">Slovie -Slack LOg VIEwer-</a></h1>
<input type="file" onchange="fileSelected(this.files)" accept=".zip"/>
<select name="channels" id="channels" class="hid" onChange="channelSelected()"></select>
<input type="button" class="hid" id="exportButton" value="<?php echo $export;?>" onclick="openExportDialog()"/>
<span id="loadingMsg" class="hid"><?php echo $loading;?></span>
<div id="contentAll" class="hid top1em"></div>
<p id="notice"><?php echo $notice;?></p>
<div id="err" class="red"></div>
<div id="msg"></div>
<div class="top1em"><?php echo $futurePlans;?></div>
<div class="top1em">
<?php echo $language;?>: <select name="langSelect" id="langSelect" onChange="languageSelected()">
<option value="en" id="enOption">English</option>
<option value="ja" id="jaOption">日本語</option>
</select>
</div>
<div class="top1em">GitHub: <a href="https://github.com/cycentum/slovie">https://github.com/cycentum/slovie</a></div>
<p id="copyright">&copy; 2015-2016 Takuya KOUMURA.</p>


<div id="exportDialog" title="<?php echo $export;?>">
	<div class="top1em">
		<?php echo $selectChannel;?>: <select id="exportChannel" name="exportChannel" size="4" multiple></select><br/>
	</div>
	<div class="top1em">
		<?php echo $filename;?>: <input type="text" value="" id="exportFilename" size="40"/>_<?php echo $channelName;?>.txt
	</div>
	<div class="top1em"> 
		<?php echo $sortingOrder;?>: 
		<label><input type="radio" name="exportDescending" value="1" checked/><?php echo $newerToOlder;?></label>
		<label><input type="radio" name="exportDescending" value="0"/><?php echo $olderToNewer;?></label>
	</div>
	<input type="button" value="<?php echo $export;?>" onClick="execExport()">
	<div id="exportMsg" class="red"></div>
	<div class="top1em" style="line-height:120%"><?php echo $exportCaution;?></div>
<!-- 	<a href="" download="" id="exportLink" class="hid"></a> -->
	<div id="exportLink" class="hid"></div>
</div>

<div id="loadingBlockDialog" class="blockDialog" style="display:none">
	<?php echo $loading;?>
</div>
<div id="exportingBlockDialog" class="blockDialog" style="display:none">
	<?php echo $exporting;?>
</div>
</body>
</html>