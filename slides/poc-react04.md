# React + Redux
## Reducer
```javascript
import { INCREMENT } from '../actions/counterAction';
const INITIAL_STATE = {
    counter: 0,
};
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                counter: state.counter + 1,
            };
        default:
            return state;
    }
}
```

Note:
Events i shadow dom rutes ikke til React.
React's designproblem: https://github.com/facebook/react/issues/2043
React lytter på events på document, men må kanskje skrives om til å gjøre det per container root.
