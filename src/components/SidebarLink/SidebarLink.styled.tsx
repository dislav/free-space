import styled from 'styled-components';

interface ISidebarLink {
  active?: boolean;
}

export const Container = styled.div<ISidebarLink>`
  a {
    display: flex;
    align-items: center;
    font-weight: ${({ active }) => active ? 700 : 400};
    background-color: ${({ theme, active }) => active && theme.colors.blue30};
    border-radius: 0 18px 18px 0;
    transition: background-color 0.3s;
    padding: 16px 80px 16px 100px;
  }
`;
