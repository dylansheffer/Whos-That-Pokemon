import React from 'react';

import TitleBar from './TitleBar';
import Menu from './Menu';

function Header({pokedex, ...rest}) {
  return (
    <header {...rest}>
      <TitleBar title="Who's That Pokemon?!?" />
      <Menu pokedex={pokedex} />
    </header>
  );
}

export default Header;