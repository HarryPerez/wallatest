import React, { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const BasicTestContainer: FunctionComponent = ({ children }) => {
  // Global react-query configs
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const TestContainer: FunctionComponent = ({ children }) => {
  return <BasicTestContainer>{children}</BasicTestContainer>;
};

export default TestContainer;
