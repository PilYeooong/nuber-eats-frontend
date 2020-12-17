import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ME_QUERY } from '../../hooks/useMe';
import { Header } from '../header';

describe('<Header />', () => {
  it('renders verify banner', async () => {
    await waitFor(async () => {
      const { debug, getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      getByText('Please verify your email'); // getByText는 해당 텍스트가 존재하지 않으면 에러를 발생시킨다
    });
  });

  it('renders without verify banner', async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText('Please verify your email')).toBeNull(); // queryByText는 해당 텍스트가 존재하지 않으면 null을 응답 따라서 존재하지 않는 문구 탐색할때 활용이 가능하다
    });
  });
});
