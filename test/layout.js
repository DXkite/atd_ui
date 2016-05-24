'use strict'; //开启Javascript严格模式
// 监听事件 on xxx
// window.onload 事件
atd.tool.objOn(window,{'load':
function(){
	// 创建的容器
	var ctr=document.getElementById('htmlcreater');
	// 自定义的控件
	function button_object()
	{
		var text='Button';

		atd.ui.UICss('button',
		{
			'.button':
			{
				border: 'none',
				color:' white',
				padding:' 16px 32px',
				'text-align': 'center',
				'text-decoration': 'none',
				display: 'inline-block',
				'font-size': '16px',
				margin: '4px 2px',
				'transition-duration': '0.4s',
				cursor: 'pointer',
				'background-color': 'white',
				color: 'black',
				border: '2px solid  #f44336',
			},
			'.button:hover':
			{
			   'background-color':  '#f44336',
			    color: 'white',
			}
		});
		var _root=atd.tool.element('button');
		this.bindEvent=function(events)
		{
			atd.tool.objOn(_root,events);
		}
		this.setAttrs=function(attrs)
		{
			if (attrs.text)
				text=attrs.text;
		}
		// this.addChild=function(childs){}
		this.create=function()
		{
			atd.tool.objAttrs(_root,{class:'button'});
			_root.innerHTML=text;
			return _root;
		}
	}
	// 注册控件
	atd.ui.UIRegister('button',button_object);


	console.time('createHTML');
	// 在ctr上创建界面
 	atd.ui.UIBuilder(ctr, //界面生成被绑定的div
 	[
 		{
 	 		$:'button', //控件名
 	 		text:'Hello World', //控件属性
 	 		// 事件绑定
 	 		click:function() 
 	 		{
 	 			atd.ui.PopTip('Click Events On Button').show();
 	 		},
 	 		mouseover:function()
 	 		{
 	 			atd.ui.PopTip('Mouse Over Events On Button').show();
 	 		},
 	 	},
 	 ]);
}});