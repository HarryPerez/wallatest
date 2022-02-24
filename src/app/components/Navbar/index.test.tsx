import React from 'react';
import { render, screen } from '@testing-library/react';
import TestContainer from 'app/components/Test/TestContainer';

import Navbar from '.';

import styles from './styles.module.scss';

const renderComponent = () => {
  return render(
    <TestContainer>
      <Navbar containerClassName="row start middle">
        <p>wallatest navbar</p>
      </Navbar>
    </TestContainer>,
  );
};

describe('<Navbar/>', () => {
  it('Renders Navbar with the appropiated styles', async () => {
    const { findByTestId, getAllByText } = renderComponent();
    const navBarContainer = await screen.findByTestId('wallatest-navbar-container');
    expect(navBarContainer).toBeInTheDocument();
    expect(navBarContainer).toHaveClass('navbarContainer');
    expect(navBarContainer).toHaveClass(styles.navbarContainer);

    // There are library issues for this - https://github.com/testing-library/jest-dom/issues/295 - It can be solved by doing end to end tests
    /*
    expect(navBarContainer).toHaveStyle({
      backgroundColor: 'rgb(255, 255, 255)',
      borderBottom: '1px solid',
      borderColor: 'rgba(236,239,241,.5)',
      height: '66px',
      padding: '0 16px',
      position: 'sticky',
      top: '0',
      transition: 'top 150ms ease',
      width: '100%',
      zIndex: '1001',
    });
    */

    const navBar = await findByTestId('wallatest-navbar');
    expect(navBar).toBeInTheDocument();
    expect(navBar).toHaveClass('navbar');
    expect(navBar).toHaveClass(styles.navbar);
    expect(getAllByText('wallatest navbar')).not.toBeNull();
  });
});
