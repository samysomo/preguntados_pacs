import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store'; 
import { GET_COMPLETED_THEMES } from '@/constants';

type CreateAccountModalProps = {
  isOpen: boolean;
  setSelectCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
};


const SelectCategoryModal = ({ isOpen, setSelectCategoryModal }: CreateAccountModalProps) => {
    const router = useRouter();

    return (
      <div className='fixed inset-0 bg-black-2 bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[600px] lg:w-[800px] flex flex-col rounded-lg shadow-lg overflow-hidden'>
          <header className="bg-gradient-to-b from-[#12003b] to-[#38006b] p-5 w-full rounded-t-lg">
            <h2 className="text-white text-3xl font-bold text-center">Selecciona una categoría</h2>
          </header>
          <div className='flex gap-16 bg-gradient-to-r from-[#300d66] to-[#fc466b] p-10'>
            
              <Button variant="outline" className='text-white'>
                Seleccionar
              </Button>
          </div>
        </div>
      </div>
    );
};

export default SelectCategoryModal;
