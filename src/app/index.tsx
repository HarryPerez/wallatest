import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoadingWrapper from './components/LoadingWrapper';
import Routes from './components/Routes';

// Global react-query configs
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const App = () => (
  <Suspense fallback={<LoadingWrapper loading />}>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </Suspense>
);

export default hot(App);
