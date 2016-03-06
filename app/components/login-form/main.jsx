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

    onChange(event) {
        const changedField = event.target.name;
        const changedFieldValue = event.target.value;
        const mappedField = this.props.form.fields[changedField];
        if (mappedField && mappedField.isTouched) {
            // TODO: fire validate action
        }
        this.props.fieldChange(changedField, changedFieldValue);
    },

    onBlur() {
        this.props.validate(this.props.form.fields);
    },

    submit() {
        if (this.props.form.isValid) {
            console.log('submit');
        }
    },

    render() {
        const fields = this.props.form.fields;
        return (
            <form className="login-form">
                <div className={fields.email.error ? 'form-group error': 'form-group'}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={this.onChange}
                        onBlur={this.onBlur} />
                    <span className="error-message">{fields.email.error}</span>
                </div>

                <div className={fields.password.error ? 'form-group error': 'form-group'}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        onBlur={this.onBlur} />
                    <span className="error-message">{fields.password.error}</span>
                </div>

                <button type="button" onClick={ this.submit }>Login</button>
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
