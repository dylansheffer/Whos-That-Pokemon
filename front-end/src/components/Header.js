import React from 'react';
import { Windows98 } from './Windows98';

function Header(props) {
  return (
    <Windows98>
      <div className="title-bar">
        <div className="title-bar-text">Who's That Pokemon?!?</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
    </Windows98>
  );
}

export default Header;