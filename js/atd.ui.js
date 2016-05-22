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
			//animation:'info_anim '+delay+'ms forwards'
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

atd.ui.PopTip=function()
{	
	// 绘制层
	/*if (!atd.ui.PopTipDiv)
	{
		atd.ui.PopTipDiv=atd.tool.element('div',null,
		{
				position: 'fixed',
				bottom: '0px',
				left: '0px',
				'max-height': '100%',
				overflow:'auto',
				margin: 'auto',
				padding:'0px',
				width:'100%',
		});
		atd.doc.body.appendChild(atd.ui.PopTipDiv);
	}*/
	if (!atd.ui.PopTipCss)
		atd.ui.PopTipCss=
		{
			'background-color':'rgba(0,0,0,0.75)',
			'border-radius':'0.5em',
			'box-shadow':'0 0 1px 2px #ccc',
			'color':'white',
			display:'inline-block',
			padding:'0.5em',
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
	
	var ingnore=false;

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
				atd.tool.objCss(div,{'transition':'0.3s',opacity:0});
				setTimeout(function(){
					atd.doc.body.removeChild(div);
					show();	
					if (atd.ui.PopTipQueue.length===0)
						ingnore=false;
				},300);
			}		
			atd.doc.body.appendChild(div);
			atd.tool.objCss(div,{opacity:1});
			div.style.left=(atd.doc.body.offsetWidth/2-div.offsetWidth/2)+'px';
			setTimeout(close,timeout);
		}
	}
	
	this.show=function()
	{
		console.log('ingnore:'+ingnore);
		if (ingnore===false)
		{
		 	show();	
		 	ingnore=true;
		}
		return this;
	};
	return this;
};