import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginActions from '../../actions/counter-actions';

if (process.env.BROWSER) {
    require('./login-form.scss');
}

const Login = React.createClass({
    displayName: 'Login',

    submit() {
        console.log('submit');
    },

    render() {
        return (
            <form className="login-form" onSubmit={ this.submit }>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" />

                <button type="button">Login</button>
            </form>
        );
    }
});

export default connect(
    (state) => {
        return {
            count: state.counter
        };
    },
    (dispatch) => bindActionCreators(LoginActions, dispatch)
)(Login);
