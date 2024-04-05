'use client';
import MainBtn from '../../buttons/MainBtn';
import { useState } from 'react';
import css from './adminPanel.module.scss';
import AddTypeModal from '../../modals/addType/AddTypeModal';
import AddProductModal from '../../modals/addProduct/AddProductModal';
// import AddTypeModal from '@/components/modals/addType/AddTypeModal';
// import AddProductModal from '@/components/modals/addProduct/AddProductModal';

export default function AdminPanel() {
  const [modalTypeIsOpen, setIsTypeOpen] = useState(false);
  const [modalProductIsOpen, setIsProductOpen] = useState(false);

  const TypeModalHandler = (mode: 'OPEN' | 'CLOSE') => {
    if (mode === 'OPEN') {
      setIsTypeOpen(true);
    }
    if (mode === 'CLOSE') {
      setIsTypeOpen(false);
    }
  };
  const ProductModalHandler = (mode: 'OPEN' | 'CLOSE') => {
    if (mode === 'OPEN') {
      setIsProductOpen(true);
    }
    if (mode === 'CLOSE') {
      setIsProductOpen(false);
    }
  };
  return (
    <div className={css.adminContent}>
      <div className={css.adminBlock}>
        <MainBtn
          onClick={() => TypeModalHandler('OPEN')}
          version="contain"
        >
          Add type
        </MainBtn>
        <AddTypeModal
          modalIsOpen={modalTypeIsOpen}
          closeModal={() => TypeModalHandler('CLOSE')}
        />
      </div>
      <div className={css.adminBlock}>
        <MainBtn
          disabled
          version="contain"
        >
          Add Brand
        </MainBtn>
      </div>
      <div className={css.adminBlock}>
        <MainBtn
          onClick={() => ProductModalHandler('OPEN')}
          version="contain"
        >
          Add Product
        </MainBtn>
        <AddProductModal
          modalIsOpen={modalProductIsOpen}
          closeModal={() => ProductModalHandler('CLOSE')}
        />
      </div>
    </div>
  );
}
