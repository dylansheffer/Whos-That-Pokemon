import { createGlobalStyle } from "styled-components";

import MsSans from './fonts/ms_sans_serif.woff';
import MsSans2 from './fonts/ms_sans_serif.woff2';
import MsSansBold from './fonts/ms_sans_serif_bold.woff';
import MsSansBold2 from './fonts/ms_sans_serif_bold.woff2';

export const GlobalStyle = createGlobalStyle`
:root {
  /**
  * Windows 98 Styles from 98.css
  * Copyright (c) 2020 Jordan Scales <thatjdanisso.cool>
  * https://github.com/jdan/98.css/blob/master/LICENSE
  */

  /* Color */
  --surface: #c0c0c0;
  --button-highlight: #ffffff;
  --button-face: #dfdfdf;
  --button-shadow: #808080;
  --window-frame: #0a0a0a;
  --dialog-blue: #000080;
  --dialog-blue-light: #1084d0;
  --link-blue: #0000ff;

  /* Spacing */
  --element-spacing: 8px;
  --grouped-button-spacing: 4px;
  --grouped-element-spacing: 6px;
  --radio-width: 12px;
  --checkbox-width: 13px;
  --radio-label-spacing: 6px;
  --scroll-bar-width: 16px;
  --scroll-bar-height: 17px;

  /* Some detailed computations for radio buttons and checkboxes */
  --radio-total-width-precalc: var(--radio-width) + var(--radio-label-spacing);
  --radio-total-width: calc(var(--radio-total-width-precalc));
  --radio-left: calc(-1 * var(--radio-total-width-precalc));
  --radio-dot-width: 4px;
  --radio-dot-top: calc(var(--radio-width) / 2 - var(--radio-dot-width) / 2);
  --radio-dot-left: calc(-1 * (var(--radio-total-width-precalc)) + var(--radio-width) / 2 - var(--radio-dot-width) / 2);

  --checkbox-total-width-precalc: var(--checkbox-width) + var(--radio-label-spacing);
  --checkbox-total-width: calc(var(--checkbox-total-width-precalc));
  --checkbox-left: calc(-1 * var(--checkbox-total-width-precalc));
  --checkmark-width: 7px;
  --checkmark-top: 3px;
  --checkmark-left: 3px;

  /* Borders */
  --border-width: 1px;
  --border-raised-outer: inset -1px -1px var(--window-frame), inset 1px 1px var(--button-highlight);
  --border-raised-inner: inset -2px -2px var(--button-shadow), inset 2px 2px var(--button-face);
  --border-sunken-outer: inset -1px -1px var(--button-highlight), inset 1px 1px var(--window-frame);
  --border-sunken-inner: inset -2px -2px var(--button-face), inset 2px 2px var(--button-shadow);

  /* Field borders (checkbox, input, etc) flip window-frame and button-shadow */
  --border-field: inset -1px -1px var(--button-highlight), inset 1px 1px var(--button-shadow), inset -2px -2px var(--button-face),
    inset 2px 2px var(--window-frame);
  }

  @font-face {
    font-family: "Pixelated MS Sans Serif";
    src: url(${MsSans}) format("woff");
    src: url(${MsSans2}) format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Pixelated MS Sans Serif";
    src: url(${MsSansBold}) format("woff");
    src: url(${MsSansBold2}) format("woff2");
    font-weight: bold;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    cursor: url('data:image/gif;base64,R0lGODlhCwATAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAALABMAAAIrhI4JlhrcBAgvSlrbxPBs7mAU9IlMaV7mwo6jY2zk+Xphh8iWint1tDgUAAA7'),
      default;
  }

  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }

  ::-webkit-scrollbar {
    width: var(--scroll-bar-width);
  }

  ::-webkit-scrollbar:horizontal {
    height: var(--scroll-bar-height);
  }

  ::-webkit-scrollbar-corner {
    background: var(--button-face);
  }

  ::-webkit-scrollbar-track {
    background-image: url("./icon/scrollbar-background.svg");
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--button-face);
    box-shadow: var(--border-raised-outer), var(--border-raised-inner);
  }

  ::-webkit-scrollbar-button:vertical:start {
    height: var(--scroll-bar-height);
    background-image: url("./icon/button-up.svg");
  }

  ::-webkit-scrollbar-button:vertical:end {
    height: var(--scroll-bar-height);
    background-image: url("./icon/button-down.svg");
  }

  ::-webkit-scrollbar-button:horizontal:start {
    width: var(--scroll-bar-width);
    background-image: url("./icon/button-left.svg");
  }

  ::-webkit-scrollbar-button:horizontal:end {
    width: var(--scroll-bar-width);
    background-image: url("./icon/button-right.svg");
  }

`;