import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/login-form/main.jsx';
import LoginMessage from '../../components/login-message/main.jsx';

if (process.env.BROWSER) {
    require('./login.scss');
}
const LoginView = React.createClass({
    render() {
        const { isSubmitting, isSubmitted } = this.props.form;

        let content;

        if (isSubmitting) {
            content = <LoginMessage content="Logging in..." />;
        } else if (isSubmitted) {
            content = <LoginMessage content="You are now logged in."/>;
        } else {
            content = <LoginForm />;
        }

        return (
            <section className="login-wrapper">
                <div className="login-modal">
                    <h1>Login</h1>
                    {content}
                </div>
            </section>
        );
    }
});


export default connect(
    (state) => ({
        form: state.loginForm
    })
)(LoginView);