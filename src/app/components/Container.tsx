'use client';

import { NextPage } from 'next';

interface Props {
  children: React.ReactNode;
}

const Container: NextPage<Props> = ({ children }) => {
  return <div className='max-w-[1400px] mx-auto xl:px-14 md:px-10 sm:px-2 px-4'>{children}</div>;
};

export default Container;
