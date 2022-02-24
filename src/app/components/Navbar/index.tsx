import React from 'react';

import styles from './styles.module.scss';

interface NavbarProps {
  containerClassName?: string;
  navbarClassName?: string;
  children?: any;
}

function Navbar({ containerClassName = '', navbarClassName = '', children }: NavbarProps) {
  return (
    <div className={`full-width ${styles.navbarContainer} ${containerClassName}`} data-testid="wallatest-navbar-container">
      <nav className={`full-width ${styles.navbar} ${navbarClassName}`} data-testid="wallatest-navbar">
        {children}
      </nav>
    </div>
  );
}

export default Navbar;
