export const INCREMENT = 'INCREMENT';

export function increment() {
    return dispatch => {
        dispatch({
            type: INCREMENT,
        });
    };
}
