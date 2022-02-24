/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-query-by-disappearance */
import React from 'react';
import { act, fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
import TestContainer from 'app/components/Test/TestContainer';
import { MOCK_ITEMS } from 'constants/mocks';

import { rest, server } from 'utils/MockServer/node';

import Home from '.';

const renderComponent = () => {
  return render(
    <TestContainer>
      <Home />
    </TestContainer>,
  );
};

beforeEach(() => {
  server.use(
    rest.get(`https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json`, (_req: any, res: any, ctx: any) => {
      return res(
        ctx.status(200),
        ctx.json({
          items: MOCK_ITEMS,
        }),
      );
    }),
  );
});

describe('<Home/>', () => {
  it('Renders Home Item Manager', async () => {
    const { findByTestId, getByTestId, findByText, getByText, getAllByTestId } = renderComponent();
    expect(await findByTestId('wallatest-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId('wallatest-loader'));
    expect(await findByText('¿Qué estás buscando hoy?')).toBeInTheDocument();
    expect(await findByTestId('wallatest-home-search-input')).toBeInTheDocument();
    expect(await findByTestId('wallatest-home-favourites-button')).toBeInTheDocument();
    expect(await findByTestId('wallatest-home-pagination')).toBeInTheDocument();
    expect(getByText(MOCK_ITEMS[0].title)).not.toBeNull();
    expect(getByText(MOCK_ITEMS[0].description)).not.toBeNull();
    expect(getByText(MOCK_ITEMS[0].email)).not.toBeNull();
    expect(getByText(`${MOCK_ITEMS[0].price}€`)).not.toBeNull();
    expect(getAllByTestId('wallatest-item-card-image')[0]).toHaveAttribute('alt', 'iPhone 550 Super Oro');
    expect(getByText(MOCK_ITEMS[1].title)).not.toBeNull();
    expect(getByText(MOCK_ITEMS[1].description)).not.toBeNull();
    expect(getByText(MOCK_ITEMS[1].email)).not.toBeNull();
    expect(getByText(`${MOCK_ITEMS[1].price}€`)).not.toBeNull();
    expect(getAllByTestId('wallatest-item-card-image')[1]).toHaveAttribute('alt', 'Android 333');
  });

  it('Renders Home Item Manager and it filters by title', async () => {
    const { findByTestId, getByTestId, getByText, queryByText } = renderComponent();
    expect(await findByTestId('wallatest-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId('wallatest-loader'));

    //Find search input
    const searchInput = await findByTestId('wallatest-home-search-input');

    // Write iPhone 550 in the search input and press Enter
    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'iPhOnE 550' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(getByText(MOCK_ITEMS[0].title)).not.toBeNull();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();

    // Write Android in the search input and press Enter
    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'AnDrOiD 333' } });
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

  it('Renders Home Item Manager and it filters by price', async () => {
    const { findByTestId, getByTestId, getByText, queryByText } = renderComponent();
    expect(await findByTestId('wallatest-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId('wallatest-loader'));

    const searchInput = await findByTestId('wallatest-home-search-input');

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 11 } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(getByText(MOCK_ITEMS[0].title)).not.toBeNull();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 33 } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(queryByText(MOCK_ITEMS[0].title)).not.toBeInTheDocument();
    expect(getByText(MOCK_ITEMS[1].title)).not.toBeNull();

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: '99' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(queryByText(MOCK_ITEMS[0].title)).not.toBeInTheDocument();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();
  });

  it('Renders Home Item Manager and it filters by description', async () => {
    const { findByTestId, getByTestId, getByText, queryByText } = renderComponent();
    expect(await findByTestId('wallatest-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId('wallatest-loader'));

    const searchInput = await findByTestId('wallatest-home-search-input');

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'Super oro con detector de radiación' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(getByText(MOCK_ITEMS[0].title)).not.toBeNull();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: '333 con motor cuántico.' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(queryByText(MOCK_ITEMS[0].title)).not.toBeInTheDocument();
    expect(getByText(MOCK_ITEMS[1].title)).not.toBeNull();

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'super auto hibrido marciano' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(queryByText(MOCK_ITEMS[0].title)).not.toBeInTheDocument();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();
  });

  it('Renders Home Item Manager and it filters by email', async () => {
    const { findByTestId, getByTestId, getByText, queryByText } = renderComponent();
    expect(await findByTestId('wallatest-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId('wallatest-loader'));

    const searchInput = await findByTestId('wallatest-home-search-input');

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'iphonemail@wallapop.com' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(getByText(MOCK_ITEMS[0].title)).not.toBeNull();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'cameramail@wallapop.com' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(queryByText(MOCK_ITEMS[0].title)).not.toBeInTheDocument();
    expect(getByText(MOCK_ITEMS[1].title)).not.toBeNull();

    await act(async () => {
      await fireEvent.change(searchInput, { target: { value: 'lionelmezzi@gmail.com' } });
      await fireEvent.keyDown(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });

    expect(queryByText(MOCK_ITEMS[0].title)).not.toBeInTheDocument();
    expect(queryByText(MOCK_ITEMS[1].title)).not.toBeInTheDocument();
  });

  it('Renders Home Item Manager and it adds favorites correctly', async () => {
    const { findByTestId, getByTestId, getAllByTestId, queryByTestId } = renderComponent();
    expect(await findByTestId('wallatest-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId('wallatest-loader'));

    expect(queryByTestId('wallatest-item-card-is-favourite')).not.toBeTruthy();
    const notFavouriteButtons = getAllByTestId('wallatest-item-card-not-favourite');
    await act(async () => {
      await fireEvent.click(notFavouriteButtons[0]);
    });
    expect(getByTestId('wallatest-item-card-is-favourite')).toBeInTheDocument();

    const favouriteButton = getByTestId('wallatest-item-card-is-favourite');
    await act(async () => {
      await fireEvent.click(favouriteButton);
    });
    expect(queryByTestId('wallatest-item-card-is-favourite')).not.toBeTruthy();
  });

  it('Renders Home Item Manager and it paginates correctly', async () => {
    const { findByTestId, getByTestId, queryByText } = renderComponent();
    expect(await findByTestId('wallatest-loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId('wallatest-loader'));

    // Element number 6 should not be shown
    expect(queryByText(MOCK_ITEMS[5].title)).not.toBeInTheDocument();

    //Find pagination and click on next page icon
    expect(await findByTestId('wallatest-home-pagination')).toBeInTheDocument();
    const paginationNextIcon = await findByTestId('NavigateNextIcon');
    await act(async () => {
      await fireEvent.click(paginationNextIcon);
    });

    // Item for page 1 should not be shown
    expect(queryByText(MOCK_ITEMS[0].title)).toBeNull();

    // Item for page 2 should be shown
    expect(queryByText(MOCK_ITEMS[5].title)).toBeInTheDocument();

    //Find pagination back button and click
    const paginationBeforeIcon = await findByTestId('NavigateBeforeIcon');
    await act(async () => {
      await fireEvent.click(paginationBeforeIcon);
    });

    expect(queryByText(MOCK_ITEMS[0].title)).toBeInTheDocument();
    expect(queryByText(MOCK_ITEMS[4].title)).toBeInTheDocument();
    expect(queryByText(MOCK_ITEMS[5].title)).toBeNull();
  });
});
