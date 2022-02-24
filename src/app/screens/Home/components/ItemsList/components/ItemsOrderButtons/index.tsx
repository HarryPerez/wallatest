import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import useIsMobile from 'hooks/useMobile';

import { BUTTONS } from './constants';

import styles from './styles.module.scss';

interface ItemsOrderButtonsProps {
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
}

function ItemsOrderButtons({ order, setOrder }: ItemsOrderButtonsProps) {
  const isMobile = useIsMobile();
  const buttonsSize = isMobile ? 'small' : 'large';

  return (
    <div className={`row center full-width ${styles.itemsOrderButtonsContainer}`} data-testid="wallatest-items-order-buttons-container">
      {BUTTONS.map((btn: any) => (
        <Button
          className={styles.button}
          data-testid={`wallatest-items-order-buttons-${btn.field}`}
          key={btn.field}
          onClick={() => setOrder(btn.field)}
          size={buttonsSize}
          variant={`${order === btn.field ? 'contained' : 'outlined'}`}
        >
          {btn.message}
        </Button>
      ))}
    </div>
  );
}

export default ItemsOrderButtons;
