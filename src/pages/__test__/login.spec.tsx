import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Login, LOGIN_MUTATION } from '../login';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';

describe('<Login />', () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });

  it('renders OK', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Login | Nuber Eats');
    });
  });

  it('displays email validation errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i); // get HTMLElement with placeholder
    await waitFor(() => {
      userEvent.type(email, 'this@wont');
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);

    await waitFor(() => {
      userEvent.clear(email);
    });

    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });

  it('displays password validation errors', async () => {
    const { getByPlaceholderText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole('button');
    const password = getByPlaceholderText(/password/i);
    await waitFor(() => {
      userEvent.type(email, 'this@wont.com');
      userEvent.click(submitBtn);
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/password is required/i);

    await waitFor(() => {
      userEvent.type(password, '12');
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(
      /Password must be more than 3 chars/i
    );
  });

  it('submit form and call mutation', async () => {
    const { getByPlaceholderText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const formData = {
      email: 'test@test.com',
      password: '123'
    };

    const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'token',
          error: null
        }
      }
    })
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        ...formData
      }
    });
    expect(localStorageSpy).toHaveBeenCalledWith('nuber-token', 'token');
  });
});
