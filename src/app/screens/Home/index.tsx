import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Favorite } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Pagination, Stack, TextField } from '@mui/material';
import LoadingWrapper from 'app/components/LoadingWrapper';
import Navbar from 'app/components/Navbar';
import useIsMobile from 'hooks/useMobile';
import { Item } from 'interfaces/item';

import { getItems } from 'services/Items/service';

import FavouritesModal from './components/FavouritesModal';
import ItemsList from './components/ItemsList';
import { ENTER_KEY_CODE, PAGE_OFFSET } from './constants';
import { getFilteredItemsData } from './utils';

import styles from './styles.module.scss';

function Home() {
  const isMobile = useIsMobile();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('');
  const [filter, setFilter] = useState('');
  const [favourites, setFavourites] = useState<Item[]>([]);
  const [isFavouriteModalOpen, setIsFavouriteModalOpen] = useState(false);

  const { data: itemsData, isFetching: itemsDataLoading } = useQuery('items-data', () => getItems());

  const onHandleSearch = (inputValue: string) => setFilter(inputValue.toLowerCase());
  const onHandleKeyDown = (e: any) => e.key === ENTER_KEY_CODE && itemsData && onHandleSearch(e.target.value);
  const handlePageChange = (event: any, value: number) => setPage(value);

  const filteredItemsData = getFilteredItemsData(filter, order, itemsData);

  const addRemoveFavourite = (itemCard: Item) => {
    const favIndex = favourites.findIndex((fav: Item) => fav.title.toLowerCase() === itemCard.title.toLowerCase());
    if (favIndex > -1) {
      favourites.splice(favIndex, 1);
      if (favourites.length === 0) {
        setIsFavouriteModalOpen(false);
      }
    } else {
      favourites.push(itemCard);
    }
    setFavourites([...favourites]);
  };

  return (
    <LoadingWrapper className={styles.loadingIcon} loading={itemsDataLoading}>
      <Navbar containerClassName="row start middle">
        <TextField
          className={`half-width ${styles.itemsSearchInput}`}
          inputProps={{ 'data-testid': 'wallatest-home-search-input' }}
          onKeyDown={onHandleKeyDown}
          placeholder="Buscar por Título, Descripción, Precio y Email."
        />
        <div className="row full-width end">
          <Button
            data-testid="wallatest-home-favourites-button"
            disabled={favourites.length === 0}
            onClick={() => setIsFavouriteModalOpen(!isFavouriteModalOpen)}
            size={isMobile ? 'small' : 'large'}
            startIcon={<Favorite />}
            sx={{ background: '#10C1AB' }}
            variant="contained"
          >
            Ver Favoritos
          </Button>
        </div>
      </Navbar>
      {filteredItemsData && (
        <ItemsList
          addRemoveFavourite={addRemoveFavourite}
          favourites={favourites}
          items={filteredItemsData.slice(PAGE_OFFSET[page as keyof typeof PAGE_OFFSET], PAGE_OFFSET[page as keyof typeof PAGE_OFFSET] + 5)}
          order={order}
          setOrder={setOrder}
        />
      )}
      {isFavouriteModalOpen && (
        <FavouritesModal
          favourites={favourites}
          handleClose={() => setIsFavouriteModalOpen(!isFavouriteModalOpen)}
          isOpen={isFavouriteModalOpen}
          onAddRemoveFavourite={addRemoveFavourite}
        />
      )}
      <div className={`full-width row center ${styles.footer}`}>
        <Stack spacing={2}>
          <Pagination color="primary" count={4} data-testid="wallatest-home-pagination" onChange={handlePageChange} />
        </Stack>
      </div>
      {!filteredItemsData && !itemsDataLoading && (
        <div className="full-width full-height row middle center">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Ups — <strong>Algo salió mal!</strong>
          </Alert>
        </div>
      )}
    </LoadingWrapper>
  );
}

export default Home;
