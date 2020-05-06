import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuButton from 'react-menu-button';

import { Windows98PopUp } from './Windows98Popup';
import Pokedex from './Pokedex';

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
  height: 20px;
`;

const Windows98MenuItem = styled(InclusiveMenuButton)`
  padding: 2px 0;

  /* Button Styles */
  [data-inclusive-menu-opens] {
    background-color: var(--surface);
    &:focus, :hover {
      box-shadow: 1px 1px 0 var(--button-highlight) inset, -1px -1px 0 var(--button-shadow) inset;
      outline: 0;
    }
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
      outline: 0;
      color: white;
      background-color: var(--dialog-blue)
    }
  }
`;

const MenuItemStyle = styled.button`
  padding: 1px 7px 2px;
  &[role^="menuitem"].unfocused {
    color: black;
    background-color: transparent;
  }
`;

const MenuItem = ({ children, ...rest }) => {
  // * Add unfocused Class if the hovered button isn't the focused button
  const addUnfocusedClass = ({ nativeEvent: { toElement: hoveredElement } }) => {
    const focusedElement = document.activeElement;
    if(hoveredElement !== focusedElement && hoveredElement.tagName === focusedElement.tagName) {
      focusedElement.classList.add('unfocused')
    }
    else {
      // * Remove unfocused if you hover back over the focused element
      focusedElement.classList.remove('unfocused');
    }
  };
  // * Remove unfocused class if the element receives focus
  const removeUnfocusedClass = () => {
    const focusedElement = document.activeElement;
    focusedElement.classList.remove('unfocused');
  };
  return (
    <MenuItemStyle
      onMouseEnter={addUnfocusedClass}
      onFocus={removeUnfocusedClass}
      {...rest}
    >
      {children}
    </MenuItemStyle>
  );
}


class Menu extends React.Component {
  navigateTo = link => { window.location.assign(link) };
  openPopup = () => {
    this.dialog.show();
  }
  closePopup = () => {
    this.dialog.hide();
  }
  render() {
    const { pokedex } = this.props;
    return (
      <>
        <Windows98Menu>
          <Windows98MenuItem id="profile" label="Profile">
            {/* TODO: Get user data from GraphQL API */}
            <MenuItem as="p">Dylan Sheffer</MenuItem>
            <MenuItem onClick={() => this.navigateTo("https://www.dylansheffer.com/")}>Website</MenuItem>
            <MenuItem onClick={() => this.navigateTo("https://github.com/dylansheffer/")}>GitHub</MenuItem>
          </Windows98MenuItem>
          <Windows98MenuItem id="pokedex" label="Pokedex">
            <MenuItem onClick={this.openPopup}>View Pokedex</MenuItem>
          </Windows98MenuItem>
        </Windows98Menu>
        <Windows98PopUp
            id={`pokedex`}
            appRoot="#main"
            dialogRoot="#dialog-root"
            dialogRef={(dialog) => (this.dialog = dialog)}
            title="Pokedex"
            onClose={this.closePopup}
          >
            <Pokedex pokedex={pokedex} />
          </Windows98PopUp>
      </>
    );
  }
};

Menu.propTypes = {

};

export default Menu;