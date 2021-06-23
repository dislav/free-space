import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Switch, useToast } from '@chakra-ui/react';

import { Promotion } from '../../interfaces/types';
import { activatePromotion } from '../../lib/api';

import { Container, Column } from './PromotionCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';
import WithGroup from '../WithGroup/WithGroup';

interface IPromotionCard extends Promotion {
  onActivate?: () => void;
}

const PromotionCard: React.FC<IPromotionCard> = ({
  id,
  name,
  description,
  active,
  onActivate,
}) => {
  const toast = useToast();
  const isActive = !!+active;

  const onActivatePromotion = useCallback(async () => {
    try {
      const { data } = await activatePromotion(id);
      if (!data.status) throw new Error(data.message);

      toast({
        title: 'Успешно',
        description: `Акция «${name}» успешно ${
          !isActive ? 'активирована' : 'деактивирована'
        }.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onActivate?.();
    } catch (e) {
      toast({
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [name, active]);

  return (
    <Container>
      <Column>{name}</Column>
      <Column>
        <Switch
          id={'active'}
          size={'lg'}
          defaultChecked={isActive}
          colorScheme={'telegram'}
          onChange={onActivatePromotion}
        />
      </Column>
      <Column>{description}</Column>
      <WithGroup available={['2']}>
        <DropdownMenu>
          <Link to={`/promotion/update/${id}`}>
            <DropdownMenuLink>Редактировать</DropdownMenuLink>
          </Link>
        </DropdownMenu>
      </WithGroup>
    </Container>
  );
};

export default PromotionCard;
