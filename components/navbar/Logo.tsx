'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {}

const Logo: NextPage<Props> = ({}) => {
  const router = useRouter();
  return (
    <Image
      alt='logo'
      className='hidden md:block cursor-pointer'
      height={100}
      width={100}
      src='/images/logo.png'
    />
  );
};

export default Logo;
