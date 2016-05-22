//main.js
'use strict';

atd.tool.css('#overflow::'+atd.css_prefix+'scrollbar ',
	{
		width: '10px',
	})
atd.tool.css('#overflow::'+atd.css_prefix+'scrollbar-track',
	{
		'border-radius': '10px',
		'background-color': 'rgba(25, 147, 147, 0.1)',
	})
atd.tool.css('#overflow::'+atd.css_prefix+'scrollbar-thumb',
	{
		'border-radius': '10px',
		'background-color': 'rgba(25, 147, 147, 0.2)',
	})
window.onload=function(){
	
 	var poptip=new atd.ui.PopTip();
	poptip.pop('提示',300).show();
	poptip.pop('提示2',600).show();
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

	atd.tool.ajax({
		get:'/ui/ui.css'
	},{});


	atd.tool.objOn(popbtn,
	{
		click:function()
		{
			poptip.pop('弹出泡泡提示，会在'+chick_times+'毫秒后消失！',chick_times).show();
			chick_times+=10;
		}
	});
};