import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { Button } from '@chakra-ui/react';

import { Container, Image } from './ProfileAvatar.styled';

const CameraIcon = () => {
  return (
    <svg
      width="30"
      height="24"
      viewBox="0 0 30 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.3539 3.75652C27.7694 3.14423 26.9623 2.78242 26.0439 2.78242H21.4239V2.72675C21.4239 2.03097 21.1456 1.36301 20.6724 0.917709C20.1993 0.444574 19.5592 0.16626 18.8634 0.16626H10.5139C9.79032 0.16626 9.1502 0.444574 8.67707 0.917709C8.20393 1.39084 7.92562 2.03097 7.92562 2.72675V2.78242H3.33343C2.41499 2.78242 1.60788 3.14423 1.02342 3.75652C0.438957 4.34098 0.0493164 5.17592 0.0493164 6.06653V19.9266C0.0493164 20.845 0.411125 21.6521 1.02342 22.2366C1.60788 22.8211 2.44282 23.2107 3.33343 23.2107H26.0439C26.9623 23.2107 27.7694 22.8489 28.3539 22.2366C28.9384 21.6521 29.328 20.8172 29.328 19.9266V6.06653C29.328 5.14809 28.9662 4.34098 28.3539 3.75652ZM27.8808 19.9266H27.8529C27.8529 20.4276 27.6581 20.8729 27.3241 21.2068C26.9902 21.5408 26.5449 21.7356 26.0439 21.7356H3.33343C2.83246 21.7356 2.38716 21.5408 2.05318 21.2068C1.7192 20.8729 1.52438 20.4276 1.52438 19.9266V6.06653C1.52438 5.56556 1.7192 5.12026 2.05318 4.78628C2.38716 4.4523 2.83246 4.25748 3.33343 4.25748H8.7049C9.12237 4.25748 9.45635 3.92351 9.45635 3.50603V2.69892C9.45635 2.39278 9.56767 2.11446 9.76249 1.91964C9.95731 1.72482 10.2356 1.6135 10.5418 1.6135H18.8634C19.1695 1.6135 19.4478 1.72482 19.6427 1.91964C19.8375 2.11446 19.9488 2.39278 19.9488 2.69892V3.50603C19.9488 3.92351 20.2828 4.25748 20.7003 4.25748H26.0717C26.5727 4.25748 27.018 4.4523 27.352 4.78628C27.6859 5.12026 27.8808 5.56556 27.8808 6.06653V19.9266Z"
        fill="currentColor"
      />
      <path
        d="M14.6888 6.1499C12.7963 6.1499 11.0707 6.92918 9.84615 8.15377C8.59373 9.40618 7.84229 11.1039 7.84229 12.9964C7.84229 14.889 8.62157 16.6145 9.84615 17.8391C11.0986 19.0915 12.7963 19.843 14.6888 19.843C16.5814 19.843 18.3069 19.0637 19.5315 17.8391C20.7839 16.5867 21.5354 14.889 21.5354 12.9964C21.5354 11.1039 20.7561 9.37835 19.5315 8.15377C18.3069 6.92918 16.5814 6.1499 14.6888 6.1499ZM18.4739 16.8094C17.4998 17.7556 16.1639 18.3679 14.6888 18.3679C13.2138 18.3679 11.8778 17.7556 10.9037 16.8094C9.92964 15.8353 9.34518 14.4993 9.34518 13.0243C9.34518 11.5492 9.95748 10.2133 10.9037 9.23919C11.8778 8.26509 13.2138 7.68063 14.6888 7.68063C16.1639 7.68063 17.4998 8.29292 18.4739 9.23919C19.448 10.2133 20.0325 11.5492 20.0325 13.0243C20.0603 14.4993 19.448 15.8353 18.4739 16.8094Z"
        fill="currentColor"
      />
      <path
        d="M24.5966 8.8498C25.3498 8.8498 25.9604 8.23923 25.9604 7.48606C25.9604 6.73288 25.3498 6.12231 24.5966 6.12231C23.8435 6.12231 23.2329 6.73288 23.2329 7.48606C23.2329 8.23923 23.8435 8.8498 24.5966 8.8498Z"
        fill="currentColor"
      />
    </svg>
  );
};

interface IProfileAvatar {
  imageUrl?: string;
}

const ProfileAvatar: React.FC<IProfileAvatar> = ({ imageUrl }) => {
  const [url, setUrl] = useState('');

  const { colors, variables } = useTheme();
  const { register, watch, setValue } = useFormContext();

  const image = watch('image', null);

  useEffect(() => {
    if (image?.length) setUrl(URL.createObjectURL(image[0]));
  }, [image]);

  const clearImage = () => {
    setValue('image', '');
    setUrl('');
  };

  const hasImage = url || imageUrl;

  return (
    <Container>
      <Image>
        {hasImage ? <img src={hasImage} alt="" /> : <CameraIcon />}
        <input
          type={'file'}
          accept={'image/jpg,image/png,image/jpeg'}
          {...register('image')}
        />
      </Image>
      {url && (
        <Button
          border={`2px solid ${colors.blue30}`}
          borderRadius={variables.borderRadius}
          onClick={clearImage}
        >
          ??????????????
        </Button>
      )}
    </Container>
  );
};

export default ProfileAvatar;
