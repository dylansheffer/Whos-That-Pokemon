import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuButton from 'react-menu-button';

const InclusiveMenuButton = styled(MenuButton)`
  position: relative;
  display: inline-block;

  [data-inclusive-menu-opens],
  [role^="menuitem"] {
    text-align: left;
    border: 0;
  }
  [role="menu"] {
    position: absolute;
    left: 0;
  }
  [role^="menuitem"] {
    display: block;
    min-width: 100%;
    white-space: nowrap;
  }
`;

const Windows98Menu = styled.nav`
  background-color: var(--surface);
  font-family: 'Pixelated MS Sans Serif', Arial;
  -webkit-font-smoothing: none;
  font-size: 12px;
`;

const Windows98MenuItem = styled(InclusiveMenuButton)`
  padding: 2px 0;

  /* Button Styles */
  [data-inclusive-menu-opens] {
    background-color: var(--surface);
    /* Remove carrot */
    span {
      display: none;
    }
  }
  [data-inclusive-menu-opens][aria-expanded="true"] {
    box-shadow: 1px 1px 0 var(--button-shadow) inset, -1px -1px 0 var(--button-highlight) inset;
  }

  /* Menu Styles */
  [role="menu"] {
    background-color: var(--surface);
    min-width: 100px;
    box-shadow: 1px 1px 0 var(--button-highlight) inset, -1px -1px 0 var(--button-shadow) inset;
  }

  /* Pop-up Menu Item Styles */
  [role^="menuitem"] {
    color: black;
    background-color: transparent;
    &:focus, :hover {
      color: white;
      outline: 0;
      background-color: var(--dialog-blue)
    }
    &:focus ~ :hover {

    }
  }
  /* TODO: Fix selector where I'm trying to reset menu item that is focused when one is hovering over another */
  [role^="menuitem"]:focus ~ [role^="menuitem"]:hover {
    color: red;
  }
`;

const Menu = props => {
  return (
    <Windows98Menu>
      <Windows98MenuItem id="test" label="Test">
        <button>Test 1</button>
        <button>Test 2</button>
        <button>Test 3</button>
      </Windows98MenuItem>
      <Windows98MenuItem id="test2" label="Test2">
        <button>Test 1</button>
        <button>Test 2</button>
        <button>Test 3</button>
      </Windows98MenuItem>
    </Windows98Menu>
  );
};

Menu.propTypes = {

};

export default Menu;