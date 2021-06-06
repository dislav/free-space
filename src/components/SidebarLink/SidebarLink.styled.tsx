import styled from 'styled-components';
import { up } from 'styled-breakpoints';

interface ISidebarLink {
  active?: boolean;
}

export const Container = styled.div<ISidebarLink>`
  a {
    display: flex;
    align-items: center;
    font-weight: ${({ active }) => (active ? 700 : 400)};
    background-color: ${({ theme, active }) => active && theme.colors.blue30};
    transition: background-color 0.3s;
    padding: 16px 20px 16px 46px;

    ${up('xl')} {
      border-radius: ${({ theme }) =>
        `0 ${theme.variables.borderRadius} ${theme.variables.borderRadius} 0`};
      padding: 16px 80px 16px 100px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.blue30};
    }
  }

  svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.black};
    margin-right: 20px;
  }
`;
