'use client';

import { useState, useEffect, useCallback } from 'react';
import { NextPage } from 'next';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';

interface Props {}

const RegisterModal: NextPage<Props> = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
        toast.success('Account created successfully!');
      })
      .catch((error) => {
        toast.error('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account' />
      <Input
        id='name'
        label='Username'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

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
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
