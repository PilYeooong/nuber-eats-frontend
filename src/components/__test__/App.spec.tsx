import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { isLoggedInVar } from '../../apollo';
import { App } from '../App';

jest.mock('../../routers/logged-out-router', () => {
  return {
    LoggedOutRouter: () => <span>loggedOut</span>,
  };
});

jest.mock('../../routers/logged-in-router', () => {
  return {
    LoggedInRouter: () => <span>loggedIn</span>,
  };
});

describe('<App />', () => {
  it('renders LoggedOutRouter', () => {
    const { debug, getByText } = render(<App />);
    getByText('loggedOut');
  });

  it('renders LoggedInRouter', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText('loggedIn');
  });
});
