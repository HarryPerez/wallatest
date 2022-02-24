import React from 'react';
import Lottie from 'react-lottie';

import { getOptions } from './constants';

import styles from './styles.module.scss';

interface LoadingProps {
  className?: string;
  height?: number;
  width?: number;
  loop?: boolean;
  autoplay?: boolean;
  rendererSettings?: any;
}

function Loading({ className, height, width, loop, autoplay, rendererSettings }: LoadingProps) {
  return (
    <div className={`row center middle ${styles.spinnerContainer} ${className}`} data-testid="wallatest-loader">
      <Lottie data-testid="wallatest-loader-lottie" height={height} options={getOptions({ loop, autoplay, rendererSettings })} width={width} />
    </div>
  );
}

export default Loading;
