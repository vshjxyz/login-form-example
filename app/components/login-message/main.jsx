import React from 'react';

if (process.env.WEBPACK_BUILD) {
    require('./login-message.scss');
}

// Just another way to write simple components introduced after React 0.14
// https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
const LoginMessage = ({ content }) => {
    return (
        <div className="login-message">
            <div className="message-wrapper">
                <h2 className="message-content">{content}</h2>
            </div>
        </div>
    );
};

export default LoginMessage;
