export interface Item {
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
  isFavourite: boolean;
}

export interface ItemData {
  items: Item[];
}
