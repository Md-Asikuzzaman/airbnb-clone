'use client';

import { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';

interface Props {
  currentUser?: User | null;
}

const UserMenu: NextPage<Props> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rentModal = useRentModal();
  const registerModel = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();

    // OPEN RENT MODAL
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer select-none'
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='
            p-4
            md:py-1
            md:px-2
            border-[1px]
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            select-none
        '
        >
          <AiOutlineMenu />
          <div
            className='
            hidden
            md:block
          '
          >
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className='
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm
      '
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem label='My trips' onClick={() => {}} />
                <MenuItem label='My favorites' onClick={() => {}} />
                <MenuItem label='My reservation' onClick={() => {}} />
                <MenuItem label='My properties' onClick={() => {}} />
                <MenuItem
                  label='Airbnb my home'
                  onClick={() => {
                    rentModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <hr />
                <MenuItem label='Logout' onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label='Login' onClick={loginModal.onOpen} />
                <MenuItem label='Sign up' onClick={registerModel.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
