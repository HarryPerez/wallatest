import { useEffect, useState } from 'react';
import { MOBILE_MIN_SIZE } from 'constants/sizes';

const useIsMobile = (): boolean => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return width <= MOBILE_MIN_SIZE;
};

export default useIsMobile;
