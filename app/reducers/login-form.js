import { ActionTypes } from '../shared/constants';
import deepFreeze from 'deep-freeze';

// deep freeze makes the state immutable
const initialState = deepFreeze({
    fields: {
        email: {
            value: '',
            error: null,
            isTouched: false
        },
        password: {
            value: '',
            error: null,
            isTouched: false
        }
    }
});

export default function loginForm(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.LOGIN_CHANGE:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.name]: {
                        ...state.fields[action.name],
                        value: action.value,
                        isTouched: true
                    }
                }
            };
        case ActionTypes.LOGIN_VALIDATE:
            const newFields = Object.keys(state.fields)
                .map((fieldName) => {
                    console.log('newState.fields[fieldName]', state.fields[fieldName]);
                    return {
                        [fieldName]: {
                            ...state.fields[fieldName],
                            error: action.errors[fieldName] ? action.errors[fieldName] : null
                        }
                    };
                })
                .reduce((acc, val) => Object.assign(acc, val), {});
            return {
                ...state,
                fields: {
                    ...newFields
                }
            };
        default:
            return state;
    }
};
