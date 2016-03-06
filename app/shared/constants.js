import keyMirror from 'keymirror';

export default {
    ActionTypes: keyMirror({
        LOGIN_VALIDATE: null,
        LOGIN_VALIDATE_FIELD: null,
        LOGIN_CHANGE: null,
        LOGIN_SUBMIT: null,
        LOGIN_ERROR: null,
        LOGIN_OK: null
    }),
    RouteErrors: keyMirror({
        ROUTING: null,
        REDIRECT: null,
        NOT_FOUND: null
    })
};