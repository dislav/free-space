import React, { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

import { Promotion } from '../../interfaces/types';
import { Container, Column } from './PromotionCard.styled';
import { Switch } from '@chakra-ui/react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';
import { activatePromotion } from '../../lib/api';
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
      <WithGroup available={['2']}>
        <Column>
          <Switch
            id={'active'}
            size={'lg'}
            defaultChecked={isActive}
            colorScheme={'telegram'}
            onChange={onActivatePromotion}
          />
        </Column>
      </WithGroup>
      <Column>{description}</Column>
      <DropdownMenu>
        <DropdownMenuLink>Редактировать</DropdownMenuLink>
      </DropdownMenu>
    </Container>
  );
};

export default PromotionCard;
