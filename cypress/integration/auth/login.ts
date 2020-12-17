describe('Log In', () => {
  const user = cy;
  it('should see login page', () => {
    user.visit('/').title().should('eq', 'Login | Nuber Eats');
  });

  it('can see email / password validation errors', () => {
    user.visit('/');
    user.findByPlaceholderText(/email/i).type('pilyeooong');
    user.findByRole('alert').should('have.text', 'Please enter a valid email');
    user.findAllByPlaceholderText(/email/i).clear();
    user.findByRole('alert').should('have.text', 'Email is required');
    user.findByPlaceholderText(/email/i).type('pilyeooong@gmail.com');
    user.findByPlaceholderText(/password/i).type('a');
    user.findByRole('alert').should('have.text', 'Password must be more than 3 chars');
    user.findByPlaceholderText(/password/i).clear();
    user.findByRole('alert').should('have.text', 'Password is required');
  });

  it('can fill out the form', () => {
    user.visit('/');
    user.findByPlaceholderText(/email/i).type('pilyeooong@gmail.com');
    user.findByPlaceholderText(/password/i).type('123');
    user.findByRole('button').should('not.have.class', 'pointer-events-none').click();
    user.window().its('localStorage.nuber-token').should('be.a', 'string')
  });
});