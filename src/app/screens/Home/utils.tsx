import { Item, ItemData } from 'interfaces/item';

export const getFilteredItemsData = (filter: string, order: string, itemsData?: ItemData) =>
  (filter !== ''
    ? itemsData?.items.filter(
        (item: Item) =>
          item.title.toLowerCase().includes(filter) ||
          item.price.toLowerCase().includes(filter) ||
          item.email.toLowerCase().includes(filter) ||
          item.description.toLowerCase().includes(filter),
      )
    : itemsData?.items
  )?.sort((itemA: Item, itemB: Item) => {
    if (order === 'price') {
      return Number(itemA[order as keyof typeof itemA]) < Number(itemB[order as keyof typeof itemB]) ? -1 : 1;
    } else {
      return itemA[order as keyof typeof itemA] < itemB[order as keyof typeof itemB] ? -1 : 1;
    }
  });
