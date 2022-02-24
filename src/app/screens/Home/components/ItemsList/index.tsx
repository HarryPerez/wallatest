import React, { Dispatch, SetStateAction } from 'react';
import ItemCard from 'app/components/ItemCard';
import { Item } from 'interfaces/item';

import ItemsOrderButtons from './components/ItemsOrderButtons';

import styles from './styles.module.scss';

interface ItemsListProps {
  items: Item[];
  favourites: Item[];
  addRemoveFavourite: (newFavourites: Item) => void;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
}

function ItemsList({ items, addRemoveFavourite, favourites, order, setOrder }: ItemsListProps) {
  return (
    <div className={`column center full-width ${styles.itemsListContainer}`}>
      <h1 className="title m-bottom-6">¿Qué estás buscando hoy?</h1>
      <div className={`full-width full-height ${styles.itemsListBodyContainer}`}>
        <ItemsOrderButtons data-testid="wallatest-items-orders-buttons" order={order} setOrder={setOrder} />
        <div className={`row wrap center ${styles.itemsList}`}>
          {items?.map((item: Item) => (
            <ItemCard
              isFav={favourites.filter((fav) => fav.title.toLowerCase() === item.title.toLowerCase()).length > 0}
              item={item}
              key={item.title}
              onAddRemoveFavourite={addRemoveFavourite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsList;
