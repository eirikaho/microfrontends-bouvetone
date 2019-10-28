## The Custom Elements specification

```javascript
class AwesomeComponent extends HTMLElement {}
customElements.define("awesome-component", AwesomeComponent);
```

```html
<awesome-component>
    I'm super awesome! Interact with me, user!
</awesome-component>
```

Note:
https://www.webcomponents.org/specs
1. Custom tags
2. Adskilte deler med egne DOMs
3. Instansiering av DOM-elementer runtime.
4. Gjenbruk/import av JS.
