import React from 'react';

import styled from 'styled-components';
import '../styles/windows98.scss';

const Windows98Styles = styled.div`
  margin: 0;
  padding: 0;
`;

export const Windows98 = props => {
  const { className, as, children } = props;
  return (
    <Windows98Styles as={as} className={`${className? className: ''} windows98`}>
      {children}
    </Windows98Styles>
  );
}