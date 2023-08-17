'use client';

import { useState, useEffect, useCallback } from 'react';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Button from '../Button';
import { useRouter } from 'next/navigation';

interface Props {}

const LoginModal: NextPage<Props> = ({}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.error) {
          toast.error(callback.error);
        } else {
          if (callback?.ok) {
            console.log(callback?.status);
            toast.success('Logged in');
            router.refresh();
            loginModal.onClose();
          }
        }
      })
      .catch(() => {});
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />

      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='password'
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        label='Continue with Google'
        outline
        icon={FcGoogle}
        onClick={() => signIn('google', { redirect: false })}
      />
      <Button
        label='Continue with Github'
        outline
        icon={AiFillGithub}
        onClick={() => signIn('github', { redirect: false })}
      />
      <div
        className='
        text-neutral-500
        text-center
        mt-4
        font-light
      '
      >
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>First time using Netflix?</div>
          <div
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
