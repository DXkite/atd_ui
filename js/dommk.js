// dommk.js
// use to mk dom

function dommk(div)
{
	"use strict";
	this._div=div;
}
dommk.prototype=
{
	create:function (set)
	{
		var node=this._div;
		for (var name in set)
		{
			if (typeof set[name] === 'object')
			{
				node.appendChild(this.createNode(name,set[name]));
			}
			else
			{
				node.setAttribute(name,set[name]);
			}
		}
	},

	createNode:function(name,set)
	{
		var node=document.createElement(name);
		for (var name in set) {
			if (typeof set[name] === 'object')
			{
				node.appendChild(this.createNode(name,set[name]));
			}
			else
			{
				node.setAttribute(name,set[name]);
			}
		}
		return node;
	}
}

/*
//main.js
window.onload=function()
{
	var a=new dommk(document.getElementById('this'));
	a.create({
		div:{
			id:'a',name:'node1',
			a:{id:'c',name:'node3'},
		},
		h1:{id:'b',name:'node2'},
		class:'class',
		id:'hello',
	});
}
*/