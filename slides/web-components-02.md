## The shadow DOM specification

```javascript
const header = document.createElement('header');
const shadowRoot = header.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; 
```

Note:
https://www.webcomponents.org/specs
1. Custom tags
2. Adskilte deler med egne DOMs
3. Instansiering av DOM-elementer runtime.
4. Gjenbruk/import av JS.
