import React, { useState } from 'react';
import { Box, Modal, TextField } from '@mui/material';
import ItemCard from 'app/components/ItemCard';
import useIsMobile from 'hooks/useMobile';
import { Item } from 'interfaces/item';

import styles from './styles.module.scss';

const desktopStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 500,
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #10C1AB',
  boxShadow: 24,
  overflow: 'hidden',
  p: 4,
};

const mobileStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 450,
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #10C1AB',
  boxShadow: 24,
  overflow: 'hidden',
  p: 4,
};

interface FavouritesModalProps {
  isOpen: boolean;
  handleClose: () => void;
  favourites: Item[];
  onAddRemoveFavourite: (favourite: Item) => void;
}

function FavouritesModal({ isOpen, handleClose, favourites, onAddRemoveFavourite }: FavouritesModalProps) {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState('');
  const onHandleSearch = (inputValue: string) => setFilter(inputValue.toLowerCase());
  const favouritesItemsData = filter !== '' ? favourites.filter((item: Item) => item.title.toLowerCase().includes(filter)) : favourites;

  const onHandleKeyDown = (e: any) => e.key === 'Enter' && favourites && onHandleSearch(e.target.value);

  return (
    <Modal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      data-testid="wallatest-favourites-modal"
      onClose={handleClose}
      open={isOpen}
    >
      <Box sx={isMobile ? mobileStyle : desktopStyle}>
        <TextField
          className={`full-width ${styles.itemsSearchInput}`}
          inputProps={{ 'data-testid': 'wallatest-favourites-modal-search-input' }}
          onKeyDown={onHandleKeyDown}
          placeholder="Buscar por Título."
        />
        <div className={`row wrap middle center ${styles.favouritesList}`}>
          {favouritesItemsData?.map((item: Item) => (
            <ItemCard isFavMode item={item} key={item.title} onAddRemoveFavourite={onAddRemoveFavourite} />
          ))}
        </div>
      </Box>
    </Modal>
  );
}

export default FavouritesModal;
