import React from 'react';

import styled from 'styled-components';
import '../styles/windows98.scss';

const Windows98Styles = styled.div`
  margin: 0;
  padding: 0;
`;

export const Windows98 = props => {
  return (
    <Windows98Styles as={props.as} className={`${props.className} windows98`}>
      {props.children}
    </Windows98Styles>
  );
}