//main.js
'use strict';
window.onload=function(){

 	var toptip=atd.ui.TopTip();
 	var popbtn=document.getElementById('btn-popinfo');
	var chick_times=2000;
	
	if (window.localStorage)
	{
		toptip.pop('你的浏览器支持本地缓存(localStorage)');
	}
	else
	{
		toptip.pop('你的浏览器不支持本地缓存(localStorage)~~浏览器该换了啊哈哈');
	}
	toptip.pop('测试样式表');
	var storage = window.localStorage;
	function showStorage(){
	 for(var i=0;i<storage.length;i++){
	  toptip.pop('本地缓存>>'+storage.key(i)+ " : " + storage.getItem(storage.key(i)),500);
	 }
	}
	showStorage();
	
	popbtn.onclick=function()
	{

		if (localStorage.getItem('test')!==null)
		{
			localStorage.removeItem('test');
			localStorage.setItem('test','helloworld>'+chick_times);
		}else
		{
			localStorage.setItem('test','helloworld>'+chick_times);
		}
		showStorage();
		console.time('createPop');
		toptip.pop('弹出泡泡提示，会在'+chick_times+'毫秒后消失！',chick_times);
		console.timeEnd('createPop');
		chick_times+=10;
	}

};