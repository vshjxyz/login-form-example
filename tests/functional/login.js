describe('Login form', () => {
    after((client, done) => {
        if (client.sessionId) {
            client.end(() => {
                done();
            });
        } else {
            done();
        }
    });

    it('should present an empty login', (client) => {
        client.url('http://localhost:8080');

        client.expect.element('body').to.be.present.before(1000);
        client.expect.element('input[name="password"]').to.be.present;
        client.expect.element('input[name="email"]').to.be.present;

        client.end();
    });

    it('should validate the fields on blur', (client) => {
        client
            .url('http://localhost:8080')
            .waitForElementVisible('body', 1000);

        client.expect.element('.error-email').not.to.be.visible;
        client.expect.element('.error-password').not.to.be.visible;
        client.expect.element('.error-form').not.to.be.present;

        client
            .setValue('input[name="email"]', 'asd')
            .click('body');

        client.expect.element('.error-email').to.be.visible;

        client
            .setValue('input[name="password"]', 'asd')
            .click('body');

        client.expect.element('.error-email').to.be.visible;

        client
            .setValue('input[name="email"]', 'some_email@gmail.com')
            .click('body')
            .pause(100);

        client.expect.element('.error-email').not.to.be.visible;

        client
            .setValue('input[name="password"]', 'some password')
            .click('body')
            .pause(100);

        client.expect.element('.error-email').not.to.be.visible;

        client.end();
    });

    it('should prevent submitting the form if invalid or empty', (client) => {
        client
            .url('http://localhost:8080')
            .waitForElementVisible('body', 1000)
            .click('button[name="login-submit"]');

        client.expect.element('.login-form').to.be.present;

        client
            .setValue('input[name="email"]', 'asd')
            .setValue('input[name="password"]', 'asd')
            .click('button[name="login-submit"]');

        client.expect.element('.login-form').to.be.present;
    });

    it('should fail to login the user if the password is "password"', (client) => {
        client
            .url('http://localhost:8080')
            .waitForElementVisible('body', 1000)
            .setValue('input[name="email"]', 'some_email@gmail.com')
            .setValue('input[name="password"]', 'password')
            .click('button[name="login-submit"]')
            .waitForElementVisible('.login-message', 1000)
            .waitForElementVisible('.login-form', 2000);

        client.expect.element('.error-form').to.be.present;
        client.expect.element('.error-form').to.be.visible;
    });

    it('should show the login success if a valid form is submitted', (client) => {
        client
            .url('http://localhost:8080')
            .waitForElementVisible('body', 1000)
            .setValue('input[name="email"]', 'some_email@gmail.com')
            .setValue('input[name="password"]', 'valid password')
            .click('button[name="login-submit"]')
            .waitForElementVisible('.login-message', 1000);

        client.expect.element('.login-message h2').text.to.equal('You are now logged in.').after(2000);
    });

    it('should check for a valid email', (client) => {
        client
            .url('http://localhost:8080')
            .waitForElementVisible('body', 1000);

        client
            .setValue('input[name="email"]', 'asd')
            .setValue('input[name="password"]', 'valid password')
            .click('button[name="login-submit"]');

        client.expect.element('.login-form').to.be.present;
        client.expect.element('.error-email').to.be.visible;

        client
            .setValue('input[name="email"]', 'valid@email.com')
            .click('button[name="login-submit"]');

        client.expect.element('.login-form').not.to.be.present;
    });

    it('should submit the form when a user press enter on an input box', (client) => {
        client
            .url('http://localhost:8080')
            .waitForElementVisible('body', 1000);

        client
            .setValue('input[name="email"]', 'asd')
            .setValue('input[name="password"]', 'valid password')
            .click('input[name="email"]')
            .keys(client.Keys.ENTER);

        client.expect.element('.login-form').to.be.present;
        client.expect.element('.error-email').to.be.visible;

        client
            .setValue('input[name="email"]', 'valid@email.com')
            .click('input[name="email"]')
            .keys(client.Keys.ENTER);

        client.expect.element('.login-form').not.to.be.present;
    })
});
