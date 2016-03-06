import React from 'react';

if (process.env.BROWSER) {
    require('./login-message.scss');
}

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
