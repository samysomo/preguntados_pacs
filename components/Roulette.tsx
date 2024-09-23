"use client";
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

const Roulette = () => {
  const router = useRouter()
  const categories = [
    { id: 1, name: "Category 1", color: "#db7093" },
    { id: 2, name: "Category 2", color: "#20b2aa" },
    { id: 3, name: "Category 3", color: "#d63e92" },
    { id: 4, name: "Category 4", color: "#daa520" },
    { id: 5, name: "Category 5", color: "#ff340f" },
    { id: 6, name: "Category 6", color: "#3cb371" }
  ];

  const [rotationValue, setRotationValue] = useState(0); // Almacena el valor de rotación
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Almacena la categoría seleccionada
  const [isSpinning, setIsSpinning] = useState(false); // Para manejar cuándo la ruleta está girando
  const rouletteRef = useRef<HTMLDivElement | null>(null); // useRef para la ruleta
  let randomValue = Math.ceil(Math.random() * 3600);

  const rotateRoulette = () => {
    if (isSpinning) return; // Evitar múltiples giros simultáneos

    setIsSpinning(true); // Indica que la ruleta está girando
    const newRotationValue = rotationValue + randomValue; // Nueva rotación total

    if (rouletteRef.current) {
      rouletteRef.current.style.transform = `rotate(${newRotationValue}deg)`;
    }
    setRotationValue(newRotationValue); // Actualiza la rotación total

    // Determinar la categoría seleccionada DESPUÉS de que termine de girar
    setTimeout(() => {
      const normalizedValue = newRotationValue % 360; // Normalizar el valor de rotación entre 0 y 360
      const sectorOffset = 360 / categories.length / 2; // Offset para centrar la categoría seleccionada arriba del botón
      const adjustedValue = (normalizedValue + sectorOffset) % 360; // Ajustar para que la categoría seleccionada esté arriba
      let sector = Math.floor(adjustedValue / (360 / categories.length)); // Determina el sector basado en 60 grados por categoría

      // Invertir el sector para coincidir con el orden correcto visual
      sector = (categories.length - sector) % categories.length;

      const selected = categories[sector].name; // Obtiene el nombre de la categoría seleccionada
      setSelectedCategory(selected); // Almacena la categoría seleccionada

      setIsSpinning(false); // Detiene el estado de "giro"
      router.push("/question")
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
