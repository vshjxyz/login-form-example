import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginActions from '../../actions/login-actions';

if (process.env.BROWSER) {
    require('./login-form.scss');
}

const Login = React.createClass({
    displayName: 'Login',
    
    fields: [
        'email',
        'password'
    ],

    onKeyPress(event) {
        if (event.key === 'Enter') {
            this.submit();
        }
    },

    onChange(event) {
        const changedField = event.target.name;
        const changedFieldValue = event.target.value;
        this.props.fieldChange(changedField, changedFieldValue);
    },

    onBlur() {
        this.validate();
    },

    validate() {
        this.props.validate(this.props.form.fields);
    },

    submit() {
        this.props.submit();
    },

    render() {
        const fields = this.props.form.fields;
        const isValid = this.props.form.isValid;

        let formError;
        if (this.props.form.error) {
            formError = <span className="error-message error-form">{this.props.form.error}</span>
        }

        return (
            <form className="login-form">
                <div className={fields.email.error ? 'form-group error': 'form-group'}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />
                    <span className="error-message error-email">{fields.email.error}</span>
                </div>

                <div className={fields.password.error ? 'form-group error': 'form-group'}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />
                    <span className="error-message error-password">{fields.password.error}</span>
                </div>

                <button type="button" name="login-submit" className={!isValid  ? 'error-button' : ''} onClick={ this.submit }>Login</button>
                {formError}
            </form>
        );
    }
});

export default connect(
    (state) => ({
        form: state.loginForm
    }),
    (dispatch) => bindActionCreators(LoginActions, dispatch)
)(Login);
