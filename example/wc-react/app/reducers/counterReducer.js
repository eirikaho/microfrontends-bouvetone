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
