import React from 'react';

import TitleBar from './TitleBar';
import Menu from './Menu';

function Header(props) {
  return (
    <header className={props.className}>
      <TitleBar title="Who's That Pokemon?!?" />
      <Menu />
    </header>
  );
}

export default Header;