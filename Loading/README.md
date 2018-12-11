Loading

## Usage

```html
<script src="Loading.js"></script>
```

Then start:

```javascript
window.Loading('xxx.png', options);

window.Loading('xxx.png', {
	width: '60px',			icon宽度
	height: '60px',			icon高度
	opacity: 1,			背景透明度
	backgroundColor: 'red',		背景颜色
});
```

Then stop:

```javascript

window.stopLoading(time); 	延时time毫秒后执行

```

# API

The `options` property defines the JS `Object`.

| `opacity` | `default: 0`
| `backgroundColor` | `default: white`
| `width` | `default: 30px`
| `height` | `default: 30px`
