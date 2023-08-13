'use client';

import { NextPage } from 'next';

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: NextPage<Props> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-left'}>
      <div className='text-2xl font-bold'>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  );
};

export default Heading;
