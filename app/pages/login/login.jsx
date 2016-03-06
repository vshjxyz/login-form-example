import React from 'react';
import LoginForm from '../../components/login-form/main.jsx';

if (process.env.BROWSER) {
    require('./login.scss');
}

export default () => {
    return (
        <section className="login-wrapper">
            <div className="login-modal">
                <h1>Login</h1>
                <LoginForm />
            </div>
        </section>
    );
}