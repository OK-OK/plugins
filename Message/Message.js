'use strict';

(function() {
	function Message(option, fn) {
		this.msg = ''
		this.size = 'default'
		this.font = '13px'
		this.succ = ''
		this.doing = false
		this.init(option, fn)
	}

	Message.prototype.render = function() {
		if(this.doing) return
		this.doing = true
		var self = this
		var node = document.createElement('p')
		this.addStyle(node)
		document.body.appendChild(node)
		setTimeout(function (){
			node.style.top = '15px'
			setTimeout(function (){
				node.style.opacity = 0
				node.addEventListener('transitionend', function () {
					document.body.removeChild(node)
					self.doing = false
					if(typeof self.succ === 'function') self.succ()
				})
			}, 2500)
		}, 100)
	}
			
	Message.prototype.init = function(option, fn) {
		if(typeof option === 'object') return this.obj(option)
		this.msg = option
		this.succ = fn
		this.render()
	}

	Message.prototype.obj = function(option) {
		this.msg = option.message
		if(option.size) this.size = option.size
		if(option.font) this.font = option.font
		this.render()
	}

	Message.prototype.addStyle = function(node) {
		node.style.transform = 'translate3d(0,0,0)'
		node.style.transition = 'all 0.8s linear'
		node.style.position = 'fixed'
		node.style.top = '-80px'
		node.style.left = '50%'
		node.style.background = 'white'
		node.style.borderRadius = '5px'
		node.style.fontSize = this.font
		node.style.zIndex = 100
		node.style.wordBreak = 'break-all'
		node.style.wordWrap = 'break-word'
		node.style.minWidth = '58%'
		node.style.width = 'auto'
		node.style.maxWidth = '80%'
		node.style.transform = 'translateX(-50%)'
		node.innerHTML = this.msg
		if(this.size === 'small') node.style.padding = '2vw 3vw'
		if(this.size === 'default') node.style.padding = '3vw 6vw'
		if(this.size === 'large') node.style.padding = '4vw 7vw'
	}

	window.Message = function (option, fn) {
		new Message(option, fn)
	}
})()
