import { ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';

import { serverErrorCode } from './server-error-code';

export const showGraphQLErrorMessage = (errors: ApolloError) => {
  const defaultMessage = 'Lỗi không xác định';

  let message = 'Lỗi không xác định';

  const { graphQLErrors } = errors;

  console.log('graphQLErrors: ', graphQLErrors);

  if (graphQLErrors.length > 0) {
    if (graphQLErrors[0].extensions?.errorMessage) {
      message = graphQLErrors[0].extensions?.errorMessage as string;
    } else {
      const errorKeys = Object.keys(graphQLErrors[0].extensions);

      const formFieldErrorKey = errorKeys.find((it) => it !== 'code' && it !== 'exception');

      if (formFieldErrorKey != null) {
        message = Object.values(graphQLErrors[0].extensions[formFieldErrorKey] as any)?.[0] as string;
      } else {
        const data = (graphQLErrors[0].extensions?.exception as any)[
          Object.keys(graphQLErrors[0].extensions?.exception as any)[0]
        ];

        message = Object.values(data)?.[0] as string;
      }
    }
  }

  toast((message ?? defaultMessage)?.replace('Error: ', ''), {
    type: 'error',
  });
};

export const getGraphQLErrorMessage = (errors: ApolloError) => {
  const defaultMessage = 'Lỗi không xác định';

  let message = 'Lỗi không xác định';

  const { graphQLErrors } = errors;

  console.log('graphQLErrors: ', graphQLErrors);

  if (graphQLErrors.length > 0) {
    if (graphQLErrors[0].extensions?.errorMessage) {
      message = graphQLErrors[0].extensions?.errorMessage as string;
    } else {
      const errorKeys = Object.keys(graphQLErrors[0].extensions);

      const formFieldErrorKey = errorKeys.find((it) => it !== 'code' && it !== 'exception');

      if (formFieldErrorKey != null) {
        message = Object.values(graphQLErrors[0].extensions[formFieldErrorKey] as any)?.[0] as string;
      } else {
        const data = (graphQLErrors[0].extensions?.exception as any)[
          Object.keys(graphQLErrors[0].extensions?.exception as any)[0]
        ];

        message = Object.values(data)?.[0] as string;
      }
    }
  }

  return message ?? defaultMessage;
};

export const showSuccessMessage = (message: string) => {
  toast(message, {
    type: 'success',
  });
};
