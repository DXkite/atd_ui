//atd.ui.js
// 界面集
'use strict';
atd.ui={};
atd.ui.TopTipCanvas=atd.tool.element('div',null,
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
atd.doc.body.appendChild(atd.ui.TopTipCanvas);
atd.ui.TopTip=function()
{
	var TopTips=atd.ui.TopTipCanvas;
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
