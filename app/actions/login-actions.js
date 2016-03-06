'use strict';

import { ActionTypes } from '../shared/constants';

export default {
    fieldChange(name, value) {
        return {
            type: ActionTypes.LOGIN_CHANGE,
            name,
            value
        };
    },

    validate: (fields) => {
        let errors = {};
        if (fields.email.isTouched && fields.email.value.length < 8) {
            errors.email = 'Email must be at least 8 characters long';
        }
        if (fields.password.isTouched && fields.password.value.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        return {
            type: ActionTypes.LOGIN_VALIDATE,
            errors
        };
    },

    submit() {
        return (dispatch, getState) => {
            dispatch({
                type: ActionTypes.LOGIN_SUBMIT
            });

            // Mocking ajax call to server
            setTimeout(() => {
                    if (getState().loginForm.fields.password.value === 'password') {
                        dispatch({
                            type: ActionTypes.LOGIN_ERROR,
                            error: 'Invalid login'
                        })
                    } else {
                        dispatch({
                            type: ActionTypes.LOGIN_OK
                        });
                    }
                }
            , 2000);
        }
    }
};