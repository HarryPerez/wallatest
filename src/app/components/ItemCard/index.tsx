import React from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Item } from 'interfaces/item';

import styles from './styles.module.scss';

interface ItemCardProps {
  item: Item;
  onAddRemoveFavourite?: (favourite: Item) => void;
  isFavMode?: boolean;
  isFav?: boolean;
}

function ItemCard({ item, onAddRemoveFavourite, isFavMode, isFav }: ItemCardProps) {
  const onHandleFavourite = () => {
    if (onAddRemoveFavourite) {
      onAddRemoveFavourite(item);
    }
  };

  return (
    <div className={`column ${styles.itemCardContainer} ${isFavMode ? styles.minInfo : styles.fullInfo}`} data-testid="wallatest-item-card">
      <div className="full-width full-height">
        <img alt={item.title} className={`full-width ${styles.itemCardImage}`} data-testid="wallatest-item-card-image" src={item.image}></img>
        {!isFavMode ? (
          <>
            <div className="row full-width space-between middle">
              <h3 className={styles.itemCardPrice} data-testid="wallatest-item-card-price">
                {item.price}€
              </h3>
              <button data-testid="wallatest-item-card-favourite-button">
                {isFav ? (
                  <Favorite data-testid="wallatest-item-card-is-favourite" htmlColor="blue" onClick={() => onHandleFavourite()} />
                ) : (
                  <FavoriteBorder data-testid="wallatest-item-card-not-favourite" htmlColor="blue" onClick={() => onHandleFavourite()} />
                )}
              </button>
            </div>
            <h3 className={styles.itemCardTitle} data-testid="wallatest-item-card-title">
              {item.title}
            </h3>
            <h3 className={styles.itemCardEmail} data-testid="wallatest-item-card-email">
              {item.email}
            </h3>
          </>
        ) : (
          <div className="row full-width space-between middle">
            <h3 className={styles.itemCardTitle} data-testid="wallatest-item-card-favourite-title">
              {item.title}
            </h3>
            <button data-testid="wallatest-item-card-favourite-button">
              <Favorite data-testid="wallatest-item-card-is-favourite-modal" htmlColor="blue" onClick={() => onHandleFavourite()} />
            </button>
          </div>
        )}
        {!isFavMode && (
          <p className={styles.itemCardDescription} data-testid="wallatest-item-card-description">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
