"use client";
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useAppStore } from '@/store'; // Asegúrate de importar tu store
import SelectCategoryModal from '@/components/SelectCategoryModal'; // Importa el modal
import { apiClient } from '@/lib/api-client';

const Roulette = () => {
  const router = useRouter();
  const setCategory = useAppStore((state) => state.setCategory);
  
  const categories = [
    { id: 1, name: "pruebas_unitarias", color: "#db7093" },
    { id: 2, name: "unitarias", color: "#20b2aa" },
    { id: 3, name: "pruebas_de_ntegracion", color: "#d63e92" },
    { id: 4, name: "pruebas_funcionales", color: "#daa520" },
    { id: 5, name: "pruebas_end_to_end", color: "#ff340f" },
    { id: 6, name: "pruebas_de_aceptacion", color: "#3cb371" },
    { id: 7, name: "corona", color: "#ecff00" }
  ];

  const [rotationValue, setRotationValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectCategoryModal, setSelectCategoryModal] = useState(false); // Estado para mostrar el modal
  const rouletteRef = useRef<HTMLDivElement | null>(null);
  let randomValue = Math.ceil(Math.random() * 3600);

  const rotateRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const newRotationValue = rotationValue + randomValue;

    if (rouletteRef.current) {
      rouletteRef.current.style.transform = `rotate(${newRotationValue}deg)`;
    }
    setRotationValue(newRotationValue);

    setTimeout(() => {
      const normalizedValue = newRotationValue % 360;
      const sectorOffset = 360 / categories.length / 2;
      const adjustedValue = (normalizedValue + sectorOffset) % 360;
      let sector = Math.floor(adjustedValue / (360 / categories.length));
      sector = (categories.length - sector) % categories.length;

      const selected = categories[sector].name;
      setSelectedCategory(selected);

      // Mostrar modal si la categoría seleccionada es "corona"
      if (selected === "corona") {
        setSelectCategoryModal(true);
      } else {
        const isFinalQuestion = false; // Asumiendo que no es una pregunta final
        setCategory(selected, isFinalQuestion);
        router.push("/question");
      }

      setIsSpinning(false);
    }, 5000);

    randomValue = Math.ceil(Math.random() * 3600);
  };

  return (
    <>
      <div className="relative w-[400px] h-[400px] flex justify-center items-center">
        {!(selectedCategory === "corona") && 
          <div 
            className='absolute w-[60px] h-[60px] bg-white rounded-full z-10 flex justify-center items-center uppercase font-bold text-slate-600 tracking-widest border border-black-2 cursor-pointer select-none before:spinner-triangle'
            onClick={rotateRoulette}
          >
            Spin
          </div>
        }
        
        <div 
          ref={rouletteRef} 
          className='absolute top-0 left-0 w-full h-full bg-transparent rounded-full overflow-hidden custom-box'
        >
          {categories.map((category) => (
            <div 
              key={category.id}  
              className={`roulette-category`} 
              style={{ '--i': category.id, backgroundColor: category.color } as React.CSSProperties}
            >
              <span className='roulette-category-text'>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para seleccionar la categoría de corona */}
      <SelectCategoryModal
        isOpen={selectCategoryModal}
        setSelectCategoryModal={setSelectCategoryModal}
      />
    </>
  );
};

export default Roulette;