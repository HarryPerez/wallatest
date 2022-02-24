import React, { useEffect, useRef } from 'react';

import Loading from './components/Loading';

interface LoadingWrapperProps {
  loading: boolean;
  children?: any;
  withInitialLoading?: boolean;
  className?: string;
}

function LoadingWrapper({ loading, children, withInitialLoading, className }: LoadingWrapperProps) {
  const initialLoading = useRef(withInitialLoading);
  useEffect(() => {
    if (initialLoading.current && loading) {
      initialLoading.current = false;
    }
  }, [loading]);
  return initialLoading.current || loading ? <Loading className={className} /> : <>{children}</>;
}

export default LoadingWrapper;
