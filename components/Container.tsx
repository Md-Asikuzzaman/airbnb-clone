'use client';

import { ReactNode } from 'react';
import { NextPage } from 'next';

interface Props {
  children: ReactNode;
}

const Container: NextPage<Props> = ({ children }) => {
  return (
    <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
      {children}
    </div>
  );
};

export default Container;
