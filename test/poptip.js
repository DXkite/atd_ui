//ui-poptip

'use strict';
atd.tool.objOn(window,{'load':
function(){

 	var poptip=new atd.ui.PopTip();
 	atd.ui.PopTip('A PopTip Simple Test').show();
 	var popbtn=document.getElementById('btn-popinfo');
 	console.timeEnd('createDivs');
	var chick_times=2000;
	poptip.pop('你的浏览器的前缀：'+atd.css_prefix);
	if(atd.tool.ajax())
		poptip.pop('你的浏览器支持AJAX技术').show();
	if (window.localStorage)
	{
		poptip.pop('你的浏览器支持本地缓存');
	}
	else
	{
		poptip.pop('你的浏览器不支持本地缓存~~浏览器该换了啊哈哈');
	}

	atd.tool.objOn(popbtn,
	{
		click:function()
		{
			poptip.pop('弹出泡泡提示，会在'+chick_times+'毫秒后消失！',chick_times).show();
			chick_times+=10;
		}
	});
}});