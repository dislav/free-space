import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Icon, Menu } from './DropdownMenu.styled';

const DropdownMenu: React.FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);

  const onClickOutside = (e: any) => {
    if (containerRef && containerRef?.current?.contains(e.target)) return;
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', onClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen]);

  return (
    <Container ref={containerRef} isOpen={isOpen}>
      <Icon onClick={openMenu}>
        <svg width={21} height={5}>
          <circle r={2.5} cx={2.5} cy={2.5} />
          <circle r={2.5} cx={10.5} cy={2.5} />
          <circle r={2.5} cx={18.5} cy={2.5} />
        </svg>
      </Icon>
      {isOpen && <Menu>{children}</Menu>}
    </Container>
  );
};

export default DropdownMenu;
