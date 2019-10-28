# React + Redux

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonType } from 'puma-components';
import { increment } from '../actions/counterAction';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        this.handleVueEvent = this.handleVueEvent.bind(this);
        window.addEventListener('js:clicked', this.handleEvent);
        window.addEventListener('vue:clicked', this.handleEvent);
        window.addEventListener('angular:clicked', this.handleEvent);
        this.state = {
            externalCounter: 0,
        };
    }
    handleEvent() {
        this.setState(prevState => ({
            externalCounter: prevState.externalCounter + 1,
        }));
    }
    dispatch() {
        window.dispatchEvent(
            new CustomEvent('react:clicked', {
                bubbles: true,
            })
        );
    }
    render() {
        const { counter, dispatch } = this.props;
        const { externalCounter } = this.state;
        return (
            <div className="app">
                <h2>En React-basert Web Component</h2>
                <p>
                    React, Redux, bygd og startet med Webpack (med
                    hot-reloading) og transpilert med Babel!
                </p>
                <p>
                    Benytter <code>react-shadow-dom-retarget-events</code> for
                    håndtering av events.
                </p>
                <p>
                    Se{' '}
                    <a href="https://github.com/facebook/react/issues/9242">
                        https://github.com/facebook/react/issues/9242
                    </a>{' '}
                    og{' '}
                    <a href="https://github.com/spring-media/react-shadow-dom-retarget-events">
                        https://github.com/spring-media/react-shadow-dom-retarget-events
                    </a>{' '}
                    for mer info.
                </p>
                <p>
                    Intern teller = <b>{counter}</b>
                </p>
                <p>
                    Ekstern teller = <b>{externalCounter}</b>
                </p>
                <Button
                    buttonType={ButtonType.secondary}
                    label="Intern +1"
                    onClick={e => {
                        e.preventDefault();
                        dispatch(increment());
                    }}
                />
                <Button
                    buttonType={ButtonType.secondary}
                    label="Ekstern +1"
                    onClick={e => {
                        e.preventDefault();
                        this.dispatch();
                    }}
                />
            </div>
        );
    }
}
App.propTypes = {
    counter: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};
App.defaultProps = {
    counter: 0,
};
const mapStateToProps = state => {
    const { counter } = state;
    return {
        counter: counter.counter,
    };
};
export default connect(mapStateToProps)(App);
```

Note:
Events i shadow dom rutes ikke til React.
React's designproblem: https://github.com/facebook/react/issues/2043
React lytter på events på document, men må kanskje skrives om til å gjøre det per container root.
