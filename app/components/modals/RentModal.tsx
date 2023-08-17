'use client';

import { NextPage } from 'next';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';

interface Props {}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal: NextPage<Props> = ({}) => {
  const rentModal = useRentModal();

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel='Submit'
      title='Airbnb your home!'
    />
  );
};

export default RentModal;
