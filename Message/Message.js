'use strict';

var messageObj = {
	DOing: false,
	Message: function(msg, fn) {
		if(!msg) return 
		if(typeof msg === 'object') return this.obj(msg)
		if(typeof msg !== 'string') return
		var Obj = new Object()
		Obj.message = msg
		Obj.success = fn
		this.render.call(this, Obj)
	},
	obj: function(obj) {
		if(obj instanceof Array || !obj) return
		this.render.call(this, obj)
	},
	render: function(option) {
		if(this.DOing) return
		this.DOing = true
		var self = this
		var node = document.createElement('p')
		var obj = option
		this.addStyle(node, obj)
		document.body.appendChild(node)
		setTimeout(function (){
			node.style.top = '15px'
			setTimeout(function (){
				node.style.top = '-80px'
				node.addEventListener('transitionend', function () {
					document.body.removeChild(node)
					self.DOing = false
					if(typeof obj.success === 'function') obj.success()
				})
			}, 2500)
		}, 100)
	},
	addStyle: function(node, obj) {
		node.style.transform = 'translate3d(0,0,0)'
		node.style.transition = 'all 0.8s linear'
		node.style.position = 'fixed'
		node.style.top = '-80px'
		node.style.left = '50%'
		node.style.background = 'white'
		node.style.padding = '3vw 6vw'
		node.style.borderRadius = '5px'
		node.style.fontSize = '13px'
		node.style.zIndex = 100
		node.style.transform = 'translateX(-50%)'
		node.innerHTML = obj.message
		if(typeof obj.font === 'number') node.style.fontSize = obj.font + 'px'
		if(obj.size && obj.size === 'small') node.style.padding = '2vw 3vw'
		if(obj.size && obj.size === 'default') node.style.padding = '3vw 6vw'
		if(obj.size && obj.size === 'large') node.style.padding = '4vw 7vw'
	},
}

window.Message = messageObj.Message.bind(messageObj)
