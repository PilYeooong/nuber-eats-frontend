describe('Edit Profile', () => {
  const user = cy;
  beforeEach(() => {
    // @ts-ignore
    user.login('pilyeooong@gmail.com', '123');
  })
  it('can go to /edit-profile using the header', () => {
    user.get('a[href="/edit-profile"]').click();
    user.wait(1000);
    user.title().should('eq', 'Edit Profile | Nuber Eats');
  });

  it('can change email', () => {
    // {"operationName":"editProfile","variables":{"input":{"email":"pilyeooong@gmail.com"}},"query":"mutation editProfile($input: EditProfileInput!) {\n  editProfile(input: $input) {\n    ok\n    error\n    __typename\n  }\n}\n"}

    user.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if(req.body?.operationName === 'editProfile') {
        // @ts-ignore
        req.body?.variables?.input?.email = 'pilyeooong@gmail.com';
      }
    });
    user.get('a[href="/edit-profile"]').click();
    user.findByPlaceholderText(/email/i).clear().type('pilyeooongggg@gmail.com');
    user.findByRole('button').click();
  });
})