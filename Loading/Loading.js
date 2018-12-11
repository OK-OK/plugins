(function() {
	var DIV = document.createElement('div');
	var P = document.createElement('p');

	document.body.appendChild(DIV);
	document.body.appendChild(P);

	function addstyle(url, option) {
		var options = option || {};
		var DIVstyle = DIV.style;
		var Pstyle = P.style;
		DIVstyle.height = '100%';
		DIVstyle.width = '100%';
		DIVstyle.backgroundColor = options.backgroundColor || 'white';
		DIVstyle.position = 'absolute';
		DIVstyle.opacity = options.opacity || 0;
		DIVstyle.left = 0;
		DIVstyle.top = 0;
		Pstyle.transform = 'translate3d(0,0,0)';
		Pstyle.backgroundImage = 'url(' + url + ')';
		Pstyle.height = options.height || '30px';
		Pstyle.width = options.width || '30px';
		Pstyle.backgroundSize = '100% 100%';
		Pstyle.position = 'absolute';
		Pstyle.left = '50%';
		Pstyle.top = '50%';
		Pstyle.transform = 'translate(-50%, -50%)';
		Pstyle.animation = 'rotate 2.3s infinite linear';
		// add @keyframe
		var style = document.createElement('style');
		style.id = 'keyframe';
		style.innerHTML = '@-webkit-keyframes rotate { 0% { transform: rotate(0) } 100% { transform: rotate(720deg) } }';
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function Loading(url, options) {
		addstyle(url, options)
	}

	function stopLoading(time) {
		var style = document.getElementsByTagName('style');
		for(var it in style) {
			if(style[it]) {
				if(style[it].id == 'keyframe') style = style[it];
			}
		}
		if(time) {
			setTimeout(function() {
				document.body.removeChild(DIV);
				document.body.removeChild(P);
				document.querySelector('head').removeChild(style);
			}, time)
		} else {
			document.body.removeChild(DIV)
			document.body.removeChild(P)
			document.querySelector('head').removeChild(style)
		}
	}

	window.Loading = Loading;
	window.stopLoading = stopLoading;
})()