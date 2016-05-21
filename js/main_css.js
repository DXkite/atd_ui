function main_css()
{
	var css=
	atd.tool.css(
		'#btn-popinfo',
		{
			position: 'fixed',
			bottom: '0px',
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
		}
	);
	css+=atd.tool.css(
		'#btn-popinfo:hover',
		{
	   'background-color':  '#f44336',
	    color: 'white',
		}
	);
	return css;
}

atd.tool.cache_css('atd_main_css',main_css);