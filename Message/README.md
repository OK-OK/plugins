## Usage

```html
<script src="Message.js"></script>
```

Then start:

```javascript
window.Message('message', function() {});

window.Message({
  message: 'message',
  font: 12,
  size: 'small'
  success: function() {},
});
```

# API

The `message` property defines the `String` or JS `Object`s to Message.

| `size` | `{'small', 'default', 'large'}`
