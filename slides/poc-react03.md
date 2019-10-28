# React + Redux
## Action
```javascript
export const INCREMENT = 'INCREMENT';
export function increment() {
    return dispatch => {
        dispatch({
            type: INCREMENT,
        });
    };
}
```

Note:
Events i shadow dom rutes ikke til React.
React's designproblem: https://github.com/facebook/react/issues/2043
React lytter på events på document, men må kanskje skrives om til å gjøre det per container root.
