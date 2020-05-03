import React from 'react';
import { Windows98 } from './Windows98';

function TitleBar({title, onMinimize, onMaximize, onClose, ...rest}) {
  return (
    <Windows98>
      <div className="title-bar" {...rest} >
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"
            onClick={onMinimize ? onMinimize : () => {}}
          />
          <button aria-label="Maximize"
            onClick={onMaximize ? onMaximize : () => {}}
          />
          <button aria-label="Close"
            onClick={onClose ? onClose : () => {}}
          />
        </div>
      </div>
    </Windows98>
  );
}

export default TitleBar;