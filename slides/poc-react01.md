# React

```javascript
import '@babel/polyfill';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// OBS! Workaround for React-bug/designproblem knyttet til hvordan React håndterer events.
// Se diskusjon og React-designproblem: https://github.com/facebook/react/issues/9242
// Se dok: https://github.com/spring-media/react-shadow-dom-retarget-events
import retargetEvents from 'react-shadow-dom-retarget-events';

import less from './style/main.less';
import App from './components/App';
import configureStore from './stores/configureStore';
const store = configureStore();

// Setter opp basert på https://reactjs.org/docs/web-components.html
class WebComponent extends HTMLElement {
    connectedCallback() {
        const mountPoint = document.createElement('span');
        this.id = 'test-comp-react';
        mountPoint.id = 'test-comp-react-mount';
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Shadow Root Scoped styling:
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(less));
        shadowRoot.appendChild(mountPoint);
        shadowRoot.appendChild(style);

        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            mountPoint
        );

        // Retarget events for React:
        retargetEvents(shadowRoot);
    }
}
customElements.define('test-comp-react', WebComponent);
```

Note:
Events i shadow dom rutes ikke til React.
React's designproblem: https://github.com/facebook/react/issues/2043
React lytter på events på document, men må kanskje skrives om til å gjøre det per container root.
