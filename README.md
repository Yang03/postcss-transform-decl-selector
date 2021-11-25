# install

```
npm install postcss-transform-decl-selector --save-dev
```

### demo
```
 // postcss.config.js
  {
    'postcss-transform-decl-selector': {
      selector: ':root',
        transform: (decl) => {
          var oldValue = decl.value
          const val = oldValue.replace(/(\d*\.?\d+)(px)/g, (match, value, unit) => {
            return parseInt(value, 10) * 2 + unit;
          })
  
          decl.value = val;
        }
    },
  } 
```