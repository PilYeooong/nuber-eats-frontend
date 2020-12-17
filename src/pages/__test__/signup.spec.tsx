import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { render, RenderResult, waitFor } from '../../test-utils';

import { Signup, CREATE_ACCOUNT_MUTATION } from '../signup';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      }
    }
  }
});

describe('<CreateAccount />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Signup />
        </ApolloProvider>
      );
    });
  });
  it('renders OK', async () => {
    await waitFor(() => expect(document.title).toBe('Sign Up | Nuber Eats'));
  });

  it('displays email validation errors', async () => {
    const { getByPlaceholderText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
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
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    await waitFor(() => {
      userEvent.type(email, 'this@wont.com');
      userEvent.type(password, '12');
    });
    let errorMessage = getByRole('alert');

    expect(errorMessage).toHaveTextContent(/Password must be more than 3 chars/i);

    await waitFor(() => {
      userEvent.clear(password);
      userEvent.click(submitBtn);
    });
    errorMessage = getByRole('alert');

    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });

  it('submit form and call mutation', async () => {
    const { getByPlaceholderText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const formData = {
      email: 'test@test.com',
      password: '123',
      role: "Client"
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: null
        }
      }
    });
    mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedMutationResponse);
    jest.spyOn(window, 'alert').mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });

    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        ...formData,
      }
    });
    expect(window.alert).toHaveBeenCalledWith('Account Created ! Log in now !');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

