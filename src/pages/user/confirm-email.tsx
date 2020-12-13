import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMe } from '../../hooks/useMe';
// import { useLocation } from 'react-router-dom';
import {
  verifyEmail,
  verifyEmailVariables,
} from '../../__generated__/verifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();

  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      // writing to cache, apollo cache modifying
      client.writeFragment({
        id: `User:${userData?.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push('/');
    }
  };

  const [verifyEmail, { loading: verifyingEmail }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });

  // const location = useLocation();

  useEffect(() => {
    const [_, code] = window.location.href.split('code=');
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, [verifyEmail]);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-2 font-medium">Confirming Email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};

export default ConfirmEmail;
