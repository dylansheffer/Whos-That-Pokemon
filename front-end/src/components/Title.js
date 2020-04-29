import React from 'react';
import styled from 'styled-components';

import titleImage from '../static/title.png';

const TitleStyle = styled.div`
  background-image: url(${titleImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  max-height: 75px;
  width: 100%;
`;

function Title({ className, ...props }) {
  return (
    <>
      <TitleStyle className={className} aria-hidden="true" />
      <h1 className="visually-hidden">Who's That Pokemon?!?</h1>
    </>
  );
}

export default Title;