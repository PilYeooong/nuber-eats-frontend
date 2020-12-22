describe('Sign Up', () => {
  const user = cy;
  it('should see email / password validation error', () => {
    user.visit('/');
    user.findByText(/create an account/i).click();
    user.findByPlaceholderText(/email/i).type('not@good');
    user.findByRole('alert').should('have.text', 'Please enter a valid email');
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole('alert').should('have.text', 'Email is required');
    user.findByPlaceholderText(/email/i).type('not@good.com');
    user.findByPlaceholderText(/password/i).type('12');
    user
      .findByRole('alert')
      .should('have.text', 'Password must be more than 3 chars');
    user.findByPlaceholderText(/password/i).clear();
    user.findByRole('alert').should('have.text', 'Password is required');
  });

  it('should be able to create an account and login', () => {
    // {"data":{"createAccount":{"ok":false,"error":"There is a user with that email already","__typename":"CreateAccountOutput"}}}
    user.intercept('http://localhost:4000/graphql', (req) => {
      const { operationName } = req.body;
      if(operationName && operationName === 'createAccountMutation')
      req.reply((res) => {
        res.send({
          fixture: 'auth/signup.json'
        });
      });
    });
    user.visit('/signup');
    user.findByPlaceholderText(/email/i).type('pilyeooong@gmail.com');
    user.findByPlaceholderText(/password/i).type('123');
    user.findByRole('button').click();
    user.wait(1000);
    // -- login --
    // @ts-ignore
    user.login('pilyeooong@gmail.com', '123');
  });
});
