# VANILLA JS

```javascript
let clicksInternal = 0;
let clicksExternal = 0;
const handleClick = () => {
    clicksInternal = clicksInternal + 1;
    document.getElementById("counterInternal").innerHTML = `Intern teller = <b>${clicksInternal}</b>`;
};
const dispatch = () => {
    window.dispatchEvent(new CustomEvent('js:clicked', {
        bubbles: true,
    }));
};
class WebComponent extends HTMLElement {
    connectedCallback() {
        this.render();
        window.addEventListener('react:clicked', this.handleEvent);
        window.addEventListener('vue:clicked', this.handleEvent);
        window.addEventListener('angular:clicked', this.handleEvent);
    }
    handleEvent() {
        clicksExternal = clicksExternal + 1;
        document.getElementById("counterExternal").innerHTML = `Ekstern teller = <b>${clicksExternal}</b>`;
    }
    render() {
        this.innerHTML = `
<div style="border: 3px solid orange">
    <h2>En Web Component skrevet i ren JavaScript</h2>
    <p id="counterInternal">Intern teller = <b>0</b></p>
    <p id="counterExternal">Ekstern teller = <b>0</b></p>
    <button onclick="handleClick()">Intern +1</button>
    <button onclick="dispatch()">Ekstern +1</button>
</div>
`;
    }
    disconnectedCallback() {
        window.removeEventListener('react:clicked', this.handleEvent);
    }
}
window.customElements.define('test-comp-js', WebComponent);
```
