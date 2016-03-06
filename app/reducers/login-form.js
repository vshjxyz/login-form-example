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
    },
    isValid: false
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
            let isValid = true;
            const newFields = Object.keys(state.fields)
                .map((fieldName) => {
                    const error = action.errors[fieldName] ? action.errors[fieldName] : null;

                    // Tagging the form as invalid if error is not null
                    isValid = isValid && !error;

                    return {
                        [fieldName]: {
                            ...state.fields[fieldName],
                            error
                        }
                    };
                })
                .reduce((acc, val) => Object.assign(acc, val), {});

            return {
                ...state,
                fields: {
                    ...newFields
                },
                isValid
            };
        default:
            return state;
    }
};
