import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import TestContainer from 'app/components/Test/TestContainer';

import ItemCard from '.';

const itemMock = {
  title: 'Price Mock',
  price: '100',
  email: 'test@mock.com',
  image: 'https://mockImage.com',
  description: 'This is a test mock item',
  isFavourite: false,
};

const renderComponent = (isFavMode: boolean) => {
  return render(
    <TestContainer>
      <ItemCard isFavMode={isFavMode} item={itemMock} />
    </TestContainer>,
  );
};

describe('<ItemCard/>', () => {
  it('Renders Item Card', async () => {
    const { findByTestId, getByText } = renderComponent(false);
    expect(await findByTestId('wallatest-item-card')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-image')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-title')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-email')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-price')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-favourite-button')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-not-favourite')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-description')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-image')).toHaveAttribute('alt', 'Price Mock');
    expect(getByText('Price Mock')).not.toBeNull();
    expect(getByText('100€')).not.toBeNull();
    expect(getByText('test@mock.com')).not.toBeNull();
    expect(getByText('This is a test mock item')).not.toBeNull();
  });

  it('Renders Item Card as Favourite Mode', async () => {
    const { findByTestId, getByText } = renderComponent(true);
    expect(await findByTestId('wallatest-item-card')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-image')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-favourite-title')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-favourite-button')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-is-favourite-modal')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-image')).toHaveAttribute('alt', 'Price Mock');
    expect(getByText('Price Mock')).not.toBeNull();
  });

  it('Changes to favourite mode after clicking on Favourite Icon Button', async () => {
    const { findByTestId } = renderComponent(false);
    expect(await findByTestId('wallatest-item-card')).toBeInTheDocument();
    expect(await findByTestId('wallatest-item-card-title')).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(await findByTestId('wallatest-item-card-not-favourite'));
    });
  });
});
