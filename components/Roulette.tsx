"use client";
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useAppStore } from '@/store'; // Asegúrate de importar tu store

const Roulette = () => {
  const router = useRouter();
  const setCategory = useAppStore((state) => state.setCategory); // Obtener la función setCategory del store
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
  const rouletteRef = useRef<HTMLDivElement | null>(null);
  let randomValue = Math.ceil(Math.random() * 3600);
  
  const rotateRoulette = () => {
    if (isSpinning) return; // Evitar múltiples giros simultáneos

    setIsSpinning(true); // Indica que la ruleta está girando
    const newRotationValue = rotationValue + randomValue; // Nueva rotación total

    if (rouletteRef.current) {
        rouletteRef.current.style.transform = `rotate(${newRotationValue}deg)`;
    }
    setRotationValue(newRotationValue); // Actualiza la rotación total

    setTimeout(() => {
        const normalizedValue = newRotationValue % 360; // Normalizar el valor de rotación entre 0 y 360
        const sectorOffset = 360 / categories.length / 2; // Offset para centrar la categoría seleccionada arriba del botón
        const adjustedValue = (normalizedValue + sectorOffset) % 360; // Ajustar para que la categoría seleccionada esté arriba
        let sector = Math.floor(adjustedValue / (360 / categories.length)); // Determina el sector basado en 60 grados por categoría  

        // Invertir el sector para coincidir con el orden correcto visual
        sector = (categories.length - sector) % categories.length;

        const selected = categories[sector].name; // Obtiene el nombre de la categoría seleccionada
        setSelectedCategory(selected); // Almacena la categoría seleccionada
        setCategory(selected); // Aquí guardamos la categoría en Zustand

        setIsSpinning(false); // Detiene el estado de "giro"
        
        router.push(`/question`); // No necesitas pasar la categoría por la URL
    }, 5000); // Esperar 5 segundos para que termine la animación

    randomValue = Math.ceil(Math.random() * 3600); // Genera un nuevo valor aleatorio para la próxima rotación
  };  

  return (
    <div className="relative w-[400px] h-[400px] flex justify-center items-center">
      <div 
        className='absolute w-[60px] h-[60px] bg-white rounded-full z-10 flex justify-center items-center uppercase font-bold text-slate-600 tracking-widest border border-black-2 cursor-pointer select-none before:spinner-triangle'
        onClick={rotateRoulette}
      >
        Spin
      </div>
      <div 
        ref={rouletteRef} 
        className='absolute top-0 left-0 w-full h-full bg-transparent rounded-full overflow-hidden custom-box'
      >
        {categories.map((category) => (
          <div 
            key={category.id}  
            className={`roulette-category`} 
            style={{'--i': category.id, backgroundColor: category.color} as React.CSSProperties}
          >
            <span className='roulette-category-text'>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roulette;
