import React, { useState } from 'react'
import { Button } from './ui/button';

type CreateAccountModalProps = {
  isOpen: boolean;
  setSelectCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const categories = [
    { id: 1, name: "pruebas_unitarias", color: "#db7093" },
    { id: 2, name: "unitarias", color: "#20b2aa" },
    { id: 3, name: "pruebas_de_ntegracion", color: "#d63e92" },
    { id: 4, name: "pruebas_funcionales", color: "#daa520" },
    { id: 5, name: "pruebas_end_to_end", color: "#ff340f" },
    { id: 6, name: "pruebas_de_aceptacion", color: "#3cb371" },
    { id: 7, name: "corona", color: "#ecff00" }
  ];


const SelectCategoryModal = ({ isOpen, setSelectCategoryModal }: CreateAccountModalProps) => {
  if (!isOpen) return null
  const [crownCategory, setCrownCategory] = useState("Elige una!")

  const handleSelectCategory = () => {
    if(crownCategory != "Elige una!"){
        setSelectCategoryModal(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black-2 bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[600px] lg:w-[800px] flex flex-col rounded-lg shadow-lg overflow-hidden'>
        <header className="bg-gradient-to-b from-[#12003b] to-[#38006b] p-5 w-full rounded-t-lg">
          <h2 className="text-white text-3xl font-bold text-center">Selecciona una categoría</h2>
        </header>
        <div className='flex gap-16 bg-gradient-to-r from-[#300d66] to-[#fc466b] p-10'>
          <div className='grid grid-cols-2 gap-6'>
            {categories.map((category) => (
                !(category.name === "corona") && (
                    <div 
                        className='flex items-center justify-center p-5 text-white font-bold text-sm cursor-pointer rounded-lg' 
                        style={{backgroundColor: category.color}}
                        onClick={() => setCrownCategory(category.name)}
                    >
                        {category.name}
                    </div>
                )
            ))}
          </div>
          <div className='flex flex-col justify-center gap-5 min-w-[200px]'>
            <div className='flex justify-center items-center bg-gradient-to-b from-[#12003b] to-[#38006b] rounded-md'>
                <h3 className='text-white text-center font-bold p-5'>{crownCategory}</h3>
            </div>
            <Button variant="outline" className='text-white' onClick={handleSelectCategory}>
              Seleccionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectCategoryModal
