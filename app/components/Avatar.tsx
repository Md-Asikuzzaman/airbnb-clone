'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

interface Props {
  src: string | null | undefined;
}

const Avatar: NextPage<Props> = ({ src }) => {
  return (
    <Image
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
      src={src ? src : '/images/avatar.jpg'}
    />
  );
};

export default Avatar;
