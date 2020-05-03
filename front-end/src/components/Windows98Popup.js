import React from 'react';
import Dialog from "react-a11y-dialog";
import styled from 'styled-components';
import TitleBar from './TitleBar';


const StyledDialog = ({children, className, title, id, onClose, ...rest}) => {
  return (
    <Dialog
      classNames={{
        base: className,
        overlay: className,
        element: className,
        document: className,
        closeButton: 'visually-hidden',
        title: 'visually-hidden'
      }}
      title={title}
      id={id}
      {...rest}
    >
      <TitleBar
        title={title}
        onClose={onClose}
        aria-hidden="true"
      />
      {children}
    </Dialog>
)}

export const Windows98PopUp = styled(StyledDialog)`
  dialog {
    padding: 0;
    border: 0;
  }
`;