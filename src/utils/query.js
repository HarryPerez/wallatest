import { useLocation } from 'react-router';

export const useQuery = () => new URLSearchParams(useLocation().search);

export const getParam = (query, param) => query.get(param);
