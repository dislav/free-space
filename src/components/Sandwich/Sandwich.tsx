import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getSandwich } from '../../store/sandwich/selectors';
import { setSandwich } from '../../store/sandwich/actions';

import { Container } from './Sandwich.styled';

const Sandwich: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(getSandwich);

  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpen) dispatch(setSandwich(false));
  }, [pathname]);

  const onClick = useCallback(
    () => dispatch(setSandwich(!isOpen)),
    [dispatch, isOpen]
  );

  return (
    <Container onClick={onClick}>
      <span />
    </Container>
  );
};

export default Sandwich;
