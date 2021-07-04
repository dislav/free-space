import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { rgba } from 'polished';

export const Container = styled.div`
  display: flex;

  ${up('xl')} {
    justify-content: flex-end;
  }

  ul {
    display: flex;
    align-items: center;
    list-style: none;

    li {
      margin-right: 8px;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        line-height: 1;
        font-weight: 500;
        min-width: 32px;
        background: ${({ theme }) => theme.colors.gray10};
        border-radius: 4px;
        padding: 10px;
      }

      &.selected {
        a {
          background: ${({ theme }) => theme.colors.blue30};
        }
      }

      &.disabled {
        a {
          color: ${({ theme }) => theme.colors.gray40};
          background: ${({ theme }) => rgba(theme.colors.gray10, 0.5)};
          cursor: not-allowed;
        }
      }
    }
  }
`;
