/* eslint-disable testing-library/prefer-query-by-disappearance */
import React from 'react';
import { render } from '@testing-library/react';
import TestContainer from 'app/components/Test/TestContainer';

import { BUTTONS } from './constants';
import ItemsOrderButtons from '.';

const itemsOrderButtonsProps = {
  order: '',
  setOrder: jest.fn(),
};

const renderComponent = (itemsOrderButtonsProps: any) => {
  return render(
    <TestContainer>
      <ItemsOrderButtons {...itemsOrderButtonsProps} />
    </TestContainer>,
  );
};

describe('<ItemsOrderButtons/>', () => {
  it('Renders Items Order Buttons', async () => {
    const { findByTestId } = renderComponent(itemsOrderButtonsProps);
    expect(await findByTestId('wallatest-items-order-buttons-container')).toBeInTheDocument();

    await Promise.all(
      BUTTONS.map(async (btn: any) => {
        expect(await findByTestId(`wallatest-items-order-buttons-${btn.field}`)).toBeInTheDocument();
      }),
    );
  });
});
