import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import cookie from 'cookie';

import { Container, Close } from './NotificationMessage.styled';

const NotificationMessage: React.FC = () => {
  const [isHidden, setIsHidden] = useState(() => {
    if (!('Notification' in window)) return true;
    if (Notification.permission === 'granted') return true;
    return cookie.parse(document.cookie)?.notifications === 'active';
  });

  const onClose = () => {
    document.cookie = cookie.serialize('notifications', 'active');
    setIsHidden(true);
  };

  const onClick = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') setIsHidden(true);
  };

  if (isHidden) return <></>;

  return (
    <Container>
      Включить оповещения в браузере?
      <Button onClick={onClick} ml={[0, 0, '8px']}>
        Включить
      </Button>
      <Close onClick={onClose} />
    </Container>
  );
};

export default NotificationMessage;
