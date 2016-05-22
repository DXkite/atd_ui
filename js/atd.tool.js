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
	var name=atd.tool.trim(name);
	return typeof atd.style[name] === 'undefined'?atd.css_prefix+name:name;
}

atd.tool.objCss=function(obj,cssObj)
{
	for (var name in cssObj) {
		obj.style[atd.tool.prefixName(name)]=cssObj[name];
	}
	return obj;
}
atd.tool.each=function(array, func)
{
    if (array) 
    {
        for ( var i = 0; i < ary.length; i ++ ) {
            if (ary[i] && func(ary[i], i, ary)) {
                    break;
            }
        }
    }
}
atd.tool.objOn=function(obj,eventObj)
{
	function bind(objbind,event,callback){
		if (objbind.addEventListener)
 		  	objbind.addEventListener(event,callback,false);
  		else
  			objbind.attachEvent('on'+name,callback);
	}

	if (obj)
	{
		for (var name in eventObj)
		{
			if(atd.tool.isFunction(eventObj[name]))
			{
				bind(obj,name,eventObj[name]);
			}
			else
			{
				console.log(name+' is not function');
			}
		}
	}
	
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

atd.tool.element=function (name,attrs,css) {
	var obj=atd.tool.setAttrs(name,attrs);
	return atd.tool.objCss(obj,css);
}

atd.tool.keyframes=function(name,animation) {
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
atd.tool.css=function(name,css) {
	console.time('createCSS');
	var css=name+atd.tool.createCssString(css);
	atd.css.innerHTML+=css;
	document.head.appendChild(atd.css);
	console.timeEnd('createCSS');
	return css;
}

// localStorage 缓存
atd.tool.cacheCss=function(name,callback) {
	if (typeof name!== 'string' )
		throw ('atd.tool.cacheCss:name must be string!');
	if (window.localStorage)
	{
		if (window.localStorage[name]===undefined )
		{
			var css='';
			if (atd.tool.isFunction(callback))
			{
				css=callback();
			}
			else
			{
				for (var name in callback)
				{
					css+=name+atd.tool.createCssString(callback[name]);
				}
			}
			window.localStorage.setItem(name,css);
			atd.css.innerHTML=css;
		}
		else
		{
			atd.css.innerHTML+=window.localStorage[name];
		}
		document.head.appendChild(atd.css);
	}
}
atd.tool.isFunction=function(it) {
        return Object.prototype.toString.call(it) === '[object Function]';
}

atd.tool.isArray=function (it) {
    return Object.prototype.toString.call(it) === '[object Array]';
}

atd.tool.ajax=function(type)
{
	var ajax_object=new window.XMLHttpRequest || new ActiveXObject('Microsoft.XMLHTTP');

	if (type)
	{
		for (var name in type)
		{
			console.log(name+type[name]);
		}
	}
	return ajax_object;
}


/*------------init-------------*/
atd.css=atd.tool.element('style',{type:"text/css",rel:"stylesheet"});