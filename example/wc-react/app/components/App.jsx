import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonType } from 'puma-components';
import { increment } from '../actions/counterAction';

/* eslint-disable no-console */
class App extends Component {
    constructor(props) {
        super(props);

        this.handleEvent = this.handleEvent.bind(this);
        this.handleVueEvent = this.handleVueEvent.bind(this);

        window.addEventListener('js:clicked', this.handleEvent);
        window.addEventListener('vue:clicked', this.handleVueEvent);
        window.addEventListener('angular:clicked', this.handleVueEvent);
        console.log('React-komponent: Lytter etter events...');

        this.state = {
            externalCounter: 0,
        };
    }

    handleVueEvent() {
        console.log('React-komponent: Event mottatt: vue:clicked');
        this.setState(prevState => ({
            externalCounter: prevState.externalCounter + 1,
        }));
    }

    handleEvent() {
        console.log('React-komponent: Event mottatt: js:clicked');
        this.setState(prevState => ({
            externalCounter: prevState.externalCounter + 1,
        }));
    }

    dispatch() {
        console.log('React-komponent: Dispatch react:clicked');
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
                <br/>
                <h1>Med hot reloading :-)</h1>
                <br/>
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
