import { css } from 'styled-components';
import { fontSize } from './theme';

export const font = (key: keyof typeof fontSize) => {
  const [size, lineHeight] = fontSize[key];

  return css`
    font-size: ${size / 16}rem;
    line-height: ${lineHeight / 16}rem;
  `;
};
