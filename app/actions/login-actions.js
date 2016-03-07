'use strict';

import { ActionTypes } from '../shared/constants';

const LoginActions = {
    fieldChange(name, value) {
        return {
            type: ActionTypes.LOGIN_CHANGE,
            name,
            value
        };
    },

    validate: (fields, force) => {
        let errors = {};
        if (fields.email.isTouched || force) {
            if (fields.email.value.length < 8) {
                errors.email = 'Email must be at least 8 characters long';
            }
            if (!(/\S+@\S+\.\S+/.test(fields.email.value))) {
                errors.email = 'You must provide a valid email';
            }
        }
        if ((fields.password.isTouched || force) && fields.password.value.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        return {
            type: ActionTypes.LOGIN_VALIDATE,
            errors
        };
    },

    submit() {
        return (dispatch, getState) => {
            dispatch(LoginActions.validate(getState().loginForm.fields, true));

            if (getState().loginForm.isValid) {
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
    }
};

export default LoginActions;
