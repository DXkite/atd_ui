//atd.tool.js
// 工具集
'use strict';
atd.tool={};
atd.tool.setAttrs=function(obj,attrs)
{
	if (typeof obj === 'string')
	{
		obj=atd.doc.createElement(obj);
	}

	for (var name in attrs) {
		obj.setAttribute(name,attrs[name]);
	}
	return obj;
}
atd.tool.trim=function(text)
{
	return text.replace(/(^\s+)|(\s+$)/g,'');
}
atd.tool.ltrim=function(text)
{
	return text.replace(/^\s+/,'');
}
atd.tool.rtrim=function(text)
{
	return text.replace(/\s+$/,'');
}

atd.tool.prefixName=function(name)
{
	return typeof atd.style[name] === 'undefined'?atd.css_prefix+atd.tool.trim(name):atd.tool.trim(name);
}

atd.tool.addCss=function(obj,cssObj)
{
	for (var name in cssObj) {
		obj.style[atd.tool.prefixName(name)]=cssObj[name];
	}
	return obj;
}
atd.tool.createCssString=function (cssObj)
{
	var text='{';
	for (var name in cssObj)
	{
		text+=atd.tool.prefixName(name);
		text+=':'+ cssObj[name]+';';
	}
	return text+'}';
}

//console.log(atd.tool.createCssString({margin:0,top:0,animation:'info_anim 3ms forwards'}));
atd.tool.Element=function (name,attrs,css)
{
	var obj=atd.tool.setAttrs(name,attrs);
	return atd.tool.addCss(obj,css);
}
atd.css=atd.tool.Element('style',{type:"text/css",rel:"stylesheet"});

atd.tool.keyframes=function(name,animation)
{
	console.time('createKeyframes');
	var keyframes='@'+atd.css_prefix+'keyframes '+name+'{';
	for (var name  in animation )
	{
		var key=/\d+/.test(name)? name+'%':name;
		keyframes+=key+atd.tool.createCssString(animation[name]);
	}
	keyframes+='}';
	atd.css.innerHTML+=keyframes;
	document.head.appendChild(atd.css);
	console.timeEnd('createKeyframes');
	return keyframes;
}

// 后续添加语法扩展
atd.tool.css=function(name,css)
{
	console.time('createCSS');
	var css=name+=atd.tool.createCssString(css);
	atd.css.innerHTML+=css;
	document.head.appendChild(atd.css);
	console.timeEnd('createCSS');
	return css;
}
// localStorage 缓存
atd.tool.cache_css=function(name,callback)
{
	var toptip=atd.ui.TopTip();
	if (window.localStorage)
	{
		if (window.localStorage[name]===undefined )
		{
			toptip.pop('正在设置CSS缓存。。。',500);
			window.localStorage.setItem(name,callback());
		}
		else
		{
			toptip.pop('正在读取CSS缓存.。。',500);
			document.head.appendChild(atd.css);
			atd.css.innerHTML=window.localStorage[name];
		}
	}
}