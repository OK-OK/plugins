(function () {
	function showBigImg (url) {
		if(!(this instanceof showBigImg)) return new showBigImg(url)
		this.url = url
		this.doing = false
		this.init()
	}
	showBigImg.prototype = {
		init: function () {
			if(!this.url) return
			this.initUrl(this)
		},
		initUrl(self) {
			var img = new Image()
			img.onload = function () {
				self.addStyle(img)
			}
			img.src = this.url
		},
		addStyle: function (node) {
			var div = document.createElement('div')
			document.body.style.overflow = 'hidden'
			node.style.transform = 'translate3d(0, 0, 0)'
			node.style.width = '100%'
			node.style.maxHeight = '100%'
			node.style.position = 'absolute'
			node.style.top = '50%'
			node.style.left = '50%'
			node.style.transform = 'translate(-50%, -50%)'
			node.style.transition = 'all 0.7s ease-in-out'
			div.style.width = '100%'
			div.style.height = '100%'
			div.style.transition = 'all 0.7s ease-in-out'
			div.style.backgroundColor = 'rgba(0, 0, 0, 1)'
			div.style.position = 'absolute'
			div.style.top = '50%'
			div.style.left = '50%'
			div.style.transform = 'translate(-50%, -50%)'
			div.appendChild(node)
			document.body.appendChild(div)
			this.addListener(div, node)
		},
		addListener: function (node, img) {
			var self = this
			var startY, direction
			node.onclick = function () {
				self.destory('click', node, img)
			}
			node.ontouchstart = function (e) {
				startY = e.touches[0].pageY
			},
			node.ontouchmove = function (e) {
				if(self.doing) return
				var moveY = startY - e.touches[0].pageY
				if(moveY > 0) {
					if(1 - moveY * 0.01 <= 0.3 || self.doing) return
					// 向上滑动
					if(!direction) direction = 1
					node.style.backgroundColor = 'rgba(0, 0, 0,' + (1 - moveY * 0.01) + ')'
					img.style.top = '49%'
				} else if(moveY == 0) {
					node.style.backgroundColor = 'rgba(0, 0, 0, 1)'
					img.style.top = '50%'
				} else {
					// 向下滑动
					if(direction === 1 || direction === undefined) direction = 0
					if(1 - Math.abs(moveY * 0.01) <= 0.3 || self.doing) return
					node.style.backgroundColor = 'rgba(0, 0, 0,' + (1 - Math.abs(moveY * 0.01)) + ')'
					img.style.top = '51%'
				}
			},
			node.ontouchend = function (e) {
				if(self.doing) return
				var endY = e.changedTouches[0].pageY
				if(Math.abs(startY - endY) < 80) {
					node.style.backgroundColor = 'rgba(0, 0, 0, 1)'
					img.style.top = '50%'
					return direction = undefined
				}
				self.destory('move', node, img, direction)
			}
		},
		destory: function (name, node, img, direction) {
			var self = this
			if(self.doing) return
			self.doing = true
			if(name == 'click') {
				setTimeout(function () {
					node.style.opacity = 0		
				}, 100) 
				img.style.transform = img.style.transform + ' scale(1.7)'		
			} else {
				if(typeof direction !== 'number') return self.doing = false
				if(direction) {
					img.style.top = document.body.clientHeight * 1.4 + 'px'
				} else {
					img.style.top = -document.body.clientHeight * 0.4 + 'px'
				}
				node.style.backgroundColor = 'rgba(0, 0, 0, 0)'
			}
			img.addEventListener('transitionend', (e) => {
				img.style.display = 'none'
				setTimeout(function () {
					self.doing = false
					node.style.display = 'none'
					document.body.style.overflow = ''
					document.body.removeChild(node)
				}, 200)
			});
		}
	}
	
	window.showBigImg = showBigImg
})()