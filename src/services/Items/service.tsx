import { apiCall } from 'hooks/useApi';
import { ItemData } from 'interfaces/item';

export const getItems = () => apiCall<ItemData>(`/items.json`);
