/* eslint-disable testing-library/prefer-presence-queries */
import React from 'react';
import { render } from '@testing-library/react';
import TestContainer from 'app/components/Test/TestContainer';

import LoadingWrapper from '.';

const renderComponent = (loading: boolean) => {
  return render(
    <TestContainer>
      <LoadingWrapper loading={loading}>
        <p>wallatest children</p>
      </LoadingWrapper>
    </TestContainer>,
  );
};

describe('<LoadingWrapper/>', () => {
  it('Renders Loading Wrapper with no children as loading is true', async () => {
    const { findByTestId, queryByText } = renderComponent(true);
    expect(await findByTestId('wallatest-loader')).toBeInTheDocument();
    expect(queryByText('wallatest children')).not.toBeInTheDocument();
  });

  it('Renders Loading Wrapper with children as loading is false', () => {
    const { getAllByText, queryByTestId } = renderComponent(false);
    expect(queryByTestId('wallatest-loader')).not.toBeInTheDocument();
    expect(getAllByText('wallatest children')).not.toBeNull();
  });
});
