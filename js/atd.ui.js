//atd.ui.js
// 界面集
'use strict';
atd.ui={};

atd.ui.TopTip=function()
{
	if (!atd.ui.TopTipDiv)
	{
		atd.ui.TopTipDiv=atd.tool.element('div',null,
		{
				position: 'fixed',
				top: '0px',
				left: '0px',
				'max-height': '100%',
				overflow:'auto',
				margin: '0px',
				padding:'0px',
				width:'100%',
		});
		atd.doc.body.appendChild(atd.ui.TopTipDiv);
	}
	var TopTips=atd.ui.TopTipDiv;
	var top=null;
	this.TopTip.pop=function(html,delay)
	{
		var tip=atd.tool.element('div',null,
		{
			'background-color': '#1ea0fd',
			padding: '1em 3em 1em 1.5em',
			color: 'white',
			display: 'block',
			'box-shadow':' 0 0 1px 1px #ccc',
			'margin-bottom': '0.4em',
			cursor: 'pointer',
			position:'relative'
		});
		tip.close=function (delay_close)
		{
			var delay_close=delay_close||300;
			atd.tool.objCss(this,{opacity: '0',transition:'opacity '+delay_close+'ms ease-out'});
			setTimeout(
			function()
			{
				TopTips.removeChild(tip);
			},delay_close);
		}
		var close=atd.tool.element('div',null,
			{
				'border-radius': '50%',
				content: ' ',
				position:'absolute',
				right: '1em',
				top: '1em',
				height: '1em',
				width: '1em',
				display:' block',
				transition:'0.3s',
				'background-color': '#fff566',
				'box-shadow':' 0 0 1px 1px #888',
			}
		);
		var textnode=atd.tool.element('div');
		textnode.innerHTML=html;

		tip.appendChild(textnode);
		tip.appendChild(close);
		TopTips.insertBefore(tip,TopTips.firstChild); 
		if (delay)
		{
			var id=setTimeout(
			function()
			{
				tip.close();
			},
			delay);
		}
		close.onclick=function()
		{
			if (id) clearTimeout(id);
			tip.close();
		}

	}

	return this.TopTip;
}

atd.ui.PopTip=function(text,time,attr,css)
{	
	if (!atd.ui.PopTipCss)
		atd.ui.PopTipCss=
		{
			'background-color':'rgba(0,0,0,0.75)',
			'border-radius':'0.5em',
			'color':'white',
			display:'inline-block',
			padding:'0.8em',
			margin:'0.5em',
			cursor:'pointer',
			position:'fixed',
			'text-algin':'center',
			transition:'0.3s',
			opacity:0,
		};
	// 顺序队列
	if (!atd.ui.PopTipQueue)
	{
		atd.ui.PopTipQueue=new Array();
	}
	this.pop=function(text,time,attr,css)
	{
		atd.ui.PopTipQueue.push({msg:text,time:time,attr:attr,css:css});
		return this;
	}
	if (!atd.ui.PopTipIngnore)
		atd.ui.PopTipIngnore=false;
	function show()
	{
		var next=atd.ui.PopTipQueue.shift();
		if (next)
		{
			var css=next.css||atd.ui.PopTipCss;
			var div=atd.tool.element('div',next.attr,css);
			div.innerHTML=next.msg;
			var timeout=next.time || 2000;
			var close=function()
			{
				atd.tool.objCss(div,{'transition':'0.3s ease-out',opacity:0});
				setTimeout(function(){
					atd.doc.body.removeChild(div);
					show();	
					if (atd.ui.PopTipQueue.length===0)
						atd.ui.PopTipIngnore=false;
				},300);
			}		
			atd.doc.body.appendChild(div);
			div.style.left=(atd.doc.body.clientWidth/2-div.clientWidth/2)+'px';
			div.style.bottom='1em';
			setTimeout(function(){atd.tool.objCss(div,{opacity:1,transition:'0.1s ease-in'});},100);
			setTimeout(close,timeout);
		}
	}
	this.show=function()
	{
		if (atd.ui.PopTipIngnore===false)
		{
		 	show();	
		 	atd.ui.PopTipIngnore=true;
		}
		return this;
	};
	if (arguments.length>0)
		this.pop(text,time,attr,css);
	return this;
};
atd.ui.register={};
atd.ui.css={};
atd.ui.UIRegister=function(name,builder)
{
	// if (atd.ui.register.hasOwnProperty(name)){
	// 	throw 'mutil ui:"'+name+'" register';
	// }
	atd.ui.register[name]=builder;
	return atd.ui.register;
}
atd.ui.UICss=function(name,css)
{
	if (!atd.ui.css[name]){
		atd.tool.cacheCss(name,css);
		atd.ui.css[name]=true;
	}
}

atd.ui.UIBuilder=function(body,json,eventbind)
{
	if (typeof body !== 'object')
		throw 'body must be objects';
	var body=body||atd.doc.body;
	var catch_object=[];

	function createUI(obj,eventbind)
	{
		console.assert( obj.$ );
		var attrs={};
		var events={};
		var child_objects=obj._;
		var ui_name=obj.$;
		var override=false;

		if (obj.$) delete obj.$;
		if (obj._) delete obj._;
		var catch_id=null;
		// 捕获ID
		if (obj['#']){
			if (eventbind && eventbind[obj['#']])
				events=eventbind[obj['#']];
			catch_id=obj['#'];
			delete obj['#']; 
		}

		/*获取事件和属性*/
		for (var name in obj) {
			if (atd.tool.isFunction(obj[name])){
				events[name]=obj[name];
			}
			else{
				attrs[name]=obj[name];
			}
		}

		if (ui_name.match(/^@/))
		{
			ui_name=ui_name.substr(1);
			override=true;
		}
		/*标准扩展控件*/
		if (atd.ui.register[ui_name] && !override){
			var std_ui=new atd.ui.register[ui_name]();
			if (std_ui.setAttrs) std_ui.setAttrs(attrs);
			if (std_ui.bindEvent) std_ui.bindEvent(events);
			if (std_ui.addChild) {
				for (var i in child_objects){
					if (typeof child_objects[i] === 'string'){
						std_ui.addChild(atd.doc.createTextNode(child_objects[i]));
					}
					else{
						std_ui.addChild(createUI(child_objects[i],eventbind));
					}
				}
			}
			if (catch_id){
				catch_object[catch_id]=std_ui.render();
				return catch_object[catch_id];
			}
			return std_ui.render();
		}else{

			/*原生控件*/
			var native_ui=atd.tool.element(ui_name);
			atd.tool.objAttrs(native_ui,attrs);
			atd.tool.objOn(native_ui,events);
			for (var i in child_objects){
				if (typeof child_objects[i] === 'string'){
					native_ui.appendChild(atd.doc.createTextNode(child_objects[i]));
				}
				else{
					native_ui.appendChild(createUI(child_objects[i],eventbind));
				}
			}
			if (catch_id){
				catch_object[catch_id]=native_ui;
			}
			return native_ui;
		}
	}

	if (atd.tool.isArray(json))
	{
		for (var i in json)
			body.appendChild(createUI(json[i],eventbind));
	}
	else
		body.appendChild(createUI(json,eventbind));
	return catch_object;
}
