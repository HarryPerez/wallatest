/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import TestContainer from 'app/components/Test/TestContainer';
import { MOCK_ITEMS } from 'constants/mocks';

import FavouritesModal from '.';

const favouritesModalProps = {
  isOpen: true,
  handleClose: jest.fn(),
  favourites: MOCK_ITEMS,
  onAddRemoveFavourite: jest.fn(),
};

const renderComponent = (favouritesModalProps: any) => {
  return render(
    <TestContainer>
      <FavouritesModal {...favouritesModalProps} />
    </TestContainer>,
  );
};

describe('<FavouritesModal/>', () => {
  it('Renders Favourites Modal', async () => {
    const { findByTestId, getAllByTestId, getByText } = renderComponent(favouritesModalProps);
    expect(await findByTestId('wallatest-favourites-modal')).toBeInTheDocument();
    expect(await findByTestId('wallatest-favourites-modal-search-input')).toBeInTheDocument();
    expect(getAllByTestId('wallatest-item-card-is-favourite-modal')).toBeTruthy();
    expect(getByText('iPhone 550 Super Oro')).not.toBeNull();
    expect(getAllByTestId('wallatest-item-card-image')[0]).toHaveAttribute('alt', 'iPhone 550 Super Oro');
    expect(getByText('Android 333')).not.toBeNull();
    expect(getAllByTestId('wallatest-item-card-image')[1]).toHaveAttribute('alt', 'Android 333');
  });

  it('Renders Favourites and it filters by title', async () => {
    const { findByTestId, getAllByTestId, getByText, queryByText } = renderComponent(favouritesModalProps);
    expect(await findByTestId('wallatest-favourites-modal')).toBeInTheDocument();
    expect(await findByTestId('wallatest-favourites-modal-search-input')).toBeInTheDocument();
    expect(getAllByTestId('wallatest-item-card-is-favourite-modal')).toBeTruthy();

    const searchInput = await findByTestId('wallatest-favourites-modal-search-input');

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'iPhONe' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(getByText(MOCK_ITEMS[0].title)).not.toBeNull();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'AnDroId' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(queryByText(MOCK_ITEMS[0].title)).not.toBeInTheDocument();
    expect(getByText(MOCK_ITEMS[1].title)).not.toBeNull();

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'samsung' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(queryByText(MOCK_ITEMS[0].title)).not.toBeInTheDocument();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();
  });
});
